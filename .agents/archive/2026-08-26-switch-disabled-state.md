# 2026-08-26：Switch disabled 状态修复

- 修复 `Switch disabled` 未灰化且仍带启用态 hover/pressed 视觉的问题。
- 保留原生 checkbox disabled 语义、Props、DOM 层级和公共 API；禁用态使用普通箭头光标。
- 新增单元测试、浏览器交互/computed-style 回归和 Light/Dark 局部截图基线。
- 验证通过：lint、typecheck、175 个单测、production build、105 个 Playwright 用例。
