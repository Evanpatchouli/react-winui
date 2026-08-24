import React from "react";

const rows = [
  ["items / children", "ItemData[] / ReactNode", "undefined", "Primary navigation items."],
  ["footerItems", "ItemData[]", "[]", "Footer items sharing the selected value."],
  ["settingsItem", "ItemData / false", "false", "Optional final Settings item."],
  ["value / defaultValue", "string | number | null", "undefined / null", "Selected item."],
  ["paneOpen / defaultPaneOpen", "boolean", "undefined", "Pane visibility."],
  ["paneDisplayMode", "auto | expanded | compact | minimal", "auto", "Adaptive layout."],
  ["expandedItems", "readonly (string | number)[]", "undefined", "Controlled branches."],
  ["header / content", "ReactNode", "undefined", "Application content slots."],
  ["paneHeader / footer", "ReactNode", "undefined", "Pane chrome slots."],
  ["NavigationView.Item", "value, label, icon, disabled, selectable", "—", "Item or branch."],
  ["NavigationView.Separator", "HTMLAttributes<HTMLHRElement>", "—", "Visual divider."]
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
            <td><p className="ui-code">{name}</p></td>
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
