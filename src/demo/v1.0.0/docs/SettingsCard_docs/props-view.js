import React from "react";

const rows = [
  ["header / title", "ReactNode", "undefined", "Primary label; header takes precedence."],
  ["description", "ReactNode", "undefined", "Supporting text below the label."],
  ["icon", "ReactNode", "undefined", "Decorative leading icon."],
  ["content / children", "ReactNode", "undefined", "Main right-aligned control or summary."],
  ["action", "ReactNode", "undefined", "Supplementary action after the main content."],
  ["disabled", "boolean", "false", "Disables the trigger and makes descendants inert."],
  ["href", "string", "undefined", "Uses a native link as the card-level trigger."],
  ["onClick", "(event) => void", "undefined", "Uses a native button when href is absent."],
  ["actionIcon", "ReactNode | null", "chevron", "Clickable trailing icon; null hides it."],
  ["target / rel / download", "anchor props", "undefined", "Link behavior when href is present."]
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
