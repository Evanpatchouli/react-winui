import React from "react";

const rows = [
  ["children", "ReactNode", "required", "Visible text or content represented by the Tag."],
  ["appearance", '"filled" | "outline" | "brand"', '"filled"', "Surface treatment."],
  ["shape", '"rounded" | "circular"', '"rounded"', "Boundary shape."],
  ["size", '"extra-small" | "small" | "medium"', '"medium"', "Control height and spacing."],
  ["icon", "ReactNode", "undefined", "Decorative content displayed before the label."],
  ["dismissible", "boolean", "false", "Renders the Tag as a dismiss action button."],
  ["onDismiss", "(event) => void", "undefined", "Called by click, Delete, or Backspace."],
  ["disabled", "boolean", "false", "Disables a dismissible Tag and applies the disabled state."]
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
