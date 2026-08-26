import React from "react";

const rows = [
  ["suggestions", "AutoSuggestBoxSuggestion[]", "required", "Suggestions for the current query."],
  ["text", "string", "undefined", "Controlled input text."],
  ["defaultText", "string", '""', "Initial uncontrolled input text."],
  ["onTextChange", "(text, event, reason) => void", "undefined", "Input, suggestion, and clear requests."],
  ["open", "boolean", "undefined", "Controlled popup visibility."],
  ["defaultOpen", "boolean", "false", "Initial uncontrolled popup visibility."],
  ["onOpenChange", "(open, event?) => void", "undefined", "Receives visibility requests."],
  ["onSuggestionChoose", "(suggestion, event) => void", "undefined", "Receives a committed suggestion."],
  ["onQuerySubmit", "(query, suggestion, event) => void", "undefined", "Receives every committed query."],
  ["queryButton", "boolean", "false", "Shows the query icon button."],
  ["label", "ReactNode", "undefined", "Visible input label."],
  ["description", "ReactNode", "undefined", "Visible guidance and accessible description."],
  ["listboxAriaLabel", "string", "Suggestions", "Accessible name for the popup listbox."],
  ["noSuggestionsMessage", "ReactNode", "No results", "Empty popup status content."],
  ["disabled", "boolean", "false", "Disables input, clear, query, and suggestions."]
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
