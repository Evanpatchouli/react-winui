# 阶段 1 handoff

- 已完成 CRA 到 Vite 8 的 Demo/docs 迁移，入口位于 `apps/docs`。
- 已建立 pnpm workspace；组件包暂保留在 `src/lib`，避免一次性移动历史源码。
- 组件包构建产出 ESM、逐模块文件、现有 `.d.ts` 和压缩 Sass CSS。
- 已移除根项目的 `react-scripts`、Babel 构建链、`node-sass` 和 npm lockfile。
- 已验证 `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm compile:sass`。
- Sass 仍会报告旧 SCSS `@import` 的 Dart Sass deprecation warning；本阶段未改写样式组织，避免视觉变化。
- 已删除旧的 `src/cra-template` 独立 CRA 模板包，并清理 README、开发脚本、Demo 文档及工具配置中的相关引用。
- 删除模板后的 `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build` 均已复核通过。

阶段 1 的后续工作已由本次阶段 2 handoff 覆盖。

# 阶段 2 handoff

- 组件包 `react-winui` 的 `react`、`react-dom` peer 版本已收紧为 `>=18`，`react-router-dom` 为 `>=6`；三者不再作为 runtime dependencies 安装。
- 组件包新增独立构建所需的 devDependencies，保留 ESM、`main`、`module` 和 `types` 字段。
- `exports` 新增 `react-winui/button` 和 canonical `react-winui/styles.css`，现有 `dist/react-winui.min.css`、`config/app-config.css`、icons 路径继续兼容。
- `sideEffects` 仅声明 CSS glob；`files` 与 `.npmignore` 共同限制发布内容，`pnpm pack --dry-run` 未包含源码、SCSS、tests、docs 或开发配置。
- 组件包补入 MIT `LICENSE`，pack dry-run 已确认许可证进入 tarball。
- 新增 `examples/test-app` workspace consumer，覆盖 root ESM import、Button subpath、类型声明和 CSS assets。
- 已验证 React 18 consumer，以及临时 React 19.2.8 consumer 的 `tsc` 和 Vite production build。
- 已验证 `pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm test:consumer` 与 package pack dry-run。
- Sass 仍会报告旧 SCSS `@import` 的 Dart Sass deprecation warning；没有为了本阶段改动视觉样式组织。

下一阶段可继续逐个组件做 TypeScript 渐进迁移；不要在本阶段 handoff 中顺带修改组件视觉或公共 API。

# 阶段 3 首批 handoff

- 已将 `Button`、`InputText`、`Checkbox`、`RadioButton`、`Switch` 的真实实现从 `.js` 迁移到 `.tsx`。
- 五个组件均使用显式 Props interface，基于 React 原生 HTML 属性类型扩展，并通过 `forwardRef` 保留 DOM ref 能力。
- 保留原有 className、DOM 层级、默认值、状态 class、事件转发和旧 `Button.value` API；`Button` 额外支持 `children` 作为现代内容入口。
- 更新了五个组件的发布 `.d.ts`，并从根声明入口导出对应 Props 类型；构建产物的声明已同步复制到 `src/lib/dist`。
- 根 TypeScript 配置现在会检查 `src/lib/src/**/*.ts(x)`；ESLint 增加 `typescript-eslint` 解析器；格式脚本只对当前迁移的 TypeScript 文件做增量检查，避免重排历史 JS/声明文件。
- 新增 `tests/basic-controls.test.tsx`，覆盖五个组件的渲染、disabled/state 与事件行为；consumer 类型测试覆盖根入口 Props 和五个组件。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm test:consumer`、`pnpm --filter react-winui typecheck`、`pnpm --filter react-winui pack --dry-run`。
- Sass 仍报告既有 `@import` 弃用警告；未修改样式系统。其余公共组件仍为 JS + `.d.ts`，下一批应继续小范围迁移。

# 阶段 3 第二批 handoff

- 已将 `ProgressBar`、`TextArea`、`SliderBar` 的真实实现从 `.js` 迁移到 `.tsx`。
- `TextArea`、`SliderBar` 保留 `forwardRef`；Props 基于 React 原生 textarea/input 属性扩展，并补齐历史声明中缺失的 `ticks`、range 字符串属性和 drag handler 类型。
- 保留 ProgressBar 的 `hidden`/`indeterminate` class 行为、TextArea 的 resize class 和历史 `onResize` DOM 属性、SliderBar 的 popup、ticks、orientation、linear-gradient 计算及 range 事件转发。
- 更新对应 public `.d.ts` 和根入口类型导出；构建后的 `src/lib/dist` 声明与 ESM 产物已同步。
- consumer 类型测试现覆盖八个已迁移组件；单元测试共 18 个，覆盖渲染、状态/disabled 和事件行为。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm test:consumer`、`pnpm --filter react-winui pack --dry-run`。
- 当前仍未迁移：`Accordion`、`Alert`、`AppContainer`、`AppTheme`、`ButtonGroup`、`ColorPicker`、`Dialog`、`ImageView`、`InputSearch`、`Link`、`Loaders`、`MenuBar`、`NavBar`、`SelectMenus`、`SplashScreen`、`TableView`。

# 阶段 3 第三批 handoff

- 已将 `Link`、`Loaders/LoaderBar`、`Loaders/LoaderBusy` 的真实实现从 `.js` 迁移到 `.tsx`。
- `LinkProps` 基于 React Router `LinkProps` 扩展，保留默认 `to="#"`、`className`/`style` 的历史覆盖顺序和路由事件属性；未改动 DOM 结构或视觉 class。
- `LoaderBar` 保留 `setTheme`、`isLoading` 及四个 loader ball 的 DOM；`LoaderBusy` 补齐 `size`、`setTheme`、`isLoading` 和原有 `div` 原生属性透传。
- 更新三个组件的 public `.d.ts`、根入口类型导出和 `src/lib/dist` 构建产物；consumer 类型检查覆盖三组新增 Props。
- 新增 Link 路由点击测试、LoaderBar 动画/主题测试、LoaderBusy 尺寸/主题/加载/原生属性测试；单元测试共 21 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm test:consumer`、`pnpm --filter react-winui pack --dry-run`。
- 当前仍未迁移：`Accordion`、`Alert`、`AppContainer`、`AppTheme`、`ButtonGroup`、`ColorPicker`、`Dialog`、`ImageView`、`InputSearch`、`MenuBar`、`NavBar`、`SelectMenus`、`SplashScreen`、`TableView`。

# 阶段 3 第四批 handoff

- 已将 `AppContainer`、`ButtonGroup`、`SplashScreen` 的真实实现从 `.js` 迁移到 `.tsx`。
- `AppContainerProps` 补齐 `style` 与 `children` 类型，并保留 Appearance 初始化、系统主题监听和原有容器 class；未改变主题副作用逻辑。
- `ButtonGroup` 使用 `forwardRef<HTMLDivElement, ButtonGroupProps>`，Props 基于 `HTMLAttributes<HTMLDivElement>`，保留原有 className 覆盖顺序、原生 div 属性和 DOM ref。
- `SplashScreenProps` 使用 `ReactNode` 表示 title、subtitle、logo，保留默认值、定时可见状态、背景色和 DOM/class 结构；补齐旧声明中遗漏的 `logo`。
- 更新三个组件的 public `.d.ts`、根入口类型导出、consumer 类型样例和 `src/lib/dist` 构建产物。
- 新增 AppContainer 主题/样式测试、ButtonGroup ref/事件测试、SplashScreen 定时可见性测试；单元测试共 24 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm --filter react-winui typecheck`、`pnpm test:consumer`。
- 当前仍未迁移：`Accordion`、`Alert`、`AppTheme`、`ColorPicker`、`Dialog`、`ImageView`、`InputSearch`、`MenuBar`、`NavBar`、`SelectMenus`、`TableView`。

# 阶段 3 第五批 handoff

- 已将 `ColorPicker/ColorPickerItem` 与 `ColorPicker/ColorPickerPalette` 的真实实现从 `.js` 迁移到 `.tsx`。
- `ColorPickerItemProps` 显式定义 radio swatch 的名称、颜色、禁用、默认选中、尺寸和 change handler 类型。
- `ColorPickerPaletteProps` 基于 `InputHTMLAttributes<HTMLInputElement>` 扩展，保留原生 color 输入属性、颜色状态、尺寸、禁用状态和 change handler。
- 保留两个组件的 label/input/div DOM 结构、现有 class、默认颜色 `#eee`、swatch 样式及 palette 的内部颜色状态更新逻辑。
- 更新两个组件的 public `.d.ts`、根入口类型导出、consumer 类型样例和 `src/lib/dist` 构建产物；format 脚本已纳入本批次文件。
- 新增 ColorPickerItem 的 radio 状态/属性/事件测试和 ColorPickerPalette 的颜色状态/禁用/事件测试；单元测试共 26 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm --filter react-winui typecheck`、`pnpm test:consumer`、`pnpm --filter react-winui pack --dry-run`。
- 当前仍未迁移：`Accordion`、`Alert`、`AppTheme`、`Dialog`、`ImageView`、`InputSearch`、`MenuBar`、`NavBar`、`SelectMenus`、`TableView`。

# 阶段 3 第六批 handoff

- 已将 `SelectMenus/SelectNative` 与 `InputSearch/InputSearchBar` 的真实实现从 `.js` 迁移到 `.tsx`。
- `SelectNative` 新增 `SelectNativeOption`，明确 option 的 `value` 与 `label` 类型，并基于 `SelectHTMLAttributes<HTMLSelectElement>` 保留原生 select 属性、禁用状态和事件。
- `InputSearchBar` 基于 `InputHTMLAttributes<HTMLInputElement>` 保留原生搜索输入属性、`forwardRef<HTMLInputElement>`、宽度和 tooltip；`onSubmit` 明确定义为接收当前 value 的搜索提交回调。
- 保留原有 select/input/button DOM 结构、class、默认 option 数据、默认 placeholder、rest props 顺序和 submit 行为；未修改样式。
- 更新两个组件的 public `.d.ts`、根入口类型导出、consumer 类型样例和 `src/lib/dist` 构建产物；format 脚本已纳入本批次文件。
- 新增 SelectNative option/selection/disabled 测试和 InputSearchBar change/submit/ref/disabled 测试；单元测试共 30 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm --filter react-winui typecheck`、`pnpm test:consumer`、`pnpm --filter react-winui pack --dry-run`。
- 当前仍未迁移：`Accordion`、`Alert`、`AppTheme`、`Dialog`、`ImageView`、`InputSearchBox`、`Select`、`MenuBar`、`NavBar`、`TableView`。

# 阶段 3 第七批 handoff

- 已将 `ImageView` 的真实实现从 `.js` 迁移到 `.tsx`。
- `ImageViewProps` 基于 `ImgHTMLAttributes<HTMLImageElement>`，明确 `src`、objectFit、wrapper 尺寸/间距/圆角、loading 状态和无参数 load/error 回调类型。
- 保留默认尺寸 `124`、默认 alt `image`、默认 objectFit `cover`、wrapper/image/loader DOM 层级、class、加载状态与显式 `isLoading` 行为。
- 保留历史 `onLoad`/`onError` 回调被调用时不传原生事件参数的运行时行为；未修改样式或 DOM。
- 更新 public `.d.ts`、根入口类型导出、consumer 类型样例、format 脚本和 `src/lib/dist` 构建产物。
- 新增 ImageView 初始加载、load、error 和显式 loading 测试；单元测试共 32 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm --filter react-winui typecheck`、`pnpm test:consumer`、`pnpm --filter react-winui pack --dry-run`。
- 构建仍输出既有 Dart Sass `@import` deprecation warning 与 docs 大 chunk warning；本批次没有处理这些非阻塞遗留项。
- 当前仍未迁移：`Accordion`、`Alert`、`AppTheme`、`Dialog`、`InputSearchBox`、`Select`、`MenuBar`、`NavBar`、`TableView`。

# 阶段 3 第八批 handoff

- 已将 `AppTheme` 的真实实现从 `.js` 迁移到 `.tsx`。
- 新增 `AppThemeProps` 与 `AppThemeScheme`，将历史颜色 `any` 收紧为字符串，并明确 `light`、`dark`、`system`、`current` 主题方案。
- 保留 `React.memo`、初次渲染的 `Appearance` 主题副作用、memo comparator 中的颜色变量更新与回调触发行为；未修改 DOM 输出、样式或主题 API。
- 更新 public `.d.ts`、根入口类型导出、consumer 类型样例、format 脚本和 `src/lib/dist` 构建产物。
- 新增 AppTheme 的主题切换、颜色变量更新和可选回调测试；单元测试共 33 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm --filter react-winui typecheck`、`pnpm test:consumer`、`pnpm --filter react-winui pack --dry-run`。
- 构建仍输出既有 Dart Sass `@import` deprecation warning 与 docs 大 chunk warning；本批次没有处理这些非阻塞遗留项。
- 当前仍未迁移：`Accordion`、`Alert`、`Dialog`、`InputSearchBox`、`Select`、`MenuBar`、`NavBar`、`TableView`。

# 阶段 3 第九批 handoff

- 已将 `Alert` 的真实实现从 `.js` 迁移到 `.tsx`。
- 新增 `AlertHandle`、`AlertProps`、`AlertSlotProps` 与 `AlertComponent`，明确 `open`/`close` imperative ref、ReactNode 内容和 `Header`/`Footer` compound component 类型。
- 保留原有 alert wrapper/modal DOM、class、遮罩点击判断、滚动锁定、标题/消息渲染和 `Alert.Header`/`Alert.Footer` 静态 API；保留 `ui-alert-haeder` 历史 class 拼写。
- 使用内部 HTML ref 承载 DOM，forwarded ref 只暴露 `open`/`close` handle，避免原实现同一 ref 同时绑定 DOM 与 imperative handle 时的类型冲突；未改变外部 imperative API 或视觉结构。
- 更新 public `.d.ts`、根入口类型导出、consumer 类型样例、format 脚本和 `src/lib/dist` 构建产物。
- 新增 Alert 内容、compound slots、imperative open/close、backdrop click、controlled visibility 和 scroll lock 测试；单元测试共 35 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm --filter react-winui typecheck`、`pnpm test:consumer`、`pnpm --filter react-winui pack --dry-run`。
- 构建仍输出既有 Dart Sass `@import` deprecation warning 与 docs 大 chunk warning；本批次没有处理这些非阻塞遗留项。
- 当前仍未迁移：`Accordion`、`Dialog`、`InputSearchBox`、`Select`、`MenuBar`、`NavBar`、`TableView`。

# 阶段 3 第十批 handoff

- 已将 `Dialog` 的真实实现从 `.js` 迁移到 `.tsx`。
- 新增 `DialogHandle`、`DialogProps`、`DialogSlotProps` 与 `DialogComponent`，明确 imperative ref、modal style 和 `Body`/`Footer` compound component 类型。
- 保留原有 dialog wrapper/modal DOM、class、遮罩点击判断、滚动锁定、backdrop blur 和 Body/Footer 静态 API；未修改视觉 CSS。
- 使用内部 HTML ref 承载 DOM，forwarded ref 只暴露 `open`/`close` handle，沿用 Alert 批次的 ref 类型模式。
- 更新 public `.d.ts`、根入口类型导出、consumer 类型样例、format 脚本和 `src/lib/dist` 构建产物。
- 新增 Dialog slot 样式、imperative open/close、backdrop click 和 controlled visibility 测试；单元测试共 37 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm --filter react-winui typecheck`、`pnpm test:consumer`、`pnpm --filter react-winui pack --dry-run`。
- 构建仍输出既有 Dart Sass `@import` deprecation warning 与 docs 大 chunk warning；本批次没有处理这些非阻塞遗留项。
- 当前仍未迁移：`Accordion`、`InputSearchBox`、`Select`、`MenuBar`、`NavBar`、`TableView`。

# 阶段 3 第十一批 handoff

- 已将 `Accordion` 的真实实现从 `.js` 迁移到 `.tsx`。
- 新增 `AccordionProps`、`AccordionSlotProps` 与 `AccordionComponent`，明确 `Trigger`/`Body` compound slots、header/body 样式和展开/收起回调。
- 保留原有 accordion root/header/body DOM、class、`aria-expanded`、`headerTitle` fallback、panel height 计算、resize listener 和 callbacks；未修改视觉 CSS。
- 通过 displayName 筛选 `Trigger`/`Body` 子节点，并以类型安全的 React element 检查替代历史未类型化的 `child.type` 访问；没有引入 `any`。
- 更新 public `.d.ts`、根入口类型导出、consumer 类型样例、format 脚本和 `src/lib/dist` 构建产物。
- 新增 Accordion compound slot、headerTitle fallback、style 和 expand/collapse 测试；单元测试共 39 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm --filter react-winui typecheck`、`pnpm test:consumer`、`pnpm --filter react-winui pack --dry-run`。
- 构建仍输出既有 Dart Sass `@import` deprecation warning 与 docs 大 chunk warning；本批次没有处理这些非阻塞遗留项。
- 当前仍未迁移：`InputSearchBox`、`Select`、`MenuBar`、`NavBar`、`TableView`。

# 阶段 3 第十二批 handoff

- 已将 `InputSearch/InputSearchBox` 的真实实现从 `.js` 迁移到 `.tsx`。
- 新增 `InputSearchSuggestion` 与 `InputSearchBoxProps`，基于 `InputHTMLAttributes<HTMLInputElement>` 保留原生搜索输入属性，并明确 suggestion 文本、图标、点击回调、宽度、tooltip 与 change handler 类型。
- 使用 `forwardRef<HTMLInputElement>` 保留输入框 DOM ref；保留默认 placeholder、suggestion 过滤、列表 `show` class 切换、tooltip wrapper、原有 class 与 DOM 结构。
- 更新 public `.d.ts`、根入口类型导出、consumer 类型样例、format 脚本和 `src/lib/dist` 构建产物；没有修改视觉 CSS 或公共运行时行为。
- 新增 suggestion 过滤、列表状态、点击回调、change/ref 转发和 disabled 测试；单元测试共 41 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm --filter react-winui typecheck`、`pnpm test:consumer`、`pnpm --filter react-winui pack --dry-run`。
- 构建仍输出既有 Dart Sass `@import` deprecation warning 与 docs 大 chunk warning；本批次没有处理这些非阻塞遗留项。
- 当前仍未迁移：`Select`、`MenuBar`、`NavBar`、`TableView`。

# 阶段 3 第十三批 handoff

- 已将 `SelectMenus/Select` 的真实实现从 `.js` 迁移到 `.tsx`。
- 新增 `SelectOption`、`SelectOptionValue`、`SelectChangeHandler` 与 `SelectProps`，根据运行时数据结构明确 `value`、`label`、可选 `icon` 以及 value 回调。
- 保留自定义 trigger、tooltip、默认选中项、列表 selected/show/reverse/backdrop blur class、外部点击关闭和 `ScrollView` 滚动锁定行为；未修改 DOM 结构或视觉 CSS。
- 更新 public `.d.ts`、根入口类型导出、consumer 类型样例、format 脚本和 `src/lib/dist` 构建产物；修正旧声明中错误的 `string[]` data 与无参 onChange 类型。
- 新增默认选择、菜单开关、选项选择、回调、滚动锁定、custom trigger 和外部点击测试；单元测试共 43 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm --filter react-winui typecheck`、`pnpm test:consumer`、`pnpm --filter react-winui pack --dry-run`。
- 构建仍输出既有 Dart Sass `@import` deprecation warning 与 docs 大 chunk warning；本批次没有处理这些非阻塞遗留项。
- 当前仍未迁移：`MenuBar`、`NavBar`、`TableView`。

# 阶段 3 第十四批 handoff

- 已将 `MenuBar` 及其现行入口使用的 `MenuItem`、`MenuList` 从 `.js` 迁移到 `.tsx`。
- 新增 `MenuBarHandle`、`MenuBarProps`、`MenuBarComponent`、`MenuBarItemProps`、`MenuBarSubMenuProps`、`MenuBarDividerProps` 和相关 static compound component 类型。
- 保留 `openDialog`/`closeDialog` imperative ref、anchor 定位、`leftJustify`、reverse、backdrop blur、outside click、MenuItem 点击回调和 nested list show class；未修改正常菜单 DOM/class 或视觉 CSS。
- 使用 `Children.toArray`、类型化 element-of-type 收窄和 `MenuListHandle` 替代历史隐式 any/未类型化 ref；保留现有菜单渲染路径，不重构菜单状态机。
- 更新 public `.d.ts`、根入口类型导出、consumer 类型样例、format 脚本和 `src/lib/dist` 产物。
- 新增 imperative open/close、定位 class、Divider、item click、submenu toggle 和 outside click 测试；单元测试共 45 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm build`、`pnpm --filter react-winui typecheck`、`pnpm test:consumer`、`pnpm --filter react-winui pack --dry-run`。
- 构建仍输出既有 Dart Sass `@import` deprecation warning 与 docs 大 chunk warning；本批次没有处理这些非阻塞遗留项。
- `src/lib/src/components/MenuBar/Menu/SubMenu.js` 未被现行 `MenuBar` 入口引用，暂作为遗留死文件保留。
- 当前仍未迁移：`NavBar`、`TableView`。

# 阶段 3 第十五批 handoff

- 已将剩余 `NavBar` 五个组件、`TableView` 和未接入的 `MenuBar/Menu/SubMenu` helper 迁移到 TS/TSX，并补齐显式 Props 与对应声明。
- `NavBar` 保留 responsive collapse、overlay scroll lock、scroll shadow、active link/badge/image、submenu height、theme switch 和 page container 行为；`TableView` 保留排序、恢复原序、sort icon、header/footer slot 和现有 class/样式。
- 已将 `Appearance`、`ScrollView`、`getScreenOffset`、hooks、`LoaderBusyWrapper` 和 library root entry 一并迁移，Vite entry 与 workspace source path 改为 `src/lib/src/index.ts`。
- root TS entry 暴露的 `AlertComponent`/`DialogComponent` 与实现同步，避免手写 `.d.ts` 与 TS 源码导出不一致。
- 更新 consumer 类型样例、format 脚本与 dist 产物；新增 NavBar/TableView 相关测试，单元测试总数为 55 个。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`、`pnpm format:check`、`pnpm --filter react-winui typecheck`、`pnpm test:consumer`、`pnpm build`、`pnpm --filter react-winui pack --dry-run`。
- `src/lib/src` 已无 `.js`/`.jsx` 源文件。阶段 3 完成，下一步等待用户指定，不自动进入阶段 4。

# Sass 模块化迁移 handoff

- 已将 `src/lib/scss` 中全部 Sass `@import` 迁移为 `@use`，包括入口、主题、组件聚合、NavBar/Select 子模块和浏览器模块。
- 使用 `_base/parents.scss` 的组件显式引入该模块，保留历史 `@extend` 选择器行为；移动端 mixin 改为命名空间调用。
- `pnpm --filter react-winui build:styles` 和完整 `pnpm build` 均不再输出 Sass `@import` 弃用警告。
- 基线 CSS 与新 CSS 的规则/声明结构一致；只有 selector list 的生成顺序变化，未改变视觉规则。
- 当前仅剩 docs 大 chunk warning；未在本任务中改动代码分包策略。

# 阶段 4 Design Tokens handoff

- 已新增 `src/lib/scss/themes/tokens.scss`，提供 `--rwu-*` 语义 token，覆盖颜色、surface、border、圆角、间距、阴影和动效分类。
- token 层通过现有 `--color-*` 变量解析；`[data-theme="dark"]`、`Appearance`、`AppTheme` 及主色变量行为保持不变，旧变量和历史拼写暂不删除。
- 已将全部组件与浏览器 SCSS 消费端的旧 `--color-*` / `--PrimaryColor*` 引用替换为 token，覆盖基础父选择器、Button、Body、Dialog、Alert、MenuBar、TableView、InputText、Checkbox、Switch、Links、ButtonGroup、ProgressBar、Select、NavBar、RadioButton、SliderBar、Loader、ColorPicker、AlertBar、滚动条等；没有修改 DOM、Props、className 或组件结构。
- 新增 `docs/design-system.md`，记录 token 分类、主题机制、兼容策略和新组件使用规范；README 已增加文档入口。
- `src/lib/dist/react-winui.min.css` 已由 Sass 构建更新并纳入变更。
- 验证通过：`pnpm --filter react-winui build:styles`、`pnpm lint`、`pnpm typecheck`、`pnpm test`（2 files / 55 tests）、`pnpm build`。
- 额外审计：编译 CSS 中 70 个 `--rwu-*` 声明、59 个使用点，缺失声明 0；本阶段触碰文件均为 UTF-8 无 BOM。
- 已知遗留：docs 构建仍有既有大 chunk warning；阶段 5 再建立 Playwright 与截图基线，本阶段未引入视觉回归基础设施。
- 全量迁移复核：组件/浏览器 SCSS 中旧变量消费端为 0；最新编译 CSS 为 75 个 token 声明、67 个使用点，缺失声明 0。

# 阶段 5 handoff

- 保留现有 Vitest + React Testing Library 体系，并在 `vitest.config.js` 中排除 `tests/browser/**`，避免 Playwright spec 被 Vitest 误识别；现有单元/交互测试为 55 个。
- 新增 `@playwright/test`、`playwright.config.js` 和 `tests/browser/vite.config.js`，使用独立 Vite fixture 运行真实 Chromium 测试；失败截图、trace、video 和 HTML report 写入 `output/playwright`。
- 新增 `tests/browser/main.jsx` 与 `fixture.css`，加载既有 `app-config.css` 和完整 Sass 样式，挂载全部 31 个公共视觉组件/复合组件；状态由 fixture 控制，不修改正式组件 DOM、Props 或视觉规则。
- 新增 `tests/browser/visual.spec.js`，覆盖 Button 状态、light/dark 面板、Accordion、Select、Alert/Dialog、搜索建议、SplashScreen、MenuBar、NavBar 桌面/移动端、TableView 排序，以及键盘/主题/提交行为。
- 新增 34 张 Chromium Windows 截图基线，位于 `tests/browser/snapshots/visual.spec.js-snapshots/`；`pnpm test:browser:update` 是显式更新入口，普通 `pnpm test:browser` 不会接受新截图。
- 新增 `.github/workflows/ci.yml`，在 `windows-latest` 执行 install、Chromium 安装、lint、typecheck、unit test、consumer build、production build 和 Playwright visual regression，并上传失败产物。
- README 已记录 `pnpm test:browser` 和 `pnpm test:browser:update`；`output/playwright` 已加入 `.gitignore`。
- 验证通过：`pnpm format:check`、`pnpm lint`、`pnpm typecheck`、`pnpm test`（55 tests）、`pnpm test:consumer`、`pnpm build`、`pnpm test:browser`（33 tests）。
- 已知遗留：docs production build 仍有既有大 chunk warning；本阶段没有改变 docs 分包策略。

# 阶段 5 follow-up：移除 fixture defaultProps warning

- 公共源码中全部静态 `defaultProps` 已迁移为参数默认值或内部 fallback；`AppTheme` 回调、Select 选择逻辑和旧 Props 行为保持不变。
- `ColorPickerPalette` 增加默认 noop change handler，避免受控 color input 产生 React read-only warning。
- Playwright `beforeEach` 监听浏览器 console，并对 `Support for defaultProps` 与 page runtime error 做回归断言；当前 33 个浏览器测试均通过。
- Playwright 全量 fixture 使用 2 workers、60 秒 test timeout，避免 Windows 下并发浏览器 teardown 资源竞争；截图更新仍必须显式执行。
- 验证通过：`pnpm format:check`、`pnpm lint`、`pnpm typecheck`、`pnpm test`（55 tests）、`pnpm test:browser`（33 tests）、`pnpm build`、`pnpm test:consumer`。

# 阶段 5 全库视觉保护扩展

- 按公共 root export 盘点组件，fixture 覆盖 AppContainer、NavBar 系列、NavPageContainer、Accordion、Alert、Button、ButtonGroup、Checkbox、ColorPicker、Dialog、ImageView、InputText、InputSearch、Link、Loaders、MenuBar、ProgressBar、RadioButton、Select、SelectNative、SliderBar、SplashScreen、Switch、TableView、TextArea；AppTheme/Appearance 由主题行为与 console 回归覆盖。
- 34 张基线按 panel 与高风险状态拆分，包含 light/dark 主题、桌面/移动 NavBar、弹层、菜单、搜索建议、排序、加载和媒体状态；不依赖完整 docs 页面，避免文档路由变化污染组件回归。
- 视觉基线首次生成后已使用 `view_image` 审阅代表性 controls、selection、feedback、loading、desktop/mobile navigation 截图，并修正 fixture-only 的布局裁切与不可见 loader 展示问题。
- 所有基线均通过未更新模式验证；CI 仍在 `windows-latest` 生成/消费 `chromium-win32` 基线。

# Demo 收敛到 @evanpatchouli/react-winui@1.0.0

- 当前 docs Demo 已从历史 `v4.2.4` 目录迁移为 `src/demo/v1.0.0`，根路由统一跳转到 `/v1.0.0/home`。
- Demo 运行时和示例代码统一使用 `@evanpatchouli/react-winui`、`styles.css`、`config/app-config.css` 与 icons exports；不再直接引用 `src/lib/src` 或本地 `_lib` 副本。
- 已删除历史 `src/demo/v4.2.0`、`src/demo/v4.2.1`、`src/demo/v4.2.2` 以及原 `v4.2.4/_lib`。
- `apps/docs` 新增 `@evanpatchouli/react-winui: workspace:*` 依赖，锁文件已同步。
- 验证通过：`pnpm format:check`、`pnpm lint`、`pnpm typecheck`、`pnpm test`（55 tests）、`pnpm test:consumer`、`pnpm build`、`pnpm test:browser`（33 tests）。
- 已知遗留：docs production build 仍有既有大 chunk warning；组件库 package metadata 中的原始上游 homepage/repository 未在本次 Demo 收敛中改动。

# 阶段 6 handoff：Tooltip

- 新增 `src/lib/src/components/Tooltip/index.tsx` 及 public declaration，支持 hover/focus、show/hide delay、controlled/uncontrolled、Escape/click/visibility close、placement fallback、ARIA relationship、arrow 和 disabled。
- 新增 `src/lib/scss/components/Tooltip.scss`，只消费现有 `--rwu-*` token；更新 Sass 聚合入口、root export、package `./tooltip` subpath export 和 dist 产物。
- 新增 docs Demo、consumer 类型导入检查、9 个 Tooltip unit/RTL tests、3 个 Playwright Tooltip tests，以及 light/dark 视觉基线；浏览器总用例为 36 个。
- 参考 Microsoft WinUI Tooltip 行为和 Fluent UI v9 API/可访问性思路，但未复制实际源码、Griffel 样式或 Fluent token，因此无需 `THIRD_PARTY_NOTICES.md`。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（64 tests）、`pnpm test:consumer`、`pnpm build`、`pnpm test:browser`（36 tests）、`pnpm format:check`。
- 已知遗留：docs production build 仍有既有大 chunk warning；阶段 7 尚未开始。

# 阶段 6 follow-up：Tooltip 实心背景

- Tooltip 主体和箭头已从 `--rwu-color-surface-flyout-translucent` 切换为 `--rwu-color-surface-flyout`；Select/MenuBar 的 Flyout 半透明 token 未改变。
- 已重新生成 `src/lib/dist/react-winui.min.css`，并更新 Tooltip light/dark 快照。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（64 tests）、`pnpm test:consumer`、`pnpm build`、`pnpm test:browser`（36 tests）。

# 阶段 6 follow-up：Tooltip 阴影与圆角

- Tooltip 圆角收敛为 `--rwu-radius-small`（4px）。
- 新增并应用由两层 `drop-shadow` 组成的 `--rwu-shadow-tooltip`；通用 Flyout shadow 未改动。
- 两层阴影均向下偏移，第二层收缩为 `0 2px 2px`，避免顶部环境光晕和 Tooltip 底部阴影长尾。
- 已更新 Tooltip light/dark 视觉基线；全量 36 个 Playwright 用例通过。

# 阶段 6 follow-up：移植 Theme/Shadows 并应用 shadow8

- 在 `src/lib/scss/themes/tokens.scss` 新增 `--rwu-shadow-2`、`--rwu-shadow-4`、`--rwu-shadow-8`、`--rwu-shadow-16`、`--rwu-shadow-28` 和 `--rwu-shadow-64` 层级 token，并抽取 ambient/key 阴影颜色 token。
- Tooltip 改用 `box-shadow: var(--rwu-shadow-8)`；之前的 Tooltip 专用 `drop-shadow` token 已移除，通用 Flyout 阴影保持不变。

# 阶段 6 follow-up：Theme CSS token 引用层

- 新增 `src/lib/src/theme/index.ts` 与对应 declaration，提供 `Shadows.shadow2` 至 `Shadows.shadow64`、`none`、`flyout`、`flyoutNested`、`dialog`、`alert`，所有值均为 `var(--rwu-*)` 引用。
- 新增 package `./theme` exports；consumer 已验证 `import { Shadows } from "@evanpatchouli/react-winui/theme"` 的类型解析、运行时解析和 `boxShadow` 使用。
- README 与 `docs/design-system.md` 已补充 CSS token 引用层用法；真实值仍由 Sass/CSS token 层维护。
