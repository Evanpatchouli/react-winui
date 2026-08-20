# 技术经验

- Vite 8/Rolldown 默认按文件扩展名解析 JSX，历史 `.js` + JSX 源码需要在构建解析层映射为虚拟 `.jsx`，无需批量重命名源码。
- Vite 8 dev dependency scan 不能理解上述虚拟文件时，应使用 `optimizeDeps.noDiscovery` 配合显式依赖列表。
- Dart Sass 可以直接替换 node-sass 编译当前 SCSS；本次 CSS 选择器、变量数量保持一致，未改动视觉规则。

- pnpm workspace 的 peerDependencies 会在 lockfile importer 中按实际 peer 解析；组件包仍应声明自己的构建 devDependencies，避免脱离根项目时依赖隐式 hoist。
- consumer 的根 tsconfig `paths` 会遮蔽 package exports；验证发布结构时应在 consumer 侧清空该路径映射。
- `pnpm pack --dry-run` 可以直接确认 `files`、`.npmignore` 和 package exports 所需资产是否进入 tarball，而不需要真实发布。
