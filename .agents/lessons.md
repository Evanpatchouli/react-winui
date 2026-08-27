# 技术经验

- Vite 8/Rolldown 默认按文件扩展名解析 JSX，历史 `.js` + JSX 源码需要在构建解析层映射为虚拟 `.jsx`，无需批量重命名源码。
- Vite 8 dev dependency scan 不能理解上述虚拟文件时，应使用 `optimizeDeps.noDiscovery` 配合显式依赖列表。
- Dart Sass 可以直接替换 node-sass 编译当前 SCSS；本次 CSS 选择器、变量数量保持一致，未改动视觉规则。

- pnpm workspace 的 peerDependencies 会在 lockfile importer 中按实际 peer 解析；组件包仍应声明自己的构建 devDependencies，避免脱离根项目时依赖隐式 hoist。
- consumer 的根 tsconfig `paths` 会遮蔽 package exports；验证发布结构时应在 consumer 侧清空该路径映射。
- `pnpm pack --dry-run` 可以直接确认 `files`、`.npmignore` 和 package exports 所需资产是否进入 tarball，而不需要真实发布。
- TypeScript 迁移初期可以让 `.tsx` 实现与手写 public `.d.ts` 并存；根 `tsconfig` 必须显式包含 `.tsx`，否则只会检查旧声明而不会检查实现。
- `typescript-eslint` 的 flat-config parser 可以在不启用全量 type-aware lint 的情况下先覆盖渐进迁移的 TSX 文件；历史 JS/`.d.ts` 不应因格式脚本扩展而被整库重排。
- 原组件的可视文案可能由 CSS `data-*` 属性生成，Testing Library 测试应验证兼容 DOM 属性，而不是假设存在文字节点或原生 label 关联。
- consumer workspace 通过 package `dist` 读取声明；新增组件声明后必须先运行 library build，再执行 consumer typecheck，才能验证真实发布入口。
- 迁移含历史非标准 HTML 属性的组件时，可将属性放入局部对象后 spread 到 JSX，既保留运行时输出，也避免因 JSX intrinsic 类型过窄而引入 `any`。
- 路由包装组件的类型可以直接复用依赖库的 Props，再用 `Omit` 重声明历史上可选的 `to`；这样既保留旧默认路径，也不会限制 React Router 支持的目标类型。
- 迁移带 rest props 的组件时，应先确认旧实现的 spread 顺序；`LoaderBusy` 的自定义 `className` 必须继续在默认 class 后透传，才能保留已有主题/尺寸定制方式。
- 测试 React ref 时应从 `react` 导入 `createRef`，Testing Library 只负责 render、查询和交互；将两者混用会同时造成类型检查和运行时失败。
- 对存在静态 `defaultProps` 的 TSX 函数组件，使用带 Props 泛型的 `FC` 可以在保留旧默认值机制的同时让实现和发布声明保持一致。
- Testing Library 的 `toHaveValue` 不适用于 checkbox/radio；验证颜色 radio 时应检查 `value` 属性，同时用 `toBeChecked` 验证选中状态。
- 对包装原生输入的组件，应区分“实际透传的 rest props”和“内部控制的 props”；内部 `value`/事件不能直接无条件并入原生属性声明，否则会掩盖组件状态边界。
- 原生 `InputHTMLAttributes` 已包含 `onSubmit`，自定义接收 value 的提交回调必须在 `Omit` 中排除该字段后重新声明，否则会触发函数参数类型冲突。
- 当旧组件从 option 对象读取多个字段时，历史 `string[]` 声明不能作为实现依据；应以运行时数据形状建立可导出的 option interface，并用 consumer 样例锁定类型。
- 图片包装组件的 `onLoad`/`onError` 需要先核对实际调用方式；如果旧实现主动调用回调且不传原生事件，类型应反映真实 `() => void` API，避免迁移时无意改变回调参数行为。
- 对同时接受图片原生属性和 wrapper 样式的组件，应只排除实现内部重写的属性，并让 `ImgHTMLAttributes` 承担其余 `data-*`、ARIA 和原生图片属性类型。
- 对没有可见 DOM 的主题组件，测试应验证 `document`、`body` 和 `localStorage` 的副作用；同时用 rerender 覆盖 `React.memo` comparator 中的 scheme/color 变化回调。
- 迁移带自定义 `React.memo` comparator 的组件时，若旧 comparator 没有显式返回值，应返回等价的 `false` 以满足 TypeScript 的 comparator 签名，避免改变其原有“继续渲染”行为。
- compound component 可以使用 `Object.assign(forwardRef(...), { Header, Footer })` 推导静态成员类型，避免为增加静态属性而使用 `as unknown as`；forwarded ref 与 DOM ref 冲突时应先区分外部 handle 和内部节点的职责。
- 测试 modal/alert 时要在 controlled visible 用例末尾显式恢复隐藏状态，因为旧的 render-time scroll lock 没有 unmount cleanup，测试之间可能残留 `body.modal-open`。
- Alert/Dialog 等相似 modal 组件可以共享 handle 和 compound slot 的类型策略，但每批仍应分别验证其 role、class、style 和 DOM 差异，避免机械复制测试断言。
- 迁移依赖 `child.type.displayName` 的 compound component 时，应先用 `isValidElement` 和可选 displayName 检查收窄 ReactNode；这样既保留 slot 筛选，又避免对文本、null 或原生标签读取组件属性。
- 读取 `childNodes` 的布局尺寸时，Node 类型不保证 `clientHeight`；使用 `node instanceof HTMLElement` 做运行时与类型双重收窄即可保留原有 panel height 计算。
- 对原生搜索输入包装器，建议用 `InputHTMLAttributes<HTMLInputElement>` 承担未改写的属性，再单独定义 suggestion 数据结构和内部控制的 `type`/`style`/`onChange`，避免继续暴露 `Function` 或 `any`。
- 非受控输入的行为测试可以直接省略 `value`，用 `fireEvent.change` 验证原生输入值、过滤结果和回调；这样能覆盖历史默认 placeholder 与 uncontrolled 用法。
- suggestion 列表的可见性由旧实现先根据输入值和当前子节点切换 class、再更新过滤状态；迁移时应保持这一时序，避免无意改变空结果和初始列表行为。
- 自定义下拉组件的声明应以运行时读取的 option 对象为准；如果源码访问 `value`、`label`、`icon`，旧的 `string[]` 声明就是错误的迁移输入。
- `Select` 这类 value 回调不是原生 `ChangeEventHandler`；应单独导出 `(value: string | number) => void`，并在 consumer 类型样例中验证字符串和数字 value。
- 自定义菜单测试应同时验证 selected/show class、外部点击、`body.modal-open` 滚动锁定和选项回调；只测文案会漏掉该组件最重要的交互副作用。
- compound component 的 public marker 与实际 DOM renderer 可能是不同组件；类型迁移时应分别建模 `MenuBar.Item` 的 public Props 和内部 `MenuItem` 的 DOM event Props，不能直接复用一个 handler 类型。
- `forwardRef` 暴露 imperative handle 时，内部 DOM ref、子菜单 handle ref 和 anchor ref 应分别类型化；`MenuListHandle` 可以避免用 `any[]` 保存嵌套菜单实例。
- 旧组件直接对 `children.map` 和 `child.type` 操作时，`Children.toArray` 加泛型 element-of-type guard 能在保留正常多子节点输出的同时覆盖 ReactNode 类型边界。
- 目录中的 legacy helper 不一定属于当前入口图；迁移前先查 import graph，未被入口引用的 `SubMenu.js` 可明确记录为遗留项，避免扩大本批风险。
- `NavBar` 这类依赖 viewport 的组件测试应显式保存并恢复 `window.innerWidth`，同时使用组件自身的 class/overlay 作为断言边界，避免测试环境尺寸污染后续用例。
- `toHaveStyle` 对颜色名和 `rgb(...)` 的归一化可能与浏览器 `style` 字段不同；验证迁移未改变 inline style 时，直接检查 `CSSStyleDeclaration` 更稳定。
- 组件使用默认数组参数并在 effect 中同步 state 时，应使用模块级空数组常量，避免每次 render 生成新引用导致空数据组件循环更新。
- consumer typecheck 必须在 library build 之后执行；workspace 内部源码 path 与真实 package dist 的类型入口不是同一验证边界。
- 将 root entry 从 JS 切换到 TS 后，手写 `.d.ts` 中的 public type exports 必须同时存在于 TS 实现，否则 source typecheck 会暴露声明与实现漂移。
- Sass 从 `@import` 迁移到 `@use` 时，不能只做字符串替换；跨文件 `@extend` 必须在使用方显式加载基础 selector 模块，跨文件 mixin 必须显式使用模块命名空间。
- 迁移 Sass 后应同时比较压缩 CSS 的 AST/规则结构，而不是只比较字节哈希；模块系统可能只改变 selector list 顺序，不代表视觉规则发生变化。
- Design Token 渐进迁移应让新 `--rwu-*` 变量引用旧主题变量；直接复制 light/dark literal 会切断旧消费者对 `--color-*` 和自定义主色的覆盖能力。
- CSS 自定义属性可以保存 `rgba(var(--color-model-ui-bg), alpha)` 这类运行时主题表达式；Sass 编译通过后仍需检查每个 `--rwu-*` 使用都有对应声明，避免拼写错误导致运行时值失效。
- 全量 token 迁移审计应把 `components`/`browsers` 消费端与 `themes/tokens.scss` 兼容桥接分开统计；目标是前者旧引用为 0，而不是删除后者的旧变量映射。
- Playwright spec 如果与 Vitest 的 `tests/**/*.{test,spec}.*` glob 重叠，必须在 Vitest `exclude` 中明确隔离浏览器测试目录，否则 Vitest 会把 Playwright 的 `test.beforeEach` 当作非法 suite hook。
- 视觉 fixture 必须加载正式 Demo 使用的 `app-config.css`；否则 `--PrimaryColor` 和字体缺失会让截图看似通过但不代表真实组件样式。
- Playwright 视觉回归应把截图更新命令与普通测试命令分开，并将 `snapshotDir`、失败产物和 report 目录显式配置，避免 CI 意外接受新截图或污染仓库。
- 自定义菜单的 `li` 不一定在 Chromium accessibility tree 中稳定暴露预期 accessible name；行为测试应优先使用组件已有的稳定 class，再用可见文本过滤，保留语义断言给真正稳定的节点。
- React 19 的 `defaultProps` 弃用 warning 只会在实际挂载对应函数/memo 组件时暴露；应从 warning 的真实组件入手移除静态声明，并在浏览器 fixture 的 console 上增加回归断言，避免只依赖人工查看日志。

## 2026-08-21：全库视觉 fixture 扩展

- 保护整个组件库时，先按 root export 建立组件清单，再用 panel fixture 覆盖每个公共视觉组件；无可见 DOM 的 AppTheme/Appearance 用行为和主题断言覆盖，避免伪造截图。
- 视觉基线不需要把每个组件的每个状态都截图，但必须为高风险状态单独建用例：弹层、菜单、下拉、搜索建议、排序、移动导航和主题切换不能只依赖 default screenshot。
- 全量 fixture 会暴露只在未挂载组件中隐藏的 React warning；扩展截图前应先扫描所有静态 `defaultProps`，并把 console/pageerror 作为浏览器测试的失败条件。
- Windows 上多个 Playwright worker 同时启动重型 Vite fixture 会放大 browser context teardown 竞争；全库截图更适合限制 workers，并适当提高单测 timeout，而不是放宽像素差异阈值。
- 固定定位的移动导航如果嵌在长 gallery 页面中，物理 click 可能因元素脱离 viewport 而不稳定；应让 fixture 提供真实定位上下文，必要时用 DOM `dispatchEvent` 验证组件 handler，再对 viewport overlay 截图。

- docs Demo 改为消费 workspace 组件包时，必须在 `apps/docs/package.json` 声明 `workspace:*` 依赖并执行完整 `pnpm install`；只执行 `--lockfile-only` 不会创建本地包链接，Vite 会无法解析包入口。
- 删除历史版本 Demo 后，应同步清理根路由、版本选择器、文档链接和本地 `_lib`，并先运行 production build 确认当前 Demo 已从发布包入口加载组件与 CSS。

## 2026-08-21：阶段 6 Tooltip

- Tooltip trigger 使用 wrapper 承担 pointer/focus 事件，同时 clone 单一 child 注入 ARIA；这样可以保持任意原生/组件 trigger 的 DOM 兼容性，不要求子组件实现特定 ref 接口。
- hide delay 期间重新进入 trigger 时必须先清除 hide timer，再判断当前可见状态；否则快速离开再进入会在新 Tooltip 已打开后被旧 timer 关闭。
- `aria-describedby` 关系的 Tooltip 在关闭时仍需保留 visually clipped 内容；使用 `visibility: hidden` 会让屏幕阅读器关系失效。`inaccessible` relationship 才完全不渲染关闭内容。
- fixed portal 的定位测试应覆盖顶部空间不足时的 placement fallback；仅验证默认 top placement 无法发现窗口边缘的真实问题。

- Tooltip 与 Flyout 都属于浮层，但透明度不应共享实现 token；应让 Tooltip 使用实心 surface，只有显式启用 backdrop blur 的 dropdown/flyout 使用 translucent surface。
- 当单个浮层需要与通用 Flyout 不同的阴影层级时，应选择合适的语义化 `--rwu-shadow-*` token，而不是直接调小共享 Flyout shadow；这样可以保持其他下拉/菜单的既有视觉基线。
- Theme/Shadows 这类多层阴影应先落入本库的 `--rwu-shadow-*` scale，再由组件选择具体层级；Tooltip 使用 `box-shadow: var(--rwu-shadow-8)`，不要把 Fluent UI 的包或 Griffel recipe 引入运行时。
- JavaScript-facing token 常量应只保存 `var(--rwu-*)` 引用，不要复制 Sass 中的实际阴影值；这样 inline style 能获得自动补全，同时仍保留消费者 CSS 覆盖和主题切换能力。
- 阶段性组件规范应集中保留为公共轻量文档，内部 decisions/handoff 只记录具体决策和交付结果；这样后续组件可以复用流程而不必从历史记录中拼接规则。

- Portal overlay 的 `defaultOpen` 会污染完整页面截图（尤其是移动端全页基线）；视觉 fixture 应保持默认关闭，并在对应 Playwright 用例中显式打开目标 overlay。
- Portal 容器在首次 effect 后才存在时，`autoFocus` effect 需要依赖 portal 容器或使用等价的挂载时机，否则 `defaultOpen + autoFocus` 会把焦点留在 body；这个边界必须由 RTL 测试锁定。
- 新增组件的 consumer 验证必须在 library build 之后执行，才能同时覆盖 root export、subpath export、真实 dist declaration 和 ESM 产物。

## 2026-08-24：P1 并行移植与主线集成

- 多组件并行时必须为每个组件建立独立 worktree、分支和 commit；共享 package/export、Demo、fixture、dist 冲突应由主线程按组件逐项合并，不能让子智能体直接改 main。
- 多个 Playwright/Vite 构建若同时清理同一 `dist`，Windows 可能出现 `EPERM rmdir`；构建和 consumer 验证应串行执行，浏览器开发服务器使用独立临时端口并在提交前恢复默认端口。
- 长页面 fixture 中新增 Section 会改变后续测试元素的物理位置；依赖“页面底部”验证 viewport fallback 的测试应显式把目标控件定位到 fixed viewport，而不是追加不可见 spacer 并滚动页面。
- 视觉快照出现 1px 高度差时，先比较实际/期望图像与 diff，确认是稳定的字体/布局结果后再显式更新目标快照；不可借助放宽像素阈值隐藏真实变化。
- `SettingsExpander`/`SettingsCard` 这类“整卡可点击 + 右侧控件”组件必须使用 sibling overlay 或同级触发层，不能把 button、link、input 嵌套进 disclosure/native trigger。
- `NavigationView` 的 auto 断点、pane overlay 和 selection indicator 必须由同一状态模型驱动；关闭 pane 时隐藏内容要同时从 Tab/ARIA/focus 恢复路径中移除，避免焦点落到 hidden duplicate toggle。
- 组件独立验证通过不等于主线验证通过；合并共享 fixture 后至少重跑完整 lint、typecheck、unit、build、consumer、pack 和 browser suite。

## 2026-08-24：MenuBar 二级菜单回归

- compound public marker 与内部 DOM renderer 是不同组件；内部列表不能用 `child.type === internalRenderer` 判断 public children，应由父组件明确传入 marker 或先转换为内部数据。
- 浮层测试只断言容器带 `show` class 会漏掉“容器打开但内容为空”；必须同时断言条目可见、点击回调和关闭状态。
- 截取父 panel 可能裁掉绝对定位的二级浮层；应对二级浮层 locator 单独建立视觉基线，确认真实内容进入截图范围。

## 2026-08-24：ContextMenu 焦点与坐标定位

- Context menu 的触发目标不是 menu button：右键应以 pointer client coordinate 建立 virtual anchor，键盘触发则以目标边界建立 anchor；两种路径都必须在 surface 实际测量后做 viewport clamp。
- Menu 的 Tab 与 Escape 关闭语义不同：Escape 应回到调用上下文，Tab 应让浏览器继续原生顺序；把两者复用同一个 focus-restore 分支会让键盘用户被送回触发器。
- keyboard selection handler 若先调用内部 `preventDefault()`，再用 `event.defaultPrevented` 判断消费者是否取消关闭，会把所有 Enter/Space 选择误判为取消；应先执行 consumer `onSelect` 与 dismiss 决策，再阻止按键的浏览器默认动作。
- Portaled context menu 的视觉快照应直接截 surface；父 fixture panel 不包含 portal，截图 panel 会漏掉菜单本体并产生虚假的基线覆盖。

## 2026-08-24：Toast 队列与计时边界

- 队列中尚未展示的 Toast 不应提前挂载；否则它们会在不可见时消耗 timeout。只渲染 `maxVisible` 范围，并在前项关闭后再让下一项开始生命周期。
- 受控 Toast 的关闭是请求而不是本地状态事实；timeout 发出关闭请求后应标记本轮已请求，避免父级故意保持 `open=true` 时反复重启 timeout 和重复回调。
- pointer/focus pause 需要记录剩余时长，而不只是 clear 后重新使用完整 duration；这样短暂交互不会无意延长通知寿命。
- 命令式 `show` 若收到已有 id，应更新原条目并保持堆栈数量与顺序；这一行为必须由 RTL 数量断言和更新后内容断言共同锁定。
- 在长页面视觉 fixture 中新增 Section 会改变后续元素相对固定背景的位置；把新 Section 追加到末尾，可避免无关旧组件快照产生噪声。

## 2026-08-24：InfoBar 内联状态与关闭边界

- React 的 `HTMLAttributes` 已定义 microdata `content?: string`；组件把 `content` 用作 ReactNode slot 时必须在继承类型中显式 `Omit<..., "content">`，否则实现与声明都会冲突。
- 受控 InfoBar 的关闭按钮只应触发 `onOpenChange(false, event)`，不能同步复制或修改受控状态；浏览器测试应同时断言 callback 结果与 surface 仍然可见。
- `disabled` 根节点若要覆盖任意 ReactNode action，不能只禁用内建 close button；还需在 capture 阶段阻止 click 以及 Enter/Space 激活，同时保留消息可读性和 `aria-disabled`。
- severity 不能只靠颜色表达；当现有 token 缺少 warning 色时，保留中性 token 并使用不同图标，比私自添加局部硬编码色更符合主题与 token 约束。
- 默认关闭的 inline 组件在 docs、consumer 和 visual fixture 中都必须显式设置 `open` / `defaultOpen`；否则构建可能通过但实际没有验证 DOM、CSS 或发布运行时。

## 2026-08-24：ComboBox 值、文本与 viewport 边界

- editable ComboBox 的受控 `text` 是请求协议：输入事件可调用 `onTextChange`，但在父组件更新 prop 前，显示值必须保持不变；测试应通过 rerender 明确锁定这一点。
- popup 样式不能用 `position.maxHeight || undefined`，否则真实的 0 可用高度会被误判为“尚未定位”；应使用独立 `positionReady` 状态决定是否写入 `maxHeight`。
- 方向键移动 active option 与提交 value 是两件事；遵循 WinUI 的 select-only 行为可避免用户浏览选项时意外改变已提交值。
- portaled listbox 的视觉快照应直接截 surface；顶部 fallback 应在真实小 viewport 中同时断言 listbox 与 trigger 的几何关系，不能只靠 mocked rect。
- listbox 进入动画必须为 `prefers-reduced-motion: reduce` 提供无动画分支，避免只覆盖 trigger 的交互动画而遗漏 portal surface。

## 2026-08-24：InfoBar 操作项行高对齐

- CSS Grid 根节点使用 `align-items: start` 时，某个相邻 flex 行被操作按钮撑高不会自动重排独立图标；应针对 action 状态按 control/icon token 的高度差补偿，并为窄屏换行单独复位。
- 这类像素级错位应在真实浏览器中直接比较图标与目标行的 bounding-box 中心，而不能只依赖截图阈值。

## 2026-08-24：浮层截图与阴影基线

- 浮层的 element-only screenshot 会截掉 box-shadow；应以 locator bounding box 外扩固定留白截取 viewport 区域，并在截图前结束 surface 及子节点入口动画。
- 视觉基线更新必须逐个限定到受影响的 overlay 用例；本次 icon fixture 修正只更新了发生真实 glyph 变化的移动 NavBar 基线。
- 依赖页面滚动到边缘的 portaled popup 测试不能直接使用会自动滚动目标的物理 `locator.click()`；需要用 DOM click 保持预设 viewport 几何，再断言真实 placement。

# 2026-08-24：P1 控件细节视觉校正

- 需要整行 hover 的导航项，应把背景状态放在 row 容器而非内部 button/disclosure；同时必须单独覆盖 disabled row，selected/indicated 状态则继续使用更具体的选择器维持 pressed surface。
- 与已有 `Select` 对齐箭头时，优先复用组件当前的 chevron 结构，仅校准 border stroke；这样能降低字体/图标资源差异，也不会引入新的 DOM 或公共 API。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、`pnpm test:browser`（101/101）；docs build 仍有既有大 chunk warning。

# 2026-08-24：SettingsCard 与 AutoSuggestBox 视觉细节

- 复合控件的 hover 视觉不能只检查主 input；`@extend` 产生的全局 `button:hover` 规则也会影响内部 action button，必须分别验证 input、Clear 和 Submit。
- 内容卡片不宜直接套用通用 elevation scale；当 `shadow-2` 造成硬边线时，应为卡片建立独立、低对比度的语义 token，避免牵动其他组件的层级。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、`pnpm test:browser`（101/101）；docs build 仍有既有大 chunk warning。

# 2026-08-26：AutoSuggestBox 聚焦 Hover 状态

- 复合输入控件的 Hover 回归必须覆盖“未聚焦 + Hover”和“已聚焦 + Hover”；只覆盖前者会漏掉焦点伪类与继承的全局 `@extend` 规则叠加后的问题。
- 当控件通过 `@extend` 复用通用按钮/输入样式时，局部 Hover 规则不应为了保护 focus surface 而排除 `:focus`；应保留 focus 专属背景的层叠顺序，同时在 Hover 层清除不需要的滤镜和透明度。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、AutoSuggestBox 浏览器用例（6/6）和完整 Playwright（102/102）。

# 2026-08-26：AutoSuggestBox cursor 语义

- 复用按钮基础类的输入控件会继承 `cursor: pointer`；输入区域和动作区域的交互语义不同，不能只依赖基础类默认值，应在组件边界显式覆盖为 `text`。
- cursor 回归应同时检查主输入和内部动作按钮，并保留 disabled 的 `not-allowed` 例外，避免只看截图无法区分光标语义。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build` 和 AutoSuggestBox 浏览器用例（6/6）。

# 2026-08-26：AutoSuggestBox focus underline

- 比较输入控件的 focus 底线时不能只看 `border-bottom-color`；InputText 通过 border 加 background gradient 叠出两层可见 accent，单独设置 border 会显得更细。
- 对齐已有组件质感时，应复用其现有 gradient 的 repeat、position 和 size，而不是增加 border width 造成控件几何尺寸变化。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、AutoSuggestBox 浏览器用例（7/7）和完整 Playwright（103/103）。

# 2026-08-26：相关 settings surface 的阴影一致性

- 同一视觉层级的组件应共享语义阴影 token；直接复用 `--rwu-shadow-card` 比分别复制阴影 literal 更能防止 Light/Dark 主题漂移。
- 组合容器的根阴影与内部子卡片阴影要分开处理；SettingsExpander 的子 SettingsCard 保持 `shadow-none`，避免出现双层或过重的内嵌阴影。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build` 和完整 Playwright（104/104）。

# 2026-08-26：共享控件箭头几何

- 当多个控件需要与 Select 视觉一致时，优先复用 Select 的实际绘制资源，而不是继续微调各自的 border 宽度、尺寸和旋转位移；这样可以避免“数值相近但视觉仍不一致”。
- 对旋转箭头的回归应比较实际绘制资源和画布尺寸，方向只验证对应的 transform；截图基线则用来确认主题和布局没有副作用。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build` 和完整 Playwright（103/103）。

# 2026-08-26：AutoSuggestBox 内部按钮 cursor

- 输入框内的动作按钮不一定需要 Web 常见的手型反馈；当整体控件遵循桌面 Windows 交互质感时，启用按钮可使用系统普通箭头，输入区域与 disabled 状态仍分别保留 `text` 与 `not-allowed` 语义。
- cursor 语义应单独对主输入、启用动作按钮和 disabled 动作按钮断言，避免通过父级或浏览器默认样式产生漂移。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、AutoSuggestBox 浏览器用例（7/7）和完整 Playwright（103/103）。

# 2026-08-26：AutoSuggestBox 内部按钮 Hover feedback

- 普通箭头 cursor 与无反馈的透明动作层组合会削弱可点击性；桌面风格控件应使用已有 control-hover surface 补充状态提示，而不必退回手型 cursor。
- 回归测试应同时确认主输入 Hover 不变、内部动作按钮 Hover 背景变化，以及 cursor/filter/opacity 没有被通用按钮规则意外修改。
- 验证通过：`pnpm lint`、`pnpm typecheck`、`pnpm test`（16 files / 175 tests）、`pnpm build`、AutoSuggestBox 浏览器用例（7/7）和完整 Playwright（103/103）。

# 2026-08-26：文档导航图标选择

- 组件导航图标应先按实际渲染尺寸核对，而不是只按 class 名称判断；复杂或重复字形在 16px 左右很容易失去语义。
- 对浮层类组件，使用 `chat`、`info`、`bell` 分别表达气泡上下文、提示信息和通知到达，比让 Popover、Tooltip、Toast 共用同一通知图标更容易扫描。
- 只要现有 `icons10` 字库已经提供合适字形，就不应为了单个导航项混入外部 Google Font，以免产生额外加载、授权和视觉基线差异。

# 2026-08-26：Toast 多条通知叠放

- 窗口式叠放应让最新 Toast 位于锚点前景，旧 Toast 沿远离锚点的方向错开；这样四个 viewport 位置都能保持同一层级语义。
- 使用 CSS `translate` 承担堆叠偏移、保留 `transform` 给入场动画，可以避免新增层叠视觉时覆盖原有动效或调用方的 transform 样式。
- 视觉回归截图的取景范围必须覆盖变换后的后层元素和阴影；对 Toast 单独增加外扩留白，比修改所有浮层的全局截图规则更稳妥。

## 2026-08-26：Switch disabled 状态

- 原生 disabled checkbox 已经阻止真实浏览器交互，但缺少独立样式时仍会保留普通 Switch 的颜色和 hover/pressed 反馈；应保留启用态规则，并在 disabled 分支单独覆盖这些反馈。
- `jsdom` 的 `fireEvent.click()` 会绕过 disabled 控件的原生激活限制并修改 `checked`，测试原生不可点击语义应使用元素的 `.click()`，再由 Playwright 覆盖真实浏览器行为。
- Switch 的标签由伪元素生成文本，禁用态要同时给控件和外层容器设置状态样式，才能覆盖 `labelPosition="start"` 与 `"end"` 两种布局。
