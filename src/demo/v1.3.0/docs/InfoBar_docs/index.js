import React, { useState } from "react";
import { Button, InfoBar, NavPageContainer, ProgressBar } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { InfoBarContentCode, InfoBarImportCode, InfoBarUsageCode } from "./codes";
import PropsView from "./props-view";

const severityExamples = [
  ["informational", "Update available", "Restart the app to install it."],
  ["success", "Backup complete", "All documents were uploaded."],
  ["warning", "Connection interrupted", "Changes will sync when the network returns."],
  ["error", "Saving failed", "Check the file permissions and try again."]
];

const InfoBarDocs = () => {
  const [controlledOpen, setControlledOpen] = useState(true);
  const [actionStatus, setActionStatus] = useState("No action selected");

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>InfoBar</h1>
      <p>
        InfoBar keeps an application status visible inside the page layout without blocking or
        covering the current task. Use Alert when a modal decision is required.
      </p>

      <h2>Severity</h2>
      <div style={{ display: "grid", gap: "10px", margin: "20px 0" }}>
        {severityExamples.map(([severity, title, message]) => (
          <InfoBar
            key={severity}
            open
            closable={false}
            message={message}
            severity={severity}
            title={title}
          />
        ))}
      </div>

      <h2>Controlled close and action</h2>
      {controlledOpen ? (
        <InfoBar
          open={controlledOpen}
          action={
            <Button onClick={() => setActionStatus("Network settings selected")}>
              Open settings
            </Button>
          }
          message="Changes will sync when the network returns."
          onOpenChange={setControlledOpen}
          severity="warning"
          title="Connection interrupted"
        />
      ) : (
        <Button onClick={() => setControlledOpen(true)} value="Open controlled InfoBar" />
      )}
      <p>{actionStatus}</p>

      <h2>Custom content</h2>
      <InfoBar
        open
        closable={false}
        content={<ProgressBar setProgress={48} />}
        message="Your documents are being saved."
        title="Backup in progress"
      />

      <h2>Disabled behavior</h2>
      <p>
        Disabled only blocks close and action activation. The message remains readable and the root
        keeps aria-disabled so assistive technology can identify the state.
      </p>
      <InfoBar
        open
        disabled
        action={<Button onClick={() => setActionStatus("Unexpected activation")}>Retry</Button>}
        message="Resolve the administrator policy before retrying."
        severity="error"
        title="Action unavailable"
      />

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {InfoBarImportCode}
      </SyntaxHighlighter>

      <h2>Controlled usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {InfoBarUsageCode}
      </SyntaxHighlighter>

      <h2>Custom content</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {InfoBarContentCode}
      </SyntaxHighlighter>

      <h2>Accessibility</h2>
      <p>
        Informational messages default to a polite status live region. Success, warning, and error
        messages default to an assertive alert live region. InfoBar never moves keyboard focus.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default InfoBarDocs;
