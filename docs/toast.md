# Toast

`Toast` 用于不阻塞当前任务的短暂应用内通知，`Toaster` 负责将通知限制在一个固定堆栈中并按 FIFO 顺序提升排队项。

```tsx
const toasterRef = useRef<ToasterHandle>(null);

<>
  <Button
    onClick={() =>
      toasterRef.current?.show({
        title: "Saved",
        message: "Your changes are available everywhere.",
        action: { label: "View", onClick: openDocument }
      })
    }
  >
    Notify
  </Button>
  <Toaster ref={toasterRef} />
</>;
```

## API

- `Toast` 支持 `open`、`defaultOpen`、`onOpenChange`、`title`、`message`、`icon`、`action`、`intent`、`politeness`、`duration`、`persistent`、`pauseOnInteraction`、`closable` 和 `closeLabel`。
- `Toaster` 支持 `position`、`maxVisible`、`defaultDuration`、`pauseOnInteraction`、`mountNode` 和可访问区域 `label`。
- `ToasterHandle` 提供 `show(options)`、`dismiss(id)` 和 `dismissAll()`；相同 `id` 会原位更新，不增加堆栈数量。
- 超过 `maxVisible` 的通知保持排队，前面的通知消失后按 FIFO 顺序展示。

## Accessibility

默认通知使用 `role="status"`、`aria-live="polite"` 和 `aria-atomic="true"`。只有紧急消息才应设置 `politeness="assertive"`，此时使用 `role="alert"`。Toast 不会自动移动焦点；焦点或指针位于通知内时自动消失计时暂停，焦点位于关闭按钮或操作按钮时可按 Escape 关闭。

持久通知不能代替历史记录。对用户后续仍有价值的消息，应同时保留在应用的通知中心或其他永久界面中。

## References

- [Windows notifications design basics](https://learn.microsoft.com/en-us/windows/apps/design/shell/tiles-and-notifications/toast-ux-guidance)
- [Fluent UI React v9 Toast guidance](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-toast/stories/src/Toast/ToastDescription.md)
- [WAI-ARIA 1.2 alert and status roles](https://www.w3.org/TR/wai-aria-1.2/)

实现只参考行为、API 和测试边界，没有复制 Fluent UI 源码、Griffel 样式或视觉 token。
