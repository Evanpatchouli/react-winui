# Calendar

`Calendar` 是独立常驻的 Windows 风格单日期日历。它与 `DatePicker` 共用日期边界、六周网格和键盘交互思路，但不包含输入框或 popup。

## 使用

```tsx
import { Calendar } from "@evanpatchouli/react-winui";
import "@evanpatchouli/react-winui/styles.css";

<Calendar
  label="Release date"
  defaultPickerDate={new Date(2024, 4, 15)}
  locale="en-US"
  onValueChange={(date) => console.log(date)}
  today={new Date(2024, 4, 20)}
/>;
```

也支持独立入口：

```tsx
import Calendar from "@evanpatchouli/react-winui/calendar";
```

## API

| Prop                                            | 类型                     | 默认值         | 说明                                          |
| ----------------------------------------------- | ------------------------ | -------------- | --------------------------------------------- |
| `value` / `defaultValue`                        | `Date \| null`           | `null`         | 受控或非受控的已选日期。                      |
| `onValueChange`                                 | `(value, event) => void` | `undefined`    | 选择日期或 Today 时触发。                     |
| `pickerDate` / `defaultPickerDate`              | `Date`                   | 当前日期       | 受控或非受控的可见月份。                      |
| `onPickerDateChange`                            | `(date, event) => void`  | `undefined`    | 月份导航请求新月份时触发。                    |
| `today`                                         | `Date`                   | 客户端当前日期 | Today 高亮和 Today 操作使用的日期。           |
| `locale`                                        | `string`                 | 浏览器 locale  | 月份、星期和完整日期 accessible name 的格式。 |
| `firstDayOfWeek`                                | `0 \| 1 \| ... \| 6`     | `0`            | 网格第一列，`0` 为 Sunday。                   |
| `minDate` / `maxDate`                           | `Date`                   | `undefined`    | 可选择日期的闭区间边界。                      |
| `restrictedDates`                               | `Date[]`                 | `[]`           | 保持显示但不可选择的日期。                    |
| `showTodayButton`                               | `boolean`                | `true`         | 是否显示选择 Today 的 footer 操作。           |
| `label`                                         | `ReactNode`              | `undefined`    | 日历表面的可见标签。                          |
| `calendarAriaLabel`                             | `string`                 | `Calendar`     | 日历和网格的 accessible name。                |
| `previousMonthAriaLabel` / `nextMonthAriaLabel` | `string`                 | 英文默认文案   | 月份导航按钮的 accessible name。              |
| `todayButtonLabel`                              | `string`                 | `Today`        | footer 操作的可见文案。                       |
| `disabled`                                      | `boolean`                | `false`        | 禁用日期、月份导航和 Today 操作。             |
| `rootClassName`                                 | `string`                 | `undefined`    | 外层 Calendar class。                         |

## 行为与边界

- 默认渲染当前月份的固定六周网格，包含相邻月份日期；相邻月份日期仍遵守 `minDate`、`maxDate` 和 `restrictedDates`。
- `Arrow` 键按日或按周移动 roving focus；`Home` / `End` 移动到当前周首尾；`PageUp` / `PageDown` 切换月份，配合 Ctrl 切换年份。
- `Enter` / `Space` 提交当前焦点日期。月份导航不会自动提交日期。
- 本批不实现多选、范围选择、月份/年份选择器、周数显示、popup、文本输入、时区转换或异步日期数据源。

## 借鉴边界

- WinUI / Windows 11：常驻日历表面、月份导航、Today、日期边界和键盘日期移动。
- Fluent UI React v9：controlled / uncontrolled 状态、日期导航与 selection/focus 分离、ARIA grid 结构和测试边界。
- 未复制 Fluent UI 或 WinUI 源码；视觉只使用 react-winui `--rwu-*` tokens。
