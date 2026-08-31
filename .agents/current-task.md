# 当前任务

## 2026-08-31：阶段 7 P2 Tag

目标：新增一个保持 react-winui Windows 风格的 `Tag`，完成 standalone static / dismissible API、键盘移除、无障碍语义、root/subpath exports、Sass、consumer、RTL、Playwright 交互与 Light/Dark 视觉回归、docs Demo 和阶段交接记录。

当前状态：`Tag` 已实现并完成交付验证；本批没有复制 Fluent UI / WinUI 源码，也没有引入 Fluent visual token。静态 Tag 使用非交互 `<span>`，dismissible Tag 使用原生 `<button>`，`onDismiss` 只报告请求，由父组件管理集合移除。

预定边界：支持 `filled` / `outline` / `brand` 外观、`rounded` / `circular` 形状、三档尺寸、装饰 icon、disabled、click/Delete/Backspace dismissal、原生属性和 forwarded ref；不加入 TagGroup、TagPicker、overflow、selection state、secondary text 或独立 interaction action。

验证摘要：`pnpm lint`、`pnpm typecheck`、`pnpm test`（22 files / 212 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、Tag 专项格式检查、`git diff --check`、UTF-8 无 BOM 检查和 Tag Playwright 2/2 均通过；视觉状态覆盖 light/dark、hover、pressed 和 focus。完整 Playwright 127/129 通过，剩余 2 项为既有 TeachingTip Light/Dark 截图尺寸基线不匹配，未将无关基线更新混入本批。docs build 仅保留既有大 chunk warning。

---

## 2026-08-31：阶段 7 P2 Breadcrumb

目标：新增一个保持 react-winui Windows 风格的 `Breadcrumb`，完成路径模型、overflow、无障碍语义、root/subpath exports、Sass、consumer、RTL、Playwright 交互与 Light/Dark 视觉回归、docs Demo 和阶段交接记录。

当前状态：`Breadcrumb` 已实现并完成交付验证；本批没有复制 Fluent UI / WinUI 源码，也没有引入 Fluent visual token。组件使用 `items` 数据模型，最后一项固定为当前页面；`maxVisibleItems` 提供确定性中间路径折叠，并复用现有 `Popover` 处理菜单、outside pointer、Escape 和焦点恢复。

预定边界：支持原生链接、无 href 的按钮项、disabled 项、图标、分隔符、自定义 accessible name、原生 nav 属性和 forwarded ref；不加入 ResizeObserver 自动测量、路由历史推导、文件路径专用模式或完整 Fluent compound component API。未设置上限时保持单行并允许横向滚动。

验证摘要：`pnpm lint`、`pnpm typecheck`、`pnpm test`（21 files / 209 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、Breadcrumb 专项格式检查、Breadcrumb Playwright 4/4 均通过；全量 Playwright 125/127 通过，剩余 2 项为既有 TeachingTip Light/Dark 截图尺寸基线不匹配，未将无关基线更新混入本批。docs build 仅保留既有大 chunk warning。

---

## 2026-08-28：阶段 7 P2 TeachingTip

目标：新增一个面向功能发现与上下文指导的 Windows 风格 `TeachingTip`，完成 Popover 复用、TypeScript 公共类型、root/subpath exports、Sass、consumer、RTL、Playwright 交互与 Light/Dark 视觉回归、docs Demo 和阶段交接记录。

当前状态：TeachingTip 已实现并完成交付验证；本批没有复制 Fluent UI / WinUI 源码，也没有引入 Fluent visual token。

预定边界：支持单一目标元素、受控/非受控 open、title/subtitle/content、icon、top/bottom hero、action、四侧 placement、显式 close、`isLightDismiss`、ARIA 关系、focus trap、Escape 和 focus restore；不扩展 WinUI 完整 placement 矩阵、非目标根边缘定位、持久化提示队列或 carousel。

实现要点：TeachingTip 复用 Popover 的 portal、定位、箭头、outside pointer 基础和键盘处理；Popover 增加保持默认行为不变的 additive `closeOnOutsideClick` 开关，以区分显式关闭与 light-dismiss。为适配真实浏览器 controlled click 的焦点时序，显式模式在浮层挂载后聚焦 close button。

验证摘要：`pnpm lint`、`pnpm typecheck`、`pnpm test`（20 files / 204 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、`pnpm format:check`、TeachingTip 专项格式检查、`git diff --check`、UTF-8 无 BOM 检查和完整 Playwright（123/123）均通过；TeachingTip 定向 4/4，焦点场景重复 20/20。docs build 仅保留既有大 chunk warning。

---

## 2026-08-28：DataGrid/Checkbox 共享 SelectionControl 重构

目标：在已提交的 DataGrid 基础上抽取内部共享 `SelectionControl`，让 `Checkbox` 与 DataGrid 复用 checkbox/radio/indeterminate 的输入状态和视觉基础，同时保持现有 `Checkbox` 公共 API、DOM 语义与 DataGrid 行为兼容。

约束：这是 DataGrid 交付后的架构修正，不新增公开 `SelectionControl` 导出；不修改 Checkbox 的现有调用方式，不把任意 input type 扩展成 Checkbox 公共能力，不引入 Fluent 视觉 token；完成后必须复验 Checkbox、DataGrid、consumer、Light/Dark 浏览器回归和完整质量检查。

当前状态：已提交 DataGrid 基线（`6031edd`），共享 `SelectionControl` 已实现并完成交付验证。

预定边界：`SelectionControl` 仅作为内部低层 input primitive，支持 `checkbox` / `radio`、controlled/uncontrolled checked、`indeterminate`、原生 input 属性、forwarded ref 与 change 事件；Checkbox 继续负责 label wrapper 和 legacy props，DataGrid 继续负责表格选择模型、行标签与批量选择逻辑。

验证摘要：`pnpm lint`、`pnpm typecheck`、`pnpm test`（19 files / 199 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、定向格式检查、DataGrid/Control 定向 Playwright 与完整 Playwright（119/119）均通过；只保留既有 docs 大 chunk warning。

---

## 2026-08-28：阶段 7 P2 DataGrid

目标：在 Calendar 完成后新增独立 `DataGrid`，完成 root/subpath exports、Sass、TypeScript 声明、consumer、RTL、Playwright 交互/Light-Dark 视觉回归、docs Demo 与阶段交接记录。

约束：本批只实现 `DataGrid` 一个组件；不重构既有 `TableView`，不复制 Fluent UI/WinUI 源码，不引入 Fluent 视觉 token；表格表面、排序、选择和焦点状态使用现有 `--rwu-*` token。

当前状态：DataGrid 已实现并完成交付验证。

预定 API：`items`、`columns`、`getRowId`、`sortState` / `defaultSortState`、`onSortChange`、`selectionMode`、`selectedRowIds` / `defaultSelectedRowIds`、`onSelectionChange`、`getRowDisabled`、`noRowsMessage`、`label`、`gridAriaLabel`、`density`、`disabled`、`rootClassName` 与原生 div 属性。

已知边界：本批支持本地数组、列级 cell/renderCell、客户端排序、单/多行选择和固定 DOM 的键盘 grid；不实现编辑、列拖拽/缩放、虚拟化、分组、分页、行详情、异步数据源和服务端排序适配层。

---

当前无其他进行中的实现任务；阶段 7 P2 下一项为 `TeachingTip`。

验证摘要：DataGrid 单元测试 9/9；全量 `pnpm test`（19 files / 198 tests）；`pnpm lint`、`pnpm typecheck`、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、`pnpm format:check:data-grid` 均通过；定向 Playwright 5/5，完整 Playwright 119/119。docs build 仍保留仓库既有大 chunk warning，根 `pnpm format:check` 仍被历史 P1 文件与 `tests/browser/visual.spec.js` 的格式差异阻塞。

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
