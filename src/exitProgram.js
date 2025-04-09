const readline = require("readline/promises");

module.exports = async function exitProgram(bs) {
  if (process.platform === "win32") {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await rl.question("Press enter to close the program...");
  }
  if (bs) {
    await bs.close();
  }
  process.exit(0);
};
