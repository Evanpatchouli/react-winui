# 当前任务

## 状态

已完成：阶段 4「抽取 react-windows-ui Design Tokens」。

## 本阶段交付

- 新增 `src/lib/scss/themes/tokens.scss`，建立 `--rwu-*` 语义 token 层。
- token 通过现有 `--color-*` 变量解析，保留 light/dark、`--PrimaryColor` / `--PrimaryColorLight` 和旧变量覆盖行为。
- 全部组件与浏览器 SCSS 消费端完成替换，未修改组件 DOM、Props、className 或视觉数值。
- 新增 `docs/design-system.md`，并在 README 增加入口。
- 更新 `src/lib/dist/react-windows-ui.min.css` 发布样式产物。

## 验证

`pnpm lint`、`pnpm typecheck`、`pnpm test`（55 tests）、`pnpm build` 和 `pnpm --filter react-windows-ui build:styles` 均通过；组件/浏览器 SCSS 的旧变量消费端为 0；完整 build 仍保留既有 docs 大 chunk warning。

## 下一步

等待用户指定阶段 5 或下一批 token/视觉回归工作，不自动进入下一阶段。
