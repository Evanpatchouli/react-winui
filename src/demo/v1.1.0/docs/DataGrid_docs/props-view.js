import React from "react";

const rows = [
  ["items", "readonly T[]", "[]", "渲染到数据行的项目数组。"],
  ["columns", "DataGridColumn<T>[]", "[]", "列定义、单元格访问器和可选自定义渲染器。"],
  ["getRowId", "(item, index) => string | number", "index", "解析稳定的行 ID。"],
  ["sortState / defaultSortState", "DataGridSortState | null", "null", "受控或非受控排序状态。"],
  ["onSortChange", "(sortState, event) => void", "undefined", "可排序表头请求新排序状态时触发。"],
  ["selectionMode", '"none" | "single" | "multiple"', '"none"', "启用单行或多行选择。"],
  ["selectedRowIds / defaultSelectedRowIds", "(string | number)[]", "[]", "受控或非受控选中行 ID。"],
  ["onSelectionChange", "(selectedRowIds, event) => void", "undefined", "选中行变化时触发。"],
  ["getRowDisabled", "(item, index) => boolean", "false", "将指定数据行标记为不可交互。"],
  ["noRowsMessage", "ReactNode", '"No items"', "数据数组为空时显示的内容。"],
  ["density", '"compact" | "standard"', '"standard"', "控制行的紧凑程度。"],
  ["disabled", "boolean", "false", "禁用排序、选择和行交互。"]
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
