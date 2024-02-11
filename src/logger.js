const winston = require("winston");
const { readFileSync, existsSync } = require("fs");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "./errors.log" })],
});

module.exports.addLog = function (code, message) {
  logger.log({
    level: "error",
    code,
    message,
  });
};

module.exports.readLog = function () {
  if (!existsSync("./errors.log")) {
    return [];
  }

  const json = readFileSync("./errors.log", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean)
    .map((x) => JSON.parse(x));

  return json;
};
