import React from "react";

const rows = [
  ["value", "Date | null", "undefined", "受控的已提交日期。"],
  ["defaultValue", "Date | null", "null", "非受控初始日期。"],
  ["onValueChange", "(value, event) => void", "undefined", "日期选择或有效文本提交时触发。"],
  ["open" , "boolean", "undefined", "受控的 calendar popup 可见状态。"],
  ["defaultOpen", "boolean", "false", "非受控初始可见状态。"],
  ["allowTextInput", "boolean", "false", "允许直接编辑日期文本。"],
  ["formatDate", "(date) => string", "Intl", "格式化输入框显示文本。"],
  ["parseDate", "(text) => Date | null", "Date parser", "解析 editable 文本。"],
  ["minDate" , "Date", "undefined", "可选择的最早日期。"],
  ["maxDate", "Date", "undefined", "可选择的最晚日期。"],
  ["today", "Date", "client date", "指定 today 高亮和 Today 操作使用的日期。"],
  ["showTodayButton", "boolean", "false", "显示选择 today 的 footer 操作。"],
  ["firstDayOfWeek", "0 | 1 | ... | 6", "0", "日历网格的首个星期。"],
  ["locale", "string", "browser locale", "默认 Intl 格式和文案使用的 locale。"],
  ["label", "ReactNode", "undefined", "输入框可见标签。"],
  ["disabled", "boolean", "false", "禁用输入框、日历按钮和日期选择。"],
  ["readOnly", "boolean", "false", "保持输入只读但允许打开日历。"]
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
