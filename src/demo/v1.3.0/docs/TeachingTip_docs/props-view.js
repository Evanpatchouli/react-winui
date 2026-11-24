import React from "react";

const rows = [
  ["children", "ReactElement", "required", "Target element that receives toggle and ARIA behavior."],
  ["title", "ReactNode", "undefined", "Short primary heading."],
  ["subtitle", "ReactNode", "undefined", "Supporting explanation connected with aria-describedby."],
  ["content", "ReactNode", "undefined", "Body content, including interactive elements."],
  ["icon", "ReactNode", "undefined", "Decorative icon displayed beside the heading."],
  ["heroContent", "ReactNode", "undefined", "Optional edge-to-edge hero content."],
  ["heroContentPlacement", '"top" | "bottom"', '"top"', "Hero content placement."],
  ["action", "TeachingTipAction", "undefined", "Optional footer action; it dismisses by default."],
  ["open / defaultOpen", "boolean", "false", "Controlled or initial uncontrolled visibility."],
  ["onOpenChange", "(open, event?) => void", "undefined", "Receives visibility change requests."],
  ["placement", '"top" | "bottom" | "left" | "right"', '"bottom"', "Preferred side with viewport fallback."],
  ["withArrow", "boolean", "true", "Renders a pointer toward the target."],
  ["isLightDismiss", "boolean", "false", "Closes on outside pointer and removes the close button."],
  ["closeButtonAriaLabel", "string", '"Close teaching tip"', "Accessible label for the default close button."],
  ["disabled", "boolean", "false", "Prevents opening while preserving the target."]
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
