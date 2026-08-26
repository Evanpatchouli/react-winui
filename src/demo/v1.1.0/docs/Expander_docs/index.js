import React, { useState } from "react";
import { Expander, NavPageContainer } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  ExpanderControlledCode,
  ExpanderImportCode,
  ExpanderUsageCode
} from "./codes";
import PropsView from "./props-view";

const ExpanderDocs = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>Expander</h1>
      <p>
        Expander keeps primary header content visible and reveals related secondary content in the
        page layout. Accordion remains available as the legacy compound component; Expander adds a
        modern controlled API and disclosure semantics without changing Accordion.
      </p>

      <h2>Default and icon</h2>
      <Expander
        defaultExpanded
        header="Advanced settings"
        icon={<i className="icons10-settings" />}
      >
        <p style={{ margin: 0 }}>
          Secondary content pushes nearby layout instead of opening a transient overlay.
        </p>
      </Expander>

      <h2>Controlled state</h2>
      <Expander
        expanded={expanded}
        header={expanded ? "Hide connection details" : "Show connection details"}
        onExpandedChange={setExpanded}
      >
        <p style={{ margin: 0 }}>The parent owns this expanded state.</p>
      </Expander>

      <h2>Expand upward</h2>
      <Expander direction="up" header="Recent activity">
        <p style={{ margin: 0 }}>Content is placed above the header while DOM reading order stays stable.</p>
      </Expander>

      <h2>Disabled</h2>
      <Expander disabled header="Managed by your organization">
        This content cannot be opened through user interaction.
      </Expander>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {ExpanderImportCode}
      </SyntaxHighlighter>

      <h2>Uncontrolled usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {ExpanderUsageCode}
      </SyntaxHighlighter>

      <h2>Controlled usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {ExpanderControlledCode}
      </SyntaxHighlighter>

      <h2>Accessibility</h2>
      <p>
        The header is a native button, so Enter and Space activate it. aria-expanded and
        aria-controls identify the related content, while collapsed descendants are inert. Keep
        header content non-interactive to avoid nesting controls inside a button.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default ExpanderDocs;
