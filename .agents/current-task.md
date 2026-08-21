# 当前任务

## 阶段 6：Tooltip（已完成）

- 目标：实现阶段 6 的首个新组件 Tooltip，保持 react-winui 的视觉 DNA，不引入 Fluent UI 依赖或视觉 token。
- 交付：Tooltip 组件、公共类型与子路径导出、Sass 样式、docs Demo、consumer 类型样例、Vitest/RTL 测试、Playwright 交互测试和 light/dark 视觉基线。
- 行为：hover/focus 打开，show/hide delay，controlled/uncontrolled，Escape/click/visibility close，placement fallback，单实例可见和 ARIA relationship。
- 验证：pnpm lint、pnpm typecheck、pnpm test（64 tests）、pnpm test:consumer、pnpm build、pnpm test:browser（36 tests）、pnpm format:check 均通过。
- 遗留：docs production build 仍有既有大 chunk warning；未复制 Fluent UI 源码，因此无需新增 THIRD_PARTY_NOTICES.md。

## 下一步

阶段 6 已完成，等待用户指定阶段 7 或其他组件任务，不自动进入下一阶段。
