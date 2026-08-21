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
