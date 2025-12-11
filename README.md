# Electron Rsbuild template

<p>

<a href="https://npmjs.com/package/electron-rsbuild-template"><img src="https://img.shields.io/github/package-json/dependency-version/ClearLuvMoki/electron-rsbuild-template/dev/react?filename=template/package.json&" alt="react version" /></a>
<a href="https://npmjs.com/package/electron-rsbuild-template"><img src="https://img.shields.io/github/package-json/dependency-version/ClearLuvMoki/electron-rsbuild-template/dev/react?logo=react&logoColor=white&filename=template/package.json&style=flat-square&colorA=564341&colorB=EDED91" alt="react version" /></a>
<a href="https://npmjs.com/package/electron-rsbuild-template"><img src="https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/ClearLuvMoki/electron-rsbuild-template/main/template/package.json&query=$.devDependencies['@biomejs/biome']&label=@biomejs/biome&style=flat-square&logo=biome&logoColor=white&colorA=564341&colorB=EDED91
" alt="@biomejs/biome version" /></a>
<a href="https://npmjs.com/package/electron-rsbuild-template"><img src="https://img.shields.io/github/package-json/dependency-version/ClearLuvMoki/electron-rsbuild-template/dev/@rsbuild/core?rsbuild&filename=template/package.json&style=flat-square&colorA=564341&colorB=EDED91" alt="rsbuild version" /></a>
<a href="https://npmjs.com/package/electron-rsbuild-template"><img src="https://img.shields.io/github/package-json/dependency-version/ClearLuvMoki/electron-rsbuild-template/dev/electron?logo=electron&logoColor=white&filename=template/package.json&style=flat-square&colorA=564341&colorB=EDED91" alt="electron version" /></a>
<a href="https://npmjs.com/package/electron-rsbuild-template"><img src="https://img.shields.io/github/package-json/dependency-version/ClearLuvMoki/electron-rsbuild-template/dev/electron-builder?logo=electron-builder&logoColor=white&filename=template/package.json&style=flat-square&colorA=564341&colorB=EDED91" alt="electron-builder version" /></a>

</p>

## Usage
1. Create template:
    ```shell
        npx electron-rsbuild-template
    ```
2. Input project name (default name `electron-app`);
3. Select package manager;
4. Auto install dependencies;

    <img src="https://raw.githubusercontent.com/ClearLuvMoki/electron-rsbuild-template/main/assets/images/install.png" alt="install images"/>
5. Use `npm run dev` launch electron:
   <img src="https://raw.githubusercontent.com/ClearLuvMoki/electron-rsbuild-template/main/assets/images/demo.png" alt="demo images"/>


## Icon
Use `npm run icon` to generate desktop icons in all sizes using the `./public/asstes/icons/icon.png` template image，including icns and ico.


## Project Structure
```shell
.
├── biome.json # code lint
├── builder # rsbuild config
│   ├── rsbuild.common.ts # common config for rsbuild
│   ├── rsbuild.main.ts # rsbuild config for main process
│   └── rsbuild.render.ts # rsbuild config for frontend process
├── builder.js # electron-builder
├── mas # entitlements for macos
│   ├── entitlements.mas.inherit.plist
│   ├── entitlements.mas.loginhelper.plist
│   └── entitlements.mas.plist
├── nodemon.json # reload config for main process
├── package.json
├── public # common assets
├── release # release directory
│   ├── app # Desktop installer
│   └── dist # js build release
├── src
│   ├── main # main process source code
│   └── render # frontend process source code
└── tsconfig.json
```
