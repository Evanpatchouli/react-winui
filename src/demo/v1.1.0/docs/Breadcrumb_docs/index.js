import React, { useState } from "react";
import { Breadcrumb, NavPageContainer } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  BreadcrumbImportCode,
  BreadcrumbOverflowCode,
  BreadcrumbUsageCode
} from "./codes";
import PropsView from "./props-view";

const BreadcrumbDocs = () => {
  const [selectedItem, setSelectedItem] = useState("none");

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>Breadcrumb</h1>
      <p>
        Breadcrumb is a persistent hierarchy trail for pages or folders. Earlier items can navigate
        upward while the last item describes the current location.
      </p>

      <h2>Path navigation</h2>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/projects", label: "Projects" },
          { href: "/projects/winui", label: "WinUI" },
          { label: "Breadcrumb" }
        ]}
        onItemClick={(item, index, event) => {
          event.preventDefault();
          setSelectedItem(`${index}: ${item.label}`);
        }}
      />
      <p>Selected item: {selectedItem}</p>

      <h2>Overflow path</h2>
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/workspace", label: "Workspace" },
          { href: "/workspace/design", label: "Design" },
          { href: "/workspace/design/components", label: "Components" },
          { href: "/workspace/design/components/navigation", label: "Navigation" },
          { label: "Breadcrumb" }
        ]}
        maxVisibleItems={4}
      />

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {BreadcrumbImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {BreadcrumbUsageCode}
      </SyntaxHighlighter>

      <h2>Overflow</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {BreadcrumbOverflowCode}
      </SyntaxHighlighter>

      <h2>Behavior and accessibility</h2>
      <p>
        The component renders a labelled nav landmark and an ordered list. The last item is marked
        with <span className="ui-code">aria-current="page"</span> and is not interactive. When
        maxVisibleItems is exceeded, the first and last items remain visible and the middle items
        move into a keyboard-accessible overflow menu.
      </p>

      <h2>Boundary</h2>
      <p>
        Breadcrumb uses an explicit maxVisibleItems limit for deterministic overflow. Without that
        limit, the trail stays on one line and scrolls horizontally; it does not measure live
        widths with ResizeObserver or infer navigation history.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default BreadcrumbDocs;
