# ContextMenu

`ContextMenu` 复用现有 `MenuBar` 的菜单 surface 与条目 class，新增的是上下文触发、坐标定位和可访问交互，不建立另一套菜单视觉。

```tsx
<ContextMenu
  content={
    <>
      <ContextMenu.Item onSelect={copy}>Copy</ContextMenu.Item>
      <ContextMenu.Item disabled>Paste</ContextMenu.Item>
      <ContextMenu.Divider />
      <ContextMenu.Item secondaryContent="Del" onSelect={remove}>
        Delete
      </ContextMenu.Item>
    </>
  }
>
  <button type="button">File</button>
</ContextMenu>
```

支持右键、`Shift+F10`、Context Menu 键、受控/非受控 open、Escape / outside-click light-dismiss、viewport clamp、方向键/Home/End/字符导航以及 disabled menuitem。Escape 与命令选择按 `restoreFocus` 恢复调用目标；Tab 关闭菜单并保留浏览器默认焦点顺序。

行为与测试思路参考：

- [WinUI Menu flyout and menu bar](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/menus)
- [Fluent UI React v9 Menu types](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-menu/library/src/components/Menu/Menu.types.ts)
- [Fluent UI React v9 MenuTrigger behavior](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-menu/library/src/components/MenuTrigger/useMenuTrigger.ts)
- [WAI-ARIA Menu and Menubar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)

仅借鉴行为、API 边界和测试思路；未复制 Fluent UI 源码、Griffel 样式或 Fluent tokens。
