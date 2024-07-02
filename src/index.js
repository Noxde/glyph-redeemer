const path = require("path");

const { createSpinner } = require("nanospinner");
const { VTexec } = require("open-term");

const { installChromium, removeChromium } = require("./installer.js");
const { isLatest, update } = require("./updater.js");
const exitProgram = require("./exitProgram.js");
const { readCodeLog } = require("./logger");
const getCodes = require("../codeUpdater");
const redeemer = require("./redeemer.js");

const version = "1.3.0"; // Lower version number for testing purposes this is actually 1.2.3 with changes
// If its not windows and not running on a terminal then exit
if (!process.stdout.isTTY && !process.env.APPDATA) {
  VTexec("echo 'Please run the script from the terminal.'");
  process.exit(1);
}

const cookiesPath = process.pkg
  ? path.join(path.dirname(process.execPath), "config", "cookies.json")
  : "../config/cookies.json";

(async function () {
  const isUpdated = await isLatest(version);

  if (!isUpdated.isLatest) {
    await update(isUpdated.assets);
  }

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
  let codes = await getCodes();
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

  const chromiumSpinner = createSpinner("Installing chromium").start();
  const chromiumPath = await installChromium();
  chromiumSpinner.success({
    text: "Chromium installed",
  });

  console.time("No codes left to redeem. Time taken");
  await redeemer(codes, cookies, chromiumPath);
  console.timeEnd("No codes left to redeem. Time taken");

  await removeChromium();

  exitProgram();
})();
