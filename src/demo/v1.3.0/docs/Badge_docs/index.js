import React from "react";
import { Badge, NavPageContainer } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BadgeContentCode, BadgeImportCode, BadgeUsageCode } from "./codes";
import PropsView from "./props-view";

const BadgeDocs = () => (
  <NavPageContainer animateTransition hasPadding>
    <h1>Badge</h1>
    <p>
      Badge is a compact, non-interactive indicator for a short status, count, icon, or attention
      dot placed near the content it describes.
    </p>

    <h2>Content and colors</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "24px 0" }}>
      <Badge>Ready</Badge>
      <Badge color="success">Synced</Badge>
      <Badge color="warning">Review</Badge>
      <Badge color="danger">Blocked</Badge>
      <Badge aria-label="Three unread messages">3</Badge>
      <Badge aria-label="New notification" color="danger" />
      <Badge aria-label="Sync status" icon={<i aria-hidden="true" className="icons10-refresh" />} />
    </div>

    <h2>Appearances, shapes, and sizes</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "24px 0" }}>
      <Badge appearance="filled" color="brand">
        Filled
      </Badge>
      <Badge appearance="outline" color="informative">
        Outline
      </Badge>
      <Badge appearance="ghost" color="success">
        Ghost
      </Badge>
      <Badge appearance="tint" color="warning">
        Tint
      </Badge>
      <Badge shape="rounded" color="subtle">
        Rounded
      </Badge>
      <Badge size="small" icon={<i aria-hidden="true" className="icons10-tag" />}>
        Small
      </Badge>
      <Badge size="large" icon={<i aria-hidden="true" className="icons10-star" />} iconPosition="after">
        Large
      </Badge>
      <Badge size="tiny" color="danger" />
    </div>

    <h2>Import</h2>
    <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
      {BadgeImportCode}
    </SyntaxHighlighter>

    <h2>Usage</h2>
    <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
      {BadgeUsageCode}
    </SyntaxHighlighter>

    <h2>Content modes</h2>
    <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
      {BadgeContentCode}
    </SyntaxHighlighter>

    <h2>Behavior and accessibility</h2>
    <p>
      Badge renders as a non-focusable span and does not add a status role automatically. An
      icon-only Badge should provide an <span className="ui-code">aria-label</span>. When a Badge
      is attached to a button, navigation item, or avatar, the parent should communicate the
      status to assistive technology. Use Tooltip when the visual indicator needs extra context.
    </p>

    <h2>Boundary</h2>
    <p>
      This implementation covers standalone dot, icon, and text Badges with semantic colors and
      Windows-styled dimensions. It does not add interactive actions, dismiss behavior, automatic
      placement, or NavigationView-specific composition.
    </p>

    <h2>Props</h2>
    <PropsView />

    <br />
    <br />
    <br />
  </NavPageContainer>
);

export default BadgeDocs;
