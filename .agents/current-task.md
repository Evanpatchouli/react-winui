# 当前任务

## 2026-08-28：阶段 7 P2 Calendar

目标：在 DatePicker 完成后新增独立常驻 `Calendar`，完成 root/subpath exports、Sass、TypeScript 声明、consumer、RTL、Playwright 交互/Light-Dark 视觉回归、docs Demo 与阶段交接记录。

约束：本批只实现 `Calendar` 一个组件；不重构 DatePicker，不复制 Fluent UI/WinUI 源码，不引入 Fluent 视觉 token；日历表面和状态使用现有 `--rwu-*` token。

当前状态：Calendar 已完成实现、导出、token 样式、consumer、RTL、docs Demo、单元测试与 Playwright Light/Dark 视觉回归；当前任务已完成，等待下一项任务。

预定 API：`value` / `defaultValue`、`onValueChange`、`pickerDate` / `defaultPickerDate`、`onPickerDateChange`、`minDate` / `maxDate`、`restrictedDates`、`today`、`firstDayOfWeek`、`showTodayButton`、`label`、`calendarAriaLabel`、`disabled`、`rootClassName` 与原生 div 属性。

已知边界：本批只支持单日期、固定六周网格和月份导航；不实现多选/范围选择、月份/年份选择器、周数显示、popup、文本输入、时区转换和异步日期数据源。

---

当前无其他进行中的实现任务。

验证摘要：`pnpm lint`、`pnpm typecheck`、`pnpm test`（18 files / 189 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、Calendar 定向 Playwright（4/4）与完整 Playwright（114/114）均已通过。Calendar 相关新增/修改文件已通过定向 Prettier 检查；`pnpm format:check` 仍被仓库既有 P1 文件与 `tests/browser/visual.spec.js` 的格式差异阻塞。

最近完成：修复 `Switch` 设置 `disabled={true}` 后未灰化的问题。

- 保持原有 Props、DOM 结构和交互 API；禁用态使用普通箭头光标，排除 hover/pressed 反馈并灰化 Switch 与标签。
- 新增单元和 Light/Dark 浏览器回归；验证通过 lint、typecheck、175 个单测、production build 和 105 个 Playwright 用例。
- 为解决 CI Windows Chromium 在 110x21 小截图中文字裁剪上的固定像素差异，Switch 专属 Light/Dark 基线改为只捕获控件本体；聚合 `controls-light/dark` 基线继续覆盖禁用标签视觉，未放宽全局差异阈值。

最近完成：按用户提供的 Windows 11 浮层参考图，统一 P0/P1 浮层组件的阴影质感，并完成 ComboBox / NumberBox 箭头、NavigationView 整行 hover、SettingsCard 阴影与 AutoSuggestBox（含聚焦 + Hover、文本/箭头 cursor、focus underline、动作按钮 Hover feedback）视觉微调。

范围：`Tooltip`、`Popover`、`Flyout`、`ContextMenu`，以及使用相同浮层表面的 `CommandBar` 溢出菜单、`ComboBox` / `AutoSuggestBox` 列表和 `Toast`；不重做旧 `MenuBar`、`Select` 的既有阴影。

已完成：新增独立 `--rwu-shadow-overlay` / `--rwu-shadow-overlay-nested` / `--rwu-shadow-card` token，迁移目标浮层，修正视觉 fixture 的图标加载，并让浮层截图保留边缘阴影。

结果：设计 token 文档、箭头/整行 hover 回归断言、AutoSuggestBox 聚焦 + Hover/cursor/focus underline 回归、完整检查、临时产物清理和决策记录均已完成。

---

## 既有阶段状态

当前无进行中的阶段性组件实现任务。

阶段 7 P1 已完成：`NumberBox`、`AutoSuggestBox`、`TreeView`、`Expander`、`SettingsCard`、`SettingsExpander`、`CommandBar`、`NavigationView` 均已由独立子智能体实施、审核、提交并合入主线。

归档记录：`.agents/archive/2026-08-24-phase7-p1.md`。

下一步：`Calendar` 已完成；P2 下一项为 `DataGrid`，按阶段 7 的单组件节奏等待下一次任务指示。

---

# 2026-08-26：ComboBox / NumberBox 箭头复用 Select

- `ComboBox` 与 `NumberBox` 改为复用 `src/lib/scss/components/_base/_select-chevron.scss` 中的 Select SVG 箭头资源，统一 14px 画布、描边几何和 Light/Dark 主题资源。
- ComboBox 收起态使用下箭头，展开态旋转 180°；NumberBox 的 Increment / Decrement 分别使用旋转后的上箭头和默认下箭头；未修改 DOM、Props 或交互 API。
- 浏览器断言改为比较 Select、ComboBox、NumberBox 的实际背景箭头资源与尺寸；Light/Dark NumberBox 快照无需更新。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、完整 `pnpm test:browser`（103/103）。docs build 仍仅有既有大 chunk warning。
- 当前任务已完成，等待用户下一项具体视觉校正。

---

# 2026-08-26：文档导航图标语义校正

- 将 `NumberBox` 的 `icons10-calculator` 替换为已有的 `icons10-unfold`，使用上下双 chevron 直接表达增减方向。
- 将 `Popover / Flyout`、`Tooltip`、`Toast` 分别改为 `icons10-chat`、`icons10-info`、`icons10-bell`，消除三个浮层条目共用通知气泡的问题。
- 候选字形已在文档站实际渲染核对；四个字形均已存在于内置 WinUI 图标字体，因此未引入 Google Font 外部依赖或新增图标资产。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、完整 `pnpm test:browser`（104/104）。docs build 仍仅有既有大 chunk warning。
- 当前任务已完成，等待用户下一项具体视觉校正。

---

# 2026-08-26：InfoBar / SettingsExpander 阴影统一

- `InfoBar` 和 `SettingsExpander` 根容器的阴影从 `--rwu-shadow-2` 切换为与 `SettingsCard` 一致的 `--rwu-shadow-card`；不改变圆角、边框、布局或交互。
- 新增跨组件 Light/Dark computed shadow 回归，确认 SettingsCard、InfoBar、SettingsExpander 实际阴影始终一致；现有视觉快照经显式更新流程确认无需替换。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、完整 `pnpm test:browser`（104/104）。docs build 仍仅有既有大 chunk warning。
- 当前任务已完成，等待用户下一项具体视觉校正。

---

# 2026-08-26：Toast 多条通知窗口式叠放

- `Toaster` 从纵向 `flex + gap` 调整为同一网格层叠，默认 bottom-end 下旧 Toast 向左上方错开 8px，最新 Toast 保持右下前景；其他四个位置按锚点方向镜像处理。
- 保留 FIFO 队列、`maxVisible`、Dismiss/Escape、悬停暂停计时和 Light/Dark 阴影；未修改 Toast / Toaster 公共 Props 或生命周期语义。
- 新增层级与 bounding-box 回归，Toast 浅色/深色视觉快照按 32px 外扩留白更新，确保错位边缘和阴影完整入图。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、完整 `pnpm test:browser`（104/104）。docs build 仍仅有既有大 chunk warning。
- 当前任务已完成，等待用户下一项具体视觉校正。
