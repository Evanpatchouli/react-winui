import React from "react";

const rows = [
  ["header", "ReactNode", "required", "Always-visible content inside the disclosure button."],
  ["icon", "ReactNode", "undefined", "Optional decorative visual before the header."],
  ["children", "ReactNode", "undefined", "Secondary content shown while expanded."],
  ["expanded", "boolean", "undefined", "Controlled expanded state."],
  ["defaultExpanded", "boolean", "false", "Initial uncontrolled expanded state."],
  [
    "onExpandedChange",
    "(expanded, event) => void",
    "undefined",
    "Receives pointer and keyboard state-change requests."
  ],
  ["direction", "down | up", "down", "Places revealed content below or above the header."],
  ["disabled", "boolean", "false", "Prevents header activation."],
  ["headerAriaLabel", "string", "undefined", "Accessible name for a non-text header."],
  ["contentId", "string", "generated", "Stable id referenced by aria-controls."]
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
