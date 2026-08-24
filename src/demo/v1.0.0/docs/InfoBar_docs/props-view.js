import React from "react";

const rows = [
  [
    "severity",
    "informational | success | warning | error",
    "informational",
    "Icon and live-region priority."
  ],
  ["title", "ReactNode", "undefined", "Short summary with stronger emphasis."],
  ["message", "ReactNode", "undefined", "Main status message."],
  ["content / children", "ReactNode", "undefined", "Custom content on a separate line."],
  ["action", "ReactNode", "undefined", "Optional action beside the summary."],
  ["open", "boolean", "undefined", "Controlled visibility."],
  ["defaultOpen", "boolean", "false", "Initial uncontrolled visibility."],
  ["onOpenChange", "(open, event) => void", "undefined", "Receives close requests."],
  ["closable", "boolean", "true", "Shows the native close button."],
  ["closeButtonAriaLabel", "string", "Close", "Localized accessible close label."],
  [
    "disabled",
    "boolean",
    "false",
    "Blocks close/action activation while keeping the message readable."
  ]
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
