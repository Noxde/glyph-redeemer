const path = require("path");

const { createSpinner } = require("nanospinner");
const { VTexec } = require("open-term");

const { isLatest, update } = require("./updater.js");
const exitProgram = require("./exitProgram.js");
const { readCodeLog, logError } = require("./logger");
const getCodes = require("../codeUpdater");
const redeemer = require("./redeemer.js");
const readline = require("readline/promises");

const version = "1.4.0";
// If its not windows and not running on a terminal then exit
if (!process.stdout.isTTY && !process.env.APPDATA) {
  VTexec("echo 'Please run the script from the terminal.'");
  process.exit(1);
}

const cookiesPath = process.pkg
  ? path.join(path.dirname(process.execPath), "config", "cookies.json")
  : "../config/cookies.json";

(async function () {
  try {
    const isUpdated = await isLatest(version);

    if (!isUpdated.isLatest) {
      await update(isUpdated.assets);
    }

    const debuggingPort = await getDebuggingPort();

    let cookies;
    try {
      cookies = require(cookiesPath);
    } catch (err) {
      console.error(
        "Could not find the cookies file make sure its in the config folder and the file is not empty."
      );
      return exitProgram();
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
    await redeemer(codes, cookies, debuggingPort);
    console.timeEnd("No codes left to redeem. Time taken");

    exitProgram();
  } catch (error) {
    console.log(`\nError: ${error.message}`);
    logError(error.message);

    process.exit(1);
  }
})();

async function getDebuggingPort() {
  const rl = readline.createInterface(process.stdin, process.stdout);

  const a = await rl.question("Enter your debugging port:");
  rl.close();
  return a;
}
