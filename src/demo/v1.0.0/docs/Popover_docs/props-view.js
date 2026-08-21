import React from "react";

const rows = [
  ["content", "ReactNode", "required", "Structured or informational content rendered in the surface."],
  ["children", "ReactElement", "required", "The trigger element that receives toggle and ARIA behavior."],
  ["open", "boolean", "undefined", "Controlled visibility; omit it for internal state."],
  ["defaultOpen", "boolean", "false", "Initial visibility for an uncontrolled surface."],
  ["onOpenChange", "(open, event?) => void", "undefined", "Receives visibility change requests."],
  ["placement", '"top" | "bottom" | "left" | "right"', '"bottom"', "Preferred side with viewport fallback."],
  ["withArrow", "boolean", "false", "Renders a pointer toward the trigger."],
  ["openOnHover", "boolean", "false", "Also opens from pointer hover and focus."],
  ["trapFocus", "boolean", "false", "Cycles Tab focus inside the surface."],
  ["autoFocus", "boolean", "false", "Focuses the first surface control on open."],
  ["closeOnScroll", "boolean", "false", "Closes when the document scrolls outside the surface."],
  ["disabled", "boolean", "false", "Prevents opening while preserving the trigger."]
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
