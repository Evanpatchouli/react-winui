# 阶段 6：Tooltip

- 完成 Tooltip 首个新组件，保持 react-winui 视觉 DNA，不引入 Fluent UI 依赖或视觉 token。
- 支持 hover/focus、show/hide delay、controlled/uncontrolled、Escape/click/visibility close、placement fallback、ARIA relationship、arrow 和 disabled。
- 新增组件源码、声明、Sass、root/subpath exports、docs Demo、consumer 类型检查、Vitest/RTL 测试和 Playwright 交互/视觉基线。
- 未复制 Fluent UI 源码，因此不需要 `THIRD_PARTY_NOTICES.md`。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（64 tests）、`pnpm test:consumer`、`pnpm build`、`pnpm test:browser`（36 tests）、`pnpm format:check`。
- 遗留：docs production build 仍有既有大 chunk warning；下一阶段等待用户指定。
