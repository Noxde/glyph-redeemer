<div align=center> 
  <img alt="creator-program-logo" src="./Images/creator-program-logo.png" width="220px">
</div>

<h1 align="center">Warframe Glyph Redeemer</h1>

**WARNING: If you are thinking about using this software keep in mind you might get "banned" from Warframe's website, you will still be able to play the game but you might not be able to access the website on the wifi network that you used this software for an undefined amount of time. This just happened to me while testing this making some changes to it ![Access denied to warframe website](https://i.imgur.com/xZfzujN.png)**

## Table of Contents

- [1. Introduction](#1-introduction)
- [2. Prerequisites](#2-prerequisites)
- [3. Installation](#3-installation)
- [4. Download](#4-download)
- [5. Usage](#5-usage)
- [6. Roadmap](#6-roadmap)
- [7. Contributing](#7-contributing)
- [8. License](#8-license)

## 1. Introduction

The Warframe Glyph Redeemer is a Node.js application powered by Puppeteer, designed to automate the process of logging into your Warframe account and redeeming all available glyph codes.

**Disclaimer:** I originally developed this application for personal use to redeem Warframe glyph codes, feel free to point out any bugs or problems. Please be aware that this application interacts with your Warframe account and relies on web scraping techniques. The use of automated tools like this may potentially violate Warframe's Terms of Service.

## 2. Prerequisites

You will only need this if you want to contribute, if you simply want to use the Warframe Glyph Redeemer without dealing with the installation process skip to [Download](#4-download)

Before using the Warframe Glyph Redeemer, ensure you have the following prerequisites:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (including npm)

## 3. Installation

To get started, follow these installation steps:

1. Clone the repository:

   ```bash
   $ git clone https://github.com/Noxde/glyph-redeemer
   ```

2. Navigate to the project directory:

   ```bash
   $ cd glyph-redeemer
   ```

3. Install project dependencies:

   ```bash
   $ npm install
   ```

4. Launch the application:

   ```bash
   $ npm start
   ```

## 4. Download

You can download the pre-built executable for your operating system from the [Releases](https://github.com/Noxde/glyph-redeemer/releases) section of this repository.

Choose the version that matches your operating system and download it.

Additionally, you will need a browser extension for cookie management based on your preferred web browser like
[Cookie Editor](https://cookie-editor.cgagnier.ca/). It's available for Chrome, FireFox, Safari, Edge and Opera

## 5. Usage

Using the Warframe Glyph Redeemer is straightforward:

**Notes:**

- On windows after executing the .exe file you have to click on <ins>moreinfo</ins> and then "Run anyway"

### **Steps**:

1. Visit the [Warframe official website](https://www.warframe.com/) and log in to your account.

2. Use the cookie editor extension to export your cookies as JSON.

   ![Cookie Editor](Images/cookie-editor.png)

3. Paste the exported cookies into the following directory:

   ```
   glyph-redeemer/config/cookies.json
   ```

4. You can customize what codes it will redeem modifying

   ```
   glyph-redeemer/config/codes.txt
   ```

   Each code should be in a new line. By default it will come with all the codes available.

5. You are now prepared to start the Warframe Glyph Redeemer.

6. The application will download Chromium to your temporary files folder for use with Puppeteer and attempt to log in to your Warframe account.

7. It will then start redeeming the codes, displaying success or failure for each code.

   ![Glyph Redeemer in Action](Images/glyph-redeemer_demo.gif)

After completing the code redemption, the application will remove the downloaded Chromium.

## 6. Roadmap

This application is designed for single-use code redeeming. However, I plan to add the following features in the future to enhance usability:

- **Redeem Multiple Codes:** Allow users to redeem multiple codes at once for faster redeeming.
- **Code List Updates:** I will regularly update the codes list to keep it current.
- **Remove the need to install chromium:** The program should first try to find your already installed browser, for now this is easier as it.
- **Simpler logging in:** Removing the need of a cookie editor, just simply login through the program.
- **Sign executable:** The idea is to avoid the Windows protected your PC warning, not sure if its by singing the executable.

## 7. Contributing

Contributions are welcome. Feel free to improve on the project.

## 8. License

This project is licensed under the [MIT License](LICENSE).
