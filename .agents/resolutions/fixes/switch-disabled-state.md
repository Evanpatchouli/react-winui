# Switch disabled 状态未灰化

## 现象

`<Switch disabled />` 虽然原生 checkbox 已不可切换，但轨道、滑块和 On/Off 标签仍使用启用态视觉，并可能显示 hover/pressed 反馈。

## 原因

`Switch.scss` 没有 disabled 分支；普通 `:hover` / `:active` 规则也没有排除 disabled 状态。组件外层标签还没有可供样式识别的 disabled 状态。

## 修复

- disabled 时给外层容器增加 `ui-switch-container-disabled` class。
- 保留原有启用态 hover/pressed 规则不变，并在 disabled 分支通过更具体的覆盖规则复位其反馈。
- disabled 控件使用 `grayscale(1)`、`opacity: 0.5` 和普通 `default` 箭头光标；标签使用 `--rwu-color-text-disabled`。
- 增加单元测试、真实浏览器交互/computed-style 测试，以及 Light/Dark 局部视觉基线。

## 验证

`pnpm lint`、`pnpm typecheck`、`pnpm test`（175/175）、`pnpm build` 和 `pnpm test:browser`（105/105）均通过。为适配 CI Windows Chromium 的小尺寸文字裁剪差异，Switch 专属视觉基线只捕获控件本体，标签仍由 controls 聚合基线覆盖。
