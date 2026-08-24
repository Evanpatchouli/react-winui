# SettingsCard

`SettingsCard` 用 Windows 11 设置页常见的图标、标题、说明与右侧控件布局表达一个独立设置项。它不是通用内容卡片，也不替代用于组合相邻按钮的 `ButtonGroup` 或用于应用级导航的 `NavBar`。

```tsx
<SettingsCard
  title="Notifications"
  description="Allow desktop notifications"
  icon={<NotificationIcon />}
>
  <Switch aria-label="Desktop notifications" />
</SettingsCard>
```

## API

- `header` / `title`：主要标签；两者同时传入时 `header` 优先，以兼容 WinUI 命名和 React 常见的 `title` 写法。
- `description`：标签下方的辅助说明。
- `icon`：左侧装饰图标，默认从无障碍树隐藏，设置名称仍由 header/title 表达。
- `content` / `children`：右侧主要设置控件或摘要；同时传入时 `children` 优先。
- `action`：位于主要 content 之后的补充操作。
- `disabled`：设置 `aria-disabled`、禁用 card trigger，并通过原生 `inert` 阻止后代的指针与键盘交互。后代控件若还需要独立的 disabled 视觉，请同时把 disabled 传给控件。
- `href`：创建原生 link trigger；支持 `target`、`rel` 和 `download`。`target="_blank"` 未显式传 `rel` 时自动使用 `noopener noreferrer`。
- `onClick`：创建原生 button trigger；与 `href` 同时存在时使用 link，并在该 link 的一次激活中调用一次 handler。
- `actionIcon`：可点击卡片尾部的装饰图标；默认是 chevron，传 `null` 可隐藏。

根 `ref` 在静态、button 与 link 三种模式下始终指向 `HTMLDivElement`。

## 交互边界

可点击卡片不会用 button 或 link 包裹 children。card trigger 是绝对定位的同级原生控件，content/action 位于它上层并保持独立 tab stop；点击 Switch、Button 或 Link 不会同时激活卡片。卡片的其余空白区域可通过指针、Enter 或 Space 激活。

没有可读的 header/title 时，可点击卡片必须通过 `aria-label` 或 `aria-labelledby` 提供名称。仅展示信息或包含设置控件时，不要传 `href` / `onClick`，使用静态模式。

小视口下，右侧 content/action 自动堆叠到标题说明下方。视觉仅消费现有 `--rwu-*` Design Tokens。

## 参考与源码边界

行为与布局参考：

- [Windows 应用设置指南](https://learn.microsoft.com/en-us/windows/apps/design/app-settings/guidelines-for-app-settings)
- [Windows Community Toolkit SettingsCard](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/windows/settingscontrols/settingscard)
- [Fluent UI React v9 Card specification](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-card/library/docs/Spec.md)

仅借鉴设置项 anatomy、响应式 wrapping、原生交互语义、ref/slot 组合与测试边界；未复制 Community Toolkit 或 Fluent UI 源码、Griffel 样式、Fluent tokens 或视觉 recipe。
