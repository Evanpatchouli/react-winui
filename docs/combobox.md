# ComboBox

`ComboBox` 是单选、可折叠的 WinUI 风格选择控件。它不替换旧 `Select` 或
`SelectNative`：旧组件继续保持兼容，新组件提供现代受控状态、可编辑输入、ARIA 和完整键盘行为。

## 能力边界

- `Select` 只支持点击选择和 `defaultValue`，没有受控 value/open、disabled、ARIA、键盘导航或
  viewport 定位。
- `SelectNative` 保留浏览器原生单选能力，适合不需要自定义 option 内容和可编辑文本的场景。
- `InputSearchBox` 只过滤搜索建议，不负责选择提交、受控 open/value 或 combobox/listbox 语义。
- `ComboBox` 使用 `options` 数据源；同时支持 select-only 和 editable 两种模式，但不支持多选。

## 示例

```tsx
const colors = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red", disabled: true }
];

<ComboBox
  aria-label="Color"
  defaultValue="blue"
  options={colors}
  onValueChange={(value, option) => {
    console.log(value, option);
  }}
/>;
```

可编辑模式允许提交列表外的字符串，并可分别控制已提交值、显示文本和 open 状态：

```tsx
<ComboBox
  editable
  aria-label="Recent name"
  options={recentNames}
  value={name}
  text={draft}
  open={open}
  onTextChange={setDraft}
  onTextSubmit={validateName}
  onValueChange={setName}
  onOpenChange={setOpen}
/>
```

## 主要 API

| Prop                            | 说明                                                           |
| ------------------------------- | -------------------------------------------------------------- |
| `options`                       | `{ value, label, textValue?, icon?, disabled? }[]`；值必须唯一 |
| `value` / `defaultValue`        | 受控 / 非受控的已提交单选值                                    |
| `onValueChange`                 | option 或可编辑自定义文本提交后触发                            |
| `editable`                      | 启用文本编辑、包含式过滤和自定义值提交                         |
| `text` / `defaultText`          | editable 模式的受控 / 非受控显示文本                           |
| `onTextChange` / `onTextSubmit` | 输入变化 / Enter 或 blur 提交自定义文本                        |
| `open` / `defaultOpen`          | 受控 / 非受控的 listbox 可见状态                               |
| `onOpenChange`                  | 用户交互请求改变可见状态时触发                                 |
| `listboxAriaLabel`              | listbox 没有可复用可见标签时提供 accessible name               |

## 交互与无障碍

- DOM focus 始终停留在 `role="combobox"` 的 input 上，通过 `aria-activedescendant` 指向
  `role="option"`；popup 使用 `role="listbox"`。
- `ArrowDown` / `ArrowUp` 跳过 disabled option，`Home` / `End` 移到首尾可用 option。
- `Enter` 或点击才提交当前 option；箭头导航不会提前改变 selection；`Escape` 只关闭 popup。
- select-only 模式支持不区分大小写的前缀 typeahead；editable 模式按输入文本过滤。
- popup portal 到当前 document body，并根据 viewport 空间在上方或下方显示、限制最大高度且跟随
  resize / scroll 重定位。

## 参考边界

- [WinUI Combo box and list box](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/combo-box)：紧凑/展开状态、单选提交、文本搜索、editable 与 TextSubmitted 行为。
- [Fluent UI React v9 Combobox types](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/utils/ComboboxBase.types.ts)：受控 value/open、freeform、portal 与 callback 边界。
- [Fluent UI React v9 Combobox tests](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Combobox/Combobox.test.tsx)：disabled、键盘、portal、controlled state 的测试思路。
- [WAI-ARIA Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)：combobox/listbox/option 关系、键盘约定和 active descendant 焦点模型。

只参考上述来源的公开行为、API 和测试边界；未复制 Fluent UI 源码、Griffel 样式或视觉 token。
