import React, { useState } from "react";
import { NavPageContainer, NavigationView } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  NavigationViewControlledCode,
  NavigationViewImportCode,
  NavigationViewUsageCode
} from "./codes";
import PropsView from "./props-view";

const icon = (name) => <i className={`icons10-${name}`} />;

const NavigationViewDocs = () => {
  const [selected, setSelected] = useState("home");

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>NavigationView</h1>
      <p>
        NavigationView provides the adaptive Windows 11 application pane. It complements the legacy
        NavBar without changing its public API or visual contract.
      </p>

      <div style={{ height: "460px", overflow: "hidden" }}>
        <NavigationView
          defaultExpandedItems={["library"]}
          header={selected === "settings" ? "Settings" : "Navigation sample"}
          onValueChange={setSelected}
          paneHeader="Contoso"
          settingsItem={{ icon: icon("settings"), label: "Settings", value: "settings" }}
          value={selected}
          content={<p>Selected item: {selected}</p>}
        >
          <NavigationView.Item icon={icon("home")} label="Home" value="home" />
          <NavigationView.Item icon={icon("collection")} label="Library" value="library">
            <NavigationView.Item label="Downloads" value="downloads" />
            <NavigationView.Item label="Favorites" value="favorites" />
          </NavigationView.Item>
          <NavigationView.Item disabled label="Managed area" value="managed" />
        </NavigationView>
      </div>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {NavigationViewImportCode}
      </SyntaxHighlighter>
      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {NavigationViewUsageCode}
      </SyntaxHighlighter>
      <h2>Controlled usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {NavigationViewControlledCode}
      </SyntaxHighlighter>

      <h2>Accessibility</h2>
      <p>
        The pane is a named navigation landmark. Arrow keys and typeahead move a single roving tab
        stop; branch disclosures expose aria-expanded and aria-controls; Escape closes an overlay.
      </p>
      <p>Current scope is the left adaptive pane; WinUI top navigation is not included.</p>

      <h2>Props</h2>
      <PropsView />
      <br /><br /><br />
    </NavPageContainer>
  );
};

export default NavigationViewDocs;
