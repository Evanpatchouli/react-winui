import React from "react";

const rows = [
  ["content", "ReactNode", "required", "ContextMenu.Item and Divider command content."],
  ["children", "ReactElement", "required", "The target that receives contextual interactions."],
  ["open", "boolean", "undefined", "Controlled visibility; omit it for internal state."],
  ["defaultOpen", "boolean", "false", "Initial visibility for an uncontrolled menu."],
  ["onOpenChange", "(open, event?) => void", "undefined", "Receives visibility requests."],
  ["disabled", "boolean", "false", "Keeps the browser native context menu and disables custom behavior."],
  ["restoreFocus", "boolean", "true", "Restores focus after Escape or command selection."],
  ["menuProps", "HTMLAttributes", "undefined", "Adds attributes to the portaled menu surface."],
  ["ContextMenu.Item", "children, icon, secondaryContent, disabled, onSelect", "—", "A selectable command."],
  ["ContextMenu.Divider", "HTMLAttributes<HTMLHRElement>", "—", "A semantic separator."]
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
