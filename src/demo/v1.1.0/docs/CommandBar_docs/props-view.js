import React from "react";

const rows = [
  ["children", "ReactNode", "undefined", "Primary Button and Separator commands."],
  ["secondaryCommands", "ReactNode", "undefined", "Commands always placed in overflow."],
  ["overflowOpen", "boolean", "undefined", "Controlled overflow visibility."],
  ["defaultOverflowOpen", "boolean", "false", "Initial uncontrolled overflow visibility."],
  ["onOverflowOpenChange", "(open, event) => void", "undefined", "Receives visibility requests."],
  ["dynamicOverflow", "boolean", "true", "Moves trailing primary commands when width shrinks."],
  ["minimumPrimaryCommands", "number", "0", "Minimum primary commands kept in the toolbar."],
  ["overflowLabel", "string", "More commands", "Accessible overflow button and menu label."],
  ["overflowIcon", "ReactNode", "ellipsis", "Decorative overflow button icon."],
  ["compact", "boolean", "false", "Visually hides primary labels while preserving names."],
  ["menuClassName", "string", "undefined", "Extra class for the portaled overflow surface."],
  ["CommandBar.Button", "label, icon, disabled, onClick", "—", "An AppBarButton-style command."],
  ["CommandBar.Separator", "HTMLAttributes<HTMLHRElement>", "—", "An adaptive separator."]
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
