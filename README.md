<p align="center">                         
	
  <img src="https://github.com/virtualvivek/react-windows-ui/blob/main/markdown/md_img_header.png" width="250" />
</p>
<h1 align="center">react-windows-ui</h1>

<p align="center">Build Windows native look & feel apps using ReactJS.</p>
<p align="center"><a href="https://virtualvivek.github.io/react-windows-ui/" target="_blank">« Explore Project Docs »</a></p>

# Status
<p>
  <a href="https://virtualvivek.github.io/react-windows-ui/">
    <img src="https://img.shields.io/circleci/build/github/virtualvivek/react-windows-ui?style=flat-square&logo=circleci&token=6fe7637a17a269e8b002b11474d70c9d25c71f30" alt="Build" />
  </a>
  <a href="https://github.com/virtualvivek/react-windows-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-darklime.svg?style=flat-square&color=blue" alt="License: MIT" />
  </a>
	<a href="https://www.npmjs.com/package/react-windows-ui">
    <img src="https://img.shields.io/github/package-json/v/virtualvivek/react-windows-ui?style=flat-square&color=CB3837&logo=npm&logoColor=ffffff&label=npm"
      alt="npm" />
  </a>
	<br/>
  <a href="https://github.com/virtualvivek/react-windows-ui/tree/main/src/lib/dist">
    <img src="https://img.shields.io/github/size/virtualvivek/react-windows-ui/src/lib/dist/react-windows-ui.min.css?style=flat-square&color=1572B6&logo=css3&logoColor=ffffff&label=react-windows-ui.min.css" alt="react-windows-ui.min.css" />
  </a>
</p>

# Features
 - Provides Native feel Windows UI Controls.
 - Comparably small CSS file size.
 - Cleaner HTML.
 - Works with any <b>Routing Library</b>.

# Works with
<img src="https://github.com/virtualvivek/react-windows-ui/blob/main/markdown/support_vitejs.svg" width="90" title="ViteJS"/> &nbsp;&nbsp;&nbsp;&nbsp; <img src="https://github.com/virtualvivek/react-windows-ui/blob/main/markdown/support_nextjs.svg" width="90" title="NextJS"/>

# Getting Started
```ruby
pnpm add react-windows-ui
```
```js
// Be sure to include styles at some point, probably during your bootstraping
import "react-windows-ui/config/app-config.css";
import "react-windows-ui/styles.css";
import "react-windows-ui/icons/winui-icons.min.css";
```
## 🚀 [See `App.js` code & more »](https://virtualvivek.github.io/react-windows-ui/#/v4.2.2/getting_started)

样式 token 规范见 [`docs/design-system.md`](docs/design-system.md)。

# Usage
```js
import { Button, InputText } from "react-windows-ui";
// Optional direct entry for smaller consumer graphs:
import ButtonDirect from "react-windows-ui/button";

const App = () => (
  <>
    <Button type="primary" value="Press Me" />
    <ButtonDirect type="subtle" value="Direct entry" />
    <InputText placeholder="Enter a text" />
  </>
);
```

# Run Locally
```html
git clone https://github.com/virtualvivek/react-windows-ui.git
cd react-windows-ui
pnpm install
pnpm dev
```

The repository uses a pnpm workspace, Vite 8, Sass, TypeScript, Vitest and React Testing Library. The documentation app is under `apps/docs`; the component package remains under `src/lib` during this incremental migration.

```bash
pnpm build
pnpm test
pnpm lint
pnpm typecheck
```

The package also keeps the legacy `react-windows-ui/dist/react-windows-ui.min.css` CSS path for existing applications. React, React DOM, and React Router DOM are peer dependencies and must be installed by the consuming app.

# Find this project useful? :heart:
Support it by joining [**stargazers**](https://github.com/virtualvivek/react-windows-ui/stargazers) for this repository. :star:

# License

**`react-windows-ui`** is licensed under **`MIT license`**. View [license](https://github.com/virtualvivek/react-windows-ui/blob/main/LICENSE).<br>
Copyright (c) 2021-24 [**virtualvivek**](https://github.com/virtualvivek).
