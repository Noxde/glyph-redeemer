const axios = require("axios").default;

const fs = require("fs");
const tar = require("tar");
const extract = require("extract-zip");
const path = require("path");
const readline = require("readline/promises");

const { exec, spawn } = require("child_process");
const { createSpinner } = require("nanospinner");

async function isLatest(currentVersion) {
  const updateSpinner = createSpinner("Looking for updates");
  const { data } = await axios.get(
    "https://api.github.com/repos/Noxde/glyph-redeemer/releases/latest"
  );

  const { tag_name: version, assets } = data;
  if (currentVersion >= version) {
    updateSpinner.success({
      text: "You have the latest version installed.",
    });
  } else {
    updateSpinner.success({
      text: "Update found.",
    });
  }
  return {
    isLatest: currentVersion >= version,
    assets,
  };
}

async function update(assets) {
  await downloadUpdate(assets);
  console.log(
    "The program will now close to apply the update, you should open it again."
  );
  if (process.platform == "win32") {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await rl.question("Press enter to continue...");

    const extractPath = process?.pkg
      ? path.join(process.execPath, "..", "update", "glyph-redeemer-win.exe")
      : path.join(__dirname, "update", "glyph-redeemer-win.exe");
    const outPath = process?.pkg
      ? path.join(process.execPath, "..", "glyph-redeemer-win.exe")
      : path.join(__dirname, "glyph-redeemer-win.exe");

    const moveShellCommand = spawn(
      `timeout /t 4 /nobreak > nul && move "${extractPath}" "${outPath}" && RD /S /Q ${path.join(
        extractPath,
        ".."
      )}`,
      [],
      {
        detached: true,
        stdio: ["ignore", "ignore", "ignore"],
        shell: true,
      }
    );
    moveShellCommand.unref();
  } else {
    const script = `
    sleep 1; mv ./update/glyph-redeemer-linux ./glyph-redeemer-linux; rm -rf ./update/;
    `;
    exec(script).unref();
  }
  process.exit(0);
}

async function downloadUpdate(assets) {
  const platform = process.platform;
  const platformKeywords = {
    win32: "win",
    linux: "linux",
    darwin: "macos",
  };
  const keyword = platformKeywords[platform];
  // Find the correct url
  const url = assets.find((x) =>
    x.browser_download_url.includes(keyword)
  ).browser_download_url;

  const downloadSpinner = createSpinner("Downloading latest version").start();
  const { data: stream } = await axios.get(url, {
    responseType: "stream",
  });

  await writeFile(stream, url.endsWith(".zip") ? "zip" : "tar.gz");
  downloadSpinner.success({
    text: "Finished downloading",
  });
}

async function writeFile(stream, extension) {
  const outPath = process.pkg
    ? path.join(process.execPath, "..", `update.${extension}`)
    : path.join(__dirname, `update.${extension}`);
  const extractPath = process.pkg
    ? path.join(process.execPath, "..", "update")
    : path.join(__dirname, "update");

  const writeStream = fs.createWriteStream(outPath);
  stream.pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });

  try {
    await extractUpdate(outPath, extractPath);
  } catch (err) {
    console.log(err);
  }
}

async function extractUpdate(outPath, extractPath) {
  const unzipSpinner = createSpinner("Unzipping update");

  if (outPath.endsWith(".zip")) {
    await extract(outPath, { dir: extractPath });
  } else {
    await tar.x({ file: outPath, cwd: path.join(extractPath, "..") });
  }
  unzipSpinner.success({
    text: "Update unzipped",
  });
  cleanup(outPath, extractPath);
}

function cleanup(outPath) {
  fs.unlinkSync(outPath, (err) => (err ? console.log(err) : null));
}

module.exports = {
  isLatest,
  update,
};
