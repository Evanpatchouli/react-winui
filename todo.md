# 阶段 7：组件移植 TODO

状态说明：

- `[x]` 已完成或已明确处理
- `[ ]` 待移植
- 标注“先审计”的项目必须先检查现有组件能力，避免重复公共 API

## P0

- [x] `Tooltip`：阶段 6 已完成，作为后续组件模板
- [x] `Popover` / `Flyout`：已完成
- [x] `Menu`：取消新增重复的公共组件；保留并修复现有 `MenuBar`
- [x] `ContextMenu`：已复用 `MenuBar` surface / item 视觉骨架，并补齐上下文触发、ARIA、键盘、定位与焦点行为
- [x] `Toast`：已新增轻量 Toast / Toaster、FIFO 队列、定时暂停、ARIA、发布入口、docs、consumer 与视觉回归
- [ ] `InfoBar`
- [ ] `ComboBox`：先审计现有 `Select`、`SelectNative` 和 `InputSearchBox` 的能力边界

## P1

- [ ] `NumberBox`
- [ ] `AutoSuggestBox`：先审计现有 `InputSearchBox`
- [ ] `TreeView`
- [ ] `Expander`：先审计现有 `Accordion`
- [ ] `SettingsCard`
- [ ] `SettingsExpander`
- [ ] `CommandBar`：先审计现有 `ButtonGroup` 和 `MenuBar`
- [ ] `NavigationView`：先审计现有 `NavBar` 系列，禁止再实现普通 Web Sidebar

## P2

- [ ] `DatePicker`：先审计现有 date input 样式与 Demo
- [ ] `Calendar`
- [ ] `DataGrid`：先审计现有 `TableView`
- [ ] `TeachingTip`：优先复用 `Popover` / `Flyout` 的定位与焦点能力
- [ ] `Breadcrumb`
- [ ] `Tag`
- [ ] `Badge`：现有 `NavBarLink` 只有内部 badge 能力，需评估独立公共组件 API

## P3

- [ ] `ColorPicker`：已有 `ColorPickerItem` / `ColorPickerPalette`，先审计是否还需要新的聚合公共组件
- [ ] `Rating`
- [ ] `Pagination`
- [ ] 其他组件：仅在明确指定后加入，不提前扩展

## 每个组件的完成清单

- [ ] 由独立子智能体实施，主智能体审核
- [ ] 查阅 WinUI 3 / Windows 11 / WinUI Gallery 的行为和视觉
- [ ] 查阅 Fluent UI React v9 的 API、状态、无障碍、键盘和测试思路
- [ ] 确认与现有组件没有重复；如有重叠，优先兼容式增强
- [ ] 使用 TypeScript，并为公共 Props 编写 JSDoc
- [ ] 只使用现有 `--rwu-*` Design Tokens，不复制 Fluent UI 视觉 recipe
- [ ] 补齐 Vitest / React Testing Library 测试
- [ ] 补齐 Playwright 交互与必要的 light / dark 视觉基线
- [ ] 更新 root export、必要的 package subpath export 和 consumer 验证
- [ ] 更新 docs Demo 与轻量 API 文档
- [ ] 运行 `pnpm lint`
- [ ] 运行 `pnpm typecheck`
- [ ] 运行 `pnpm test`
- [ ] 运行 `pnpm build`
- [ ] 涉及浏览器交互时运行 `pnpm test:browser`
- [ ] 检查发布产物、UTF-8 无 BOM 和 `git diff --check`
- [ ] 每个组件单独 `git add` 并创建独立 commit

## 推荐的下一步顺序

1. `ContextMenu` 去重审计与实现决策
2. `Toast`
3. `InfoBar`
4. `ComboBox`

一次只处理一个组件；完成并提交后再进入下一项。
