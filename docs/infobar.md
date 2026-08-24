# InfoBar

`InfoBar` 用于在页面布局中持续展示应用状态。它会占据正常文档流，不覆盖内容、不锁定滚动，也不替代用于阻塞确认的 `Alert`。

```tsx
const [open, setOpen] = useState(true);

<InfoBar
  open={open}
  onOpenChange={setOpen}
  severity="warning"
  title="Connection interrupted"
  message="Changes will sync when the network returns."
  action={<Button>Network settings</Button>}
/>;
```

## API

- `severity`：`informational | success | warning | error`；默认 `informational`。
- `title`、`message`：主要状态文案；不要只依赖颜色或图标表达含义。
- `content` / `children`：在摘要下方单独一行渲染的自定义内容；同时传入时 `children` 优先。
- `action`：位于摘要区域的可选操作。
- `open`、`defaultOpen`、`onOpenChange`：支持受控与非受控显示；受控关闭是请求，父组件决定最终状态。
- `closable`：默认 `true`；设为 `false` 时不渲染关闭按钮。
- `disabled`：只阻止关闭按钮与 action 的用户激活；状态消息仍然可读，根节点保留 `aria-disabled="true"`。它不会阻止父组件通过受控 `open` 更新可见性。
- `closeButtonAriaLabel`：关闭按钮的本地化 accessible name，默认 `Close`。

默认情况下，informational 使用 `role="status"` 与 polite live region；success、warning、error 使用 `role="alert"` 与 assertive live region。原生 div ARIA props 可覆盖这些默认值。

## 视觉与来源

组件只消费 react-winui 的 `--rwu-*` Design Tokens。当前 token 集没有 warning 专用色，因此 warning 使用 `--rwu-color-text-primary` 配合独立三角图标表达语义，不引入硬编码色；未来如新增全局 warning token，应再统一替换并更新视觉基线。

行为与测试思路参考：

- [WinUI InfoBar](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/infobar)
- [Fluent UI React v9 MessageBar types](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-message-bar/library/src/components/MessageBar/MessageBar.types.ts)
- [Fluent UI React v9 MessageBar tests](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-message-bar/library/src/components/MessageBar/MessageBar.test.tsx)
- [WAI-ARIA 1.2 status](https://www.w3.org/TR/wai-aria-1.2/#status)、[alert](https://www.w3.org/TR/wai-aria-1.2/#alert)

仅借鉴行为、API 与测试边界；未复制 Fluent UI 源码、Griffel 样式或 Fluent tokens。
