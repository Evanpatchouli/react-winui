# CommandBar

`CommandBar` 是 WinUI 风格的常驻命令工具栏，用于把当前页面最常用的操作作为主命令展示，并把
次要命令或宽度不足时的尾部主命令放入 overflow。它不是 `MenuBar` 或 `ButtonGroup` 的别名。

## 去重审计

- `ButtonGroup` 只负责相邻按钮圆角和边框，没有 toolbar 语义、焦点管理或 overflow。
- `MenuBar` 是由 anchor imperative 打开的层级弹出菜单；它适合菜单，不是常驻命令工具栏。
- `ContextMenu` 提供右键上下文菜单。CommandBar 只借鉴其 portal、viewport clamp、light-dismiss 和
  menu 键盘边界，不修改或包装其公共 API。

## 示例

```tsx
<CommandBar
  aria-label="Document commands"
  secondaryCommands={
    <>
      <CommandBar.Button label="Rename" onClick={rename} />
      <CommandBar.Button label="Properties" onClick={openProperties} />
    </>
  }
>
  <CommandBar.Button icon={<SaveIcon />} label="Save" onClick={save} />
  <CommandBar.Button icon={<CopyIcon />} label="Copy" onClick={copy} />
  <CommandBar.Separator />
  <CommandBar.Button disabled icon={<PasteIcon />} label="Paste" />
</CommandBar>
```

## 主要 API

| API                                    | 说明                                                          |
| -------------------------------------- | ------------------------------------------------------------- |
| `children`                             | 主命令；建议只放 `Button` 和 `Separator`                      |
| `secondaryCommands`                    | 始终位于 overflow 的次要命令                                  |
| `overflowOpen` / `defaultOverflowOpen` | overflow 受控 / 非受控可见状态                                |
| `onOverflowOpenChange`                 | 打开、选择、Escape、Tab 或 light-dismiss 的状态请求           |
| `dynamicOverflow`                      | 宽度不足时移动尾部主命令，默认 `true`                         |
| `minimumPrimaryCommands`               | dynamic overflow 至少保留的主命令数量                         |
| `compact`                              | 主命令只显示 icon，label 仍保留为 accessible name             |
| `CommandBar.Button`                    | AppBarButton 风格命令：`label`、`icon`、`disabled`、`onClick` |
| `CommandBar.Separator`                 | toolbar 中垂直、overflow menu 中水平的语义 separator          |

## 键盘与边界

- toolbar 使用 roving tabindex；`ArrowLeft` / `ArrowRight` 循环移动，`Home` / `End` 到首尾，并跳过
  disabled command。
- overflow button 支持原生 `Enter` / `Space`，并支持 `ArrowDown` 打开到第一项、`ArrowUp` 打开到
  最后一项。
- overflow menu 支持 `ArrowUp` / `ArrowDown`、`Home` / `End`、单字符 typeahead、`Enter` / `Space`；
  `Escape` 或 command selection 关闭后把焦点还给 overflow button，`Tab` 和 outside pointer 关闭但
  不强制抢回焦点。
- 受控 `overflowOpen` 只发出请求；父组件未更新 prop 时，组件不会自行改变可见状态。
- 动态溢出优先使用 `ResizeObserver`，不可用时通过 window resize 稳定降级；SSR render 阶段不读取
  DOM layout。

## 参考边界

- [WinUI Command bar](https://learn.microsoft.com/en-us/windows/apps/design/controls/command-bar)：主/次命令、动态 overflow 与 AppBarButton 视觉层级。
- [WinUI AppBarButton](https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.appbarbutton)：icon、label、disabled 和 command 语义。
- [Fluent UI React v9 Toolbar](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-toolbar)：复合 API、roving focus 和测试边界。
- [Fluent UI React v9 Overflow](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-overflow)：responsive overflow 状态思路。
- [WAI-ARIA Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) 与
  [Menu Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)：toolbar/menu ARIA 和键盘约定。

只参考上述来源的公开行为、API、状态和测试思路；未复制 Fluent UI 源码、Griffel 样式或视觉 token。
