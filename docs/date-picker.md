# DatePicker

`DatePicker` 是单日期选择控件：输入框负责显示已提交日期，日历 popup 负责浏览月份和选择日期。它不替换旧的 `Select`、`SelectNative` 或 `InputText`，也不负责日期范围选择。

## 示例

```tsx
const [date, setDate] = useState<Date | null>(new Date(2024, 4, 15));

<DatePicker
  label="Release date"
  locale="en-US"
  value={date}
  onValueChange={setDate}
  minDate={new Date(2024, 4, 1)}
  maxDate={new Date(2024, 4, 31)}
  showTodayButton
  today={new Date(2024, 4, 20)}
/>;
```

直接入口为 `@evanpatchouli/react-winui/date-picker`，默认入口和直接入口导出的组件、Props 类型一致。

## API

| Prop                                            | 说明                                                               |
| ----------------------------------------------- | ------------------------------------------------------------------ |
| `value` / `defaultValue`                        | 受控 / 非受控的 `Date                                              | null` 已提交值 |
| `onValueChange`                                 | 日历选择或有效文本提交时触发；清空时值为 `null`                    |
| `open` / `defaultOpen`                          | 受控 / 非受控的日历 popup 可见状态                                 |
| `onOpenChange`                                  | 输入框、日历按钮、Escape 或 outside pointer 请求改变可见状态时触发 |
| `allowTextInput`                                | 允许直接编辑输入框；默认只读                                       |
| `formatDate` / `parseDate`                      | 自定义显示格式和可编辑文本解析器                                   |
| `onTextChange`                                  | editable 模式下收到每次草稿文本变化                                |
| `onValidationResult`                            | 收到 `invalid-input`、`out-of-bounds` 或 `required-input`          |
| `locale`                                        | 默认日期、月份、星期文案使用的 Intl locale                         |
| `firstDayOfWeek`                                | 日历首个星期日，`0` 到 `6`，默认 `0`                               |
| `minDate` / `maxDate`                           | 可选择日期的闭区间边界                                             |
| `initialPickerDate`                             | 没有已选日期时首次打开的月份                                       |
| `today` / `showTodayButton`                     | 指定今天高亮日期；可选择是否显示 Today 操作                        |
| `label` / `placeholder`                         | 输入框可见标签和空值占位文案                                       |
| `calendarButtonAriaLabel` / `calendarAriaLabel` | 日历按钮和 popup 的本地化 accessible name                          |
| `openOnClick` / `closeOnSelect`                 | 是否点击输入框打开、选中日期后是否关闭 popup                       |
| `width` / `rootClassName`                       | 输入宽度和外层 wrapper className                                   |

## 交互与无障碍

- 输入框使用 `role="combobox"`、`aria-haspopup="dialog"`、`aria-expanded` 和 `aria-controls`；日历 popup 使用 `role="dialog"`，内部使用 `role="grid"`。
- `Enter`、`Space` 或 `ArrowDown` 可从输入框打开日历；日历内使用方向键、`Home`、`End`、`PageUp` 和 `PageDown` 浏览日期，`Enter` 或 `Space` 提交当前日期。
- 日期按钮使用 roving `tabIndex`，禁用日期不会进入键盘导航；选择或 Escape 关闭后焦点返回输入框。
- popup 会 portal 到 `document.body`，并根据 viewport 空间在输入框上方或下方定位；outside pointer 和 Escape 会关闭它。
- editable 模式只在 blur 或 Enter 时提交解析结果；无效或超出边界的文本保留为错误状态，不会覆盖上一次有效日期。

## 当前边界

当前组件只支持单日期，不包含日期范围、时间选择、日期格式化库、跨时区转换或多月并排视图。`locale` 只影响默认 Intl 文案和格式；需要稳定的业务格式时请同时提供 `formatDate` 和 `parseDate`。

## 参考边界

- [WinUI DatePicker](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/date-picker)：输入框、日历按钮、日期提交和可编辑边界。
- [WinUI CalendarDatePicker](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/calendar-date-picker)：popup 日历、最小/最大日期和 Today 行为。
- [Fluent UI React v9 DatePicker types](https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-datepicker-compat/library/src/components/DatePicker/DatePicker.types.ts)：受控 value/open、parse/format 与 validation API 边界。
- [WAI-ARIA Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)：日历网格角色、roving focus 和方向键约定。

只参考上述来源的公开行为、API 和测试边界；未复制 Fluent UI 实现源码、Griffel 样式或视觉 token。
