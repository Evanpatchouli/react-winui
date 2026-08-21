<p align="center">
  <img src="https://github.com/Evanpatchouli/react-winui/blob/main/markdown/md_img_header.png" width="250" />
</p>
<h1 align="center">react-winui</h1>

<p align="center">Build full featured <b>Windows fluent UI</b> apps using <b>ReactJS</b>.</p>
<p align="center"><a href="https://Evanpatchouli.github.io/react-winui/" target="_blank">« Explore Project Docs »</a></p>

# Status
<p>
  <a href="https://Evanpatchouli.github.io/react-winui/">
    <img src="https://img.shields.io/circleci/build/github/Evanpatchouli/react-winui?style=flat-square&logo=circleci&token=6fe7637a17a269e8b002b11474d70c9d25c71f30" alt="Build" />
  </a>
  <a href="https://github.com/Evanpatchouli/react-winui/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-darklime.svg?style=flat-square&color=blue" alt="License: MIT" />
  </a>
	<a href="https://www.npmjs.com/package/@evanpatchouli/react-winui">
    <img src="https://img.shields.io/github/package-json/v/Evanpatchouli/react-winui?style=flat-square&color=CB3837&logo=npm&logoColor=ffffff&label=npm"
      alt="npm" />
  </a>
	<br/>
  <a href="https://github.com/Evanpatchouli/react-winui/tree/main/src/lib/dist">
    <img src="https://img.shields.io/github/size/Evanpatchouli/react-winui/src/lib/dist/react-winui.min.css?style=flat-square&color=1572B6&logo=css3&logoColor=ffffff&label=react-winui.min.css" alt="react-winui.min.css" />
  </a>
</p>

# Features
 - Provides Native feel Windows UI Controls.
 - Comparably small CSS file size.
 - Cleaner HTML.
 - Works with any <b>Routing Library</b>.

# Works with
<img src="https://github.com/Evanpatchouli/react-winui/blob/main/markdown/support_vitejs.svg" width="90" title="ViteJS"/> &nbsp;&nbsp;&nbsp;&nbsp; <img src="https://github.com/Evanpatchouli/react-winui/blob/main/markdown/support_nextjs.svg" width="90" title="NextJS"/>

# Getting Started
```ruby
npm install @evanpatchouli/react-winui
```
```js
// Be sure to include styles at some point, probably during your bootstraping
import "@evanpatchouli/react-winui/config/app-config.css";
import "@evanpatchouli/react-winui/styles.css";
import "@evanpatchouli/react-winui/icons/winui-icons.min.css";
```
## 🚀 [See `App.js` code & more »](https://Evanpatchouli.github.io/react-winui/#/v1.0.0/getting_started)

# Usage

```js
import { Button, InputText } from "@evanpatchouli/react-winui";

const App = () => (
  <>
    <Button type="primary" value="Press Me" />
    <InputText placeholder="Enter a text" />
  </>
);
```

`@evanpatchouli/react-winui/button` is available as a direct ESM entry when a consumer wants to import `Button` without the package barrel. The legacy `@evanpatchouli/react-winui/dist/react-winui.min.css` path remains supported.

# Run Locally
```html
git clone https://github.com/Evanpatchouli/react-winui.git
cd react-winui
npm install
npm start
```

# Find this project useful? :heart:
Support it by joining [**stargazers**](https://github.com/Evanpatchouli/react-winui/stargazers) for this repository. :star:

# License

**`react-winui`** is licensed under **`MIT license`**. View [license](https://github.com/Evanpatchouli/react-winui/blob/main/LICENSE).<br>
Copyright (c) 2021-24 [**Evanpatchouli**](https://github.com/Evanpatchouli).
