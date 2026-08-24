import React, { useRef, useState } from "react";
import { Button, NavPageContainer, Toast, Toaster } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ToastControlledCode, ToastImportCode, ToastUsageCode } from "./codes";
import PropsView from "./props-view";

const ToastDocs = () => {
  const toasterRef = useRef(null);
  const [controlledOpen, setControlledOpen] = useState(true);

  const showNotification = () => {
    toasterRef.current?.show({
      title: "Saved",
      message: "Your changes are available everywhere.",
      action: { label: "View", dismissOnClick: true }
    });
  };

  const showStack = () => {
    toasterRef.current?.dismissAll();
    toasterRef.current?.show({ id: "sync", persistent: true, title: "Syncing files" });
    toasterRef.current?.show({
      id: "complete",
      intent: "success",
      persistent: true,
      title: "Upload complete"
    });
    toasterRef.current?.show({
      id: "offline",
      intent: "warning",
      persistent: true,
      title: "Working offline"
    });
  };

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>Toast</h1>
      <p>
        Toast reports a non-critical, temporary application status without blocking the current
        task. Use one Toaster for a consistent queue and position.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", margin: "24px 0" }}>
        <Button onClick={showNotification} value="Show notification" />
        <Button onClick={showStack} value="Show persistent stack" />
        <Button onClick={() => toasterRef.current?.dismissAll()} value="Dismiss all" />
      </div>
      <Toaster label="Documentation notifications" maxVisible={3} ref={toasterRef} />

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {ToastImportCode}
      </SyntaxHighlighter>

      <h2>Queue usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {ToastUsageCode}
      </SyntaxHighlighter>

      <h2>Controlled standalone Toast</h2>
      {controlledOpen ? (
        <div style={{ margin: "16px 0", maxWidth: "360px" }}>
          <Toast
            intent="warning"
            message="Restart the app to finish installing the update."
            onOpenChange={setControlledOpen}
            open={controlledOpen}
            persistent
            title="Restart required"
          />
        </div>
      ) : (
        <Button onClick={() => setControlledOpen(true)} value="Open controlled Toast" />
      )}
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {ToastControlledCode}
      </SyntaxHighlighter>

      <h2>Accessibility and timing</h2>
      <p>
        Polite notifications use a status live region. Reserve assertive announcements for urgent
        information. Toast never steals focus, pauses its timer during hover or focus, and keeps
        persistent information visible until explicitly dismissed.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default ToastDocs;
