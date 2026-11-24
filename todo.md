# 阶段 7：组件移植 TODO

状态说明：

- `[x]` 已完成或已明确处理
- `[ ]` 待移植
- 标注“先审计”的项目必须先检查现有组件能力，避免重复公共 API

当前发布版本：`1.2.0`（v1.2.0 文档已接入）

## P0

- [x] `Tooltip`：阶段 6 已完成，作为后续组件模板
- [x] `Popover` / `Flyout`：已完成
- [x] `Menu`：取消新增重复的公共组件；保留并修复现有 `MenuBar`
- [x] `ContextMenu`：已复用 `MenuBar` surface / item 视觉骨架，并补齐上下文触发、ARIA、键盘、定位与焦点行为
- [x] `Toast`：已新增轻量 Toast / Toaster、FIFO 队列、定时暂停、ARIA、发布入口、docs、consumer 与视觉回归
- [x] `InfoBar`：已新增内联状态通知、四级 severity、受控/非受控关闭、ARIA live region、发布入口、docs、consumer 与视觉回归
- [x] `ComboBox`：已新增单选与可编辑模式、受控状态、ARIA、键盘/typeahead、viewport 定位、发布入口、docs、consumer 与视觉回归

## P1

- [x] `NumberBox`
- [x] `AutoSuggestBox`：已审计现有 `InputSearchBox`，新增独立能力
- [x] `TreeView`
- [x] `Expander`：已审计现有 `Accordion`，保留旧组件并新增独立能力
- [x] `SettingsCard`
- [x] `SettingsExpander`
- [x] `CommandBar`：已审计现有 `ButtonGroup` 和 `MenuBar`，新增独立能力
- [x] `NavigationView`：已审计现有 `NavBar` 系列，新增 WinUI pane 导航而非普通 Web Sidebar

## P2

- [x] `DatePicker`：先审计现有 date input 样式与 Demo
- [x] `Calendar`
- [x] `DataGrid`：先审计现有 `TableView`
- [x] `TeachingTip`：优先复用 `Popover` / `Flyout` 的定位与焦点能力；截图尺寸基线已同步
- [x] `Breadcrumb`：使用 `items` 路径模型并复用 `Popover` 实现确定性 overflow
- [x] `Tag`：新增 standalone static / dismissible Tag，支持键盘移除、ARIA、light/dark 与独立入口
- [x] `Badge`：已新增独立公共 Badge，支持 dot / icon / text-numeric、语义颜色、appearance、shape、size、root/subpath exports、测试、docs 与 Light/Dark 视觉回归；保留并隔离现有 NavBar 内部 badge

## P3

- [x] `ColorPicker`：复用现有色块与原生调色盘，统一预设色与自定义色的选择状态，支持受控值和键盘操作
- [x] `Rating`：支持交互评分、悬停预览、键盘选择与只读平均分
- [x] `Pagination`：支持受控和非受控页码、大页数省略、键盘翻页与边界禁用
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
- [ ] 按[组件文档页编写规范](docs/component-documentation.md)更新 docs Demo 与轻量 API 文档
- [ ] 运行 `pnpm lint`
- [ ] 运行 `pnpm typecheck`
- [ ] 运行 `pnpm test`
- [ ] 运行 `pnpm build`
- [ ] 涉及浏览器交互时运行 `pnpm test:browser`
- [ ] 检查发布产物、UTF-8 无 BOM 和 `git diff --check`
- [ ] 每个组件单独 `git add` 并创建独立 commit

## 推荐的下一步顺序

1. P1 八个组件与 P2 DatePicker、Calendar、DataGrid、TeachingTip、Breadcrumb、Tag、Badge 已完成并归档
2. P3 三个具名组件均已完成，其他组件等待明确指定

一次只处理一个组件；完成并提交后再进入下一项。
