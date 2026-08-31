import React, { useState } from "react";
import { Button, Flyout, NavPageContainer, Popover } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  FlyoutUsageCode,
  PopoverControlledCode,
  PopoverImportCode,
  PopoverUsageCode
} from "./codes";
import PropsView from "./props-view";

const PopoverDocs = () => {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>Popover / Flyout</h1>
      <p>
        Popover and Flyout provide a light-dismiss surface for contextual, interactive content.
        Use Tooltip for short plain-text help and use Dialog when the page must be blocked.
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
        <Popover
          content={
            <div>
              <strong>Quick actions</strong>
              <p style={{ margin: "8px 0 12px" }}>This surface can contain structured content.</p>
              <Button type="primary" value="Continue" />
            </div>
          }
          contentProps={{ "aria-label": "Quick actions" }}
          defaultOpen
          placement="bottom"
          withArrow
        >
          <Button value="Open Popover" />
        </Popover>
        <Flyout content="Flyout content closes on outside click or Escape" placement="bottom">
          <Button type="subtle" value="Open Flyout" />
        </Flyout>
      </div>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {PopoverImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {PopoverUsageCode}
      </SyntaxHighlighter>

      <h2>Controlled visibility</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "16px 0" }}>
        <Popover
          content="This Popover is controlled by React state"
          onOpenChange={setControlledOpen}
          open={controlledOpen}
          placement="right"
        >
          <Button value="Controlled Popover" />
        </Popover>
        <Button
          onClick={() => setControlledOpen((currentOpen) => !currentOpen)}
          type="subtle"
          value={controlledOpen ? "Close Popover" : "Open Popover"}
        />
      </div>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {PopoverControlledCode}
      </SyntaxHighlighter>

      <h2>Flyout alias</h2>
      <p>
        <span className="ui-code">Flyout</span> exposes the same API and light-dismiss behavior as
        <span className="ui-code">Popover</span>, using the Windows naming convention for
        transient contextual surfaces.
      </p>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {FlyoutUsageCode}
      </SyntaxHighlighter>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default PopoverDocs;
