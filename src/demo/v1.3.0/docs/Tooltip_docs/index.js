import React, { useState } from "react";
import { Button, NavPageContainer, Tooltip } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  TooltipControlledCode,
  TooltipImportCode,
  TooltipPlacementCode,
  TooltipUsageCode
} from "./codes";
import PropsView from "./props-view";

const TooltipDocs = () => {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>Tooltip</h1>
      <p>
        Tooltip provides concise, supplemental information when a user hovers or focuses a
        trigger. Keep essential instructions in the page itself and use Tooltip for progressive
        disclosure.
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
        <Tooltip content="Create a new document" showDelay={0}>
          <Button value="Hover or focus" />
        </Tooltip>
        <Tooltip
          content="The pointer follows the preferred placement"
          placement="bottom"
          showDelay={0}
          withArrow
        >
          <Button type="primary" value="Bottom with arrow" />
        </Tooltip>
      </div>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {TooltipImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {TooltipUsageCode}
      </SyntaxHighlighter>

      <h2>Controlled visibility</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "16px 0" }}>
        <Tooltip
          content="This Tooltip is controlled by React state"
          onOpenChange={setControlledOpen}
          open={controlledOpen}
          showDelay={0}
        >
          <Button value="Controlled Tooltip" />
        </Tooltip>
        <Button
          onClick={() => setControlledOpen((currentOpen) => !currentOpen)}
          type="subtle"
          value={controlledOpen ? "Close Tooltip" : "Open Tooltip"}
        />
      </div>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {TooltipControlledCode}
      </SyntaxHighlighter>

      <h2>Placement and accessibility</h2>
      <p>
        The component prefers the requested placement and falls back to another side when the
        viewport does not have enough room. By default it connects the trigger and content with
        <span className="ui-code">aria-describedby</span>; use
        <span className="ui-code">relationship="label"</span> for icon-only triggers.
      </p>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {TooltipPlacementCode}
      </SyntaxHighlighter>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default TooltipDocs;
