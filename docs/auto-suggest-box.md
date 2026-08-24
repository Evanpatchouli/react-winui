# AutoSuggestBox

`AutoSuggestBox` 是用于“输入查询、展示动态建议、提交查询”的 WinUI 风格控件。它是新增的现代
API，不替换旧 `InputSearchBox`，也不把 `ComboBox` 的值选择语义扩展成查询语义。

## 去重审计

- `InputSearchBox` 保留旧 `suggest` / `onChange` / item `onClick` API。它内部执行字符串过滤，
  但没有受控 text/open、query submit、键盘导航、combobox ARIA、light-dismiss 或 viewport 定位。
- `InputSearchBar` 只提供文本输入和按钮提交，没有建议列表。
- `ComboBox` 负责提交一个选中值；editable 模式允许自定义值，但不是“查询变化后由应用提供建议”
  的事件模型。
- 因此新增独立 `AutoSuggestBox` 比兼容式扩大旧组件更安全：旧 Props 不变，selection 与 query 两种
  语义也不会混淆。

## 示例

应用根据 `onTextChange` 提供当前查询的建议；组件不会假设本地过滤规则，因此同样适用于异步数据：

```tsx
const [text, setText] = useState("");
const suggestions = cities
  .filter((city) => city.toLowerCase().includes(text.toLowerCase()))
  .map((city) => ({ value: city }));

<AutoSuggestBox
  label="Destination"
  text={text}
  suggestions={suggestions}
  queryButton
  onTextChange={(nextText) => setText(nextText)}
  onSuggestionChoose={(suggestion) => remember(suggestion.value)}
  onQuerySubmit={(query, chosenSuggestion) => search(query, chosenSuggestion)}
/>;
```

## 主要 API

| Prop                    | 说明                                                           |
| ----------------------- | -------------------------------------------------------------- |
| `suggestions`           | `{ value, label?, icon?, disabled? }[]`；`value` 必须唯一      |
| `text` / `defaultText`  | 受控 / 非受控输入文本                                          |
| `onTextChange`          | 文本更新请求，并区分 `input`、`suggestion`、`clear` reason     |
| `open` / `defaultOpen`  | 受控 / 非受控建议列表可见状态                                  |
| `onOpenChange`          | 输入、键盘、pointer、focus 或 outside interaction 的可见性请求 |
| `onSuggestionChoose`    | 用户提交启用建议时触发，不等同于普通文本查询                   |
| `onQuerySubmit`         | Enter、query button 或建议提交；第二参数指出 chosen suggestion |
| `queryButton`           | 显示可选 WinUI query icon button                               |
| `label` / `description` | 可见标签和输入指导，并建立 ARIA 关系                           |
| `noSuggestionsMessage`  | popup 打开但没有结果时的单行状态内容                           |

## 交互与边界

- DOM focus 保持在 `role="combobox"` 的 input，通过 `aria-activedescendant` 指向
  `role="option"`；popup 使用 `role="listbox"`。
- `ArrowDown` / `ArrowUp` 循环并跳过 disabled suggestion，`Home` / `End` 到首尾可用项；
  `Enter` 提交 active suggestion，否则提交当前文本。
- suggestion 提交会依次发出 text change（reason 为 `suggestion`）、suggestion choose 和 query
  submit；普通 Enter / query button 的 `chosenSuggestion` 为 `undefined`。
- 输入法 composition 期间不会把 Enter 当作提交；`Escape`、`Tab` 和 outside pointer 关闭 popup。
- popup portal 到 document body，跟随 scroll / resize，并在下方空间不足时切换到输入框上方。
- 受控 text/open 只发出请求，父组件没有更新 Props 时，组件不会修改受控状态。

## 参考边界

- [WinUI Auto-suggest box](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/auto-suggest-box)：文本变化、建议选择、查询提交、可选 query icon 和 no-results 建议。
- [WinUI AutoSuggestBox API](https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.autosuggestbox)：控件职责、提交方式和无障碍目标。
- [Fluent UI React v9 Combobox](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-combobox)：受控 open/value、active descendant、portal 和测试边界。
- [Fluent UI React v9 SearchBox](https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-search)：query/clear button 的 React API 思路。
- [WAI-ARIA Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)：combobox/listbox/option 关系与键盘约定。

只参考上述来源的公开行为、API 和测试思路；未复制 Fluent UI 源码、Griffel 样式或视觉 token。
