import React, { useState } from "react";
import { Button, ComboBox, NavPageContainer } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ComboBoxEditableCode, ComboBoxImportCode, ComboBoxUsageCode } from "./codes";
import PropsView from "./props-view";

const colorOptions = [
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red", disabled: true },
  { value: "yellow", label: "Yellow" }
];

const ComboBoxDocs = () => {
  const [controlledOpen, setControlledOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("blue");
  const [editableResult, setEditableResult] = useState("none");

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>ComboBox</h1>
      <p>
        ComboBox presents a compact single-select list. Unlike the legacy Select, it supports
        controlled value and open state, editable custom text, keyboard navigation, typeahead, and
        accessible combobox/listbox semantics.
      </p>

      <h2>Select-only</h2>
      <ComboBox
        aria-label="Color"
        options={colorOptions}
        value={selectedColor}
        onValueChange={(value) => setSelectedColor(value)}
      />
      <p>Selected value: {selectedColor}</p>

      <h2>Controlled open state</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <ComboBox
          aria-label="Controlled color"
          open={controlledOpen}
          options={colorOptions}
          value={selectedColor}
          onOpenChange={setControlledOpen}
          onValueChange={(value) => setSelectedColor(value)}
        />
        <Button
          value={controlledOpen ? "Close options" : "Open options"}
          onClick={() => setControlledOpen((open) => !open)}
        />
      </div>

      <h2>Editable custom value</h2>
      <ComboBox
        editable
        aria-label="Favorite color"
        defaultValue="green"
        options={colorOptions}
        onTextSubmit={(text) => setEditableResult(`Custom: ${text}`)}
        onValueChange={(value, option) =>
          setEditableResult(option ? `Option: ${String(value)}` : `Custom: ${String(value)}`)
        }
      />
      <p>Editable result: {editableResult}</p>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {ComboBoxImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {ComboBoxUsageCode}
      </SyntaxHighlighter>

      <h2>Editable usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {ComboBoxEditableCode}
      </SyntaxHighlighter>

      <h2>Keyboard and accessibility</h2>
      <p>
        Arrow keys, Home, and End move the active option without committing it. Enter commits,
        Escape closes, and select-only mode supports prefix typeahead. Focus remains on the input
        while aria-activedescendant identifies the active option.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default ComboBoxDocs;
