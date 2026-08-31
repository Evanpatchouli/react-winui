import React, { useState } from "react";
import { NumberBox, NavPageContainer } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { NumberBoxControlledCode, NumberBoxImportCode, NumberBoxUsageCode } from "./codes";
import PropsView from "./props-view";

const NumberBoxDocs = () => {
  const [opacity, setOpacity] = useState(0.5);
  const [quantity, setQuantity] = useState(4);

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>NumberBox</h1>
      <p>
        NumberBox accepts direct numeric text and provides WinUI-style inline stepping. Text is
        parsed when Enter is pressed or focus leaves the input; invalid text returns to the last
        committed value and out-of-range input is clamped.
      </p>

      <h2>Basic uncontrolled value</h2>
      <NumberBox defaultValue={4} label="Quantity" max={20} min={1} onValueChange={setQuantity} />
      <p>Committed quantity: {quantity ?? "empty"}</p>

      <h2>Controlled decimal value</h2>
      <NumberBox
        aria-label="Opacity"
        max={1}
        min={0}
        precision={1}
        step={0.1}
        value={opacity}
        onValueChange={setOpacity}
      />
      <p>Opacity: {opacity.toFixed(1)}</p>

      <h2>Read-only and disabled</h2>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "16px" }}>
        <NumberBox readOnly defaultValue={8} label="Read only" />
        <NumberBox disabled defaultValue={12} label="Disabled" />
      </div>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {NumberBoxImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {NumberBoxUsageCode}
      </SyntaxHighlighter>

      <h2>Controlled usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {NumberBoxControlledCode}
      </SyntaxHighlighter>

      <h2>Keyboard and accessibility</h2>
      <p>
        Arrow Up and Arrow Down use step; Page Up and Page Down use largeStep. Home and End move to
        defined bounds, Escape restores the committed value, and focus remains on the text input.
        The input exposes spinbutton, aria-valuenow, aria-valuemin, aria-valuemax, and invalid state
        semantics.
      </p>

      <h2>Scope</h2>
      <p>
        This release intentionally keeps parsing locale-neutral and does not evaluate expressions.
        Use onTextChange when an application needs to inspect draft text before commit.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default NumberBoxDocs;
