# 阶段 1 handoff

- 已完成 CRA 到 Vite 8 的 Demo/docs 迁移，入口位于 `apps/docs`。
- 已建立 pnpm workspace；组件包暂保留在 `src/lib`，避免一次性移动历史源码。
- 组件包构建产出 ESM、逐模块文件、现有 `.d.ts` 和压缩 Sass CSS。
- 已移除根项目的 `react-scripts`、Babel 构建链、`node-sass` 和 npm lockfile。
- 已验证 `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm compile:sass`。
- Sass 仍会报告旧 SCSS `@import` 的 Dart Sass deprecation warning；本阶段未改写样式组织，避免视觉变化。
- 已删除旧的 `src/cra-template` 独立 CRA 模板包，并清理 README、开发脚本、Demo 文档及工具配置中的相关引用。
- 删除模板后的 `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build` 均已复核通过。

阶段 1 的后续工作已由本次阶段 2 handoff 覆盖。

# 阶段 2 handoff

- 组件包 `react-windows-ui` 的 `react`、`react-dom` peer 版本已收紧为 `>=18`，`react-router-dom` 为 `>=6`；三者不再作为 runtime dependencies 安装。
- 组件包新增独立构建所需的 devDependencies，保留 ESM、`main`、`module` 和 `types` 字段。
- `exports` 新增 `react-windows-ui/button` 和 canonical `react-windows-ui/styles.css`，现有 `dist/react-windows-ui.min.css`、`config/app-config.css`、icons 路径继续兼容。
- `sideEffects` 仅声明 CSS glob；`files` 与 `.npmignore` 共同限制发布内容，`pnpm pack --dry-run` 未包含源码、SCSS、tests、docs 或开发配置。
- 组件包补入 MIT `LICENSE`，pack dry-run 已确认许可证进入 tarball。
- 新增 `examples/test-app` workspace consumer，覆盖 root ESM import、Button subpath、类型声明和 CSS assets。
- 已验证 React 18 consumer，以及临时 React 19.2.8 consumer 的 `tsc` 和 Vite production build。
- 已验证 `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm test:consumer` 与 package pack dry-run。
- Sass 仍会报告旧 SCSS `@import` 的 Dart Sass deprecation warning；没有为了本阶段改动视觉样式组织。

下一阶段可继续逐个组件做 TypeScript 渐进迁移；不要在本阶段 handoff 中顺带修改组件视觉或公共 API。
