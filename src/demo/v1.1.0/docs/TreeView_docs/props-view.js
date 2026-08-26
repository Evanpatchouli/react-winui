import React from "react";

const rows = [
  ["TreeView", "children", "ReactNode", "undefined", "Nested TreeItem elements."],
  ["TreeView", "value", "string | number | null", "undefined", "Controlled selected item."],
  [
    "TreeView",
    "defaultValue",
    "string | number | null",
    "null",
    "Initial uncontrolled selection."
  ],
  [
    "TreeView",
    "onValueChange",
    "(value, event) => void",
    "undefined",
    "Receives single-selection requests."
  ],
  [
    "TreeView",
    "expandedItems",
    "readonly (string | number)[]",
    "undefined",
    "Controlled expanded branch values."
  ],
  [
    "TreeView",
    "defaultExpandedItems",
    "readonly (string | number)[]",
    "[]",
    "Initial uncontrolled expanded branches."
  ],
  [
    "TreeView",
    "onExpandedItemsChange",
    "(items, event) => void",
    "undefined",
    "Receives expansion requests."
  ],
  [
    "TreeView",
    "selectionMode",
    '"single" | "none"',
    '"single"',
    "Enables single selection or a non-selectable outline."
  ],
  ["TreeItem", "value", "string | number", "required", "Unique item identity."],
  ["TreeItem", "label", "ReactNode", "required", "Visible non-interactive item content."],
  [
    "TreeItem",
    "textValue",
    "string",
    "derived",
    "Typeahead text for a non-text label."
  ],
  ["TreeItem", "icon", "ReactNode", "undefined", "Optional decorative leading visual."],
  ["TreeItem", "disabled", "boolean", "false", "Blocks focus and interaction."],
  ["TreeItem", "children", "ReactNode", "undefined", "Nested TreeItem branches or leaves."]
];

const PropsView = () => (
  <div className="ui-table-view-container">
    <table className="ui-table-view">
      <thead>
        <tr className="ui-table-tr">
          <th align="left">Component</th>
          <th align="left">Prop</th>
          <th align="left">Type</th>
          <th align="left">Default</th>
          <th align="left">Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([component, name, type, defaultValue, description]) => (
          <tr key={`${component}-${name}`}>
            <td>{component}</td>
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
