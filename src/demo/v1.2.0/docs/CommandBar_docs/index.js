import React, { useState } from "react";
import { CommandBar, NavPageContainer } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  CommandBarControlledCode,
  CommandBarImportCode,
  CommandBarUsageCode
} from "./codes";
import PropsView from "./props-view";

const icon = (name) => <i className={`icons10-${name}`} />;

const CommandBarDocs = () => {
  const [lastCommand, setLastCommand] = useState("No command selected");
  const [overflowOpen, setOverflowOpen] = useState(false);

  const secondaryCommands = (
    <>
      <CommandBar.Button label="Rename" onClick={() => setLastCommand("Rename")} />
      <CommandBar.Button label="Properties" onClick={() => setLastCommand("Properties")} />
    </>
  );

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>CommandBar</h1>
      <p>
        CommandBar keeps frequent commands visible and moves secondary or width-constrained commands
        into an accessible overflow menu. It is a toolbar, not a replacement for MenuBar.
      </p>

      <h2>Primary and secondary commands</h2>
      <CommandBar aria-label="Document commands" secondaryCommands={secondaryCommands}>
        <CommandBar.Button
          icon={icon("save")}
          label="Save"
          onClick={() => setLastCommand("Save")}
        />
        <CommandBar.Button
          icon={icon("copy")}
          label="Copy"
          onClick={() => setLastCommand("Copy")}
        />
        <CommandBar.Separator />
        <CommandBar.Button disabled icon={icon("paste")} label="Paste" />
        <CommandBar.Button
          icon={icon("share")}
          label="Share"
          onClick={() => setLastCommand("Share")}
        />
      </CommandBar>
      <p>{lastCommand}</p>

      <h2>Responsive overflow</h2>
      <p>Resize this 360 px host to see trailing primary commands move into overflow.</p>
      <div style={{ maxWidth: "360px", resize: "horizontal", overflow: "auto" }}>
        <CommandBar aria-label="Responsive commands" minimumPrimaryCommands={1}>
          <CommandBar.Button icon={icon("save")} label="Save" />
          <CommandBar.Button icon={icon("copy")} label="Copy" />
          <CommandBar.Button icon={icon("share")} label="Share" />
          <CommandBar.Button icon={icon("refresh")} label="Refresh" />
        </CommandBar>
      </div>

      <h2>Controlled overflow</h2>
      <CommandBar
        aria-label="Controlled commands"
        onOverflowOpenChange={setOverflowOpen}
        overflowOpen={overflowOpen}
        secondaryCommands={<CommandBar.Button icon={icon("settings")} label="Settings" />}
      >
        <CommandBar.Button icon={icon("refresh")} label="Refresh" />
      </CommandBar>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {CommandBarImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {CommandBarUsageCode}
      </SyntaxHighlighter>

      <h2>Controlled usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {CommandBarControlledCode}
      </SyntaxHighlighter>

      <h2>Accessibility</h2>
      <p>
        The root exposes a named horizontal toolbar with one tab stop. Arrow keys move among visible,
        enabled commands. Overflow follows the menu-button and menu patterns, including Escape focus
        restoration.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default CommandBarDocs;
