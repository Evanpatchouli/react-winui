import React, { useState } from "react";
import {
  Button,
  NavPageContainer,
  SettingsCard,
  SettingsExpander,
  Switch
} from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  SettingsExpanderControlledCode,
  SettingsExpanderImportCode,
  SettingsExpanderUsageCode
} from "./codes";
import PropsView from "./props-view";

const demoStackStyle = { display: "grid", gap: "10px", margin: "20px 0" };

const SettingsExpanderDocs = () => {
  const [advanced, setAdvanced] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState("No action selected");

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>SettingsExpander</h1>
      <p>
        SettingsExpander groups related SettingsCard rows behind a Windows 11-style disclosure. Its
        header keeps the primary setting visible while secondary settings expand in the page layout.
      </p>

      <h2>Grouped settings</h2>
      <div style={demoStackStyle}>
        <SettingsExpander
          content={
            <Switch
              aria-label="Advanced network features"
              checked={advanced}
              label={false}
              onChange={(event) => setAdvanced(event.currentTarget.checked)}
            />
          }
          defaultExpanded
          description="Manage discovery and sharing for this network"
          header="Advanced network settings"
          icon={<i className="icons10-settings" />}
          itemsFooter="Changes apply to the current network profile."
          itemsHeader="Related options"
        >
          <SettingsCard description="Let this PC find other devices" title="Network discovery">
            <Switch aria-label="Network discovery" label={false} />
          </SettingsCard>
          <SettingsCard description="Share files with devices on this network" title="File sharing">
            <Switch aria-label="File sharing" label={false} />
          </SettingsCard>
        </SettingsExpander>
      </div>

      <h2>Controlled and disabled</h2>
      <div style={demoStackStyle}>
        <SettingsExpander
          action={<Button onClick={() => setStatus("Reset selected")}>Reset</Button>}
          expanded={expanded}
          header="Optional features"
          onExpandedChange={(nextExpanded) => {
            setExpanded(nextExpanded);
            setStatus(nextExpanded ? "Expanded" : "Collapsed");
          }}
        >
          <SettingsCard title="Developer mode" />
        </SettingsExpander>
        <SettingsExpander disabled header="Managed by your organization">
          <SettingsCard title="Unavailable setting" />
        </SettingsExpander>
      </div>
      <p>{status}</p>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {SettingsExpanderImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {SettingsExpanderUsageCode}
      </SyntaxHighlighter>

      <h2>Controlled usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {SettingsExpanderControlledCode}
      </SyntaxHighlighter>

      <h2>Accessibility and slot boundaries</h2>
      <p>
        The disclosure is a native button with aria-expanded and aria-controls. Header content and
        actions are sibling interactions, not descendants of that button. Collapsed content is
        inert, and focus returns to the disclosure when a parent-controlled group closes.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default SettingsExpanderDocs;
