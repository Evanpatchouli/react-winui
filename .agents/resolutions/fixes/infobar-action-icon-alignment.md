# InfoBar action 图标偏高

## 现象

InfoBar 的 `action` 使用标准 32px Button 时，20px severity 图标比标题/消息所在摘要行的视觉中心高 6px；没有 action 的示例正常。

## 原因

根节点 Grid 使用 `align-items: start`。操作按钮把 `.ui-info-bar-summary` 从 20px 撑高到 32px，但作为独立 Grid item 的图标仍停留在行首。

## 修复

- 组件在存在 action 时增加内部 `ui-info-bar-with-action` 类。
- 桌面端按 `(control height - icon size) / 2` 使用 `--rwu-*` token 计算图标上边距。
- 480px 以下 action 会独占新行，因此将图标偏移复位为 0，继续对齐首行文本。

## 验证

用 Playwright 比较图标和摘要行的 bounding-box 中心；偏差由 `-6px` 变为 `0px`，并运行完整 lint、typecheck、unit、build 和 browser tests。
