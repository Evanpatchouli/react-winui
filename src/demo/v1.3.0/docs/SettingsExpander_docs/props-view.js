import React from "react";

const rows = [
  ["header / title", "ReactNode", "undefined", "Primary label; header takes precedence."],
  ["description", "ReactNode", "undefined", "Supporting text below the label."],
  ["icon", "ReactNode", "undefined", "Decorative leading icon."],
  ["content", "ReactNode", "undefined", "Primary control in the header row."],
  ["action", "ReactNode", "undefined", "Supplementary independent header action."],
  ["children", "ReactNode", "undefined", "Settings revealed by the disclosure."],
  ["itemsHeader / itemsFooter", "ReactNode", "undefined", "Expanded group boundary content."],
  ["expanded", "boolean", "undefined", "Parent-controlled expanded state."],
  ["defaultExpanded", "boolean", "false", "Initial uncontrolled expanded state."],
  ["onExpandedChange", "(expanded, event) => void", "undefined", "Expanded-state request."],
  ["disabled", "boolean", "false", "Disables and makes the complete group inert."],
  ["headerAriaLabel", "string", "undefined", "Explicit disclosure button name."],
  ["contentId", "string", "generated", "Expanded region id used by aria-controls."]
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
