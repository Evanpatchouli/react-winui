# TeachingTip

`TeachingTip` 是面向新功能、提醒和轻量指导的内容型浮层。它以一个目标元素为定位锚点，允许标题、副标题、主体内容、图标、hero 内容和一个可选 action。

```tsx
import { Button, TeachingTip } from "@evanpatchouli/react-winui";

const [open, setOpen] = useState(false);

<TeachingTip
  action={{ label: "Got it" }}
  content="We will keep your changes synchronized on this device."
  icon={<i aria-hidden="true" className="icons10-idea" />}
  onOpenChange={setOpen}
  open={open}
  subtitle="No extra setup is required."
  title="Sync is ready"
>
  <Button value="Show teaching tip" />
</TeachingTip>;
```

## 行为边界

- `open` / `defaultOpen` / `onOpenChange` 支持受控和非受控可见性。
- 默认是显式关闭：目标点击、关闭按钮、action 或 Escape 可以关闭；outside pointer 不会关闭。
- `isLightDismiss` 会启用 outside pointer 关闭，并隐藏默认关闭按钮。
- 打开时焦点移动到浮层内第一个可聚焦元素；Escape 或显式关闭后恢复到目标元素。
- 目标会获得 `aria-controls`、`aria-expanded` 和 `aria-haspopup="dialog"`；标题和副标题自动建立 `aria-labelledby` / `aria-describedby` 关系。
- `content` 可以包含交互元素，TeachingTip 会保持 Tab 焦点在浮层内。

## Props

| Prop                   | 类型                                     | 默认值                 | 说明                                      |
| ---------------------- | ---------------------------------------- | ---------------------- | ----------------------------------------- |
| `children`             | `ReactElement`                           | 必填                   | 作为定位和交互目标的单一元素。            |
| `title`                | `ReactNode`                              | `undefined`            | 主要标题。                                |
| `subtitle`             | `ReactNode`                              | `undefined`            | 标题下的补充说明。                        |
| `content`              | `ReactNode`                              | `undefined`            | 主体内容，可以包含交互元素。              |
| `icon`                 | `ReactNode`                              | `undefined`            | 标题旁的装饰图标。                        |
| `heroContent`          | `ReactNode`                              | `undefined`            | 边到边显示的 hero 内容。                  |
| `heroContentPlacement` | `"top" \| "bottom"`                      | `"top"`                | hero 内容位置。                           |
| `action`               | `TeachingTipAction`                      | `undefined`            | 底部 action；默认点击后关闭。             |
| `open` / `defaultOpen` | `boolean`                                | `false`                | 受控或初始非受控可见性。                  |
| `onOpenChange`         | `(open, event?) => void`                 | `undefined`            | 可见性变化请求。                          |
| `placement`            | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"`             | 优先位置，空间不足时由 Popover fallback。 |
| `withArrow`            | `boolean`                                | `true`                 | 是否显示指向目标的箭头。                  |
| `isLightDismiss`       | `boolean`                                | `false`                | 是否启用 outside pointer 关闭。           |
| `closeButtonAriaLabel` | `string`                                 | `"Close teaching tip"` | 默认关闭按钮的可访问名称。                |
| `disabled`             | `boolean`                                | `false`                | 禁止打开并保留目标元素。                  |

## 参考边界

- WinUI：参考 [TeachingTip](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/dialogs-and-flyouts/teaching-tip) 的目标定位、显式关闭、light-dismiss、标题/副标题、action、hero 和 icon 概念。
- Fluent UI React v9：参考 [TeachingPopover](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-teaching-popover) 对 Popover 的箭头默认值、focus trap 和复用定位状态的做法；没有复制源码、Griffel 样式或 Fluent token。
- 当前实现先支持目标元素和四个基本方向，不扩展 WinUI 的完整 13 种 placement、持久化提示队列、轮播内容或非目标根边缘定位。
