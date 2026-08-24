import React, { useState } from "react";
import { NavPageContainer, TreeItem, TreeView } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { TreeViewControlledCode, TreeViewImportCode, TreeViewUsageCode } from "./codes";
import PropsView from "./props-view";

const TreeViewDocs = () => {
  const [expandedItems, setExpandedItems] = useState(["workspace", "src"]);
  const [selectedValue, setSelectedValue] = useState("tree-view");

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>TreeView</h1>
      <p>
        TreeView presents nested relationships with WinUI-style indentation and chevrons. It keeps
        focus separate from selection and supports controlled or uncontrolled selection and branch
        expansion.
      </p>

      <h2>Project outline</h2>
      <div style={{ maxWidth: "360px" }}>
        <TreeView
          aria-label="Project files"
          expandedItems={expandedItems}
          onExpandedItemsChange={setExpandedItems}
          onValueChange={setSelectedValue}
          value={selectedValue}
        >
          <TreeItem icon={<i className="icons10-folder" />} label="Workspace" value="workspace">
            <TreeItem icon={<i className="icons10-folder" />} label="src" value="src">
              <TreeItem label="TreeView.tsx" value="tree-view" />
              <TreeItem label="tokens.scss" value="tokens" />
            </TreeItem>
            <TreeItem label="README.md" value="readme" />
          </TreeItem>
          <TreeItem disabled label="System files" value="system" />
        </TreeView>
      </div>
      <p>Selected value: {selectedValue}</p>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {TreeViewImportCode}
      </SyntaxHighlighter>

      <h2>Uncontrolled usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {TreeViewUsageCode}
      </SyntaxHighlighter>

      <h2>Controlled usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {TreeViewControlledCode}
      </SyntaxHighlighter>

      <h2>Keyboard and accessibility</h2>
      <p>
        Tab enters the active tree item. Up and Down move through visible items; Right expands or
        enters a branch; Left collapses or returns to the parent; Home and End move to the boundary.
        Enter and Space select, and typing moves focus by item name. Provide aria-label or
        aria-labelledby on every TreeView.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default TreeViewDocs;
