import React from "react";

const rows = [
  ["options", "ComboBoxOption[]", "required", "Single-select option data; values must be unique."],
  ["value", "string | number | null", "undefined", "Controlled committed value."],
  ["defaultValue", "string | number | null", "null", "Initial uncontrolled value."],
  ["onValueChange", "(value, option, event) => void", "undefined", "Receives committed values."],
  ["editable", "boolean", "false", "Enables filtering and custom string submission."],
  ["text", "string", "undefined", "Controlled editable display text."],
  ["defaultText", "string", "undefined", "Initial uncontrolled editable text."],
  ["onTextChange", "(text, event) => void", "undefined", "Receives editable input requests."],
  ["onTextSubmit", "(text, event) => void", "undefined", "Receives custom Enter or blur commits."],
  ["open", "boolean", "undefined", "Controlled popup visibility."],
  ["defaultOpen", "boolean", "false", "Initial uncontrolled popup visibility."],
  ["onOpenChange", "(open, event) => void", "undefined", "Receives visibility requests."],
  ["listboxAriaLabel", "string", "Options", "Accessible name for the popup listbox."],
  ["noOptionsMessage", "ReactNode", "No options", "Empty filtered-list content."],
  ["disabled", "boolean", "false", "Disables input, toggle, and selection."],
  ["name", "string", "undefined", "Submits the committed value through a hidden form input."]
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
