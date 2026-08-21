<p align="center">                         
	
  <img src="https://github.com/evanpatchouli/react-winui/blob/main/markdown/md_img_header.png" width="250" />
</p>
<h1 align="center">react-winui</h1>

<p align="center">Build Windows native look & feel apps using ReactJS.</p>
<p align="center"><a href="https://evanpatchouli.github.io/react-winui/" target="_blank">« Explore Project Docs »</a></p>

# Status
<p>
  <a href="https://evanpatchouli.github.io/react-winui/">
    <img src="https://img.shields.io/circleci/build/github/evanpatchouli/react-winui?style=flat-square&logo=circleci&token=6fe7637a17a269e8b002b11474d70c9d25c71f30" alt="Build" />
  </a>
  <a href="https://github.com/evanpatchouli/react-winui/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-darklime.svg?style=flat-square&color=blue" alt="License: MIT" />
  </a>
	<a href="https://www.npmjs.com/package/@evanpatchouli/react-winui">
    <img src="https://img.shields.io/github/package-json/v/evanpatchouli/react-winui?style=flat-square&color=CB3837&logo=npm&logoColor=ffffff&label=npm"
      alt="npm" />
  </a>
	<br/>
  <a href="https://github.com/evanpatchouli/react-winui/tree/main/src/lib/dist">
    <img src="https://img.shields.io/github/size/evanpatchouli/react-winui/src/lib/dist/react-winui.min.css?style=flat-square&color=1572B6&logo=css3&logoColor=ffffff&label=react-winui.min.css" alt="react-winui.min.css" />
  </a>
</p>

# Features
 - Provides Native feel Windows UI Controls.
 - Comparably small CSS file size.
 - Cleaner HTML.
 - Works with any <b>Routing Library</b>.

# Works with
<img src="https://github.com/evanpatchouli/react-winui/blob/main/markdown/support_vitejs.svg" width="90" title="ViteJS"/> &nbsp;&nbsp;&nbsp;&nbsp; <img src="https://github.com/evanpatchouli/react-winui/blob/main/markdown/support_nextjs.svg" width="90" title="NextJS"/>

# Getting Started
```ruby
pnpm add @evanpatchouli/react-winui
```
```js
// Be sure to include styles at some point, probably during your bootstraping
import "@evanpatchouli/react-winui/config/app-config.css";
import "@evanpatchouli/react-winui/styles.css";
import "@evanpatchouli/react-winui/icons/winui-icons.min.css";
```
## 🚀 [See `App.js` code & more »](https://evanpatchouli.github.io/react-winui/#/v1.0.0/getting_started)

样式 token 规范见 [`docs/design-system.md`](docs/design-system.md)。

# Usage
```js
import { Button, InputText } from "@evanpatchouli/react-winui";
// Optional direct entry for smaller consumer graphs:
import ButtonDirect from "@evanpatchouli/react-winui/button";

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
git clone https://github.com/evanpatchouli/react-winui.git
cd react-winui
pnpm install
pnpm dev
```

The repository uses a pnpm workspace, Vite 8, Sass, TypeScript, Vitest, React Testing Library and Playwright. The documentation app is under `apps/docs`; the component package remains under `src/lib` during this incremental migration.

```bash
pnpm build
pnpm test
pnpm test:browser
pnpm lint
pnpm typecheck
```

`pnpm test:browser` starts an isolated Vite fixture that mounts the public visual component library and checks real browser interactions plus 34 checked-in visual baselines. To intentionally update visual baselines, use `pnpm test:browser:update` and review every changed image before committing it.

The package also keeps the legacy `@evanpatchouli/react-winui/dist/react-winui.min.css` CSS path for existing applications. React, React DOM, and React Router DOM are peer dependencies and must be installed by the consuming app.

# Find this project useful? :heart:
Support it by joining [**stargazers**](https://github.com/evanpatchouli/react-winui/stargazers) for this repository. :star:

# License

**`react-winui`** is licensed under **`MIT license`**. View [license](https://github.com/evanpatchouli/react-winui/blob/main/LICENSE).<br>
Copyright (c) 2021-24 [**evanpatchouli**](https://github.com/evanpatchouli).
