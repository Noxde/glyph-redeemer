const fs = require("fs");
const path = require("path");

const configPath = process.pkg
    ? path.join(path.dirname(process.execPath), "config")
    : path.join(__dirname, "..", "config");

const cookiesPath = path.join(configPath, "cookies.json");
const configFilePath = path.join(configPath, "config.json");
const profilePath = path.join(configPath, "browser-profile");

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
    let defaultBrowserPathLinux = "/usr/bin/chromium"; // Common Linux path for Chromium
    let defaultBrowserPathWindows = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"; // Common Windows path for Chrome
    let defaultBrowserPathMac = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"; // Common macOS path for Chrome

    // Check for platform and set a fallback if no specific path is found in config
    let currentPlatformBrowserPath;
    switch (process.platform) {
        case "darwin": // macOS
            currentPlatformBrowserPath = defaultBrowserPathMac;
            break;
        case "win32": // Windows
            currentPlatformBrowserPath = defaultBrowserPathWindows;
            break;
        case "linux": // Linux
            currentPlatformBrowserPath = defaultBrowserPathLinux;
            break;
        default:
            console.warn(`Unknown platform: ${process.platform}. Using generic Chromium path.`);
            currentPlatformBrowserPath = defaultBrowserPathLinux; // Fallback
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
    if (typeof config.BrowserPath !== 'object' || config.BrowserPath === null) {
        config.BrowserPath = {};
        configChanged = true;
    }
    if (!config.BrowserPath.linux) {
        config.BrowserPath.linux = defaultConfig.BrowserPath.linux;
        configChanged = true;
    }
    if (!config.BrowserPath.windows) {
        config.BrowserPath.windows = defaultConfig.BrowserPath.windows;
        configChanged = true;
    }
    if (!config.BrowserPath.mac) {
        config.BrowserPath.mac = defaultConfig.BrowserPath.mac;
        configChanged = true;
    }

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
  getConfig
};
