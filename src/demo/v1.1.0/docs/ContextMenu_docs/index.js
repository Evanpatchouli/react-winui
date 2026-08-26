import React, { useState } from "react";
import { ContextMenu, NavPageContainer } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ContextMenuImportCode, ContextMenuUsageCode } from "./codes";
import PropsView from "./props-view";

const ContextMenuDocs = () => {
  const [lastCommand, setLastCommand] = useState("None");

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>ContextMenu</h1>
      <p>
        ContextMenu shows commands related to a target. Right-click the target, or focus it and
        press <span className="ui-code">Shift+F10</span> or the Context Menu key.
      </p>

      <div style={{ margin: "24px 0" }}>
        <ContextMenu
          content={
            <>
              <ContextMenu.Item
                secondaryContent="Ctrl+C"
                onSelect={() => setLastCommand("Copy")}
              >
                Copy
              </ContextMenu.Item>
              <ContextMenu.Item disabled>Paste</ContextMenu.Item>
              <ContextMenu.Divider />
              <ContextMenu.Item onSelect={() => setLastCommand("Delete")}>
                Delete
              </ContextMenu.Item>
            </>
          }
        >
          <button className="ui-btn" type="button">
            Right-click this target
          </button>
        </ContextMenu>
        <p style={{ marginTop: "12px" }}>
          Last command: <strong>{lastCommand}</strong>
        </p>
      </div>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {ContextMenuImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {ContextMenuUsageCode}
      </SyntaxHighlighter>

      <h2>Keyboard and focus</h2>
      <p>
        Arrow keys, Home, End, and character keys move through commands. Escape and command
        selection restore focus to the invoking target. Tab closes the menu and continues the
        browser&apos;s normal focus order.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default ContextMenuDocs;
