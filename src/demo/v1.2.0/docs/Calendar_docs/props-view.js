import React from "react";

const rows = [
  ["value / defaultValue", "Date | null", "null", "受控或非受控的已选日期。"],
  ["onValueChange", "(value, event) => void", "undefined", "选择日期或 Today 时触发。"],
  ["pickerDate / defaultPickerDate", "Date", "当前日期", "受控或非受控的可见月份。"],
  ["onPickerDateChange", "(date, event) => void", "undefined", "月份导航请求新月份时触发。"],
  ["today", "Date", "client date", "Today 高亮和 Today 操作使用的日期。"],
  ["locale", "string", "browser locale", "月份、星期和日期 accessible name 使用的 locale。"],
  ["firstDayOfWeek", "0 | 1 | ... | 6", "0", "日历网格的首个星期。"],
  ["minDate / maxDate", "Date", "undefined", "可选择日期的闭区间边界。"],
  ["restrictedDates", "Date[]", "[]", "保持显示但不可选择的日期。"],
  ["showTodayButton", "boolean", "true", "显示选择 Today 的 footer 操作。"],
  ["label", "ReactNode", "undefined", "日历表面的可见标签。"],
  ["disabled", "boolean", "false", "禁用日期、月份导航和 Today 操作。"]
];

const PropsView = () => (
  <div className="ui-table-view-container">
    <table className="ui-table-view">
      <thead>
        <tr className="ui-table-tr">
          <th align="left">Prop</th>
          <th align="left">Type</th>
          <th align="left">Default</th>
          <th align="left">Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([name, type, defaultValue, description]) => (
          <tr key={name}>
            <td>
              <p className="ui-code">{name}</p>
            </td>
            <td>{type}</td>
            <td>{defaultValue}</td>
            <td>{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PropsView;
