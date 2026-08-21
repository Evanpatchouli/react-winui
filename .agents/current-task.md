# 当前任务

## 阶段 6：Tooltip（已完成）

- 目标：实现阶段 6 的首个新组件 Tooltip，保持 react-winui 的视觉 DNA，不引入 Fluent UI 依赖或视觉 token。
- 交付：Tooltip 组件、公共类型与子路径导出、Sass 样式、docs Demo、consumer 类型样例、Vitest/RTL 测试、Playwright 交互测试和 light/dark 视觉基线。
- 行为：hover/focus 打开，show/hide delay，controlled/uncontrolled，Escape/click/visibility close，placement fallback，单实例可见和 ARIA relationship。
- 验证：pnpm lint、pnpm typecheck、pnpm test（64 tests）、pnpm test:consumer、pnpm build、pnpm test:browser（36 tests）、pnpm format:check 均通过。
- 遗留：docs production build 仍有既有大 chunk warning；未复制 Fluent UI 源码，因此无需新增 THIRD_PARTY_NOTICES.md。

## 阶段 6 follow-up：Theme CSS token 引用层（已完成）

- 新增独立 `@evanpatchouli/react-winui/theme` 子路径，提供 `Shadows` CSS token 引用对象；真实值仍由 Sass/CSS token 层维护。
- 补充 package exports、类型声明、consumer 运行时/类型导入样例、README 和 design-system 文档。
- 验证：`pnpm lint`、`pnpm typecheck`、`pnpm test`（64 tests）、`pnpm test:consumer`、`pnpm build`、`pnpm test:browser`（36 tests）、`pnpm format:check` 均通过。
- 遗留：docs production build 仍有既有大 chunk warning。

## 阶段 6 follow-up：组件借鉴规范整理（已完成）

- 新增 `docs/component-migration-guidelines.md`，集中阶段 6 的来源优先级、借鉴边界、API、无障碍、视觉、测试和完成标准。
- README 与 `docs/design-system.md` 已增加文档入口；Tooltip 作为首个模板记录在规范末尾。

## 下一步

阶段 6 已完成，等待用户指定阶段 7 或其他组件任务，不自动进入下一阶段。
