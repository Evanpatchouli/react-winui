# InfoBar 操作项图标对齐修复

状态：已完成。

- 复现：文档页两个带 action 的 InfoBar 图标中心相对 32px 摘要行偏高 6px，普通示例偏差为 0px。
- 修复：增加内部 action 状态类，使用现有 control/icon 尺寸 token 计算桌面偏移，窄屏 action 换行时复位。
- 回归：新增真实浏览器几何断言，覆盖 action 撑高摘要行的场景。
- 验证：format、lint、typecheck、110 个单元测试、production build、59 个 Playwright 用例全部通过。
