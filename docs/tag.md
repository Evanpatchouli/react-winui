# Tag

`Tag` 用紧凑内容表达分类、筛选值或其他短值。静态标签只提供信息；可关闭标签把整个标签作为移除操作，适合由父组件管理的标签集合。

```tsx
import { Tag } from "@evanpatchouli/react-winui";
import "@evanpatchouli/react-winui/styles.css";

<Tag appearance="outline" icon={<TagIcon />}>
  Design
</Tag>;
```

也支持独立入口：

```tsx
import Tag from "@evanpatchouli/react-winui/tag";
```

## API

| Prop          | 类型                                   | 默认值      | 说明                                                         |
| ------------- | -------------------------------------- | ----------- | ------------------------------------------------------------ |
| `children`    | `ReactNode`                            | 必填        | 标签的可见内容。                                             |
| `appearance`  | `"filled" \| "outline" \| "brand"`     | `"filled"`  | 标签表面外观。                                               |
| `shape`       | `"rounded" \| "circular"`              | `"rounded"` | 标签边界形状。                                               |
| `size`        | `"extra-small" \| "small" \| "medium"` | `"medium"`  | 控件高度和间距档位。                                         |
| `icon`        | `ReactNode`                            | —           | 标签文字前的装饰内容。                                       |
| `dismissible` | `boolean`                              | `false`     | 将标签渲染为可关闭的原生按钮。                               |
| `onDismiss`   | `(event) => void`                      | —           | 点击、Delete 或 Backspace 触发的移除请求。                   |
| `disabled`    | `boolean`                              | `false`     | 禁用 dismissible Tag；静态 Tag 保留内容并标记为 disabled。   |
| native props  | `HTMLAttributes<HTMLElement>`          | —           | 支持 `className`、`style`、`id`、`data-*` 和 forwarded ref。 |

## 行为与无障碍

- 默认静态 Tag 是 `<span>`，不进入焦点顺序，也不会伪装成按钮。
- `dismissible` Tag 是 `<button type="button">`，其 accessible name 来自 `children`；关闭 glyph 和 `icon` 是装饰内容。
- `onDismiss` 只报告移除请求，不自动修改父组件状态。列表场景应在回调中移除对应值。
- Delete 与 Backspace 会触发 `onDismiss`，其他按键不会；disabled 的 dismissible Tag 使用原生 `disabled` 行为。
- 主题颜色、边框、圆角、尺寸和状态样式均来自 react-winui `--rwu-*` Design Tokens。

## 借鉴边界

- WinUI / Windows 11：参考紧凑标签值、可关闭标签与内容不截断的使用场景。
- Fluent UI React：参考 Tag 的 filled / outline / brand 外观命名、尺寸与 shape 维度，以及 dismissible 标签的按钮语义和键盘移除行为。
- 当前实现只提供 standalone Tag；不加入 TagGroup、TagPicker、overflow tag、selection state、secondary text 或单独的 interaction action。
- 未复制 Fluent UI / WinUI 源码、Griffel 样式或视觉 token，因此不新增 `THIRD_PARTY_NOTICES.md` 条目。
