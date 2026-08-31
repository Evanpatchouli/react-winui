# 架构决策

## 2026-08-20：渐进式 workspace 迁移

- workspace 包暂使用现有 `src/lib`，Demo 使用新建的 `apps/docs`，不强制搬迁历史 Demo 和组件源码。
- 组件构建使用 Vite 8 library mode + `preserveModules`，输出 ESM，外置 React/React DOM/React Router。
- 声明文件在 TypeScript 全量迁移前沿用现有 public `.d.ts` 并随构建复制到 `dist`。
- CSS 由 Sass JS API 单独编译到既有 `dist/react-winui.min.css`，保持原 Demo 和消费者路径。

## 2026-08-20：移除 CRA 模板

- `src/cra-template` 不属于 pnpm workspace，也不再参与 Vite Demo 或组件包构建。
- 项目不再维护 `cra-template-windows-ui`，因此删除模板目录并将文档示例统一为 Vite + pnpm。

## 2026-08-20：组件包发布边界

- 组件包继续保留在 `src/lib`，通过 `exports` 暴露 root ESM、`button` 直达入口和 CSS 资源；不把 `src`、`scss`、tests 或开发配置发布到 npm。
- React 与 React DOM 由消费者提供，最低 peer 版本为 18；`react-router-dom` 因 `Link` 组件在运行时直接依赖它，作为 `>=6` peer 保留。
- `styles.css` 是新的 canonical CSS specifier，原有 `dist/react-winui.min.css` 路径继续保留，避免已有应用出现发布路径 breaking change。
- `examples/test-app` 使用空 `paths` 覆盖根 tsconfig 的源码别名，确保 consumer 类型检查通过真实 package exports，而不是仓库内部源码路径。

## 2026-08-20：阶段 3 首批渐进 TypeScript 迁移

- 首批选择 `Button`、`InputText`、`Checkbox`、`RadioButton`、`Switch`，它们是基础表单/交互控件，适合先建立 Props、ref 和测试模式。
- 保留当前源文件旁的 public `.d.ts` 作为过渡发布声明；TypeScript 实现先由根 `tsconfig` 直接检查，避免一次性改造所有 JS 组件的声明构建链。
- 组件 Props 通过 `Omit<React.*HTMLAttributes<...>>` 扩展，保留旧自定义 Props；`Button.value` 标记 deprecated 但不删除，并支持 children。
- 不为类型化重排 DOM 或修改 SCSS；类型兼容所需的少量断言仅保留 legacy DOM 属性/clear-button 事件的原有运行时形状。

## 2026-08-20：阶段 3 第二批控件迁移

- 第二批选择 `ProgressBar`、`TextArea`、`SliderBar`，覆盖展示状态、原生多行输入和 range 交互，同时保持组件之间低耦合。
- 继续使用 React 原生 HTML 属性类型作为基础；历史 `rows`/`cols`/range 数值字符串用法保留为 `string | number`，避免类型迁移产生无关 breaking change。
- 对原实现中的非标准 `textarea onResize` 和 `p[value]` DOM 属性保留运行时输出；只在 TypeScript 边界使用对象 spread 或局部类型处理，不改成新的 DOM 结构。

## 2026-08-20：阶段 3 第三批低耦合组件迁移

- 第三批选择 `Link`、`LoaderBar`、`LoaderBusy`，优先覆盖路由包装器和加载指示器，不把复杂导航、菜单或表格组件与本批次混合迁移。
- `LinkProps` 复用 React Router `LinkProps` 的 `to`、导航状态与锚点属性类型，避免继续维护过窄的 `to?: string` 声明；实现仍保持旧 `className`/`style` spread 顺序。
- `LoaderBusyProps` 允许原生 `HTMLAttributes<HTMLDivElement>`，因为旧实现会将其余属性透传至根 `div`；`LoaderBar` 不扩展原生属性，因为旧实现没有透传行为。
- 三个组件继续保留源文件旁的手写 public `.d.ts`，并通过 Vite preserve-modules 构建复制到 `dist`；未引入新的运行时依赖或样式改动。

## 2026-08-20：阶段 3 第四批容器与启动视图迁移

- 第四批选择 `AppContainer`、`ButtonGroup`、`SplashScreen`，它们的 DOM 和状态边界清晰，适合在进入 Alert、Dialog、菜单和导航等复杂组件前继续验证迁移模式。
- `ButtonGroup` 的 public ref 声明从历史 `any` 改为 `RefAttributes<HTMLDivElement>`，与运行时已有的 `forwardRef` 对齐；其余原生 div 属性通过 `HTMLAttributes<HTMLDivElement>` 保留。
- `SplashScreen` 的可渲染内容由历史 `any` 收紧为 `ReactNode`，并将运行时已经支持但声明遗漏的 `logo` 纳入 Props；未改变内容渲染顺序或定时逻辑。
- `AppContainer` 只声明实际使用的 `style`/`children`，不虚假扩展未透传的原生属性；主题初始化仍依赖既有 `Appearance` API。

## 2026-08-20：阶段 3 第五批 ColorPicker 迁移

- 第五批选择 `ColorPickerItem` 与 `ColorPickerPalette`，两者共享 swatch 的 DOM/视觉结构，且一个是固定 radio 输入、一个是带内部状态的原生 color 输入。
- `ColorPickerItem` 只声明实际透传到 radio 的属性，避免把未透传的 HTML 属性错误承诺为 public API；handler 使用 `ChangeEventHandler<HTMLInputElement>` 替代历史 `Function`。
- `ColorPickerPalette` 复用原生 `InputHTMLAttributes<HTMLInputElement>`，排除组件内部控制的 `type`、`value`、`onChange` 与 `onChangeCapture`，保留其余 rest props 透传行为。
- 颜色尺寸使用 `CSSProperties` 的 width/height 类型，颜色值使用字符串；未改动 `#eee` 默认值、内部状态更新或 SCSS。

## 2026-08-20：阶段 3 第六批原生表单包装迁移

- 第六批选择 `SelectNative` 与 `InputSearchBar`，两者均包装原生表单控件，Props 可以直接复用 React HTML 属性类型，且不涉及自定义菜单的复杂状态机。
- `SelectNative` 将历史 `data: string[]` 声明纠正为 `SelectNativeOption[]`，因为运行时实际读取每项的 `value` 和 `label`；`data` 保持可选以匹配既有默认空数组行为。
- `InputSearchBar` 排除原生 `onSubmit`、`type`、`style` 后重新定义搜索提交回调，避免把接收 `FormEvent` 的 DOM 属性与接收输入 value 的组件 API 混在一起。
- 两个组件继续保留 rest props 的原有 spread 顺序、默认值、DOM ref 与 class 覆盖行为，未修改视觉 CSS。

## 2026-08-20：阶段 3 第七批 ImageView 迁移

- 第七批先选择 `ImageView`，因为其唯一状态是图片是否已触发 load/error，能在进入 Dialog、菜单、导航和表格前独立完成类型与测试闭环。
- `ImageViewProps` 基于 `ImgHTMLAttributes<HTMLImageElement>`，排除组件内部控制的 `alt`、`src`、尺寸和 load/error 事件，再声明 wrapper 样式与自定义回调，避免继续暴露历史 `Function` 和过宽的 `ReactNode` 图片源。
- 保留原有 `defaultProps`、wrapper/image/loader DOM、`isLoading` 与 `didLoad` 两路 loader 渲染，以及回调不接收事件参数的运行时行为；未修改视觉 CSS。

## 2026-08-20：阶段 3 第八批 AppTheme 迁移

- 第八批选择 `AppTheme`，其无可见 DOM、仅包含主题/颜色副作用，能够在进入弹窗、菜单、导航和表格前独立完成类型与测试闭环。
- `AppThemeProps` 将历史颜色 `any` 收紧为 `string`，并导出 `AppThemeScheme`；主题回调继续保持可选并保留默认空函数。
- 保留 `React.memo` comparator 的现有行为：scheme 变化时应用 `Appearance` 并触发回调，color 变化时更新 `--PrimaryColor`/`--PrimaryColorLight` 并触发回调；类型化没有重构副作用时序。

## 2026-08-20：阶段 3 第九批 Alert 迁移

- 第九批选择 `Alert`，其交互集中在 imperative open/close、遮罩点击和滚动锁定，适合在迁移 Dialog、菜单、导航前建立 forwarded ref 与 compound component 的类型模式。
- `Alert` 使用 `AlertHandle` 表示 forwarded ref，只暴露 `open`/`close`；DOM 使用独立内部 ref，避免旧实现将同一 ref 同时传给 `useImperativeHandle` 和 `<div>` 的类型冲突，同时不改变 DOM 层级或外部 handle。
- `AlertComponent` 通过 `Object.assign` 推导并保留 `Header`/`Footer` 静态组件类型；标题、消息和 slot children 使用 `ReactNode`，与运行时渲染能力一致。
- 保留 `useMemo` 中的 ScrollView 副作用、遮罩 target/currentTarget 判断、class 名称和历史 `ui-alert-haeder` 拼写，未修改视觉 CSS。

## 2026-08-20：阶段 3 第十批 Dialog 迁移

- 第十批选择 `Dialog`，因为它与已迁移的 `Alert` 共享 imperative visibility、遮罩点击和 ScrollView 锁定模式，能够复用已验证的 ref/compound component 类型边界。
- `DialogHandle` 只暴露 `open`/`close`；DOM 使用内部 ref，避免 forwarded ref 同时作为 `<div>` ref 与 `useImperativeHandle` ref 的类型冲突。
- `DialogComponent` 通过 `Object.assign` 保留 `Body`/`Footer` 静态成员；slot Props 同时支持 ReactNode children 与 CSSProperties style，补齐运行时已有但旧声明遗漏的 modal/slot 样式类型。
- 保留 `useMemo` 中的滚动副作用、class 名称、backdrop blur 和 DOM 层级，未修改视觉 CSS。

## 2026-08-20：阶段 3 第十一批 Accordion 迁移

- 第十一批选择 `Accordion`，其主要复杂度集中在 Trigger/Body compound slots、headerTitle fallback、展开回调和 panel height 测量，适合独立验证子组件筛选与 DOM 保持。
- `AccordionComponent` 通过 `Object.assign` 保留 `Trigger`/`Body` 静态成员；`AccordionSlotProps` 统一描述两个 slot 的 ReactNode children。
- 子组件筛选使用 `isValidElement` 与 `displayName` 检查，避免历史 `child.type` 访问中的隐式 any；panel measurement 仅对 `HTMLElement` 读取 `clientHeight`，不改变运行时计算路径。
- 保留旧的 resize timeout、`useLayoutEffect` 初始测量、class、aria 属性和事件回调，未修改视觉 CSS。

## 2026-08-20：阶段 3 第十二批 InputSearchBox 迁移

- 第十二批选择 `InputSearchBox`，因为它是剩余组件中边界清晰的原生搜索输入包装器，可独立收紧输入属性、suggestion 数据、change handler 与 DOM ref 类型。
- `InputSearchSuggestion` 以运行时实际读取的 `text`、可选 `icon` 和 span 点击 handler 建模；不继续沿用旧声明中缺失 suggestion 的宽泛类型。
- `InputSearchBoxProps` 基于 `InputHTMLAttributes<HTMLInputElement>`，排除内部控制的 `type`、`style` 和 `onChange` 后重新声明 `width` 与 change handler；保留原生输入属性透传和旧默认 placeholder。
- 保留 suggestion 过滤时机、列表 `show` class 切换、wrapper title、input/ul DOM 结构和 class，不修改视觉 CSS 或既有 API。

## 2026-08-20：阶段 3 第十三批 Select 迁移

- 第十三批选择 `Select`，因为它是剩余组件中独立的自定义菜单控件，能在进入 MenuBar、NavBar 和 TableView 前验证 option 数据、选中状态、外部点击与滚动锁定的类型边界。
- `SelectOption` 以运行时实际读取的 `value`、`label`、可选 `icon` 建模；`SelectOptionValue` 使用 `string | number`，`SelectChangeHandler` 明确接收选中 value，纠正旧声明的 `string[]` 与无参回调。
- 保留 `useMemo` 中现有的 items 同步和 `ScrollView` 副作用、toggle 时机、点击冒泡、reverse class、backdrop blur class 与 DOM 层级，不趁迁移重构交互状态机或样式。
- 对空 items 和无效 defaultValue 使用安全回退到初始 `Select` 标题，避免类型收窄后访问不存在 option；正常数据和既有 defaultValue 行为保持不变。

## 2026-08-20：阶段 3 第十四批 MenuBar 迁移

- 第十四批选择 `MenuBar` 及其活动内部 `MenuItem`/`MenuList`，三者共享 imperative ref、compound static API、子菜单 ref 和菜单定位状态，适合以一个强相关批次闭环。
- `MenuBarHandle` 明确暴露 `openDialog`/`closeDialog`；`MenuBarItemComponent` 明确暴露 `Divider`/`SubMenu`，避免继续使用旧的 `MennuBarProps` 和 `any` anchor ref。
- `MenuBarItemClickHandler` 保持运行时的无参回调语义；内部渲染 `MenuItem` 另用 span `MouseEventHandler`，区分 public callback 与 DOM event handler。
- 使用 `Children.toArray` 和泛型 element-of-type guard 类型化 compound children；正常多子节点的 DOM/class、菜单方向、定位和点击流程保持不变。
- `MenuBar/Menu/SubMenu.js` 当前没有被入口或活动链路引用，暂不扩大迁移范围；后续若重新接入，再单独补齐其 Props 和 ref 边界。

## 2026-08-21：阶段 3 第十五批剩余源码收尾

- 用户要求继续迁移剩余内容，因此本批次在完成 `NavBar`/`TableView` 后，连同未接入的 legacy `SubMenu`、API/hooks、内部 loader helper 和 library root entry 一并转为 TS/TSX；不改变 public runtime API 或视觉样式。
- `TableView` 的 rows 使用 `ReactNode[]`，columns 使用显式 `TableViewColumn`；排序比较对字符串/数字保留原行为，对其他可渲染节点使用稳定字符串回退，避免引入 `any`。
- 保留 `MenuBar/Menu/SubMenu` 的文件级兼容实现但不重新接入活动 MenuBar 入口；其 Props 明确描述历史 `listData`、ref 和 item click 边界。
- library 构建入口从 `index.js` 改为 `index.ts`，package dist 仍输出 ESM `.js`，因为 JS 是发布产物而非源码迁移遗留。

## 2026-08-21：Sass `@import` 到模块系统

- 采用 `@use` 而不是压制 deprecation warning；保留 `@import` 语义会继续依赖 Sass 全局作用域，无法解决 Dart Sass 3.0 的移除风险。
- 组件对 `_base/parents.scss` 使用 `@use ... as *`，因为这些文件依赖历史全局 selector 的 `@extend`；浏览器移动端 mixin 使用显式命名空间，减少全局成员污染。
- 接受 Sass 模块化造成的 selector list 排序变化，但要求 CSS 规则和声明结构保持一致；通过基线 CSS 规范化对比验证。

## 2026-08-21：阶段 4 Design Tokens 渐进抽取

- 新增 `src/lib/scss/themes/tokens.scss`，使用 `--rwu-*` 作为新的语义 token 命名空间；不把旧 `--color-*` 变量一次性替换或删除。
- `--rwu-color-*` 有意引用现有主题变量，而不是复制一套 light/dark literal。这样 `[data-theme="dark"]`、`Appearance`、`AppTheme`、`--PrimaryColor` / `--PrimaryColorLight` 和消费者旧变量覆盖都继续生效。
- 尺寸、间距、阴影和动效 token 使用当前 SCSS 已存在的精确值；本阶段仅迁移基础父选择器与 Button、InputText、Checkbox、Switch、Dialog、Alert、Select、TableView 等相关样式，不修改组件 DOM、Props 或 class。
- 保留历史 `--color-button-border-bottom-defult` 拼写作为兼容变量，新代码通过语义 token `--rwu-color-border-control-bottom` 访问它。
- 发布 CSS 产物继续写入 `src/lib/dist/react-winui.min.css`；新增 token 文档保持轻量，完整 token 列表以 Sass 源文件为准。

## 2026-08-21：阶段 4 全量消费端迁移

- 用户要求继续完成迁移后，将 `src/lib/scss/components` 和 `src/lib/scss/browsers` 中全部 `var(--color-*)` / `var(--PrimaryColor*)` 消费端替换为 `--rwu-*` 语义 token。
- `light.scss`、`dark.scss` 与 `tokens.scss` 中的旧变量引用保留为兼容桥接层；不删除旧 CSS 自定义属性，确保已有消费者覆盖仍然可用。
- 新增 `--rwu-color-brand`、`--rwu-color-loader-primary` 和滚动条 thumb token，覆盖原先没有语义映射的主色、loader 和 scrollbar 变量。
- 通过 `rg` 审计确认组件/浏览器 SCSS 的旧变量消费端为 0；不把主题兼容桥接本身误判为未迁移组件样式。

## 2026-08-21：阶段 5 测试与视觉回归基线

- 采用 `@playwright/test` 作为提交到仓库的浏览器/视觉回归运行器；Playwright CLI 适合临时探索，但阶段 5 需要可在 CI 重复执行的 test spec、截图基线和显式 snapshot update workflow。
- 视觉回归不直接依赖完整 docs 页面，而使用 `tests/browser` 独立 Vite fixture 加载真实组件和既有 Sass；这样能稳定控制状态，同时不为测试修改 docs 路由或组件 DOM。
- 截图基线只覆盖代表性高风险状态：Button 的 default/hover/pressed/focus/disabled、light/dark controls、Select flyout；其余组件状态继续由 Vitest/Testing Library 行为测试覆盖，避免一次性制造大量脆弱截图。
- Playwright CI 使用 Windows runner，与当前 `chromium-win32` 基线保持同一平台方向；跨平台支持另行增加平台项目和对应基线，不在本阶段放宽截图断言来掩盖平台差异。
- Vitest 明确排除 `tests/browser/**`；production build、consumer build、unit test 和 browser regression 在 CI 中串联，保证测试基础设施不会脱离真实 package 产物验证。

## 2026-08-21：移除 fixture 中的 React `defaultProps` warning

- 只处理实际由 fixture 挂载并产生 warning 的 `AppTheme` 与 `Select`，不把所有未挂载组件的 legacy `defaultProps` 在本次 follow-up 中扩大重构。
- `AppTheme` 的可选回调继续在 comparator 中通过 `noop` fallback 调用；`Select` 继续使用已有的参数默认值；两者都不改变 public API、DOM 或视觉行为。

## 2026-08-21：阶段 5 全库视觉保护扩展

- 将视觉 fixture 从 6 个代表性组件扩展为 root export 中的全部公共视觉组件；AppTheme/Appearance 没有独立视觉 DOM，因此保留在主题行为和 console 回归中验证。
- 采用 34 张截图而不是为每个组件穷举所有状态：每个组件至少落入一个稳定 light/dark panel，高风险交互另加状态截图，以平衡覆盖面和基线维护成本。
- 继续使用 Chromium Windows 单项目，因为 CI runner 为 `windows-latest`；移动 NavBar 通过 viewport 用例补充响应式 overlay 覆盖，不引入跨平台快照噪声。
- 全部静态 `defaultProps` 改为参数默认值或 fallback；这属于 React 兼容性和测试可观测性修复，不改变 public Props、DOM 或视觉 recipe。
- ColorPickerPalette 的可选 `onChange` 使用内部 noop，避免受控 color input 产生 read-only console error；该修复直接改善组件在默认用法下的开发体验。
- Playwright fixture 使用 2 workers 和 60 秒 test timeout，解决全库挂载时 Windows browser context teardown 资源竞争；不通过放宽 `maxDiffPixelRatio` 接受视觉变化。

## 2026-08-21：阶段 6 Tooltip

- 阶段 6 只实现 Tooltip，不提前扩展 Popover、Menu 或其他新组件；行为边界参考 WinUI Tooltip 与 Fluent UI React v9，视觉继续使用 react-winui 自有 token。
- API 采用必需的 `content`/单一 `children` trigger，并支持 `open`、`defaultOpen`、`onOpenChange`、`showDelay`、`hideDelay`、`placement`、`relationship`、`withArrow` 和 `disabled`；保留 controlled/uncontrolled 两种用法。
- Tooltip 内容通过 portal 渲染并根据 viewport 做 placement fallback；模块级关闭句柄保证同一时间只有最新 Tooltip 可见，避免多层悬浮内容相互遮挡。
- 没有复制 Fluent UI 源码、Griffel 样式或 Fluent token，因此不新增 `THIRD_PARTY_NOTICES.md`；只记录行为/API 设计参考。

## 2026-08-24：取消重复 Menu 并保留 MenuBar

- 不新增与现有 `MenuBar` 高度重合的公共 `Menu`；现有 `MenuBar` 继续承担弹出命令菜单、Item、SubMenu 和 Divider 能力。
- `MenuBar` 的后续改进采用兼容式增强，不删除旧 Props、不改变既有 DOM/className 或视觉 recipe。
- 未来若实现 `ContextMenu`，应优先复用经验证的内部菜单 surface/条目行为，避免再建立第三套重复菜单实现；本次不提前抽象该能力。

## 2026-08-21：Tooltip 背景改为实心

- Tooltip 与箭头改用 `--rwu-color-surface-flyout`，不再消费 `--rwu-color-surface-flyout-translucent`；Flyout/Select/MenuBar 的既有半透明行为保持不变。
- 同步重新生成 Sass CSS 产物并更新 Tooltip light/dark 视觉基线，避免视觉变更未被截图测试记录。

## 2026-08-21：Tooltip 阴影与圆角收敛

- Tooltip 圆角改用现有 `--rwu-radius-small`（4px），不新增独立圆角 literal。
- 此处记录的 Tooltip 专用 `drop-shadow` 方案已由后续 Theme/Shadows scale 决策取代；通用 `--rwu-shadow-flyout` 仍保持不变。

## 2026-08-21：Tooltip 使用 Theme/Shadows shadow8

- 将 Fluent UI v9 Theme/Shadows 的层级思路迁移为本库自有 `--rwu-shadow-2`、`--rwu-shadow-4`、`--rwu-shadow-8`、`--rwu-shadow-16`、`--rwu-shadow-28` 和 `--rwu-shadow-64` token，不引入 Fluent UI 运行时依赖。
- Tooltip 改用 `box-shadow: var(--rwu-shadow-8)`；shadow8 由 `0 0 2px rgba(0, 0, 0, 0.12)` 与 `0 4px 8px rgba(0, 0, 0, 0.14)` 两层组成，保持当前 Tooltip 的实心表面和 4px 圆角。

## 2026-08-21：Theme 子路径作为 CSS token 引用层

- 新增 `@evanpatchouli/react-winui/theme` 子路径，导出只包含 `var(--rwu-*)` 引用的 `Shadows` 常量；Sass/CSS token 仍是阴影真实值的唯一来源。
- `Shadows` 同时覆盖 shadow scale 与既有 `flyout`、`flyoutNested`、`dialog`、`alert` 语义 token，支持 inline style 等 JavaScript-facing CSS API，不替代组件 SCSS 中的 CSS token 用法。
- 保留根入口的同名导出以确保 preserveModules 构建稳定产出 `dist/theme/index.js`；文档和推荐用法以独立 `theme` 子路径为准。

## 2026-08-21：集中整理组件借鉴规范

- 将阶段 6 已验证的 WinUI / Windows 11 行为参考、Fluent UI v9 架构参考、react-winui 视觉边界、源码许可、测试和完成标准集中到 `docs/component-migration-guidelines.md`。
- 公共规范只描述当前组件开发需要的规则，不建立与项目规模不匹配的通用 framework；Tooltip 作为首个完成模板保留在文档末尾。

## 2026-08-21：阶段 7 P0 Popover / Flyout

- 采用现有 Tooltip 一致的 `content` + 单一 `children` trigger API，避免为一个新 overlay 提前建立 Fluent UI 式 compound/context framework；同时提供 `open`、`defaultOpen`、`onOpenChange`，满足受控和非受控场景。
- `Flyout` 采用 Popover 的语义别名实现，二者共享 portal、定位、light-dismiss、focus 和 token 逻辑；这样 WinUI 命名可以进入公共 API，但不会产生两套容易漂移的视觉/状态实现。
- surface 使用既有 `--rwu-color-surface-flyout`、`--rwu-color-border-divider`、`--rwu-radius-flyout`、`--rwu-shadow-8` 和 spacing/motion token；未引入 Fluent UI 运行时、Griffel 或第三方定位依赖。
- 采用模块级 active close 句柄，保证同一 document 中最后打开的 Popover/Flyout 关闭旧 surface；outside pointer、Escape、visibility、可选 scroll 和 focus restore 作为轻量 overlay 生命周期的一部分处理。

## 2026-08-24：阶段 7 P0 ContextMenu

- ContextMenu 复用 `MenuBar` 的 `.ui-menu-list-dialog` / `.ui-menu-list-item` DOM class 与 Sass surface，不新增第三套菜单颜色、圆角、阴影或 hover recipe；独立逻辑只负责鼠标坐标锚定、portal、viewport clamp、light-dismiss 与菜单焦点模型。
- API 采用 `content` + 单一 `children` target，并通过 `ContextMenu.Item` / `ContextMenu.Divider` 提供 compound command 内容；`open`、`defaultOpen`、`onOpenChange` 支持 controlled/uncontrolled 使用。
- 右键、`Shift+F10` 和 Context Menu 键打开菜单；Escape 与命令选择按 `restoreFocus` 恢复触发目标，outside pointer 不抢回焦点，Tab 关闭菜单但不阻止浏览器默认 Tab 顺序、也不强制恢复到触发目标。
- disabled menuitem 保持可聚焦和 `aria-disabled` 可发现性但不可激活；方向键、Home、End、字符导航、Enter/Space 遵循 WAI-ARIA menu 模式。
- 仅参考 WinUI MenuFlyout、Fluent UI React v9 Menu 和 WAI-ARIA APG 的行为/API/测试思路；未复制 Fluent UI 源码、Griffel 或视觉 token，因此不新增第三方源码声明。

## 2026-08-24：阶段 7 P0 Toast

- 采用轻量 `Toast + Toaster` 组合：独立 `Toast` 覆盖受控/非受控状态，`Toaster` 通过 ref 提供 `show`、`dismiss`、`dismissAll`；当前规模不引入 Provider、全局总线或通知中心 framework。
- `Toaster` 使用 FIFO 队列与 `maxVisible` 控制堆栈；相同 `id` 的 `show` 原位更新已有条目，不增加队列长度，也不重排其他通知。
- 默认 polite 通知使用 `role="status"`，assertive 通知使用 `role="alert"`；交互时暂停剩余计时，焦点位于 Toast 内时 Escape 关闭，persistent / `duration={0}` 不启动自动关闭。
- 受控 Toast 的 timeout 或关闭操作只发出一次 `onOpenChange(false, data)` 请求；若父级保持 `open=true`，组件不会因重新渲染重复启动同一轮 timeout。
- surface、intent 指示、焦点、间距、阴影与动画只消费已有 `--rwu-*` token；参考 Windows notification、Fluent UI React v9 Toast 与 WAI-ARIA live region 的行为/API/测试边界，未复制第三方源码、Griffel 或视觉 token。

## 2026-08-24：阶段 7 P0 InfoBar

- InfoBar 是占据正常文档流的持久状态消息，不复用也不替代旧 Alert；Alert 继续保持 modal overlay、scroll lock 与 imperative ref API。
- API 采用 `open` / `defaultOpen` / `onOpenChange` 受控与非受控模型，默认关闭、默认可关闭；受控关闭只发送请求，父组件保留最终可见性决定权。
- informational 默认使用 `role="status"` / polite，success、warning、error 默认使用 `role="alert"` / assertive，根 div 的原生 ARIA props 可显式覆盖默认值；组件出现或关闭时不移动焦点。
- `disabled` 只阻止 close 与 action 的用户激活，消息继续可读且根节点标记 `aria-disabled`；受控 `open` 的程序化变化不受限制。
- surface、文字、边框、焦点与 severity 图标只消费现有 `--rwu-*` token。当前没有 warning 专用 token，因此使用 `--rwu-color-text-primary` 与独立三角图标表达 warning，不引入硬编码色。
- 参考 WinUI InfoBar、Fluent UI React v9 MessageBar 与 WAI-ARIA status/alert 的行为、API 和测试边界；未复制第三方源码、Griffel 或 Fluent 视觉 token。

## 2026-08-24：阶段 7 P0 ComboBox

- 保留旧 `Select`、`SelectNative` 和 `InputSearchBox` 的 API 与视觉不变，新增单选 `ComboBox`；新组件用 `options` 数据描述选项，避免把旧 `Select` 换名复制。
- 将已提交的 `value` 与 editable 输入 `text` 分为两套受控/非受控状态；受控回调只发送变更请求，是否显示新值由父组件决定。
- 焦点保留在 combobox input/button，通过 `aria-activedescendant` 关联 listbox option；方向键只移动 active option，Enter 才提交选择，disabled option 始终跳过且不可提交。
- listbox 通过 portal 挂载，并在真实测量后完成上下 placement fallback、水平 clamp 与 viewport `max-height`；定位未就绪和可用高度确为 0 是两个不同状态。
- editable 模式支持筛选、匹配项提交及自定义字符串提交；当前 API 明确保持单选，不提前引入 multiselect、虚拟化或远程数据框架。
- 视觉只消费既有 `--rwu-*` token，并复用旧 Select 的 WinUI 视觉 DNA；仅参考 WinUI ComboBox、Fluent UI React v9 Combobox 与 WAI-ARIA APG 的行为/API/测试思路，未复制实际源码、Griffel 或 Fluent token。

## 2026-08-24：阶段 7 P1 组件边界

- `NumberBox`、`AutoSuggestBox`、`TreeView`、`Expander`、`SettingsCard`、`SettingsExpander`、`CommandBar`、`NavigationView` 作为独立公共组件加入；旧重叠组件不改名、不删除、不做 breaking rewrite。
- `Expander` 不替换旧 `Accordion`；`SettingsExpander` 组合 SettingsCard 的信息层级，但使用自己的 disclosure 状态和 inert/焦点边界。
- `AutoSuggestBox` 不把旧 `InputSearchBox` 改造成新 API；两者分别保留搜索输入兼容能力与建议选择能力。
- `CommandBar` 不复用 `ButtonGroup`/`MenuBar` 的公共 API；仅借鉴经过验证的菜单 portal、light-dismiss 和焦点边界。
- `NavigationView` 不修改旧 `NavBar` 系列；新增组件遵循 WinUI 左侧 pane 的 expanded/compact/minimal/auto 模式，Top 模式留待后续明确需求。
- P1 组件继续只使用 react-winui 自有 `--rwu-*` tokens；仅借鉴 WinUI/Windows 11 行为与 Fluent UI v9 的状态、无障碍和测试思路，不复制第三方实现源码。

## 2026-08-24：浮层阴影向 Windows 11 参考图收敛

- Tooltip、Popover、Flyout、ContextMenu 及 P1 的 portal 列表/菜单表面统一使用新 `--rwu-shadow-overlay`：低对比度接触阴影叠加宽范围环境阴影；dark theme 使用更强但仍克制的同构 token。
- 新增 `--rwu-color-border-flyout`，并保留旧 `--rwu-shadow-flyout` 不动，避免 MenuBar、Select 等旧组件因浮层修正发生视觉漂移。
- 浮层截图统一在 surface 外保留 16px 取景边距，并在截图前结束入口动画；这样视觉回归真实保护阴影，也不会因 portal/动画的 1px 裁剪漂移产生噪声。
- P1 fixture 的 unicode 占位图标改为已有 WinUI icon font 类；这是测试样例质量修正，未改变公共组件 API 或旧组件视觉 recipe。

## 2026-08-24：P1 控件箭头与 NavigationView hover 微调

- `ComboBox` 和 `NumberBox` 继续复用现有 CSS chevron，只将两条边的描边从半个 spacing token 调整为四分之一 spacing token，即约 1px，以匹配 `Select` 的细箭头；未引入新图标、未改变布局或公共 API。
- `NavigationView` 的 hover 背景绑定到完整 `ui-navigation-view-item-row`，而不是内部按钮或 disclosure；selected/indicated 和 disabled 规则保留更高优先级，避免 hover 覆盖语义状态。
- `AutoSuggestBox` 的输入框 hover 保持基础 surface，不回退为灰色 hover surface；该约束继续由浏览器测试保护。

## 2026-08-24：SettingsCard 阴影与 AutoSuggestBox hover 收敛

- `SettingsCard` 不再直接复用通用 `--rwu-shadow-2`；新增 `--rwu-shadow-card`，以更低对比度的接触阴影叠加短范围环境阴影，避免卡片堆叠出现生硬的深色底线。
- `AutoSuggestBox` 的 input、Clear、Submit 三个 surface 都显式清除全局 `button:hover` 带来的 `brightness` / `opacity`，hover 保持透明动作层；active pressed 反馈继续保留。
- `Shadows.card` 与设计系统文档同步暴露该语义 token；未改变 SettingsCard DOM、Props 或交互 API。

## 2026-08-26：AutoSuggestBox 聚焦 Hover 修正

- 用户截图中的 caret 表明问题状态是“输入框已聚焦 + 鼠标 Hover”；此前 `:hover:not(:focus, :disabled)` 有意外排除 `:focus`，因此 `@extend .input-btn-default` 带来的全局 hover `brightness/opacity` 仍会把输入框变灰。
- 输入框 hover 规则改为 `:hover:not(:disabled)`，在普通和聚焦 Hover 下都清除灰度滤镜与透明度；`&:focus-visible` 仍按原顺序提供焦点 surface，disabled 状态不受影响。
- 新增浏览器回归，分别比较未聚焦 Hover 与聚焦后 Hover 的 `backgroundColor`、`filter` 和 `opacity`；未改变 DOM、Props 或 active pressed 反馈。

## 2026-08-26：AutoSuggestBox cursor 语义修正

- `.ui-auto-suggest-box-input` 继续复用通用输入视觉，但覆盖其继承的 `cursor: pointer` 为 `cursor: text`，让输入区域呈现文本编辑光标。
- `.ui-auto-suggest-box-clear` 与 `.ui-auto-suggest-box-query` 保持 `cursor: pointer`；disabled 分支继续覆盖为 `not-allowed`。
- 浏览器回归同时断言输入框 cursor 和两个内部按钮 cursor，未改变 DOM、Props 或交互行为。

## 2026-08-26：AutoSuggestBox focus underline 对齐

- 用户截图显示 AutoSuggestBox 聚焦时底部 accent 线比 InputText 少一层；InputText 的既有实现由底部 accent border 与 1px accent background gradient 共同形成。
- AutoSuggestBox 的 `:focus-visible` 复用同一 gradient、repeat、bottom position 与 `100% 1px` size，保持控件高度、border width、DOM 和 API 不变。
- 浏览器回归将 AutoSuggestBox 与测试 fixture 中的 InputText 聚焦 computed underline style 逐项比较；新增的 fixture `data-testid` 仅用于测试定位。

## 2026-08-26：AutoSuggestBox 内部按钮 cursor 修正

- 根据用户反馈，AutoSuggestBox 的 Clear / Submit 内部动作按钮启用状态使用 `cursor: default` 普通箭头，不使用手型；输入区域仍为 `cursor: text`。
- disabled 按钮继续使用 `cursor: not-allowed`，保留不可用状态的系统语义提示。
- 浏览器回归将两个内部按钮的 computed cursor 断言为 `default`，未改变点击行为、DOM 结构或公共 API。

## 2026-08-26：AutoSuggestBox 内部按钮 Hover feedback

- 为补偿普通箭头 cursor 缺少手型提示，Clear / Submit 启用状态 Hover 使用现有 `--rwu-color-surface-control-hover`，默认仍保持透明，pressed 继续使用 `--rwu-color-surface-control-pressed`。
- Hover 只改变动作按钮 surface，不改变输入框背景、cursor、filter 或 opacity；disabled 不参与 Hover 覆盖。
- 浏览器回归断言动作按钮 Hover 背景确实变化，同时 cursor 保持 `default`、filter 为 `none`、opacity 为 `1`。

## 2026-08-26：ComboBox / NumberBox 复用 Select 箭头

- 用户确认 ComboBox 与 NumberBox 的箭头理论上可以复用 Select；因此抽取 `_base/_select-chevron.scss`，由三个组件共享同一份 14px SVG 资源及 Light/Dark 主题定义。
- ComboBox 和 NumberBox 不再使用 CSS border 旋转绘制，改为背景 SVG；方向只通过 180° transform 切换，避免继续维护不同的描边宽度、位移和旋转角度。
- Select 保留原有定位（右侧 10px、垂直居中）和视觉 API，仅接入共享 mixin；未改动组件 DOM、Props、控件尺寸或按钮交互。
- 回归以 computed `backgroundImage`、`backgroundRepeat`、`backgroundSize` 对比实际资源，不再只断言 border 宽度。

## 2026-08-26：InfoBar / SettingsExpander 复用 SettingsCard 阴影

- 用户要求两类 settings surface 与 SettingsCard 统一，因此直接复用现有语义 token `--rwu-shadow-card`，不新增第三套阴影值。
- 只修改 InfoBar、SettingsExpander 的根容器；SettingsExpander 内部嵌套 SettingsCard 继续使用 `--rwu-shadow-none`，避免卡片嵌套时重复叠加阴影。
- 通过 Light/Dark computed `boxShadow` 对三个组件做集合一致性断言；未把视觉一致性退化为只检查源码字符串。

## 2026-08-26：文档导航图标语义校正

- 导航图标优先复用现有 `icons10` 字体，保持与现有 Fluent/WinUI 线性字形、尺寸和基线一致；只有字库缺少合适语义时才考虑引入 Google Font Icon。
- `NumberBox` 使用 `icons10-unfold`；`Popover / Flyout`、`Tooltip`、`Toast` 分别使用 `icons10-chat`、`icons10-info`、`icons10-bell`，让四个组件条目具有可区分的语义图形。
- 本次只修改 `src/demo/v1.0.0/navbar_items.json` 的导航映射，不改图标字体、公共组件 API 或组件视觉样式。

## 2026-08-26：Toast 多条通知窗口式叠放

- 多条 Toast 不再使用完整纵向间距，而是共享一个网格单元并按层级错位；这样只露出后层 Toast 的边缘和意图色条，前层最新通知保持清晰可读，视觉上接近 Windows 多窗口叠放。
- 叠放偏移使用 8px，并根据 `top/bottom` 与 `start/end` 锚点方向镜像；通过 CSS `translate` 与入场 `transform` 分离，保留现有入场动画和调用方自定义 transform 兼容性。
- 层级由可见队列顺序计算，最新 Toast 为前景；没有改变 FIFO 移除、队列补位、暂停计时或无障碍 live region 行为。

## 2026-08-26：Switch disabled 状态

- `Switch` 继续使用原生 `<input type="checkbox" disabled>` 作为不可交互语义来源，不引入额外事件拦截或新的 Props API。
- 禁用态视觉采用现有 `--rwu-color-text-disabled` 加 `grayscale(1)` / `opacity: 0.5`；保留原有启用态 hover/pressed 规则，并在 disabled 分支复位其反馈；光标按用户确认使用普通 `default` 箭头。
- 通过容器状态 class 给内置 On/Off 标签同步置灰，避免依赖相邻兄弟选择器而遗漏 `labelPosition="start"`。

## 2026-08-27：Switch 专属视觉基线取景

- Switch 专属 Light/Dark 截图只捕获原生控件本体；禁用标签继续由 `controls-light/dark` 聚合基线覆盖。
- 不放宽全局 `maxDiffPixelRatio`，以避免掩盖真实控件视觉回归；这样可规避 Windows Chromium 在极小文字裁剪上的固定像素差异，同时保留 Switch 几何与灰化效果的专属回归。

## 2026-08-28：阶段 7 P2 DatePicker 边界

- P2 首个组件选择 `DatePicker`，建立单日期输入与日历 popup 的完整闭环；独立常驻 `Calendar`、日期范围、多选和时区转换保留给后续组件，不把两个 API 提前耦合。
- `DatePicker` 采用 `Date | null` value、`open`/`defaultOpen`、`onValueChange`/`onOpenChange` 和可选 `allowTextInput`，保留原生 input 属性与 forwarded ref；默认文本格式跟随 Intl，业务格式由 `formatDate`/`parseDate` 明确提供。
- popup 使用 dialog + grid + roving gridcell focus；输入框通过 `aria-haspopup`、`aria-expanded`、`aria-controls` 连接 popup，选择/Escape 后焦点回到输入框；dialog 使用可本地化 `aria-label`，月份标题单独提供 polite live region。
- 样式只消费现有 `--rwu-*` token，日历按钮使用项目已有 `icons10-calendar`；不引入 Fluent UI 视觉 recipe、Griffel 或第三方运行时依赖。
- 日期 fixture 放在浏览器 gallery 末尾，避免新增 panel 改变现有 Tooltip、导航全页和 floating-surface 截图的取景上下文；DatePicker 自己维护 4 张 Light/Dark panel/popup 基线。

## 2026-08-28：Calendar API 与行为边界

- `Calendar` 保持为独立常驻控件，不把 DatePicker 的 popup、文本输入、parse/format 或 outside pointer 行为耦合进来；本批只实现单日期选择和固定六周月份网格。
- 将已选值、键盘焦点日期和当前可见月份分成三种状态：选中值负责 `value` / `onValueChange`，焦点日期负责 roving grid focus，picker 月份负责导航与 `onPickerDateChange`；controlled value 更新只同步真正发生变化的日期 key，避免每次 render 抢回键盘焦点。
- 无 value 时默认使用当前本地日期作为焦点与可见月份，但默认不产生选中值；`today` 明确归一化为本地日期，Today 操作沿用 DatePicker 的选择语义并触发 value change。
- 日期边界和 `restrictedDates` 同时约束导航可达性与选择动作；当前批不增加多选/范围选择、月份/年份选择器、周数、popup、文本输入、时区转换或异步日期源。
- 使用 ARIA grid、每行 weekday header、每个日期的 `aria-selected` / `aria-current` 与单一 tab stop 表达桌面日历键盘模型；根节点保留 group 语义、可本地化 label 和 forwarded ref。
- Calendar surface 复用现有 card shadow 与 control/text/background token，不新增颜色、圆角、阴影或 Fluent UI visual recipe；Calendar fixture 放在浏览器 gallery 末尾以保持既有全页基线取景稳定。

## 2026-08-28：DataGrid API 与行为边界

- `DataGrid` 作为新组件独立于旧 `TableView`，本批只覆盖本地数组、列定义、客户端排序、单/多行选择、固定 DOM grid 和基础无障碍，不引入编辑、虚拟化、分页、分组、列拖拽/缩放或服务端数据适配层。
- 采用 `items` + `columns` + `getRowId` 的现代 API；排序与选择分别提供 controlled/uncontrolled 形态，保留稳定行 ID，允许 `renderCell` 与 `sortValue` 将显示内容和排序值解耦。
- 原生 table 保留语义结构，同时以 `role="grid"`、`row`、`gridcell`、`columnheader` 表达键盘网格；通过单一 roving tab stop 管理焦点，跳过 disabled row，避免每个单元格都进入页面 Tab 序列。
- selection control 的点击属于 interactive target，不触发行级 `onRowClick`；select-all 只处理当前可选行，disabled row 永远不被批量选中。
- DataGrid 视觉只使用现有 `--rwu-*` token 和既有 WinUI 风格表面，不复制 Fluent UI/WinUI 实现代码，也不引入 Fluent visual token；因此不新增第三方源码声明。
- 浏览器 fixture 放在 gallery 末尾，避免新增 panel 改变既有全页与浮层截图取景；Light/Dark DataGrid 基线独立显式维护。

## 2026-08-28：SelectionControl 共享控件边界

- 采用内部 `SelectionControl` 而不是公开新组件：它是 Checkbox、RadioButton 和 DataGrid 之间的低层 input primitive，不承担 label、行选择模型或表格业务语义。
- `SelectionControl` 的 `type` 限定为 `checkbox` / `radio`，并将 `indeterminate` 转换为原生 input DOM 属性；Checkbox 的历史 `type` 参数继续兼容但标记 deprecated，避免把“固定 checkbox”误解成通用 input。
- 共享视觉集中在 `.ui-selection-control`、checkbox/radio 变体和现有 `--rwu-*` token；保留 `.ui-checkbox` / `.ui-radio-btn` class 作为兼容标记，DataGrid 只增加局部布局 class，不复制状态样式。
- 普通 Checkbox 不由共享基类强加宽高和 vertical-align，避免改变 legacy label 行盒；radio 与 DataGrid selection control 在各自需要的场景声明尺寸，保持旧组件布局稳定。
- DataGrid 的 select-all 半选状态由 SelectionControl 统一维护，移除 DataGrid 自己重复设置 `input.indeterminate` 的 effect；选择列仍使用原生 checkbox/radio 语义。
- 这次重构不改变 Checkbox/RadioButton 的公开调用方式，不新增 package export，不引入 Fluent visual recipe；新增 Checkbox `indeterminate` 仅为向后兼容的 additive API。

## 2026-08-28：TeachingTip API 与行为边界

- `TeachingTip` 作为独立的内容型目标浮层，不把现有 `Popover` 的通用 API 直接暴露成 TeachingTip；它保留 `children` target，增加 title/subtitle/content/icon/hero/action 等 WinUI TeachingTip 概念，并支持 controlled/uncontrolled visibility。
- 默认使用显式关闭：目标点击打开，close button、action 或 Escape 关闭，outside pointer 保持打开；`isLightDismiss` 隐藏 close button 并启用 outside pointer 关闭。为此在 Popover 增加 `closeOnOutsideClick`，默认 `true`，不改变既有 Popover / Flyout 行为。
- TeachingTip 只支持当前 Popover 已有的 `top` / `bottom` / `left` / `right` 四侧 placement；WinUI 更完整的 placement 矩阵、非目标根边缘、持久化提示队列和 carousel 留在后续范围。
- 目标使用 `aria-controls`、`aria-expanded`、`aria-haspopup="dialog"`，浮层使用自动标题/副标题关系；interactive content 由 Popover trap focus 处理，TeachingTip 在显式模式补充 controlled click 后的 close-button focus 和 close 后 target restore。
- WinUI 参考目标定位、显式/light-dismiss、title/subtitle/action/hero/icon；Fluent UI React v9 仅参考 TeachingPopover 对 Popover、箭头默认值、focus trap 和受控状态的组合方式；没有复制源码、Griffel 或 Fluent token。
- 视觉 fixture 继续追加到 gallery 末尾，TeachingTip Light/Dark 基线独立维护；视觉样式只消费现有 `--rwu-*` token。

## 2026-08-31：Breadcrumb API 与 overflow 边界

- `Breadcrumb` 采用 `items` 路径模型而不是强制 compound component；每项支持 `label`、`href`、`onClick`、`icon`、`disabled`、`ariaLabel`、`target`、`rel` 与稳定 `id`，从而覆盖链接、按钮和纯层级节点，同时保留原始索引回调。
- 根节点使用带 accessible name 的 `nav`，路径使用 `ol`；分隔符为 presentation-only，最后一项始终是 `aria-current="page"` 的非交互当前节点，即使调用方同时提供 `href` 或 `onClick` 也不执行导航。
- `maxVisibleItems` 是显式且确定性的可见条目上限，折叠从第二项开始，保留首项和当前项；overflow 通过现有 `Popover` 复用 portal、定位、菜单键盘、outside pointer、Escape 和 focus restore，不引入 ResizeObserver 或额外运行时依赖。
- 没有设置 `maxVisibleItems` 时不测量实时宽度，路径保持单行并使用横向滚动；这让异步字体、缩放和不同容器宽度不会改变组件的结构判断。视觉只使用现有 `--rwu-*` token，没有复制 Fluent UI / WinUI 源码。

## 2026-08-31：Tag API 与 standalone 边界

- `Tag` 采用 standalone API：`children` 表达值内容，`appearance` 支持 `filled` / `outline` / `brand`，`shape` 支持 `rounded` / `circular`，`size` 支持 `extra-small` / `small` / `medium`；不与现有内部 NavBar badge 混用，也不改旧 `Badge` 语义。
- 静态 Tag 渲染为非交互 `<span>`；`dismissible` Tag 渲染为 `<button type="button">`，click、Delete 和 Backspace 触发 `onDismiss`，移除责任留给父级集合状态。disabled 同时使用原生 button disabled 和显式 handler guard，静态 Tag 使用 `aria-disabled`。
- 图标与 dismiss glyph 标记为 decorative，标签文本保留为 accessible name；原生 HTML 属性、`data-*` 和 forwarded ref 继续可用。未暴露 `onClick` / `onKeyDown`，避免静态 Tag 被误用为交互控件。
- 视觉只消费现有 `--rwu-*` Design Tokens；Tag fixture 追加在 gallery 末尾，维护 light/dark、hover/focus 基线。没有复制 Fluent UI / WinUI 源码、Griffel 样式或 Fluent visual token，因此不新增 `THIRD_PARTY_NOTICES.md` 条目。
