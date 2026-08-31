import React, { useState } from "react";
import { NavPageContainer, Tag } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { TagDismissibleCode, TagImportCode, TagUsageCode } from "./codes";
import PropsView from "./props-view";

const TagDocs = () => {
  const [status, setStatus] = useState("No tag dismissed");

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>Tag</h1>
      <p>
        Tag represents a compact value, filter, or category. Use a static Tag when the value is
        informational and a dismissible Tag when the user can remove it from the surrounding list.
      </p>

      <h2>Appearances and sizes</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "24px 0" }}>
        <Tag appearance="filled">Filled</Tag>
        <Tag appearance="outline">Outline</Tag>
        <Tag appearance="brand">Brand</Tag>
        <Tag icon={<i aria-hidden="true" className="icons10-tag" />} size="small">
          With icon
        </Tag>
        <Tag shape="circular" size="extra-small">
          Compact
        </Tag>
        <Tag disabled>Disabled</Tag>
      </div>

      <h2>Dismissible tags</h2>
      <p>
        A dismissible Tag is a button. Its <span className="ui-code">onDismiss</span> callback
        reports the request; the parent owns the collection state and decides when to remove it.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "24px 0" }}>
        <Tag
          appearance="outline"
          dismissible
          onDismiss={() => setStatus("Design dismissed")}
        >
          Design
        </Tag>
        <Tag
          appearance="brand"
          dismissible
          onDismiss={() => setStatus("Windows dismissed")}
        >
          Windows
        </Tag>
        <span>{status}</span>
      </div>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {TagImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {TagUsageCode}
      </SyntaxHighlighter>

      <h2>Dismissible</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {TagDismissibleCode}
      </SyntaxHighlighter>

      <h2>Behavior and accessibility</h2>
      <p>
        A static Tag renders as a <span className="ui-code">span</span>. A dismissible Tag renders
        as a native button, supports click, Delete, and Backspace dismissal, and uses the native
        disabled state when disabled. Icons and the dismiss glyph are decorative; the Tag text
        remains its accessible name.
      </p>

      <h2>Boundary</h2>
      <p>
        This implementation covers standalone static and dismissible tags with filled, outline,
        and brand appearances. It does not add TagGroup, TagPicker, overflow management, selection
        state, or a separate interaction action.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default TagDocs;
