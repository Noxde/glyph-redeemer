const fs = require("fs");
const { spawn } = require("child_process");

const { createSpinner } = require("nanospinner");
const { VTexec } = require("open-term");

const { isLatest, update } = require("./updater.js");
const exitProgram = require("./exitProgram.js");
const { readCodeLog, logError } = require("./logger");
const getCodes = require("../codeUpdater");
const redeemer = require("./redeemer.js");
require("readline/promises");
const { profilePath, getConfig, cookiesPath } = require("./config");

let config = getConfig();

const version = "1.5.0";
// If its not windows and not running on a terminal then exit
if (!process.stdout.isTTY && !process.env.APPDATA) {
  VTexec("echo 'Please run the script from the terminal.'");
  process.exit(1);
}

// Function to spawn the browser
function spawnBrowser(debuggingPort) {
  try {
    if (!fs.existsSync(config.BrowserPath)) {
      console.error(
        `BrowserPath does not exist: ${config.BrowserPath}. Check your config.json file`
      );
      process.exit(1);
    }

    console.log(`Attempting to launch browser: ${config.BrowserPath}`);
    const args = [
      `--remote-debugging-port=${debuggingPort}`,
      `--user-data-dir=${profilePath}`,
    ];

    const browserProcess = spawn(config.BrowserPath, args, {
      detached: true,
      stdio: "ignore",
    });

    browserProcess.on("error", (error) => {
      logError(`Something went wrong with the browser: ${error.message}`);
      console.log(`\nSomething went wrong with the browser.`);
      process.exit(1);
    });

    browserProcess.unref();

    console.log(
      `Browser launched successfully with debugging port ${debuggingPort}.`
    );
  } catch (error) {
    logError(`Failed to launch browser: ${error.message}`);
    throw new Error(`Failed to launch browser: ${error.message}`);
  }
}

// Press any key to continue from: https://stackoverflow.com/questions/19687407/press-any-key-to-continue-in-nodejs
const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once("data", (data) => {
      const byteArray = [...data];
      if (byteArray.length > 0 && byteArray[0] === 3) {
        console.log("^C");
        process.exit(1);
      }
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

(async function () {
  const debuggingPort = config.DebuggingPort;
  const launchBrowser = config.LaunchBrowser;

  try {
    const isUpdated = await isLatest(version);

    if (!isUpdated.isLatest) {
      await update(isUpdated.assets);
    }

    // Create an empty cookies file if it doesn't exist
    if (!fs.existsSync(cookiesPath)) {
      try {
        fs.writeFileSync(cookiesPath, "", "utf8"); // Write an empty JSON object to the file
        console.log(
          `Created empty cookies file because it didnt exist at: ${cookiesPath}`
        );
        console.log(`Read the readme on how to import your cookies.`);
        return exitProgram();
      } catch (err) {
        console.error(`Could not create the cookies file: ${err.message}`);
        return exitProgram();
      }
    }

    let cookies;
    try {
      cookies = require(cookiesPath);
    } catch (err) {
      console.error(
        "Could not find the cookies file, make sure its in the config folder and the file is not empty."
      );
      console.error(
        "Make sure you read the readme on how to import your cookies."
      );
      return exitProgram();
    }

    if (launchBrowser) {
      if (config.BrowserPath) {
        spawnBrowser(debuggingPort);
      } else {
        console.error(
          `Browser path not configured. Please update config.json.`
        );
        logError(`Browser path not configured.`);
      }
    }

    if (!config.AutoStart) {
      console.log(
        "\nSet up the new profile if you haven't, then press any key to start."
      );
      console.log(
        "If you already set up the profile and would like to skip this the next time you run the program, change AutoStart to true on the config.json file."
      );
      await keypress();
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

    await exitProgram();
  } catch (error) {
    console.log(`\nError: ${error.message}`);
    logError(error.message);

    process.exit(1);
  }
})();
