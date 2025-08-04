const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

const { createSpinner } = require("nanospinner");
const { VTexec } = require("open-term");

const { isLatest, update } = require("./updater.js");
const exitProgram = require("./exitProgram.js");
const { readCodeLog, logError } = require("./logger");
const getCodes = require("../codeUpdater");
const redeemer = require("./redeemer.js");
const readline = require("readline/promises");
const {profilePath, getConfig, cookiesPath} = require("./config");

const version = "1.5.0";
// If its not windows and not running on a terminal then exit
if (!process.stdout.isTTY && !process.env.APPDATA) {
  VTexec("echo 'Please run the script from the terminal.'");
  process.exit(1);
}

// Function to spawn the browser
function spawnBrowser(browserPath, debuggingPort) {
  try {
    console.log(`Attempting to launch browser: ${browserPath}`);
    const args = [
      `--remote-debugging-port=${debuggingPort}`,
      `--user-data-dir=${profilePath}`
    ];

    const browserProcess = spawn(browserPath, args, {
      detached: true,
      stdio: "ignore",
    });

    browserProcess.unref();
    
    console.log(`Browser launched successfully with debugging port ${debuggingPort}.`);
  } catch (error) {
    console.error(`Failed to launch browser: ${error.message}`);
    logError(`Failed to launch browser: ${error.message}`);
  }
}

// Press any key to continue from: https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', data => {
    const byteArray = [...data]
    if (byteArray.length > 0 && byteArray[0] === 3) {
      console.log('^C')
      process.exit(1)
    }
    process.stdin.setRawMode(false)
    resolve()
  }))
}

(async function () {
  try {
    let config = getConfig();
    
    if (!config.AutoStart) {
      console.log('Press any key to start.')
      await keypress()
    }
    
    const isUpdated = await isLatest(version);

    if (!isUpdated.isLatest) {
      await update(isUpdated.assets);
    }

    const debuggingPort = config.DebuggingPort;
    const launchBrowser = config.LaunchBrowser;

    // Select the correct browser path based on the current platform from the config
    let browserPathToUse;
    switch (process.platform) {
      case "darwin":
        browserPathToUse = config.BrowserPath.mac;
        break;
      case "win32":
        browserPathToUse = config.BrowserPath.windows;
        break;
      case "linux":
        browserPathToUse = config.BrowserPath.linux;
        break;
      default:
        console.warn(`Running on an unrecognized platform: ${process.platform}. Please manually specify 'BrowserPath' in config.json if browser launching fails.`);
        browserPathToUse = config.BrowserPath.linux; // Fallback to Linux path if platform is unknown
        break;
    }
    
    // Create an empty cookies file if it doesn't exist
    if (!fs.existsSync(cookiesPath)) {
      try {
        fs.writeFileSync(cookiesPath, '', 'utf8'); // Write an empty JSON object to the file
        console.log(`Created empty cookies file because it didnt exist at: ${cookiesPath}`);
        console.log(`Read the readme on how to import your cookies.`);
      } catch (err) {
        console.error(`Could not create the cookies file: ${err.message}`);
        return exitProgram();
      }
    }
    
    let cookies;
    try {
      cookies = require(cookiesPath);
    } catch (err) {
      console.error("Could not find the cookies file, make sure its in the config folder and the file is not empty.");
      console.error("Make sure you read the readme on how to import your cookies.");
      return exitProgram();
    }

    if (launchBrowser) {
      if (browserPathToUse) {
        spawnBrowser(browserPathToUse, debuggingPort);
      } else {
        console.error(`Browser path not configured. Please update config.json.`);
        logError(`Browser path not configured.`);
      }
    }

    const log = readCodeLog();
    const codesSpinner = createSpinner("Fetching codes").start();
    let codes = await getCodes(debuggingPort);
    codesSpinner.success({
      text: "Codes fetched",
    });

    codes = codes
        .map((x) => x.code)
        .filter((x) => !log.find((y) => y?.code === x));
    if (codes.length == 0) {
      console.log("There are no new codes to redeem.");
      return exitProgram();
    }
    console.log(`Found ${codes.length} new codes to redeem\n`);

    console.time("No codes left to redeem. Time taken");
    await redeemer(codes, cookies);
    console.timeEnd("No codes left to redeem. Time taken");

    exitProgram();
  } catch (error) {
    console.log(`\nError: ${error.message}`);
    logError(error.message);

    process.exit(1);
  }
})();