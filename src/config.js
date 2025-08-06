const fs = require("fs");
const path = require("path");

// Check if both files exist in the current working directory
const cwd = process.cwd();
const hasLocalFiles = fs.existsSync(path.join(cwd, "config.json")) &&
    fs.existsSync(path.join(cwd, "cookies.json"));

if (hasLocalFiles) {
    configPath = cwd;
} else {
    configPath = process.pkg
        ? path.join(path.dirname(process.execPath), "config")
        : path.join(__dirname, "..", "config");
}

const cookiesPath = path.join(configPath, "cookies.json");
const configFilePath = path.join(configPath, "config.json");
const profilePath = path.join(configPath, "browser-profile");
const codesPath = path.join(configPath, "codes.txt");
const logsPath = path.join(configPath, "redeemed.log");
const errorsPath = path.join(configPath, "errors.log");

function getConfig() {
    // Ensure config directory exists
    if (!fs.existsSync(configPath)) {
        fs.mkdirSync(configPath, {recursive: true});
    }

    let config = {};

    // Load or create config.json
    try {
        if (fs.existsSync(configFilePath)) {
            config = require(configFilePath);
        }
    } catch (err) {
        console.warn("Could not parse config.json, creating a new one.");
        config = {};
    }

    // Determine default browser path based on platform
    // Check for platform and set a fallback if no specific path is found in config
    let currentPlatformBrowserPath;
    switch (process.platform) {
        case "darwin": // macOS
            currentPlatformBrowserPath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
            break;
        case "win32": // Windows
            currentPlatformBrowserPath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
            break;
        //case "linux": // Linux
            //currentPlatformBrowserPath = "/usr/bin/chromium";
            //break;
        default: // Use linux as default
            //console.warn(`Unknown platform: ${process.platform}. Using generic Chromium path.`);
            currentPlatformBrowserPath = "/usr/bin/chromium"; // Fallback
    }

    // Define default config with platform-specific browser paths
    const defaultConfig = {
        AutoStart: false,
        DebuggingPort: 9222,
        LaunchBrowser: true,
        BrowserMaxConnectionTries: 5,
        BrowserWaitBetweenTriesMs: 500,
        BrowserPath: currentPlatformBrowserPath,
        CaptchaFailTimeoutInsteadOfExit: false,
        CaptchaMaxFails: 5,
        CaptchaTimeoutInMs: 30000
    };

    let configChanged = false;

    // Initialize top-level keys if they don't exist
    for (const key in defaultConfig) {
        if (!config.hasOwnProperty(key)) {
            config[key] = defaultConfig[key];
            configChanged = true;
        }
    }

    // Ensure the nested BrowserPath properties exist for each platform

    if (configChanged) {
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
        console.log("Updated config.json with missing default values.");
    }
    
    return config;
}

module.exports = {
    configPath,
    configFilePath,
    cookiesPath,
    profilePath,
    codesPath,
    errorsPath,
    logsPath,
    getConfig
};
