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
