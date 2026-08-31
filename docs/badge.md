# Badge

`Badge` 是放置在关联内容附近的非交互状态指示器，适合表达短状态、数量、图标或提醒点。没有文本和 icon 时会渲染 dot；Badge 本身不负责 dismiss、selection 或自动定位。

```tsx
import { Badge } from "@evanpatchouli/react-winui";
import "@evanpatchouli/react-winui/styles.css";

<Badge color="success">Ready</Badge>
<Badge aria-label="3 unread messages">3</Badge>
<Badge color="danger" />
```

也支持独立入口：

```tsx
import Badge from "@evanpatchouli/react-winui/badge";
```

## API

| Prop           | 类型                                                                                                    | 默认值       | 说明                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------- | ------------ | ---------------------------------------------------------------------- |
| `children`     | `ReactNode`                                                                                             | —            | 短状态文本或数字；省略时渲染 dot Badge。                               |
| `appearance`   | `"filled" \| "ghost" \| "outline" \| "tint"`                                                            | `"filled"`   | Badge 表面外观。                                                       |
| `color`        | `"brand" \| "danger" \| "important" \| "informative" \| "severe" \| "subtle" \| "success" \| "warning"` | `"brand"`    | Badge 的语义颜色。                                                     |
| `icon`         | `ReactNode`                                                                                             | —            | 可选图标或其他视觉内容。                                               |
| `iconPosition` | `"before" \| "after"`                                                                                   | `"before"`   | 图标相对内容的位置。                                                   |
| `shape`        | `"circular" \| "rounded" \| "square"`                                                                   | `"circular"` | Badge 边界形状。                                                       |
| `size`         | `"tiny" \| "extra-small" \| "small" \| "medium" \| "large" \| "extra-large"`                            | `"medium"`   | Badge 尺寸和字体档位。                                                 |
| native props   | `HTMLAttributes<HTMLSpanElement>`                                                                       | —            | 支持 `className`、`style`、`id`、`data-*`、ARIA 属性和 forwarded ref。 |

## 行为与无障碍

- Badge 使用非交互 `<span>`，默认不进入焦点顺序，不自动添加 `role="status"`。
- icon-only Badge 应提供 `aria-label`；Badge 与按钮、导航项或头像关联时，建议由父组件的 accessible name 或 description 传达其状态。
- Badge 不内置 max-width；如果确实需要截断，消费者应自行提供宽度和截断样式。
- `children` 为 `0` 时仍会显示数字 `0`；只有 children 和 icon 都省略时才是 dot 类型。
- 颜色、边框、圆角、尺寸和主题变化均来自 react-winui `--rwu-*` Design Tokens。

## 借鉴边界

- WinUI / Windows 11：参考 `InfoBadge` 的 dot、icon、numeric 三种内容场景、非交互语义、关联父组件的辅助技术责任以及 notification/status 使用边界。
- Fluent UI React：参考 Badge 的 `appearance`、`color`、`iconPosition`、`shape`、`size` 维度和无默认 focus 的行为。
- 当前实现只提供 standalone Badge；不加入可交互 Badge、dismiss、自动定位或 NavigationView 专属组合 API。
- 未复制 Fluent UI / WinUI 源码、Griffel 样式或视觉 token，因此不新增 `THIRD_PARTY_NOTICES.md` 条目。
