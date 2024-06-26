const {
  createLogger,
  format: { timestamp, combine, json },
  transports,
} = require("winston");
const { readFileSync, existsSync } = require("fs");

const errorLogger = createLogger({
  level: "error",
  format: combine(timestamp(), json()),
  transports: [new transports.File({ filename: "./logs/errors.log" })],
});

const codeLogger = createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [new transports.File({ filename: "./logs/redeemed.log" })],
});

function logCode(code, log) {
  codeLogger.info({
    message: log,
    code,
  });
}

function logError(err) {
  errorLogger.error({
    message: err,
  });
}

function readCodeLog() {
  if (!existsSync("./logs/redeemed.log")) {
    return [];
  }

  const json = readFileSync("./logs/redeemed.log", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean)
    .map((x) => JSON.parse(x));

  return json;
}

module.exports = {
  logCode,
  logError,
  readCodeLog,
};
