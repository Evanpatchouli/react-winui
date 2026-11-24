import React from "react";

export default function DocsPropsTable({ rows }) {
  return (
    <div className="ui-table-view-container">
      <table className="ui-table-view">
        <thead>
          <tr className="ui-table-tr">
            {["Prop", "Type", "Default", "Description"].map((column) => (
              <th key={column} scope="col" align="left">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([prop, type, initial, description]) => (
            <tr key={prop}>
              <td><p className="ui-code">{prop}</p></td>
              <td>{type}</td><td>{initial}</td><td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
