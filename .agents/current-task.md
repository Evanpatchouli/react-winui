# 当前任务

## 状态

已完成：阶段 5「建立测试与视觉回归基线」及其全库视觉保护扩展、React warning 清理。

## 本阶段交付

- 保留并复核现有 Vitest + React Testing Library 测试体系，修正 Vitest 不应加载 Playwright spec 的目录边界；现有单元/交互测试共 55 个。
- 新增 Playwright Test 运行配置，统一 Chromium、Vite fixture、截图目录、失败产物、HTML 报告和 CI 重试策略。
- 新增 `tests/browser` 独立 Vite fixture，挂载全部 31 个公共视觉组件/复合组件，使用真实 Sass 和稳定的交互状态，不修改正式组件 DOM、Props 或视觉样式。
- 扩展为 33 个 Playwright 用例与 34 张受版本控制的截图基线，覆盖全库 light/dark 面板，以及 Button hover/pressed/focus/disabled、Accordion、Select、Alert/Dialog、搜索建议、SplashScreen、MenuBar、NavBar 桌面/移动端、TableView 排序等高风险状态。
- 新增 CI workflow，执行 install、lint、typecheck、Vitest、consumer build、production build 和 Playwright visual regression。
- 更新 README，记录浏览器测试与显式快照更新命令；Playwright 临时报告和失败产物统一放在 `output/playwright` 并忽略。

## 验证

- `pnpm format:check` 通过。
- `pnpm lint` 通过。
- `pnpm typecheck` 通过。
- `pnpm test` 通过：2 files / 55 tests。
- `pnpm test:consumer` 通过：library build、consumer typecheck、consumer build。
- `pnpm build` 通过：library ESM 与 docs production build。
- `pnpm test:browser` 通过：33 tests，34 张截图基线未更新模式通过。

## 遗留问题

- docs production build 仍有既有大 chunk warning，本阶段未改变 docs 分包策略。
- 截图基线当前由 Chromium Windows 项目生成，CI 使用 `windows-latest` 保持运行环境方向一致；若未来增加其他平台，需要分别维护平台基线。

## 本次 follow-up

- 移除公共源码中全部静态 `defaultProps`，将默认值迁移到参数默认值/内部 fallback；保留旧 Props、DOM、className 与视觉行为。
- 为 `ColorPickerPalette` 增加默认 noop change handler，避免受控 color input 在 fixture 中产生 React read-only warning。
- Playwright `beforeEach` 新增 console regression 断言，若再次出现 `Support for defaultProps` warning，浏览器测试将失败。
- MemoryRouter 使用 React Router future flags，避免 fixture 自身升级提示污染浏览器日志。

## Follow-up 验证

- `pnpm format:check`、`pnpm lint`、`pnpm typecheck`、`pnpm test`（55 tests）通过。
- `pnpm test:browser`（33 tests）通过，未捕获 `defaultProps` 或 page runtime error。
- `pnpm build` 与 `pnpm test:consumer` 通过。
- 视觉基线目录共 34 张 PNG；Playwright 使用 2 workers、60 秒测试上限，避免 Windows CI 在全量 fixture 下发生 teardown 资源竞争。

## 下一步

等待用户指定阶段 6 或其他测试/组件任务，不自动进入下一阶段。
