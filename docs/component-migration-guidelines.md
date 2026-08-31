# Fluent UI / WinUI 组件借鉴规范

本文档规定 react-winui 新组件如何参考 WinUI 3、Windows 11 和 Fluent UI React v9。

核心目标是：

> 借 Fluent UI 的脑子，不借 Fluent UI 的脸。

## 1. 适用范围

本规范适用于阶段 6 之后新增或迁入的组件，包括 Tooltip、Popover / Flyout、Menu、Toast、InfoBar、ComboBox、DatePicker、Calendar、DataGrid、Breadcrumb、Tag、Badge 等。

旧组件的兼容性修复仍应遵守现有 API 和视觉回归基线；不要借新组件开发之机集中重写旧组件。

## 2. 来源优先级

| 关注内容                         | 首要参考                           | 次要参考                |
| -------------------------------- | ---------------------------------- | ----------------------- |
| Windows 控件应该呈现的行为和语义 | WinUI 3、Windows 11、WinUI Gallery | Fluent UI v9            |
| React API、状态管理和组件组合    | Fluent UI React v9                 | React 官方模式          |
| 无障碍、键盘和焦点处理           | Fluent UI v9、ARIA 规范            | WinUI 交互习惯          |
| 颜色、圆角、阴影、间距和动效     | react-winui Design Tokens          | Windows 11 作为方向参考 |
| 测试边界和异常场景               | Fluent UI v9 测试策略              | WinUI 行为              |

Fluent UI 用于补足行为、架构和可访问性思路；它不能覆盖 react-winui 自己的视觉 token。

## 3. 可以借鉴与禁止复制

### 可以借鉴

- controlled / uncontrolled 状态模型；
- Props 命名和组件组合方式；
- open / close 状态转换、延迟和事件处理；
- portal、定位、viewport fallback 和 overlay 生命周期；
- keyboard navigation、focus management 和 ARIA 关系；
- edge cases、测试分层和组件完成标准。

### 禁止直接复制

- Fluent UI 的颜色、阴影、圆角、字体和 spacing token；
- Griffel 样式、Fluent Web recipe 或 Microsoft 365 默认外观；
- 与 react-winui DOM/className 约定冲突的结构；
- 没有确认许可证和来源的 Fluent UI 实际源码。

如果确实复制或修改了第三方实现代码，必须新增 `THIRD_PARTY_NOTICES.md`，记录来源仓库、原文件、许可证和修改内容。仅参考 API、行为和测试思路时，不需要机械记录概念来源。

## 4. 每个组件开始前的分析清单

实现前先写出以下结论，不需要创建长篇设计文档：

1. 对应的 WinUI 控件和 Windows 11 使用场景；
2. Fluent UI v9 中可参考的 API、状态和交互边界；
3. 组件是否需要 controlled / uncontrolled 两种模式；
4. trigger、focus、keyboard、Escape、outside click 和 viewport 边界；
5. 需要的 ARIA role、属性和 screen reader 关系；
6. 与现有 react-winui token、DOM 和 className 的适配方式；
7. 可能破坏旧 API、主题或视觉基线的风险；
8. 单元测试、交互测试、视觉状态和 docs Demo 的范围。

如果上述问题还不能回答，不进入实现阶段。

## 5. API 设计规则

- 新组件使用现代 React API，不为不存在的旧组件预留 Legacy API；
- 需要受控行为时，同时提供 `open`、`defaultOpen` 和 `onOpenChange`，但只在组件确实需要时添加；
- Props 优先表达语义，不复制 Fluent UI 的视觉或内部实现命名；
- 优先保留原生 HTML 属性和 DOM ref 能力；
- 不为通过 TypeScript 添加 `any`、`@ts-ignore` 或无依据的类型断言；
- 不改变已有组件的 public Props、className 或 DOM 结构，除非兼容性确实要求；
- 复杂组件才拆分 slot、compound component 或 context，不提前建立通用 framework。

## 6. 无障碍和交互规则

每个组件至少确认：

- 正确的语义元素、role 和 accessible name；
- keyboard focus 是否可达且有明确的 focus 状态；
- Enter、Space、Arrow、Escape、Tab 等按键是否符合组件语义；
- open / close 后焦点是否仍然可预测；
- overlay 是否处理 outside click、viewport 边界和 Escape；
- screen reader 是否得到与视觉状态一致的信息；
- disabled、空内容、重复打开、快速进入/离开等边界情况。

Tooltip 的补充规则：

- 默认使用 `aria-describedby` 提供补充信息；
- label 关系只用于确实需要替代 accessible name 的场景；
- 交互式内容不放入 Tooltip，应使用 Popover 或其他可持续交互的组件；
- 关闭后仍需保留可访问的 clipped 内容，除非使用 `inaccessible` relationship。

## 7. 视觉实现规则

- 组件样式必须使用 `--rwu-*` Design Tokens；
- 不把 Fluent UI token 名称或值直接带入 SCSS；
- light / dark 行为通过现有主题变量和 token 继承；
- 组件内部优先使用 CSS token，避免用 React inline style 固定视觉值；
- JavaScript-facing CSS API 可以从独立 `@evanpatchouli/react-winui/theme` 子路径使用引用层，例如 `Shadows.shadow8`，但它只返回 `var(--rwu-*)`，不复制真实值；
- 任何颜色、圆角、阴影、间距和动效变化都必须更新视觉回归基线并说明原因。

## 8. 标准实现流程

1. 确定 WinUI 对应控件和行为边界；
2. 分析 Fluent UI v9 的 API、状态、无障碍和测试思路；
3. 明确本库 API 与 token 映射；
4. 先实现最小可用 DOM 和状态模型；
5. 补齐 keyboard、focus、ARIA 和 edge cases；
6. 使用 react-winui token 编写样式；
7. 添加 unit / React Testing Library 测试；
8. 添加 Playwright 交互测试；
9. 添加 light / dark 和关键状态视觉基线；
10. 添加 docs Demo、类型导出和 consumer 示例；
11. 运行 `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm build`，涉及浏览器时运行 `pnpm test:browser`；
12. 更新 handoff、decisions 和 lessons，然后停止，等待下一个组件任务。

## 9. 测试最低要求

根据组件实际行为选择覆盖范围，但不得只测试默认渲染：

- render / 基本 Props；
- 用户交互和事件回调；
- disabled 或不可交互状态；
- keyboard / focus / ARIA；
- controlled / uncontrolled（如果组件支持）；
- open / close、延迟、outside click 和 Escape（如果组件支持）；
- light / dark 主题；
- Default、Hover、Pressed、Focus、Disabled 等适用的视觉状态。

Visual Regression 更新必须是显式操作，不能让 CI 自动接受新截图。

## 10. 完成标准

一个新组件只有同时满足以下条件才算完成：

- API 和类型已确定并导出；
- WinUI / Fluent UI 借鉴边界已记录；
- 没有未经说明的 Fluent UI 视觉依赖或源码复制；
- accessibility、keyboard 和 edge cases 已测试；
- 样式使用 react-winui token；
- unit、browser、visual regression 和 consumer 检查通过；
- docs Demo 和简短使用说明已完成；
- handoff 已写明后续限制和建议。

## 11. Tooltip 模板

Tooltip 是阶段 6 的首个模板组件，当前约定如下：

- API 支持 `content`、单一 `children` trigger、`open`、`defaultOpen`、`onOpenChange`、`showDelay`、`hideDelay`、`placement`、`relationship`、`withArrow` 和 `disabled`；
- 行为参考 WinUI Tooltip，React 状态、ARIA、定位 fallback 和测试边界参考 Fluent UI v9；
- 背景使用实心 `--rwu-color-surface-flyout`；
- 圆角使用 `--rwu-radius-small`；
- 阴影使用 `--rwu-shadow-8`；
- 未复制 Fluent UI 源码、Griffel 样式或 Fluent token；
- 已覆盖 unit、RTL、Playwright、light / dark 和 consumer 验证。

## 12. Popover / Flyout 模板

Popover / Flyout 是阶段 7 的首个组件组，当前约定如下：

- API 使用必需的 `content` / 单一 `children` trigger，并支持 `open`、`defaultOpen`、`onOpenChange`、`placement`、`withArrow`、`openOnHover`、`trapFocus`、`autoFocus`、`closeOnScroll` 和 `disabled`；
- 行为参考 WinUI Flyout 的 light-dismiss（outside click、Escape）与 Fluent UI v9 Popover 的受控状态、portal、定位和 focus 处理；
- surface 使用现有 `--rwu-color-surface-flyout`、`--rwu-color-border-divider`、`--rwu-radius-flyout` 和 `--rwu-shadow-8`；
- `Flyout` 是同 API 的语义别名，不创建第二套状态或视觉 recipe；
- 未复制 Fluent UI 源码、Griffel 样式或 Fluent token；
- 已覆盖 unit、RTL、controlled/uncontrolled、hover delay、outside click、Escape、focus trap、consumer、docs 和 light / dark visual regression。

后续组件应沿用本规范，但只实现当前组件实际需要的能力，不提前扩展通用抽象。

## 14. Breadcrumb 模板

Breadcrumb 对应 WinUI 的 BreadcrumbBar，是一个持久可见的层级导航组件，而不是导航历史记录或普通返回按钮。

- API 使用 `items` 数据数组；每项支持 `label`、`href`、`icon`、`disabled`、`onClick`、`ariaLabel`、`target` 和 `rel`，最后一项自动作为当前项。
- 根节点使用 `<nav>` + `<ol>`，当前项设置 `aria-current="page"`，分隔符使用 presentation / `aria-hidden`，不进入焦点顺序。
- `maxVisibleItems` 提供确定性的中间项折叠；overflow 菜单复用现有 Popover 的 portal、outside pointer、Escape、Tab focus trap 和 restore focus。未设置上限时使用单行横向滚动，不引入 ResizeObserver。
- 视觉只消费现有 `--rwu-*` token；不复制 Fluent UI / WinUI 源码、Griffel 样式或 Fluent visual token。

## 13. TeachingTip 模板

TeachingTip 复用 Popover 的 portal、定位、箭头、焦点陷阱和 Escape 行为，但通过自己的内容布局表达 Windows 引导提示，而不是引入新的浮层视觉 recipe。

- API 支持单一目标、受控/非受控可见性、标题、副标题、主体内容、icon、hero、action、四侧定位、显式关闭和 `isLightDismiss`。
- 默认显式关闭模式保留 close button，并忽略 outside pointer；`isLightDismiss` 隐藏 close button，仅启用 outside pointer 关闭。
- 目标与浮层通过 `aria-controls`、`aria-expanded`、`aria-haspopup`、`aria-labelledby` 和 `aria-describedby` 连接；action 的 `preventDefault()` 可以保留提示打开。
- 视觉只消费现有 `--rwu-*` token；当前不扩展 WinUI 完整 placement 矩阵、持久化提示队列、轮播内容或非目标根边缘定位。

## 15. Tag 模板

Tag 对应 WinUI / Fluent 的紧凑值标签，用于表达分类、筛选值或其他短内容；它不是导航、按钮组或独立的状态通知组件。

- API 使用 `children` 表达标签内容，支持 `filled`、`outline`、`brand` 三种外观、`rounded` / `circular` 形状、三档尺寸和可选装饰 `icon`。
- 静态 Tag 使用非交互的 `<span>`；`dismissible` Tag 使用原生 `<button>`，点击、Delete 或 Backspace 触发 `onDismiss`，由父级负责从集合中移除标签。
- `disabled` 仅使 dismissible Tag 的原生按钮不可用；静态 Tag 保留内容并通过 `aria-disabled` 表达不可用状态。图标和关闭 glyph 不进入 accessible name，文本仍是主要可访问内容。
- 视觉只消费现有 `--rwu-*` token；未复制 Fluent UI 源码、Griffel 样式或 Fluent visual token。本阶段不扩展 TagGroup、TagPicker、overflow、selection 或独立 interaction action。

## 16. Badge 模板

Badge 对应 WinUI `InfoBadge` 和 Fluent UI 的非交互状态指示器，用于在关联内容附近表达短状态、数量、图标或提醒点；它不是 Tag，也不承担 dismiss、selection 或导航行为。

- API 使用可选 `children` 表达短文本或数字；没有文本和 icon 时渲染 dot，只有 icon 时由消费者提供 `aria-label`。支持 `filled`、`ghost`、`outline`、`tint` 外观、语义颜色、`circular` / `rounded` / `square` 形状、六档尺寸和前后置 icon。
- 根节点使用非交互 `<span>`，默认不进入焦点顺序，不自动添加 `role="status"`；Badge 关联的父组件应负责向辅助技术传达状态，额外上下文可配合 Tooltip。
- 现有 NavBar 内部 `.ui-badge` 保持旧 class 和 DOM；公共 Badge 使用 `data-rwu-component="badge"`，由 NavBar selector 排除，避免公共组件嵌入导航时继承旧定位规则。
- 颜色只通过 react-winui `--rwu-*` token 实现；新增 warning token 作为语义状态桥接，未复制 Fluent UI 源码、Griffel 样式或 Fluent visual token。本阶段不加入可交互 Badge、自动定位或 NavigationView 专属组合 API。
