<div align=center> 
  <img alt="creator-program-logo" src="./Images/creator-program-logo.png" width="220px">

![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/Noxde/glyph-redeemer/total?label=Total%20Downloads)
![GitHub Downloads (all assets, latest release)](https://img.shields.io/github/downloads/Noxde/glyph-redeemer/latest/total?label=Downloads%40latest)

</div>

<h1 align="center">Warframe Glyph Redeemer</h1>

Thanks [Voltage](https://forums.warframe.com/profile/1419671-voltage/) for updating the [list of codes](https://forums.warframe.com/topic/992008-free-promocodes-and-glyphs-all-platforms/) on the warframe forums, if it weren't for this this would not have been possible.

## Table of Contents

- [1. Introduction](#1-introduction)
- [2. Prerequisites](#2-prerequisites)
- [3. Download](#3-download)
- [4. Usage](#4-usage)
- [5. Contributing](#5-contributing)
- [6. License](#6-license)

## 1. Introduction

Glyph Redeemer is a Node.js application powered by Puppeteer, designed to automate the process of redeeming all the available glyph codes.

**Disclaimer:** I originally developed this application for personal use to redeem Warframe glyph codes, feel free to point out any bugs or problems. Please be aware that this application interacts with your Warframe account and relies on web scraping techniques. The use of automated tools like this may potentially violate Warframe's Terms of Service.

## 2. Prerequisites

- A chromium based browser (like Google Chrome, Brave, Opera, Microsoft Edge, Arc)
- [Cookie Editor extension](https://cookie-editor.cgagnier.ca/)

## 3. Download

You can download the pre-built executable for your operating system from the [Releases](https://github.com/Noxde/glyph-redeemer/releases) section of this repository.

After installing cookie editor make sure to click on All sites when the extensions requests permission

![image](https://github.com/Noxde/glyph-redeemer/assets/70549780/bcd246a0-74ad-4c2f-8f2b-faac48d23533)

## 4. Usage

**Notes:**

- On windows after executing the .exe file you might have to click on <ins>moreinfo</ins> and then "Run anyway"

### **Steps**:

1. Visit the [Warframe official website](https://www.warframe.com/) and log in to your account.

2. Use the cookie editor extension to export your cookies as JSON.

   ![Cookie Editor](Images/cookie-editor.png)

3. Paste the exported cookies into the following directory:

   ```
   glyph-redeemer/config/cookies.json
   ```

4. Start your browser with the remote debugging port flag

   On Windows:

   - Search for your browser on the start menu
   - Right click it and click on "Open file location", this will open a shortcuts folder
   - Right click the browser shortcut and click on "Open file location" again
   - Hold shift and right click on the empty space and click "Open in windows terminal" or "Open PowerShell window here"
   - On the terminal now enter

     ```
       ./browser.exe --remote-debugging-port=9222 --user-data-dir="%LOCALAPPDATA%\glyph-redeemer-profile"
     ```

     (replace browser with your browser's executable name)

   On Linux:

   - Open a terminal and do

     ```
     browser --remote-debugging-port=9222 --user-data-dir="$HOME/glyph-redeemer-profile"
     ```

     (browser will depend on your browser executable)

5. After setting up the new profile you can start glyph redeemer and enter your debugging port (you can use anything other than 9222 if you want when starting your browser)

6. Glyph redeemer now will connect to your browser and start redeeming the codes, displaying success or failure for each code.

  > [!IMPORTANT]
  > You need to leave the browser on the warframe tab to allow the script to work

   ![Glyph Redeemer in Action](Images/glyph-redeemer_demo.gif)

  > [!NOTE]
  > **Glyph Redeemer may exit before redeeming all the codes if it encounters multiple captchas to avoid being IP banned. if this happens, try running Glyph Redeemer later.**

<details>
  <summary>
    <h3>Table of codes with images</h3>
  </summary>
  <table><thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=6ixGatsu">
            <img width="100px" src="https://i.imgur.com/7iWl2UI.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=AdmiralBahroo">
            <img width="100px" src="https://i.glyphs.wf/glyphs/AdmiralBahroo.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=AeonKnight86">
            <img width="100px" src="https://i.glyphs.wf/glyphs/AeonKnight.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=AGayGuyPlays">
            <img width="100px" src="https://i.glyphs.wf/glyphs/AGGP.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>6ixGatsu</td>
        <td>AdmiralBahroo</td>
        <td>AeonKnight86</td>
        <td>AGayGuyPlays</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Akari">
            <img width="100px" src="https://i.imgur.com/KRnvW5s.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=AlainLove">
            <img width="100px" src="https://i.imgur.com/aWaXEKe.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=AlexanderDario">
            <img width="100px" src="https://i.imgur.com/sHsBrHo.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Amprov">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Goku70seven.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Akari</td>
        <td>AlainLove</td>
        <td>AlexanderDario</td>
        <td>Amprov</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=AngryUnicorn">
            <img width="100px" src="https://i.glyphs.wf/glyphs/AngryUnicorn.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=AnjetCat">
            <img width="100px" src="https://i.imgur.com/X79KSCT.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=AnnoyingKillah">
            <img width="100px" src="https://i.glyphs.wf/glyphs/AnnoyingKillah.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=ArgonSix">
            <img width="100px" src="https://i.imgur.com/49VuDAz.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>AngryUnicorn</td>
        <td>AnjetCat</td>
        <td>AnnoyingKillah</td>
        <td>ArgonSix</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=AshiSogiTenno">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Ashisogitenno.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=AsuraTenshi">
            <img width="100px" src="https://i.imgur.com/mLh8Vzq.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=AuntieTan">
            <img width="100px" src="https://i.imgur.com/v4dfMuS.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Avelna">
            <img width="100px" src="https://i.imgur.com/6QDVL2X.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>AshiSogiTenno</td>
        <td>AsuraTenshi</td>
        <td>AuntieTan</td>
        <td>Avelna</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Aznitrous">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Aznitrous.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=BigJimID">
            <img width="100px" src="https://i.glyphs.wf/glyphs/BigJimID.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=BlackOni">
            <img width="100px" src="https://i.glyphs.wf/glyphs/BlackOni.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=BlazingCobalt">
            <img width="100px" src="https://i.imgur.com/XaoN4DT.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Aznitrous</td>
        <td>BigJimID</td>
        <td>BlackOni</td>
        <td>BlazingCobalt</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=BlueberryCat">
            <img width="100px" src="https://i.imgur.com/1qwYZxl.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=BluyayoGamer">
            <img width="100px" src="https://i.imgur.com/lpQ3zvh.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=BrazilCommunityDiscord">
            <img width="100px" src="https://i.glyphs.wf/glyphs/BrazilianCommunityDiscord.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Bricky">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Bricky.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>BlueberryCat</td>
        <td>BluyayoGamer</td>
        <td>BrazilCommunityDiscord</td>
        <td>Bricky</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Brozime">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Brozime.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Buff00n">
            <img width="100px" src="https://i.imgur.com/F52Ys7E.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=BurnBxx">
            <img width="100px" src="https://i.glyphs.wf/glyphs/BurnBxx.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Bwana">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Bwana.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Brozime</td>
        <td>Buff00n</td>
        <td>BurnBxx</td>
        <td>Bwana</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=CalamityDeath">
            <img width="100px" src="https://i.imgur.com/fJub3xm.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=CaleyEmerald">
            <img width="100px" src="https://i.imgur.com/3PDmGSc.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=CanOfCraig">
            <img width="100px" src="https://i.imgur.com/GtSYTUY.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Carchara">
            <img width="100px" src="https://i.imgur.com/3fPE9FA.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>CalamityDeath</td>
        <td>CaleyEmerald</td>
        <td>CanOfCraig</td>
        <td>Carchara</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Casardis">
            <img width="100px" src="https://i.imgur.com/hza6B9A.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=CephalonSquared">
            <img width="100px" src="https://i.imgur.com/Oswm6x8.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=CGsKnackie">
            <img width="100px" src="https://i.glyphs.wf/glyphs/CGsKnackie.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=ChacyTay">
            <img width="100px" src="https://i.imgur.com/TWxA5H9.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Casardis</td>
        <td>CephalonSquared</td>
        <td>CGsKnackie</td>
        <td>ChacyTay</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Char">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Char.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Chelestra">
            <img width="100px" src="https://i.imgur.com/lZIWekF.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Cleonaturin">
            <img width="100px" src="https://i.imgur.com/Hzpiaup.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Codoma">
            <img width="100px" src="https://i.imgur.com/U0HGxKE.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Char</td>
        <td>Chelestra</td>
        <td>Cleonaturin</td>
        <td>Codoma</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=CohhCarnage">
            <img width="100px" src="https://i.glyphs.wf/glyphs/CohhCarnage.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=ColdScar">
            <img width="100px" src="https://i.imgur.com/aUcB7k5.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=ColdTiger">
            <img width="100px" src="https://i.imgur.com/r1YbiV3.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=ConclaveDiscord">
            <img width="100px" src="https://i.imgur.com/ODhjXdG.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>CohhCarnage</td>
        <td>ColdScar</td>
        <td>ColdTiger</td>
        <td>ConclaveDiscord</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=ConfusedWarframe">
            <img width="100px" src="https://i.imgur.com/yutv1BM.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=CopyKavat">
            <img width="100px" src="https://i.imgur.com/OnMjvt4.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Cpt_Kim">
            <img width="100px" src="https://i.imgur.com/PVH1MbN.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Crowdi">
            <img width="100px" src="https://i.imgur.com/BEGnJis.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ConfusedWarframe</td>
        <td>CopyKavat</td>
        <td>Cpt_Kim</td>
        <td>Crowdi</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Daidaikiri">
            <img width="100px" src="https://i.imgur.com/wY9wvKY.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=DanielTheDemon">
            <img width="100px" src="https://i.glyphs.wf/glyphs/DanieltheDemon.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Danily">
            <img width="100px" src="https://i.imgur.com/6DWd7sX.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=DarikaArt">
            <img width="100px" src="https://i.imgur.com/XZJziQf.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Daidaikiri</td>
        <td>DanielTheDemon</td>
        <td>Danily</td>
        <td>DarikaArt</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=DasterCreations">
            <img width="100px" src="https://i.imgur.com/XiMtufx.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=DatLoon">
            <img width="100px" src="https://i.imgur.com/nTzSIRF.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=DayJobo">
            <img width="100px" src="https://i.imgur.com/q1wQRDO.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=DeathMaggot">
            <img width="100px" src="https://i.imgur.com/RIPyez6.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>DasterCreations</td>
        <td>DatLoon</td>
        <td>DayJobo</td>
        <td>DeathMaggot</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=DebbySheen">
            <img width="100px" src="https://i.imgur.com/SV6C3dn.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=DeepBlueBeard">
            <img width="100px" src="https://i.glyphs.wf/glyphs/DeepBlueBeard.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Destrohido">
            <img width="100px" src="https://i.imgur.com/ckige5C.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=DeuceTheGamer">
            <img width="100px" src="https://i.glyphs.wf/glyphs/DeuceTheGamer.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>DebbySheen</td>
        <td>DeepBlueBeard</td>
        <td>Destrohido</td>
        <td>DeuceTheGamer</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=DillyFrame">
            <img width="100px" src="https://i.glyphs.wf/glyphs/DillyFrame.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=DimitriV2">
            <img width="100px" src="https://i.glyphs.wf/glyphs/DimitriV2.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Disfusional">
            <img width="100px" src="https://i.imgur.com/O0VKXG9.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=DjTechLive">
            <img width="100px" src="https://i.glyphs.wf/glyphs/DJTechlive.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>DillyFrame</td>
        <td>DimitriV2</td>
        <td>Disfusional</td>
        <td>DjTechLive</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=DKDiamantes">
            <img width="100px" src="https://i.glyphs.wf/glyphs/DKDiamantes.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=DNexus">
            <img width="100px" src="https://i.imgur.com/8Djk9NB.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=EdRick">
            <img width="100px" src="https://i.imgur.com/IuJdqLG.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Eduiy16">
            <img width="100px" src="https://i.imgur.com/eRK4RFy.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>DKDiamantes</td>
        <td>DNexus</td>
        <td>EdRick</td>
        <td>Eduiy16</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=ElDanker">
            <img width="100px" src="https://i.imgur.com/UVZ0XoB.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=ElGrineerExiliado">
            <img width="100px" src="https://i.imgur.com/33lm32B.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=EliceGameplay">
            <img width="100px" src="https://i.imgur.com/X4CzC5P.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Elnoraeleo">
            <img width="100px" src="https://i.imgur.com/r5n5iA1.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ElDanker</td>
        <td>ElGrineerExiliado</td>
        <td>EliceGameplay</td>
        <td>Elnoraeleo</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Emovj">
            <img width="100px" src="https://i.imgur.com/iTpMg8j.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=EmpyreanCap">
            <img width="100px" src="https://i.imgur.com/Olo2txo.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Endotti_">
            <img width="100px" src="https://i.imgur.com/8N6lVVM.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Eterion">
            <img width="100px" src="https://i.imgur.com/c9LAOxz.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Emovj</td>
        <td>EmpyreanCap</td>
        <td>Endotti_</td>
        <td>Eterion</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=ExtraCredits">
            <img width="100px" src="https://i.imgur.com/Z2Yksxu.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=FacelessBeanie">
            <img width="100px" src="https://i.imgur.com/XvTsKfF.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=FashionFrameIsEndGame">
            <img width="100px" src="https://i.imgur.com/dcnCjuG.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=FatedsChronicles">
            <img width="100px" src="https://i.imgur.com/QKXsmSA.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ExtraCredits</td>
        <td>FacelessBeanie</td>
        <td>FashionFrameIsEndGame</td>
        <td>FatedsChronicles</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=FeelLikeAPlayer">
            <img width="100px" src="https://i.imgur.com/OFRT3Nk.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=FerreusDemon">
            <img width="100px" src="https://i.imgur.com/70ieIRm.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Finlaena">
            <img width="100px" src="https://i.imgur.com/IuiUFiK.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=FloofyDwagon">
            <img width="100px" src="https://i.imgur.com/o0WxCD8.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>FeelLikeAPlayer</td>
        <td>FerreusDemon</td>
        <td>Finlaena</td>
        <td>FloofyDwagon</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=FR4G-TP">
            <img width="100px" src="https://i.imgur.com/dMqHuKu.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=FrostyNovaPrime">
            <img width="100px" src="https://i.imgur.com/OVMC07U.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Frozenballz">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Frozenbawz.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Gara">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Gara.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>FR4G-TP</td>
        <td>FrostyNovaPrime</td>
        <td>Frozenballz</td>
        <td>Gara</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=GermanCommunityDiscord">
            <img width="100px" src="https://i.glyphs.wf/glyphs/GermanCommunityDiscord.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Gingy">
            <img width="100px" src="https://i.imgur.com/KI7OyQ9.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=GlamShatterSkull">
            <img width="100px" src="https://i.glyphs.wf/glyphs/GlamShatterskull.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Golden">
            <img width="100px" src="https://i.imgur.com/88MPNvx.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GermanCommunityDiscord</td>
        <td>Gingy</td>
        <td>GlamShatterSkull</td>
        <td>Golden</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=GrindHardSquad">
            <img width="100px" src="https://i.imgur.com/uCMZwr9.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=H3DSH0T">
            <img width="100px" src="https://i.glyphs.wf/glyphs/H3dsh0t.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=HappinessDark">
            <img width="100px" src="https://i.imgur.com/fn8GiF3.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=HomiInvocado">
            <img width="100px" src="https://i.glyphs.wf/glyphs/HomiInvocado.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GrindHardSquad</td>
        <td>H3DSH0T</td>
        <td>HappinessDark</td>
        <td>HomiInvocado</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=HotShomStories">
            <img width="100px" src="https://i.glyphs.wf/glyphs/HotsHomStories.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Hydroxate">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Hydroxate.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=iFlynn">
            <img width="100px" src="https://i.imgur.com/9QZbAt6.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Ikedo">
            <img width="100px" src="https://i.imgur.com/PjNOEak.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>HotShomStories</td>
        <td>Hydroxate</td>
        <td>iFlynn</td>
        <td>Ikedo</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Im7heClown">
            <img width="100px" src="https://i.imgur.com/TPUZH4A.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=InfernoTheFireLord">
            <img width="100px" src="https://i.imgur.com/KhD22lV.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=InfoDiversao">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Infodiversao.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=ItsJustToe">
            <img width="100px" src="https://i.imgur.com/qYJ2EMX.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Im7heClown</td>
        <td>InfernoTheFireLord</td>
        <td>InfoDiversao</td>
        <td>ItsJustToe</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=IWoply">
            <img width="100px" src="https://i.imgur.com/QeodD6R.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=JamieVoiceOver">
            <img width="100px" src="https://i.imgur.com/Io9Svmg.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=JessiThrower">
            <img width="100px" src="https://i.imgur.com/Fs10tHH.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=JoeyZero">
            <img width="100px" src="https://i.glyphs.wf/glyphs/JoeyZero.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>IWoply</td>
        <td>JamieVoiceOver</td>
        <td>JessiThrower</td>
        <td>JoeyZero</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Joriale">
            <img width="100px" src="https://i.imgur.com/NeT4A3m.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=JustHailey">
            <img width="100px" src="https://i.imgur.com/wAlZ7sv.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=JustRLC">
            <img width="100px" src="https://i.glyphs.wf/glyphs/RLCGaming.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=K1llerBarbie">
            <img width="100px" src="https://i.imgur.com/qXrglx9.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Joriale</td>
        <td>JustHailey</td>
        <td>JustRLC</td>
        <td>K1llerBarbie</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=KavatsSchroedinger">
            <img width="100px" src="https://i.imgur.com/EgTytXk.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=KenshinWF">
            <img width="100px" src="https://i.imgur.com/xbLvowy.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=KingGothaLion">
            <img width="100px" src="https://i.glyphs.wf/glyphs/KingGothalion.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Kirarahime">
            <img width="100px" src="https://i.imgur.com/Cag0pU9.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>KavatsSchroedinger</td>
        <td>KenshinWF</td>
        <td>KingGothaLion</td>
        <td>Kirarahime</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Kirdy">
            <img width="100px" src="https://i.imgur.com/bR1624X.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Kiwad">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Kiwad.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Kr1ptonPlayer">
            <img width="100px" src="https://i.imgur.com/jRfF6Ym.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Kretduy">
            <img width="100px" src="https://i.imgur.com/MWqI7ap.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Kirdy</td>
        <td>Kiwad</td>
        <td>Kr1ptonPlayer</td>
        <td>Kretduy</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Kyaii">
            <img width="100px" src="https://i.imgur.com/SnkBO2J.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=L1feWater">
            <img width="100px" src="https://i.imgur.com/Ud37g6B.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=LadyNovita">
            <img width="100px" src="https://i.imgur.com/ksnuXk0.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=LadyTheLaddy">
            <img width="100px" src="https://i.imgur.com/f6OjNQ6.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Kyaii</td>
        <td>L1feWater</td>
        <td>LadyNovita</td>
        <td>LadyTheLaddy</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=LeoDoodling">
            <img width="100px" src="https://i.imgur.com/OZIvRvq.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=LeyzarGamingViews">
            <img width="100px" src="https://i.glyphs.wf/glyphs/LeyzarViewGaming.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=LightMicke">
            <img width="100px" src="https://i.imgur.com/ASecpkS.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=LilLexi">
            <img width="100px" src="https://i.glyphs.wf/glyphs/LilLexi.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>LeoDoodling</td>
        <td>LeyzarGamingViews</td>
        <td>LightMicke</td>
        <td>LilLexi</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=LucianPlaysAllDay">
            <img width="100px" src="https://i.imgur.com/9dGkGHu.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=LynxAria">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Lynxaria.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Macho">
            <img width="100px" src="https://i.glyphs.wf/glyphs/LokKingMacho.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=MadFury">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Hypercaptai.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>LucianPlaysAllDay</td>
        <td>LynxAria</td>
        <td>Macho</td>
        <td>MadFury</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Makarimorph">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Makarimorph.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=MaoMix">
            <img width="100px" src="https://i.imgur.com/jtaxKf3.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=MCGamerCZ">
            <img width="100px" src="https://i.glyphs.wf/glyphs/MCGamerCZ.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=McMonkeys">
            <img width="100px" src="https://i.glyphs.wf/glyphs/MCMonkeys.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Makarimorph</td>
        <td>MaoMix</td>
        <td>MCGamerCZ</td>
        <td>McMonkeys</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=MeCore">
            <img width="100px" src="https://i.imgur.com/qIi7KGk.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=MedusaCaptures">
            <img width="100px" src="https://i.imgur.com/y2FS025.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=MHBlacky">
            <img width="100px" src="https://i.imgur.com/Xgboem5.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=MichelPostma">
            <img width="100px" src="https://i.glyphs.wf/glyphs/TheNextLevel.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>MeCore</td>
        <td>MedusaCaptures</td>
        <td>MHBlacky</td>
        <td>MichelPostma</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=MikeTheBard">
            <img width="100px" src="https://i.glyphs.wf/glyphs/TVSBOH.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=MissFwuffy">
            <img width="100px" src="https://i.imgur.com/c4qcuj8.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=MisterGamer">
            <img width="100px" src="https://i.imgur.com/whSBvC3.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=MjikThize">
            <img width="100px" src="https://i.imgur.com/7YsNGoT.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>MikeTheBard</td>
        <td>MissFwuffy</td>
        <td>MisterGamer</td>
        <td>MjikThize</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Mogamu">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Mogamu.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=MrRoadBlock">
            <img width="100px" src="https://i.imgur.com/ZUGEuB7.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=MrSteelWar">
            <img width="100px" src="https://i.glyphs.wf/glyphs/MrSteelWar.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=MrWarframeGuy">
            <img width="100px" src="https://i.glyphs.wf/glyphs/MrWarframeGuy.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Mogamu</td>
        <td>MrRoadBlock</td>
        <td>MrSteelWar</td>
        <td>MrWarframeGuy</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Nelosart">
            <img width="100px" src="https://i.imgur.com/wHdjibO.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=NomNom">
            <img width="100px" src="https://i.imgur.com/yj61AsM.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=NoSympathyy">
            <img width="100px" src="https://i.glyphs.wf/glyphs/NoSympathyy.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Np161">
            <img width="100px" src="https://i.imgur.com/ol9bqPR.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Nelosart</td>
        <td>NomNom</td>
        <td>NoSympathyy</td>
        <td>Np161</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=OddieOwl">
            <img width="100px" src="https://i.imgur.com/wk01G9R.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=OOSIJ">
            <img width="100px" src="https://i.imgur.com/X86jVS0.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=OriginalWickedFun">
            <img width="100px" src="https://i.glyphs.wf/glyphs/OriginalWickedfun.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=OrpheusDeluxe">
            <img width="100px" src="https://i.glyphs.wf/glyphs/OrpheusDeluxe.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>OddieOwl</td>
        <td>OOSIJ</td>
        <td>OriginalWickedFun</td>
        <td>OrpheusDeluxe</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Ottofyre">
            <img width="100px" src="https://i.imgur.com/POg4Gpv.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Ozku">
            <img width="100px" src="https://i.imgur.com/4zUQKOJ.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=PammyJammy">
            <img width="100px" src="https://i.imgur.com/4nvNubI.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Pandaahh">
            <img width="100px" src="https://i.imgur.com/GMXG5Gn.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ottofyre</td>
        <td>Ozku</td>
        <td>PammyJammy</td>
        <td>Pandaahh</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=PapaTLion">
            <img width="100px" src="https://i.imgur.com/OIdyoEC.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Parvos">
            <img width="100px" src="https://i.imgur.com/OuVQw2T.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=PhongFu">
            <img width="100px" src="https://i.imgur.com/4jiZdKg.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=PlagueDirector">
            <img width="100px" src="https://i.imgur.com/CcpIdnm.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>PapaTLion</td>
        <td>Parvos</td>
        <td>PhongFu</td>
        <td>PlagueDirector</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=PokketNinja">
            <img width="100px" src="https://i.glyphs.wf/glyphs/PokketNinja.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=PostiTV">
            <img width="100px" src="https://i.glyphs.wf/glyphs/PostiTV.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Pride2024">
            <img width="100px" src="https://i.imgur.com/MuVCZxc.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=PrimedAverage">
            <img width="100px" src="https://i.imgur.com/aM7O9Om.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>PokketNinja</td>
        <td>PostiTV</td>
        <td>Pride2024</td>
        <td>PrimedAverage</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=ProfessorBroman">
            <img width="100px" src="https://i.glyphs.wf/glyphs/ProfessorBroman.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Purkinje">
            <img width="100px" src="https://i.imgur.com/8AsfxMM.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=PurpleFlurp">
            <img width="100px" src="https://i.imgur.com/HLujov0.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Pyrah">
            <img width="100px" src="https://i.imgur.com/o8LfmQq.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ProfessorBroman</td>
        <td>Purkinje</td>
        <td>PurpleFlurp</td>
        <td>Pyrah</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=PyrrhicSerenity">
            <img width="100px" src="https://i.imgur.com/jXy0dwh.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=QuadlyStop">
            <img width="100px" src="https://i.imgur.com/QEjUevV.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=r/Warframe">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Reddit.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=RagingTerror">
            <img width="100px" src="https://i.imgur.com/kZmulG3.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>PyrrhicSerenity</td>
        <td>QuadlyStop</td>
        <td>r/Warframe</td>
        <td>RagingTerror</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Rahetalius">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Rahetalius.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Rahny">
            <img width="100px" src="https://i.imgur.com/0eO14So.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=RainbowWaffles">
            <img width="100px" src="https://i.imgur.com/qv2L6Yj.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=RelentlessZen">
            <img width="100px" src="https://i.imgur.com/lvDbR7M.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Rahetalius</td>
        <td>Rahny</td>
        <td>RainbowWaffles</td>
        <td>RelentlessZen</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=RetroAlchemist">
            <img width="100px" src="https://i.imgur.com/5FBKAtI.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=ReyGanso">
            <img width="100px" src="https://i.glyphs.wf/glyphs/ReyGanso.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Rikenz">
            <img width="100px" src="https://i.imgur.com/DvWrGgu.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Rippz0r">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Rippz0r.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>RetroAlchemist</td>
        <td>ReyGanso</td>
        <td>Rikenz</td>
        <td>Rippz0r</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Ritens">
            <img width="100px" src="https://i.imgur.com/phdd1fR.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=RoyalPrat">
            <img width="100px" src="https://i.imgur.com/nXPYRMD.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=RustyFin">
            <img width="100px" src="https://i.imgur.com/n4mLacz.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Sapmatic">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Sapmatic.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ritens</td>
        <td>RoyalPrat</td>
        <td>RustyFin</td>
        <td>Sapmatic</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=SarahTsang">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Sarahtsang.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Scallion">
            <img width="100px" src="https://i.imgur.com/3KDp67l.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=ScarletMoon">
            <img width="100px" src="https://i.imgur.com/Q9wedXj.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Searyn">
            <img width="100px" src="https://i.imgur.com/yxN2twN.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SarahTsang</td>
        <td>Scallion</td>
        <td>ScarletMoon</td>
        <td>Searyn</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=SerdarSari">
            <img width="100px" src="https://i.glyphs.wf/glyphs/BBSChainWarden.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Sharlazard">
            <img width="100px" src="https://i.imgur.com/jlnKHja.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=ShenZhao">
            <img width="100px" src="https://i.imgur.com/eEdhYmi.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Sherpa">
            <img width="100px" src="https://i.glyphs.wf/glyphs/SherpaRage.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SerdarSari</td>
        <td>Sharlazard</td>
        <td>ShenZhao</td>
        <td>Sherpa</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Shul">
            <img width="100px" src="https://i.imgur.com/8PcUsNL.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=SiejoUmbra">
            <img width="100px" src="https://i.imgur.com/ovwKCH6.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=SilentMashiko">
            <img width="100px" src="https://i.imgur.com/JU6Qpib.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=SillFix">
            <img width="100px" src="https://i.imgur.com/GbDlZH8.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Shul</td>
        <td>SiejoUmbra</td>
        <td>SilentMashiko</td>
        <td>SillFix</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Silvervale">
            <img width="100px" src="https://i.imgur.com/YHTrNS9.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=SkillUp">
            <img width="100px" src="https://i.glyphs.wf/glyphs/SkillUp.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Smoodie">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Smoodie.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Sn0wRC">
            <img width="100px" src="https://i.imgur.com/fM359TG.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Silvervale</td>
        <td>SkillUp</td>
        <td>Smoodie</td>
        <td>Sn0wRC</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=SpaceWaifu">
            <img width="100px" src="https://i.imgur.com/JX119Q5.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Spandy">
            <img width="100px" src="https://i.imgur.com/onLtGq8.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=SpecialEffect">
            <img width="100px" src="https://i.imgur.com/OMQJrMK.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Str8opticroyal">
            <img width="100px" src="https://i.imgur.com/g6AmQYn.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SpaceWaifu</td>
        <td>Spandy</td>
        <td>SpecialEffect</td>
        <td>Str8opticroyal</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Strippin">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Strippin.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=StudioCyen">
            <img width="100px" src="https://i.imgur.com/gzagtWE.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=TacticalPotato">
            <img width="100px" src="https://i.imgur.com/TPoRS3x.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Tanchan">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Tanchan.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Strippin</td>
        <td>StudioCyen</td>
        <td>TacticalPotato</td>
        <td>Tanchan</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=TBGKaru">
            <img width="100px" src="https://i.imgur.com/6VDNJ2T.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=TeaWrex">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Teawrex.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Techrot-Mactics">
            <img width="100px" src="undefined"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=TheGamio">
            <img width="100px" src="https://i.imgur.com/dkkfQ67.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>TBGKaru</td>
        <td>TeaWrex</td>
        <td>Techrot-Mactics</td>
        <td>TheGamio</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=TheKengineer">
            <img width="100px" src="https://i.imgur.com/JWfmm2I.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=ThePanda">
            <img width="100px" src="https://i.imgur.com/KX8EkpK.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=TinBears">
            <img width="100px" src="https://i.glyphs.wf/glyphs/TinBears.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=TioMario">
            <img width="100px" src="https://i.glyphs.wf/glyphs/TioMario.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>TheKengineer</td>
        <td>ThePanda</td>
        <td>TinBears</td>
        <td>TioMario</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=TioRamon">
            <img width="100px" src="https://i.glyphs.wf/glyphs/TioRamon.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Tortoise">
            <img width="100px" src="https://i.imgur.com/VtrMC9U.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=TotalN3wb">
            <img width="100px" src="https://i.glyphs.wf/glyphs/TotalN3wb.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=TrashFrame">
            <img width="100px" src="https://i.imgur.com/JXceBwO.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>TioRamon</td>
        <td>Tortoise</td>
        <td>TotalN3wb</td>
        <td>TrashFrame</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Triburos">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Triburos.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Twila">
            <img width="100px" src="https://i.imgur.com/iBBcEgt.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=UnrealYuki">
            <img width="100px" src="https://i.glyphs.wf/glyphs/UnrealYuki.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=UreiFen">
            <img width="100px" src="https://i.imgur.com/o4bZskG.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Triburos</td>
        <td>Twila</td>
        <td>UnrealYuki</td>
        <td>UreiFen</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=VAMP6X6X6X">
            <img width="100px" src="https://i.imgur.com/RWKCJcE.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Varlinator">
            <img width="100px" src="https://i.imgur.com/rIcct0y.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=VashCowaii">
            <img width="100px" src="https://i.imgur.com/VcSjgeT.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Vashka">
            <img width="100px" src="https://i.imgur.com/qZKHmXb.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>VAMP6X6X6X</td>
        <td>Varlinator</td>
        <td>VashCowaii</td>
        <td>Vashka</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Vernoc">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Vernoc.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=VoidFissureBR">
            <img width="100px" src="https://i.imgur.com/VMIhFKi.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Voli">
            <img width="100px" src="https://i.imgur.com/ylJQLqs.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=VoltTheHero">
            <img width="100px" src="https://i.glyphs.wf/glyphs/VoltTheHero.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Vernoc</td>
        <td>VoidFissureBR</td>
        <td>Voli</td>
        <td>VoltTheHero</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=VVhiteAngel">
            <img width="100px" src="https://i.glyphs.wf/glyphs/VVhiteAngel.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Wanderbots">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Wanderbots.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=WarframeCommunityDiscord">
            <img width="100px" src="https://i.imgur.com/U3Pi9Sz.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=WarframeFlo">
            <img width="100px" src="https://i.imgur.com/xuabUIg.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>VVhiteAngel</td>
        <td>Wanderbots</td>
        <td>WarframeCommunityDiscord</td>
        <td>WarframeFlo</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=WarframeRunway">
            <img width="100px" src="https://i.imgur.com/JcJ1TVw.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=WarframeWiki">
            <img width="100px" src="https://i.imgur.com/Usa2JKn.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=WealWest">
            <img width="100px" src="https://i.imgur.com/0xWoVJ2.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=WideScreenJohn">
            <img width="100px" src="https://i.imgur.com/nYcXUBq.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>WarframeRunway</td>
        <td>WarframeWiki</td>
        <td>WealWest</td>
        <td>WideScreenJohn</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=Woxli">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Woxli.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=xBocchanVTx">
            <img width="100px" src="https://i.imgur.com/3q9NxEL.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Xenogelion">
            <img width="100px" src="https://i.glyphs.wf/glyphs/Xenogelion.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=xxVampixx">
            <img width="100px" src="https://i.imgur.com/Qy5sBDO.png"/>
          </a>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Woxli</td>
        <td>xBocchanVTx</td>
        <td>Xenogelion</td>
        <td>xxVampixx</td>
      </tr>
    </tbody>
<thead>
      <tr>
        <th>
          <a href="https://warframe.com/promocode?code=YourLuckyClover">
            <img width="100px" src="https://i.imgur.com/2R0ddP7.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Zarionis">
            <img width="100px" src="https://i.imgur.com/mb6IYIF.png"/>
          </a>
        </th>
        <th>
          <a href="https://warframe.com/promocode?code=Zxpfer">
            <img width="100px" src="https://i.imgur.com/SRiQ1Pk.png"/>
          </a>
        </th></tr>
    </thead>
    <tbody>
      <tr>
        <td>YourLuckyClover</td>
        <td>Zarionis</td>
        <td>Zxpfer</td></tr>
    </tbody>
</table>
</details>

## 5. Contributing

You will first need:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (including npm)

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

## 6. License

This project is licensed under the [MIT License](LICENSE).
