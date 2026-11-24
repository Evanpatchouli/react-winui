import React, { useState } from "react";
import { AutoSuggestBox, NavPageContainer } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AutoSuggestBoxImportCode, AutoSuggestBoxUsageCode } from "./codes";
import PropsView from "./props-view";

const cities = ["Beijing", "London", "Seattle", "Shanghai", "Tokyo"];

const AutoSuggestBoxDocs = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("none");
  const suggestions = text
    ? cities
        .filter((city) => city.toLowerCase().includes(text.toLowerCase()))
        .map((city) => ({ value: city }))
    : [];

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>AutoSuggestBox</h1>
      <p>
        AutoSuggestBox accepts query text, displays application-provided suggestions, and reports
        whether a query came from typed text or a chosen suggestion. InputSearchBox remains
        available for its legacy filtering and click API.
      </p>

      <h2>Controlled query and suggestions</h2>
      <AutoSuggestBox
        description="Type a city, choose a suggestion, or submit the current query."
        label="Destination"
        listboxAriaLabel="City suggestions"
        noSuggestionsMessage="No matching cities"
        onOpenChange={setOpen}
        onQuerySubmit={(query, suggestion) =>
          setResult(`${suggestion ? "suggestion" : "text"}: ${query}`)
        }
        onTextChange={(nextText) => setText(nextText)}
        open={open}
        placeholder="Search cities"
        queryButton
        suggestions={suggestions}
        text={text}
      />
      <p>Submitted query: {result}</p>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {AutoSuggestBoxImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {AutoSuggestBoxUsageCode}
      </SyntaxHighlighter>

      <h2>Keyboard and accessibility</h2>
      <p>
        Arrow keys, Home, and End move the active suggestion while focus remains on the input.
        Enter submits, Escape closes, disabled suggestions are skipped, and IME composition Enter
        is never treated as query submission.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default AutoSuggestBoxDocs;
