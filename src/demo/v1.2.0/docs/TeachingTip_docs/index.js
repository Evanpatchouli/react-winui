import React, { useState } from "react";
import { Button, NavPageContainer, TeachingTip } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  TeachingTipImportCode,
  TeachingTipLightDismissCode,
  TeachingTipUsageCode
} from "./codes";
import PropsView from "./props-view";

const TeachingTipDocs = () => {
  const [open, setOpen] = useState(false);
  const [lightDismissOpen, setLightDismissOpen] = useState(false);
  const [status, setStatus] = useState("No action selected");

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>TeachingTip</h1>
      <p>
        TeachingTip is a semi-persistent, content-rich flyout for contextual reminders and feature
        discovery. It targets a specific element, keeps interactive content keyboard reachable, and
        uses the existing react-winui floating-surface tokens.
      </p>

      <h2>Targeted tip</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
        <TeachingTip
          action={{
            label: "Got it",
            onClick: () => setStatus("tip action selected")
          }}
          content="We will keep your changes synchronized on this device."
          icon={<i aria-hidden="true" className="icons10-idea" />}
          onOpenChange={setOpen}
          open={open}
          subtitle="No extra setup is required."
          title="Sync is ready"
        >
          <Button value={open ? "TeachingTip open" : "Show teaching tip"} />
        </TeachingTip>
        <span>{status}</span>
      </div>

      <h2>Light-dismiss tip</h2>
      <p>
        Set <span className="ui-code">isLightDismiss</span> when the tip should disappear after
        the user interacts elsewhere. The close button is removed in this mode.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
        <TeachingTip
          content="This tip closes when the user interacts elsewhere."
          isLightDismiss
          onOpenChange={setLightDismissOpen}
          open={lightDismissOpen}
          title="A quick reminder"
        >
          <Button value="Show light-dismiss tip" />
        </TeachingTip>
        <Button onClick={() => setStatus("outside target selected")} value="Other content" />
      </div>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {TeachingTipImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {TeachingTipUsageCode}
      </SyntaxHighlighter>

      <h2>Light dismiss</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {TeachingTipLightDismissCode}
      </SyntaxHighlighter>

      <h2>Behavior and accessibility</h2>
      <p>
        The target receives <span className="ui-code">aria-controls</span>,{" "}
        <span className="ui-code">aria-expanded</span>, and{" "}
        <span className="ui-code">aria-haspopup="dialog"</span>. Opening moves focus to the first
        focusable element in the tip and Escape restores focus to the target. Explicit tips close
        from their close or action buttons; light-dismiss tips close from an outside pointer.
      </p>

      <h2>Boundary</h2>
      <p>
        This first implementation supports a targeted tip with four placement sides. It does not
        add the full WinUI XAML placement matrix, persistence storage, carousel content, or
        non-targeted root-edge placement.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default TeachingTipDocs;
