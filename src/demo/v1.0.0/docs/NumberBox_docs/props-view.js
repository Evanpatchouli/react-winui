import React from "react";

const rows = [
  ["value", "number | null", "undefined", "Controlled committed value; null is empty."],
  ["defaultValue", "number | null", "null", "Initial uncontrolled value."],
  ["min", "number", "undefined", "Smallest value accepted on commit."],
  ["max", "number", "undefined", "Largest value accepted on commit."],
  ["step", "number", "1", "Arrow-key and spin-button increment."],
  ["largeStep", "number", "step * 10", "Page Up and Page Down increment."],
  ["precision", "number", "from step", "Decimal places used for rounding and display."],
  [
    "onValueChange",
    "(value, event) => void",
    "undefined",
    "Receives values committed by keyboard, pointer, Enter, or blur."
  ],
  ["onTextChange", "(text, event) => void", "undefined", "Receives every direct text edit."],
  ["label", "ReactNode", "undefined", "Visible label associated with the spinbutton."],
  ["showSpinButtons", "boolean", "true", "Shows inline increment and decrement buttons."],
  ["disabled", "boolean", "false", "Disables text input and stepping."],
  ["readOnly", "boolean", "false", "Allows focus and selection without changing the value."],
  ["required", "boolean", "false", "Marks an empty value invalid."],
  ["name", "string", "undefined", "Submits the last committed numeric value."]
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
