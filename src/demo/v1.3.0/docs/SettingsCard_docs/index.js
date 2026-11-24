import React, { useState } from "react";
import { Button, NavPageContainer, SettingsCard, Switch } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SettingsCardClickableCode, SettingsCardImportCode, SettingsCardUsageCode } from "./codes";
import PropsView from "./props-view";

const cardStackStyle = { display: "grid", gap: "10px", margin: "20px 0" };

const SettingsCardDocs = () => {
  const [notifications, setNotifications] = useState(true);
  const [status, setStatus] = useState("No navigation selected");

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>SettingsCard</h1>
      <p>
        SettingsCard gives one setting a Windows 11-style icon, label, description, and trailing
        control. It is intentionally narrower than a general content card.
      </p>

      <h2>Setting controls</h2>
      <div style={cardStackStyle}>
        <SettingsCard
          description="Allow apps to show desktop notifications"
          icon={<i className="icons10-notification" />}
          title="Notifications"
        >
          <Switch
            aria-label="Desktop notifications"
            checked={notifications}
            label={false}
            onChange={(event) => setNotifications(event.currentTarget.checked)}
          />
        </SettingsCard>
        <SettingsCard
          action={<Button onClick={() => setStatus("Update check started")}>Check now</Button>}
          description="Last checked a few minutes ago"
          icon={<i className="icons10-refresh" />}
          title="Windows Update"
        />
      </div>

      <h2>Clickable and disabled cards</h2>
      <div style={cardStackStyle}>
        <SettingsCard
          description="Brightness, night light, and display profile"
          icon={<i className="icons10-monitor" />}
          onClick={() => setStatus("Display settings selected")}
          title="Display"
        />
        <SettingsCard
          disabled
          description="Managed by your organization"
          icon={<i className="icons10-lock" />}
          onClick={() => setStatus("Unexpected activation")}
          title="Optional diagnostics"
        />
      </div>
      <p>{status}</p>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {SettingsCardImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {SettingsCardUsageCode}
      </SyntaxHighlighter>

      <h2>Clickable usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {SettingsCardClickableCode}
      </SyntaxHighlighter>

      <h2>Accessibility and interaction boundary</h2>
      <p>
        A clickable card uses a native link or button trigger as a sibling overlay instead of
        wrapping the trailing controls. Switches, buttons, and links stay valid independent tab
        stops and do not activate the card. Enter and Space activate button cards; links keep native
        browser keyboard behavior.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default SettingsCardDocs;
