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

# 阶段 6 follow-up：组件借鉴规范整理

- 新增 `docs/component-migration-guidelines.md`，集中记录 WinUI / Windows 11 与 Fluent UI v9 的参考优先级、可借鉴/禁止复制边界、API、无障碍、视觉 token、测试、许可和完成标准。
- 文档以 Tooltip 作为首个模板，明确 `aria-describedby`、实心 surface、`--rwu-shadow-8`、测试矩阵和停止边界。
- README 与 `docs/design-system.md` 已增加规范入口；未修改组件实现或 public API。

# 阶段 7 P0 首个组件组：Popover / Flyout

- 新增 `src/lib/src/components/Popover/index.tsx` 与 public declaration，支持 click toggle、controlled/uncontrolled、`onOpenChange`、`openOnHover`、show/hide delay、outside pointer light-dismiss、Escape、visibility close、scroll close、placement fallback、arrow、ARIA trigger state、`trapFocus`、`autoFocus`、`restoreFocus` 和 disabled。
- 新增 `src/lib/src/components/Flyout/index.tsx` 作为同 API 的语义别名；没有复制第二套状态机或视觉 recipe。
- 新增 `src/lib/scss/components/Popover.scss`，只使用现有 `--rwu-*` token（surface、divider、flyout radius、shadow8、spacing、motion），并接入 Sass 聚合入口；没有修改旧组件颜色、圆角、阴影、DOM 或 class。
- root export、`./popover`、`./flyout` package exports、类型声明和 build dist 已同步；`pnpm pack --dry-run` 确认 Popover/Flyout ESM、`.d.ts`、CSS 和必要包资产进入 tarball，未包含 docs/tests/source。
- 新增 `tests/popover.test.tsx`，覆盖 render/ARIA、portal、controlled visibility、outside pointer、Escape、hover delay、autoFocus、focus trap、自定义 Enter/Space trigger、disabled 和 Flyout alias；全量 Vitest 当前为 70 tests。
- `tests/browser` 新增 Popover/Flyout fixture、click/Escape 交互、light/dark surface 和 3 张 Chromium Windows visual baselines；全量 Playwright 当前为 39/39，通过后才显式更新新快照。
- docs Demo 新增 `Popover_docs`，同步导航、路由、搜索建议、README、design-system 和 component migration guidelines；consumer 示例覆盖 root import 与 `popover`/`flyout` subpath 及类型。
- 参考 WinUI Flyout 的 light-dismiss / Escape 行为，以及 Fluent UI React v9 Popover 的 controlled state、portal、定位与 focus 思路；没有复制实际 Fluent UI 源码、Griffel 样式或 Fluent token，因此无需 `THIRD_PARTY_NOTICES.md`。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（69 tests）、`pnpm test:consumer`、`pnpm build:library`、`pnpm build:docs`、`pnpm build`、`pnpm test:browser`（39 tests）和新增文件 Prettier check。
- 已知遗留：docs production build 仍有既有大 chunk warning；阶段 7 的 `Menu`、`ContextMenu`、`Toast`、`InfoBar` 等尚未开始，等待下一次明确指定。

# 阶段 7 P0 去重与 MenuBar 二级菜单修复

- 用户确认取消新增公共 `Menu`，避免与现有 `MenuBar` 的弹出命令、Item、SubMenu 和 Divider 能力重复；此前生成的新 Menu 源码、docs、exports、测试和快照均未提交并已清理。
- `MenuList` 现在通过调用方传入的内部 public marker 精确识别 `MenuBar.Item`，不再错误地只接受内部 renderer；单个和多个直接二级项都能正常渲染。
- 二级项的既有 `onClick` 会转发给内部 renderer，点击后回调触发一次，主菜单和二级菜单均关闭；未修改公共 Props、DOM/className、SCSS 或视觉 token。
- 新增 RTL 回归覆盖多个二级项、目标项可见、回调与关闭行为；Playwright 覆盖打开主菜单、打开二级菜单、点击 Settings、状态更新和关闭，并新增精确的二级浮层视觉基线。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（71 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm test:browser`（39 tests）和本次触碰文件 Prettier check。
- 已知遗留：全量 `pnpm format:check` 仍被 4 个本次未修改的既有文件阻断；docs build 仍有既有大 chunk warning。下一步需重新确认去重后的 P0 组件清单。

# 阶段 7 P0 ContextMenu

- 新增 `ContextMenu`、`ContextMenu.Item` 与 `ContextMenu.Divider`，支持右键、`Shift+F10`、Context Menu 键、controlled/uncontrolled open、portal、viewport clamp、outside/Escape/Tab light-dismiss、焦点恢复、disabled、方向键/Home/End/字符导航和 Enter/Space activation。
- 复用 `MenuBar` 的 surface / item class 与 Sass 视觉骨架；新增 SCSS 只消费现有 `--rwu-*` token，没有复制 Fluent UI visual recipe，也没有修改旧组件颜色、圆角、阴影或 DOM。
- root export、`./context-menu` package subpath、ESM、`.d.ts`、CSS dist、consumer root/subpath/types/runtime、docs Demo/导航/路由/API 说明均已接入；`pnpm pack --dry-run` 确认 ContextMenu JS、declaration 和 CSS 进入发布包，docs/tests 不进入包。
- 新增 9 个 ContextMenu Vitest/RTL tests，覆盖 pointer/keyboard open、ARIA、portal、controlled state、disabled、menu navigation、selection、Escape/outside/Tab、focus restore 与 viewport clamp；Tab 回归明确断言关闭事件不被取消且不强制回焦 trigger。
- Playwright 新增 5 个 ContextMenu 用例，实际覆盖右键、`Shift+F10`/Escape、命令选择、Tab 和 focus；新增 light/dark 2 张 Chromium Windows surface 快照，显式更新并人工审阅后以普通模式 44/44 复验。
- 参考 WinUI MenuFlyout、Fluent UI React v9 Menu/MenuTrigger 与 WAI-ARIA APG Menu Pattern；仅借鉴行为、API 和测试边界，未复制实际源码、Griffel 或 Fluent token。
- 验证通过：`pnpm format:check`、`pnpm lint`、`pnpm typecheck`、ContextMenu RTL（9/9）、`pnpm test`（共享工作树 106/106）、`pnpm test:consumer`、`pnpm build`、`pnpm test:browser:update`（44/44）、`pnpm test:browser`（44/44）、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、UTF-8 BOM 与 `git diff --check`。
- 已知遗留：本批未实现 submenu、checkbox/radio menuitem；docs build 仍有既有大 chunk warning。P0 其余组件由各自独立提交处理。

# 阶段 7 P0 Toast

- 新增默认导出的 `Toast` 与 named `Toaster`；支持 title/message/icon/action、intent、受控/非受控 open、自动消失、persistent、pointer/focus pause、close、Escape、polite/assertive live region、FIFO 队列、`maxVisible`、position、portal，以及 ref 命令式 `show` / `dismiss` / `dismissAll`。
- root export、`./toast` package subpath、ESM、`.d.ts`、CSS dist、consumer root/subpath/types/runtime、docs Demo/导航/路由/API 说明均已接入；相同 id 的 `show` 原位更新语义已有 RTL 回归锁定。
- 新增 10 个 Toast Vitest/RTL tests；Playwright 新增 4 个实际浏览器用例，覆盖 light/dark 三层堆栈、FIFO 队列晋升、焦点内 Escape 关闭、hover 暂停与剩余计时恢复，并新增 2 张 Chromium Windows 视觉基线。
- 参考 Windows notification UX、Windows dialogs/flyouts boundary、Fluent UI React v9 Toast guidance/custom timeout/pause/limit 与 WAI-ARIA live region；只借鉴行为、API 和测试边界，未复制源码、Griffel 或 Fluent token。
- 验证通过：`pnpm format:check`、`pnpm lint`、`pnpm typecheck`、Toast RTL（10/10）、`pnpm test`（共享工作树 108/108）、`pnpm test:consumer`、`pnpm build`、`pnpm test:browser:update`（Toast 4/4，首次全量 48/48）、`pnpm test:browser`（48/48）及 `pnpm --filter @evanpatchouli/react-winui pack --dry-run`。
- 已知遗留：当前没有 Provider/global dispatch、跨 Toaster 通知中心或系统级 Windows toast bridge；这些不属于应用内 Toast 的最小完整边界。docs production build 仍有既有大 chunk warning。

# 阶段 7 P0 InfoBar

- 新增默认导出的 `InfoBar`：支持 informational/success/warning/error、title/message、action、custom content、受控/非受控 open、可关闭/不可关闭、disabled、原生 div props、DOM ref 与可本地化 close label；`displayName` 已设置为 `InfoBar`。
- InfoBar 保持文档流内联 live region，与旧 Alert 的 modal overlay、scroll lock、imperative API 边界明确；informational 默认 status/polite，其余 severity 默认 alert/assertive，ARIA 默认值均可由 root props 覆盖。
- root export、全部 public types、`./info-bar` package subpath、ESM、`.d.ts`、CSS dist、consumer root/subpath/types/runtime、真实 docs Demo/导航/路由与轻量 API 文档均已接入。
- 新增 10 个 InfoBar Vitest/RTL tests；Playwright 新增 4 个浏览器用例，覆盖四 severity 与 status/alert 语义、非受控关闭/重建、受控关闭请求、light/dark，并新增 2 张 Chromium Windows 视觉基线。
- 参考 WinUI InfoBar、Fluent UI React v9 MessageBar types/tests 与 WAI-ARIA status/alert；只借鉴行为、API 和测试边界，未复制源码、Griffel 或 Fluent token。
- 验证通过：`pnpm format:check`、`pnpm lint`、`pnpm typecheck`、InfoBar RTL（10/10）、`pnpm test`（8 files / 108 tests）、`pnpm test:consumer`、`pnpm build`、`pnpm test:browser:update`（52/52）、`pnpm test:browser`（52/52）及 `pnpm --filter @evanpatchouli/react-winui pack --dry-run`；两张视觉基线已人工检查无裁切或布局异常。
- 已知遗留：现有 Design Tokens 没有 warning 专用色，当前用 `--rwu-color-text-primary` 与三角图标传达 warning；未实现自定义 severity icon/background API。docs production build 仍有既有大 chunk warning。build 会为共享工作树中的未集成 ComboBox 生成孤立 dist declaration，本提交明确不暂存该文件。

# 阶段 7 P0 ComboBox

- 新增默认导出的单选 `ComboBox`，覆盖 option data、controlled/uncontrolled value/open、editable controlled/uncontrolled text、自定义字符串提交、disabled/option disabled、typeahead、Arrow/Home/End/Enter/Space/Escape/Alt+Arrow 键盘行为、ARIA combobox/listbox/option、portal 与 viewport 定位。
- 审计确认旧 `Select` 仅支持默认值/点击，`SelectNative` 依赖浏览器原生 select，`InputSearchBox` 只提供搜索输入与 DOM class 筛选；三者都不具备新 ComboBox 的完整选择、editable、状态控制与无障碍边界，因此未改名复制或破坏旧 API。
- root export、全部 public types、`./combo-box` package subpath、ESM、`.d.ts`、CSS dist、consumer root/subpath/types/runtime、真实 docs Demo/导航/路由与轻量 API 文档均已接入。
- 新增 10 个 ComboBox Vitest/RTL tests；Playwright 新增 6 个浏览器用例，覆盖 select-only 键盘提交、disabled option、editable 筛选/选项/自定义提交、Escape/outside close、真实小 viewport 顶部 fallback 与 light/dark，并新增 2 张 Chromium Windows 视觉基线。
- 参考 WinUI ComboBox、Fluent UI React v9 Combobox base types/tests 与 WAI-ARIA APG Combobox Pattern；只借鉴行为、API 和测试边界，未复制源码、Griffel 或 Fluent token。
- 验证通过：`pnpm format:check`、`pnpm lint`、`pnpm typecheck`、`pnpm test`（8 files / 110 tests）、`pnpm test:consumer`、`pnpm build`、ComboBox 快照显式更新（6/6）、`pnpm test:browser`（58/58）及 `pnpm --filter @evanpatchouli/react-winui pack --dry-run`；两张视觉基线已人工检查无裁切、主题或 viewport 异常。首次全量浏览器运行仅遇到一次 Vite HMR WebSocket `ERR_NO_BUFFER_SPACE` 环境抖动，失败项单测与随后全量复验均通过。
- 已知边界：当前为单选且不内建虚拟化/异步数据获取；大数据或远程数据由调用方控制 `options` 和 `text`。docs production build 仍有既有大 chunk warning。

# 2026-08-24：InfoBar 操作项图标对齐修复

- 修复带 32px action 按钮时，20px severity 图标相对摘要行偏高 6px 的问题；普通 InfoBar、custom content、close button 和公共 API 均未改变。
- 通过内部 `ui-info-bar-with-action` 状态类和现有尺寸 token 计算桌面端补偿；480px 以下 action 换行时恢复首行顶端对齐。
- 新增 Playwright 几何回归断言，修复前稳定失败 6px，修复后文档页两个 action 示例中心偏差均为 0px。
- 验证通过：`pnpm format:check`、`pnpm lint`、`pnpm typecheck`、`pnpm test`（110/110）、`pnpm build`、`pnpm test:browser`（59/59）；docs build 仅保留既有大 chunk warning。

# 阶段 7 P1 八组件

- `NumberBox`、`AutoSuggestBox`、`TreeView`、`Expander`、`SettingsCard`、`SettingsExpander`、`CommandBar`、`NavigationView` 已完成并合入主线；每个组件均由独立 worktree 子智能体实施并单独提交。
- 新组件均补齐 TypeScript 实现/声明、root/subpath export、Sass、docs Demo、consumer 类型/构建样例、RTL 测试与 Playwright 视觉回归；旧 `InputSearchBox`、`Accordion`、`ButtonGroup`、`MenuBar`、`NavBar` 系列保持兼容。
- `SettingsExpander` 采用 header 行右侧 `content`/`action` 与展开区 `children`、`itemsHeader`/`itemsFooter` 分离的交互层级；collapsed/disabled 状态覆盖 inert、焦点回收和键盘边界。
- `NavigationView` 支持 WinUI 左侧 `expanded`、`compact`、`minimal`、`auto` pane、共享选择模型、nested items、footer/settings、overlay/light-dismiss、Back 与键盘焦点；当前不实现 Top pane 模式，详见 `docs/navigation-view.md`。
- 最终主线验证：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm test:browser`（98/98）和 `pnpm --dir src/lib pack --dry-run` 全部通过。
- 归档详见 `.agents/archive/2026-08-24-phase7-p1.md`；已知遗留为历史 Windows CRLF 导致全仓 format check 噪声与 docs 大 chunk warning，均不影响构建/测试/发布包。

# 2026-08-24：P0/P1 浮层视觉收敛

- 用户确认以 `C:\Users\31250\Pictures\pop-layer.png` 的 Windows 11 浮层质感为参考；已完成 Tooltip、Popover、Flyout、ContextMenu，以及 CommandBar 溢出菜单、ComboBox/AutoSuggestBox 列表、Toast 的独立浮层阴影接入。
- 新增 `--rwu-color-border-flyout`、`--rwu-shadow-overlay`、`--rwu-shadow-overlay-nested` 及 `Shadows.overlay/overlayNested`；旧 `--rwu-shadow-flyout` 保持不变以保护旧 MenuBar/Select。
- 更新 `docs/design-system.md`、Sass CSS dist、theme dist 与相关 overlay snapshots；浮层截图 helper 保留外侧阴影并结束入口动画。P1 visual fixture 改用已有 icon font，更新真实受影响的 NavBar 基线。
- ComboBox 顶部 fallback 测试改用 DOM click，避免 Playwright 自动滚动破坏预设边缘几何；这是测试稳定性修正，不是组件 API 变更。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、`pnpm test:browser`（98/98）；docs build 仍有既有大 chunk warning。
- 当前任务已完成；后续等待用户指定是否继续做具体 P0/P1 组件的逐项视觉校正，不自动进入新组件或大规模重设计。

# 2026-08-24：P1 控件 hover/箭头微调

- `src/lib/scss/components/ComboBox.scss` 与 `NumberBox.scss` 的 CSS chevron 改为 1px 细描边，视觉上与 `Select` 对齐。
- `src/lib/scss/components/NavigationView.scss` 将普通 item hover 背景提升至整行；selected/indicated 和 disabled item 的优先级保持不变。
- `tests/browser/visual.spec.js` 新增整行 hover 与 chevron stroke 回归断言；NumberBox light/dark 快照已更新。
- `AutoSuggestBox` 的 hover 不变灰约束保持有效。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、`pnpm test:browser`（101/101）。docs build 仅保留既有大 chunk warning。
- 当前任务已完成，等待用户下一项具体视觉校正。

# 2026-08-26：Toast 多条通知窗口式叠放

- `src/lib/src/components/Toast/index.tsx` 为可见 Toast 计算 stack level，最新条目为前景；`src/lib/scss/components/Toast.scss` 将 Toaster 改为共享网格层叠，并按四种 position 镜像 8px 偏移。
- `tests/browser/visual.spec.js` 新增层级与 bounding-box 顺序断言；`toast-stack-light/dark` 快照已更新，截图留白扩展到 32px 以保护后层边缘与阴影。
- 验证：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、完整 `pnpm test:browser`（104/104）。docs build 仍有既有大 chunk warning。
- 未解决事项：无；等待下一项用户指定的视觉校正。

# 2026-08-26：InfoBar / SettingsExpander 阴影样式

- `src/lib/scss/components/InfoBar.scss:13` 与 `src/lib/scss/components/SettingsExpander.scss:9` 现在使用 `var(--rwu-shadow-card)`，与 `SettingsCard` 根容器一致。
- `tests/browser/visual.spec.js` 新增 Light/Dark computed shadow 一致性回归；InfoBar、SettingsExpander 的既有 Light/Dark/响应式快照通过显式更新流程检查，无需产生快照变更。
- 验证：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、`pnpm test:browser`（104/104）。docs build 仍有既有大 chunk warning。
- 未解决事项：无；等待下一项用户指定的视觉校正。

# 2026-08-26：ComboBox / NumberBox 箭头样式

- 新增 `src/lib/scss/components/_base/_select-chevron.scss`，集中维护 Select 的 14px Light/Dark SVG 箭头资源。
- `src/lib/scss/components/Select.scss`、`ComboBox.scss`、`NumberBox.scss` 均接入共享 mixin；ComboBox 展开态、NumberBox 增量态用 `rotate(180deg)` 切换方向，移除旧的 CSS border chevron 描边规则。
- `tests/browser/visual.spec.js` 将旧的 border 宽度断言替换为 Select/ComboBox/NumberBox 实际背景资源一致性断言；NumberBox Light/Dark 快照保持不变。
- 验证：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、`pnpm test:browser`（103/103）。docs build 仍有既有大 chunk warning。
- 未解决事项：无；等待下一项用户指定的视觉校正。

# 2026-08-24：SettingsCard 阴影与 AutoSuggestBox hover 修正

- `SettingsCard` 改用新增的 `--rwu-shadow-card`，light/dark theme 均有对应的柔和阴影；新增 `Shadows.card` 导出和设计系统 token 文档。
- `AutoSuggestBox` 输入框、Clear、Submit hover 均保持原 surface，不再受到全局按钮 `brightness/opacity` 灰化；active 状态未移除。
- `tests/browser/visual.spec.js` 扩展 hover 与 card shadow 回归，覆盖 input、两个内部动作按钮和 `--rwu-shadow-card` 计算值；SettingsCard light/dark 快照已复核，像素差低于更新阈值因此保持原基线字节。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、`pnpm test:browser`（101/101）。docs build 仅保留既有大 chunk warning。
- 当前任务已完成，等待用户下一项具体视觉校正。

# 2026-08-26：AutoSuggestBox 聚焦 Hover 修正

- `src/lib/scss/components/AutoSuggestBox.scss` 将输入框 Hover 选择器从排除 `:focus` 改为仅排除 `:disabled`，修复已聚焦输入框在鼠标 Hover 时仍被 `.input-btn-default:hover` 的 `brightness/opacity` 灰化的问题；没有改变 DOM、Props 或 active 状态。
- `tests/browser/visual.spec.js` 在现有 AutoSuggestBox hover 回归中增加 focus 后再次 Hover 的 computed-style 对比，锁定背景、滤镜与透明度保持不变。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、AutoSuggestBox 浏览器用例（6/6）与完整 `pnpm test:browser`（102/102）。docs build 仅保留既有大 chunk warning；首次完整回归的一次 `gallery-ready` 初始化超时已通过单测重跑及随后完整复验排除为代码问题。
- 当前任务已完成，等待用户下一项具体视觉校正。

# 2026-08-26：AutoSuggestBox cursor 语义修正

- `src/lib/scss/components/AutoSuggestBox.scss` 为输入框增加 `cursor: text`，覆盖 `.input-btn-default` 的默认手型；Clear / Submit 继续使用 `cursor: pointer`，disabled 仍为 `not-allowed`。
- `tests/browser/visual.spec.js` 扩展 AutoSuggestBox hover 回归，断言输入框及两个内部按钮的 computed cursor，同时继续覆盖未聚焦/聚焦 Hover 的 surface 状态。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、AutoSuggestBox 浏览器用例（6/6）。docs build 仅保留既有大 chunk warning。
- 当前任务已完成，等待用户下一项具体视觉校正。

# 2026-08-26：AutoSuggestBox focus underline 对齐

- `src/lib/scss/components/AutoSuggestBox.scss` 的 `:focus-visible` 现在同时绘制 InputText 同款 accent border 与 1px bottom background gradient，修复聚焦时底部蓝线偏细；不改变控件高度、DOM、Props 或 API。
- `tests/browser/main.jsx` 为现有 Loading InputText fixture 增加测试定位属性；`tests/browser/visual.spec.js` 新增 computed underline style 对比，覆盖 AutoSuggestBox 与 InputText。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、AutoSuggestBox 浏览器用例（7/7）与完整 `pnpm test:browser`（103/103）。docs build 仅保留既有大 chunk warning。
- 当前任务已完成，等待用户下一项具体视觉校正。

# 2026-08-26：文档导航图标语义校正

- `src/demo/v1.0.0/navbar_items.json` 已完成四项映射：NumberBox → `icons10-unfold`，Popover / Flyout → `icons10-chat`，Tooltip → `icons10-info`，Toast → `icons10-bell`。
- 已在本地文档站实际截图确认：NumberBox 不再使用不明确的计算器字形，三个浮层条目不再共用同一通知气泡；四个新 class 均来自现有 `winui-icons.min.css`，没有新增 Google Font 依赖。
- 验证：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、完整 `pnpm test:browser`（104/104）。docs build 仍有既有大 chunk warning。
- 未解决事项：无；等待下一项用户指定的视觉校正。

# 2026-08-26：AutoSuggestBox 内部按钮 cursor 修正

- `src/lib/scss/components/AutoSuggestBox.scss` 将 Clear / Submit 内部按钮启用状态从 `cursor: pointer` 调整为 `cursor: default`；输入框仍为 `cursor: text`，disabled 仍为 `not-allowed`。
- `tests/browser/visual.spec.js` 将两个内部按钮的 computed cursor 回归断言更新为 `default`，其他 hover、focus underline、点击和提交行为保持不变。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、AutoSuggestBox 浏览器用例（7/7）与完整 `pnpm test:browser`（103/103）。docs build 仅保留既有大 chunk warning。
- 当前任务已完成，等待用户下一项具体视觉校正。

# 2026-08-26：AutoSuggestBox 内部按钮 Hover feedback

- `src/lib/scss/components/AutoSuggestBox.scss` 为 Clear / Submit 的启用 Hover 使用 `var(--rwu-color-surface-control-hover)`；默认透明、pressed surface 和 disabled `not-allowed` 保持不变，cursor 仍为 `default`。
- `tests/browser/visual.spec.js` 将动作按钮回归更新为断言 Hover 背景发生变化，同时保持普通箭头、无滤镜和完整不透明度；输入框 Hover 继续保持稳定。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、AutoSuggestBox 浏览器用例（7/7）与完整 `pnpm test:browser`（103/103）。docs build 仅保留既有大 chunk warning。
- 当前任务已完成，等待用户下一项具体视觉校正。

# 2026-08-26：Switch disabled 状态修复

- `src/lib/src/components/Switch/index.tsx` 在 disabled 时增加容器状态 class；不改变 Props、DOM 层级或原生 checkbox 的 disabled 语义。
- `src/lib/scss/components/Switch.scss` 排除 disabled 的 hover/pressed 反馈，使用 `filter: grayscale(1)` 与 `opacity: 0.5` 灰化控件，容器和标签使用普通箭头光标；disabled 标签同步使用 `--rwu-color-text-disabled`。
- `tests/basic-controls.test.tsx` 验证 disabled Switch 保持 checked 状态且不会触发 `onChange`；`tests/browser/visual.spec.js` 增加交互、computed style 和 Light/Dark 局部截图回归。
- 已同步 `src/lib/dist` 的 Switch JS/CSS 发布产物；新增两张视觉基线。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、完整 `pnpm test:browser`（105/105）。docs build 仍有既有大 chunk warning。
- 未解决事项：无；等待下一项用户指定的修改。

# 2026-08-27：Switch 视觉基线 CI 稳定性

- 聚合 `controls-light/dark` 基线已覆盖禁用 Switch 与标签；专属 `switch-disabled-light/dark` 基线改为只截图控件本体，避免 CI Windows Chromium 在小尺寸文字裁剪上的 32 像素差异。
- 本地 CI 模式定向测试通过；此前完整 `pnpm test:browser` 已通过 105/105。当前变更尚未提交，等待推送后确认远端 CI。

# 2026-08-28：阶段 7 P2 DatePicker

- 新增单日期 `DatePicker`，实现受控/非受控 value 与 popup、可选文本编辑与 parse/format、min/max 边界、Today、首个星期设置、月份导航、outside pointer、Escape 和 viewport fallback；没有修改既有组件的 Props、DOM 或样式。
- 新组件使用 `--rwu-*` token 和现有 `icons10-calendar` 字形；新增 `@evanpatchouli/react-winui/date-picker` 直接入口，并同步 root exports、public `.d.ts`、Sass aggregate 和 `src/lib/dist` ESM/CSS/声明产物。
- WinUI 参考输入框 + CalendarDatePicker popup、日期边界和 Today 行为；Fluent UI v9 只参考 controlled/uncontrolled、parse/format、ARIA、键盘和测试边界；没有复制第三方实现源码，因此不新增 `THIRD_PARTY_NOTICES.md` 条目。
- 新增 `tests/datepicker.test.tsx`（7 tests），覆盖 render/ref、open/select、controlled value/open、editable validation、min/max/Today、Escape/outside pointer、disabled；Playwright 新增 5 个场景与 4 张显式 Light/Dark 基线。
- 新增 root `docs/date-picker.md`、v1.0.0/v1.1.0 docs Demo、导航/路由/search entry、README 示例，以及 consumer root/subpath/typecheck 覆盖。
- 验证：`pnpm lint`、`pnpm typecheck`、`pnpm test`（17 files / 182 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、DatePicker 定向 Playwright（5/5）与完整 Playwright（110/110）。
- `pnpm format:check` 仍报告历史 P1 文件的既有格式差异；DatePicker、本批次 consumer/fixture/入口文件已单独通过 Prettier 检查。构建仍保留既有 Dart Sass deprecation 与 docs 大 chunk warning。
- 当前任务已完成；P2 下一项为 `Calendar`，等待下一次任务指示。

# 2026-08-28：阶段 7 P2 Calendar

- 新增独立常驻单日期 `Calendar`，支持受控/非受控 `value`、可控/非控可见月份、`onValueChange`、`onPickerDateChange`、`minDate` / `maxDate`、`restrictedDates`、`today`、`firstDayOfWeek`、`locale`、Today 操作、disabled、原生 div 属性与 forwarded ref。
- Calendar 使用固定六周、单选日期网格和月份前后导航；键盘支持方向键、Home/End、PageUp/PageDown、Ctrl+PageUp/PageDown、Enter/Space，并通过 ARIA grid、`aria-selected`、`aria-current` 与 roving tab stop 保持可访问性。
- WinUI 借鉴常驻 Calendar 的月份导航、Today、日期边界、restricted dates、首周设置和桌面日历网格行为；Fluent UI v9 借鉴 value/focus/visible-month 分离、controlled/uncontrolled 状态、键盘模型、ARIA 与测试边界。
- 没有复制 Fluent UI 或 WinUI 实际源码；样式只消费现有 `--rwu-*` token，未修改 `THIRD_PARTY_NOTICES.md`。
- 新增 root/subpath exports、public `.d.ts`、Sass aggregate、`src/lib/dist` ESM/声明/CSS 产物、consumer root/subpath/typecheck、`docs/calendar.md`、v1.0.0/v1.1.0 docs Demo、README 和导航/路由/search entry。
- 新增 `tests/calendar.test.tsx`（7 tests）以及 Calendar Playwright 交互与 Light/Dark 视觉回归（4/4），新增 `calendar-light` / `calendar-dark` 两张显式基线。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（18 files / 189 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、完整 `pnpm test:browser`（114/114）。
- `pnpm format:check` 仍被仓库既有 P1 文件和 `tests/browser/visual.spec.js` 的格式差异阻塞；Calendar 相关新增/修改文件已通过定向 Prettier 检查。当前任务已完成，P2 下一项为 `DataGrid`。

# 2026-08-28：阶段 7 P2 DataGrid

- 新增独立 `DataGrid`，不重构既有 `TableView`；公开 API 覆盖 `items`、`columns`、`getRowId`、受控/非受控排序、单/多行选择、禁用行、空状态、密度、原生 div 属性与 forwarded ref。
- 使用原生 table 结构表达 ARIA grid：单一 roving cell tab stop、二维方向键、Home/End、PageUp/PageDown、Ctrl/Cmd+Home/End、Enter/Space 选择和多选 Ctrl/Cmd+A；支持列级 accessor/renderCell/sortValue、稳定客户端排序与 select-all。
- WinUI 借鉴 DataGrid 的表面层级、行列/选择/只读语义；Fluent UI v9 借鉴 items/columns/getRowId、受控状态、排序/选择分离和 grid focus 管理；WAI-ARIA APG 借鉴 grid 键盘与无障碍语义。没有复制实际第三方源码，因此无需新增 `THIRD_PARTY_NOTICES.md` 条目。
- 样式只消费现有 `--rwu-*` token；新增独立 Sass、root/subpath exports、public `.d.ts`、`src/lib/dist` ESM/声明/CSS 产物、consumer root/subpath 类型与构建覆盖。
- 新增 `docs/data-grid.md`、README 示例、v1.0.0/v1.1.0 docs Demo、路由/搜索/导航入口；新增 `tests/data-grid.test.tsx`（9 tests）及 DataGrid 浏览器交互和 Light/Dark 视觉基线。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（19 files / 198 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、`pnpm format:check:data-grid`、定向 Playwright（5/5）和完整 Playwright（119/119）。docs build 仅保留既有大 chunk warning。
- 当前任务已完成；P2 下一项为 `TeachingTip`，本批未提交 Git commit，等待后续任务指示。

# 2026-08-28：DataGrid/Checkbox 共享 SelectionControl 重构

- 已先将 DataGrid 基线独立提交为 `6031edd`（`feat(data-grid): 添加 DataGrid 组件`），后续共享控件重构保持在未提交工作树中，便于继续审阅和单独提交。
- 新增内部 `src/lib/src/components/_common/SelectionControl.tsx`，统一 checkbox/radio 的原生 input 属性转发、forwarded ref、controlled/uncontrolled checked 和 `indeterminate` DOM 状态；不新增公开 `SelectionControl` 导出。
- `Checkbox` 保留原有 label wrapper、`ui-checkbox` class、tooltip/value/onChange 等公共 API，并新增可选 `indeterminate`；legacy `type` 继续接受但明确标记 deprecated，因为语义仍固定为 checkbox。
- `RadioButton` 复用 radio 变体，DataGrid 的多选/全选和单选行均改用 SelectionControl；DataGrid 负责选择模型和行语义，SelectionControl 负责输入状态与视觉。
- 共享样式抽到 `src/lib/scss/components/_base/_selection-control.scss`，Checkbox/RadioButton 原 class 作为兼容标记保留；普通 Checkbox 不强加新的行盒尺寸，DataGrid 通过局部 class 处理单元格尺寸，避免影响旧 Accordion/Controls 取景。
- 新增 Checkbox indeterminate/ref、DataGrid shared class/indeterminate、RadioButton shared radio variant 单测；受影响的 controls、selection、DataGrid Light/Dark 基线已显式更新并检查。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（19 files / 199 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、定向格式检查、完整 Playwright（119/119）。docs build 仅保留既有大 chunk warning。
- 当前重构已完成；本次提交后进入阶段 7 P2 下一项 `TeachingTip`。

# 2026-08-28：阶段 7 P2 TeachingTip

- 新增 `TeachingTip`，以单一目标元素为锚点，支持 `title`、`subtitle`、`content`、`icon`、top/bottom `heroContent`、`action`、受控/非受控可见性、四侧 placement、显式 close、`isLightDismiss`、disabled 和 surface customization。
- 复用 `Popover` 的 portal、定位 fallback、箭头、focus trap、Escape 和 ARIA trigger 连接；Popover 新增 `closeOnOutsideClick` additive prop，默认值为 `true`，既有调用行为保持不变，TeachingTip 显式模式可忽略 outside pointer。
- explicit / light-dismiss 行为、焦点首选项与恢复、action cancel、标题关系和 disabled controlled state 已由 RTL/Playwright 覆盖；没有复制 Fluent UI 或 WinUI 实际源码，因此不新增 `THIRD_PARTY_NOTICES.md` 条目。
- 新增 root `docs/teaching-tip.md`、迁移规范段落、README 示例、v1.0.0/v1.1.0 docs Demo、导航/路由/search entry、root/subpath consumer 类型覆盖、Sass 与 `src/lib/dist` 发布产物。
- 新增 `tests/teaching-tip.test.tsx`（5 tests），Playwright 新增 4 个交互/Light-Dark 场景与 `teaching-tip-light/dark` 两张显式基线；已使用 `view_image` 检查基线取景与主题表面。
- 验证：`pnpm lint`、`pnpm typecheck`、`pnpm test`（20 files / 204 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、`pnpm format:check`、定向焦点回归（20/20）与完整 Playwright（123/123）。
- 当前任务已完成；P2 下一项等待明确指定 `Breadcrumb`、`Tag` 或 `Badge`，本批不继续扩展组件。

# 2026-08-31：阶段 7 P2 Breadcrumb

- 新增 `Breadcrumb`，公开 `items`、`separator`、`maxVisibleItems`、`overflowAriaLabel`、`onItemClick` 与原生 nav 属性；`BreadcrumbItem` 支持链接/按钮/纯文本、disabled、icon、accessible name、target/rel 和稳定 id。
- 语义固定为 labelled `nav` + ordered `ol`；分隔符不进入辅助技术阅读顺序，最后项使用 `aria-current="page"` 且不交互。显式 max 下首项和当前项保留，中间路径通过现有 `Popover` 菜单折叠；无 max 时单行横向滚动。
- 新增 `src/lib/src/components/Breadcrumb`、Sass、root/subpath export、生成的 `src/lib/dist` 产物、consumer root/subpath 类型/构建覆盖、root API 文档、迁移规范、v1.0.0/v1.1.0 docs Demo、路由/导航入口。
- 新增 `tests/breadcrumb.test.tsx`（5 tests）和 4 个 Breadcrumb Playwright 场景，包含语义层级、祖先激活、overflow 菜单、Escape focus restore、Light/Dark 视觉基线；已用 `view_image` 检查三张新增截图。
- 行为参考 WinUI BreadcrumbBar 和 Fluent UI Breadcrumb guidance；只借鉴路径/overflow/ARIA 边界，没有复制实际源码，也不需要新增 `THIRD_PARTY_NOTICES.md` 条目。
- 本批专项检查通过：lint、typecheck、全量单测、library/docs build、consumer build、pack dry-run、格式检查、Breadcrumb 浏览器用例；全量 Playwright 仅保留既有 TeachingTip 两张尺寸基线失败。P2 下一项等待明确指定 `Tag` 或 `Badge`。

# 2026-08-31：阶段 7 P2 Tag

- 新增 `Tag`，支持静态 / 可关闭两种语义、`filled` / `outline` / `brand` 外观、`rounded` / `circular` 形状、三档尺寸、装饰 icon、disabled、原生 HTML 属性和 forwarded ref。
- 静态 Tag 使用 `<span>`；dismissible Tag 使用原生 button，并由 click、Delete、Backspace 触发 `onDismiss`。回调只报告移除请求，父组件负责更新标签集合；disabled handler 额外短路 jsdom 等程序化事件。
- 新增 Sass、root export、`@evanpatchouli/react-winui/tag` 子路径、声明、consumer root/subpath/typecheck/build、README/API 文档、v1.0.0/v1.1.0 docs Demo、导航/路由/search entry、Vitest/RTL 和 Playwright visual fixture。
- 行为参考 WinUI / Windows 11 标签场景与 Fluent UI React Tag 的外观维度、button 语义和键盘移除边界；没有复制实际源码，不需要新增第三方声明。
- 验证：`pnpm lint`、`pnpm typecheck`、`pnpm test`（22 files / 212 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、Tag Playwright 2/2、light/dark + hover/pressed/focus 视觉状态、定向格式检查和 diff/BOM 检查通过。完整 Playwright 127/129，既有 TeachingTip 两张尺寸基线仍失败。
- 当前任务完成；P2 下一项为 `Badge`，等待用户指定后再实现。

# 2026-08-31：阶段 7 P2 Badge

- 新增 standalone `Badge`，支持 dot / icon / text-numeric 三种内容形态、`filled` / `ghost` / `outline` / `tint`、八种语义颜色、三种形状、六档尺寸、前后置 icon、原生 span 属性和 forwarded ref；`0` 等数字内容会被保留。
- Badge 保持非交互 `<span>`，不自动添加 status role 或 focus；icon-only / dot 的可读状态由 `aria-label` 或关联父组件负责。现有 NavBar 内部 `.ui-badge` 保持原 API/DOM，通过 data marker 和 CSS 选择器隔离。
- 新增 `src/lib/src/components/Badge`、Sass、root/subpath export、public `.d.ts`、`src/lib/dist` ESM/CSS/声明产物、warning theme tokens、consumer root/subpath 类型构建、root API 文档、v1.0.0/v1.1.0 docs Demo、导航/路由/search entry。
- 新增 `tests/badge.test.tsx`（3 tests）以及 Badge Playwright 语义与 Light/Dark 视觉回归（2/2），新增 `badge-light` / `badge-dark` 两张显式基线；未复制 Fluent UI / WinUI 源码，不新增第三方声明。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（23 files / 215 tests）、`pnpm build`、`pnpm test:consumer`、`pnpm --filter @evanpatchouli/react-winui pack --dry-run`、`pnpm run format:check:badge`、Badge Playwright（2/2）、UTF-8 无 BOM 和 `git diff --check`。最终完整 Playwright 为 129/131，剩余 2 项为既有 TeachingTip Light/Dark 截图尺寸基线失败；docs build 仅保留既有大 chunk warning。
- 当前任务完成；P2 组件已推进至 Badge，下一项建议先审计 P3 `ColorPicker` 现有聚合能力，等待用户指定后再实现。

# 2026-08-31：TeachingTip 截图尺寸基线修复

- 根因是旧 TeachingTip Light/Dark 基线仍为 `404 × 278`，而当前浮层约 `380px × 254.78px` 配合 `16px` 外扩截图规则稳定产出 `412 × 286`；组件实现和视觉 token 未发生需要修复的变化。
- 仅更新 `tests/browser/snapshots/visual.spec.js-snapshots/teaching-tip-light-chromium-win32.png` 与 `teaching-tip-dark-chromium-win32.png`，没有更新其他 snapshot、修改组件 CSS 或调整全局差异阈值。
- 验证通过：TeachingTip 定向 Playwright 4/4、完整 Playwright 131/131、`pnpm lint`、`pnpm typecheck`、`pnpm test`（23 files / 215 tests）、`pnpm build`、`pnpm test:consumer`、TeachingTip 专项格式检查。
- 本次记录完成后提交独立修复 commit；阶段 7 P2 已完成，后续按用户指示进入下一项。
