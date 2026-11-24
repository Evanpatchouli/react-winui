import React from "react";

const rows = [
  ["title", "ReactNode", "undefined", "Short primary notification message."],
  ["message", "ReactNode", "undefined", "Optional supporting detail."],
  ["action", "ToastAction", "undefined", "Optional native action button."],
  ["intent", "info | success | warning | error", "info", "Visual and semantic intent."],
  ["politeness", "polite | assertive", "polite", "Assistive announcement priority."],
  ["open", "boolean", "undefined", "Controlled standalone Toast visibility."],
  ["defaultOpen", "boolean", "true", "Initial uncontrolled Toast visibility."],
  ["onOpenChange", "(open, data) => void", "undefined", "Receives dismissal requests and reasons."],
  ["duration", "number", "5000", "Auto-dismiss delay; non-positive values disable the timer."],
  ["persistent", "boolean", "false", "Disables automatic dismissal."],
  ["pauseOnInteraction", "boolean", "true", "Pauses the timer during hover or focus."],
  ["closable", "boolean", "true", "Shows close and enables focused Escape dismissal."],
  ["Toaster.position", "ToastPosition", "bottom-end", "Viewport corner for the stack."],
  ["Toaster.maxVisible", "number", "3", "Visible stack limit; overflow remains FIFO queued."],
  ["ToasterHandle", "show / dismiss / dismissAll", "—", "Imperative notification queue boundary."]
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
