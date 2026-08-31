import React from "react";
import { Badge, NavPageContainer } from "@evanpatchouli/react-winui";
import PropsView from "./props-view";

const BadgeDocs = () => (
  <NavPageContainer animateTransition hasPadding>
    <h1>Badge</h1>
    <p>Badge is a non-interactive status, count, icon, or attention indicator.</p>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", margin: "24px 0" }}>
      <Badge>Ready</Badge>
      <Badge color="success">Synced</Badge>
      <Badge color="warning">Review</Badge>
      <Badge color="danger">Blocked</Badge>
      <Badge aria-label="New notifications" color="danger" />
      <Badge aria-label="Sync status" icon={<i aria-hidden="true" className="icons10-refresh" />} />
    </div>

    <h2>Behavior and accessibility</h2>
    <p>
      Badge renders as a non-focusable span. Icon-only Badges should provide an accessible label,
      and a parent control should announce the Badge status when the Badge is attached to it.
    </p>

    <h2>Props</h2>
    <PropsView />

    <br />
    <br />
    <br />
  </NavPageContainer>
);

export default BadgeDocs;
