import {DEBUG, context, sleep} from './common.js';

import Archivist from './archivist.js';
import LibraryServer from './libraryServer.js';
import args from './args.js';

const {server_port, mode, chrome_port} = args;
const CHROME_OPTS = !DEBUG ? [
  '--restore-last-session',
  `--disk-cache-dir=${args.temp_browser_cache}`,
] : [
  '--restore-last-session',
  `--disk-cache-dir=${args.temp_browser_cache}`,
  '--no-sandbox'
];
const LAUNCH_OPTS = {
  port: chrome_port, 
  chromeFlags:CHROME_OPTS, 
  userDataDir:false, 
  startingUrl: `http://localhost:${args.server_port}`,
  ignoreDefaultFlags: true
}
const KILL_ON = {
  win32: 'taskkill /IM chrome.exe /F',
  darwin: 'pkill -15 chrome',
  freebsd: 'pkill -15 chrome',
  linux: 'pkill -15 chrome',
};

let quitting, ChildProcess;

start();

async function start() {
  if ( context == 'node' ) {
    console.log(`Running in node...`);
    console.log(`Importing dependencies...`);
    const fs = await import('fs');
    const {launch:ChromeLaunch} = await import('chrome-launcher');

    await killChrome();

    process.on('beforeExit', cleanup);
    process.on('exit', cleanup);
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('SIGBREAK', cleanup);

    console.log(`Removing 22120's existing temporary browser cache if it exists...`);
    if ( fs.existsSync(args.temp_browser_cache) ) {
      console.log(`Temp browser cache directory (${args.temp_browser_cache}) exists, deleting...`);
      fs.rmdirSync(args.temp_browser_cache, {recursive:true});
      console.log(`Deleted.`);
    }
    console.log(`Launching library server...`);
    await LibraryServer.start({server_port});
    console.log(`Library server started.`);

    console.log(`Waiting 1 second...`);
    await sleep(1000);

    console.log(`Launching chrome...`);
    await ChromeLaunch(LAUNCH_OPTS);
    console.log(`Chrome started.`);

    console.log(`Waiting 1 second...`);
    await sleep(1000);
  }
  console.log(`Launching archivist and connecting to browser...`);
  await Archivist.collect({chrome_port, mode});
  console.log(`System ready.`);
}

async function killChrome(wait = true) {
  try {
    if ( process.platform in KILL_ON ) {
      console.log(`Attempting to shut running chrome...`);
      if ( ! ChildProcess ) {
        const {default:child_process} = await import('child_process');
        ChildProcess = child_process;
      }
      const [err, stdout, stderr] = (await new Promise(
        res => ChildProcess.exec(KILL_ON[process.platform], (...a) => res(a))
      ));
      if ( err ) {
        DEBUG && console.warn("Error closing existing chrome", err);
        console.log(`There was no running chrome.`);
      } else {
        console.log(`Running chrome shut down.`);
        if ( wait ) {
          console.log(`Waiting 1 second...`);
          await sleep(1000);
        }
      }
    } else {
      console.warn(`If you have chrome running, you may need to shut it down manually and restart 22120.`);
    }
  } catch(e) {
    console.warn("in kill chrome", e);
  }
}

async function cleanup(reason) {
  console.log(`Cleanup called on reason: ${reason}`);
  if ( quitting ) {
    console.log(`Cleanup already called so not running again.`);
    return;
  }
  quitting = true;
  LibraryServer.stop();
  Archivist.shutdown();
  killChrome(); 
  console.log(`22120 exiting in 10 seconds...`);
  setTimeout(() => process.exit(0), 10000);
  //process.exit(0);
} 
