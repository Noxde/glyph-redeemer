const redeemer = require("./redeemer.js");
const { installChromium, removeChromium } = require("./installer.js");
const path = require("path");
const { createSpinner } = require("nanospinner");
const readline = require("readline");

const cookiesPath = process.pkg
  ? path.join(path.dirname(process.execPath), "config", "cookies.json")
  : "../config/cookies.json";

(async function () {
  let cookies;
  try {
    cookies = require(cookiesPath);
  } catch (err) {
    throw new Error(
      "Could not find the cookies file make sure its in the config folder and the file is not empty."
    );
  }

  const chromiumSpinner = createSpinner("Installing chromium").start();
  const chromiumPath = await installChromium();
  chromiumSpinner.success({
    text: "Chromium installed",
  });

  await redeemer(chromiumPath, cookies);
  chromiumSpinner.start({
    text: "Removing chromium",
  });
  await removeChromium();
  chromiumSpinner.success({
    text: "Chromium removed",
  });

  if (process.platform === "win32") {
    readline
      .createInterface({
        input: process.stdin,
        output: process.stdout,
      })
      .question("Press enter to close the program...", (ans) =>
        process.exit(0)
      );
  }
})();
