const puppeteer = require("@puppeteer/browsers");
const { rm, readdirSync, statSync } = require("fs");
const path = require("path");
const os = require("os");
const temp = os.tmpdir();

module.exports.installChromium = async function () {
  const buildId = "114.0.5735.133"; //which version you want to download

  await puppeteer.install({
    cacheDir: temp,
    browser: "chrome",
    platform:
      process.platform === "linux"
        ? "linux"
        : process.platform === "darwin"
        ? "mac"
        : "win64",
    buildId,
  });

  const dir = getFiles(path.join(temp, "chrome"));
  return dir.find((x) => x.match(/(chrome|chrome.exe)$/gm));
};

module.exports.removeChromium = async function () {
  rm(
    path.join(temp, "chrome"),
    {
      recursive: true,
    },
    (err) => err
  );
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
