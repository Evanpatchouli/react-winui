# MenuBar 二级菜单回归修复

- 取消未提交的重复公共 `Menu` 实现，保留现有 `MenuBar`。
- 先用 RTL 复现 `MenuBar.Item.SubMenu` 容器打开但条目为空，再修复 public marker 识别与二级项 `onClick` 转发。
- 单项、多项、可见性、选择回调和菜单关闭均已覆盖。
- Playwright 新增二级项交互断言和精确视觉基线，未修改组件样式。
- 验证：lint、typecheck、71 unit tests、production build、consumer、39 Playwright tests 全部通过。
