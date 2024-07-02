const readline = require("readline/promises");

module.exports = async function exitProgram() {
  if (process.platform === "win32") {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await rl.question("Press enter to close the program...");
    process.exit(0);
  } else {
    process.exit(0);
  }
};
