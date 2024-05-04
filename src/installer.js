const { install } = require("@puppeteer/browsers");
const { rm, readdirSync, statSync } = require("fs");
const readline = require("readline/promises");
const path = require("path");
const cacheDir =
  process.env.APPDATA ||
  (process.platform == "darwin"
    ? process.env.HOME + "/Library/Preferences"
    : process.env.HOME + "/.local/share");

module.exports.installChromium = async function () {
  let startTime = Date.now();
  let acc = 0;
  let lastProgress = 0;

  const { path: chromiumPath } = await install({
    browser: "chrome",
    buildId: "124.0.6367.60",
    cacheDir: path.join(cacheDir, "glyphRedeemer"),
    downloadProgressCallback: (progress, total) => {
      // Console log each time a second passes
      if (Date.now() - startTime >= 1000) {
        console.clear();
        // prettier-ignore
        console.log(
          `Downloaded: ${(progress / 1024 / 1024).toFixed(2)}Mb\nTotal: ${(total / 1024 / 1024).toFixed(2)}Mb\nSpeed: ${(acc / 1024 / 1024).toFixed(2)}Mb/s`
          );
        startTime = Date.now();
        acc = 0;
      } else {
        acc += progress - lastProgress;
        lastProgress = progress;
      }
    },
  });
  const dir = getFiles(chromiumPath);

  return dir.find((x) => x.match(/(chrome|chrome.exe)$/gm));
};

module.exports.removeChromium = async function () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answer = await rl.question(
    "Do you want to remove the installed chromium? if you remove it will be installed the next time you execute this script (Y/n):\n"
  );

  if (
    !answer ||
    answer.toLowerCase() === "y" ||
    answer.toLowerCase() === "yes"
  ) {
    rm(
      path.join(cacheDir, "glyphRedeemer"),
      {
        recursive: true,
      },
      (err) => {
        if (!err) {
          console.log("Chromium removed.");
        }
      }
    );
  } else if (answer.toLowerCase() === "n" || answer.toLowerCase() === "no") {
    rl.close();
  } else {
    console.log("Invalid answer, chromium will not be removed.");
  }
  rl.close();
};

// Source: https://learnwithparam.com/blog/get-all-files-in-a-folder-using-nodejs/
function getFiles(dir, files = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = readdirSync(dir);
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = path.join(dir, file);
    // Check if the current file/directory is a directory using statSync
    if (statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFiles(name, files);
    } else {
      // If it is a file, push the full path to the files array
      files.push(name);
    }
  }
  return files;
}
