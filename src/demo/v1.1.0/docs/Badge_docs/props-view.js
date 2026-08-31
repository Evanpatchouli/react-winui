import React from "react";

const rows = [
  ["children", "ReactNode", "—", "Short status text or numeric content; omit it for a dot Badge."],
  ["appearance", '"filled" | "ghost" | "outline" | "tint"', '"filled"', "Badge surface treatment."],
  [
    "color",
    '"brand" | "danger" | "important" | "informative" | "severe" | "subtle" | "success" | "warning"',
    '"brand"',
    "Semantic color used by the Badge."
  ],
  ["icon", "ReactNode", "—", "Optional icon or visual content."],
  ["iconPosition", '"before" | "after"', '"before"', "Icon position relative to content."],
  ["shape", '"circular" | "rounded" | "square"', '"circular"', "Badge boundary shape."],
  [
    "size",
    '"tiny" | "extra-small" | "small" | "medium" | "large" | "extra-large"',
    '"medium"',
    "Badge size and typography preset."
  ],
  ["native props", "HTMLAttributes<HTMLSpanElement>", "—", "className, style, id, data-* and ARIA attributes."]
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
