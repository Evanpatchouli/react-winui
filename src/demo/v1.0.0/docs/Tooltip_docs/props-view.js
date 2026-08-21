import React from "react";

const PropsView = () => {
  return (
    <div className="ui-table-view-container">
      <table className="ui-table-view">
        <thead>
          <tr className="ui-table-tr">
            <th align="left">Prop</th>
            <th align="left">Type</th>
            <th align="left">Default</th>
            <th align="left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><p className="ui-code">content</p></td>
            <td>ReactNode</td>
            <td>required</td>
            <td>Concise supplemental content displayed near the trigger.</td>
          </tr>
          <tr>
            <td><p className="ui-code">children</p></td>
            <td>ReactElement</td>
            <td>required</td>
            <td>One trigger element that receives pointer, focus, and ARIA behavior.</td>
          </tr>
          <tr>
            <td><p className="ui-code">open</p></td>
            <td>boolean</td>
            <td>undefined</td>
            <td>Controlled visibility. Omit it to use hover/focus state internally.</td>
          </tr>
          <tr>
            <td><p className="ui-code">defaultOpen</p></td>
            <td>boolean</td>
            <td>false</td>
            <td>Initial visibility for an uncontrolled Tooltip.</td>
          </tr>
          <tr>
            <td><p className="ui-code">onOpenChange</p></td>
            <td>(open, event?) =&gt; void</td>
            <td>undefined</td>
            <td>Receives visibility requests from hover, focus, timers, click, or Escape.</td>
          </tr>
          <tr>
            <td><p className="ui-code">showDelay</p></td>
            <td>number</td>
            <td>250</td>
            <td>Milliseconds before opening.</td>
          </tr>
          <tr>
            <td><p className="ui-code">hideDelay</p></td>
            <td>number</td>
            <td>250</td>
            <td>Milliseconds before closing after pointer leave; focus blur closes immediately.</td>
          </tr>
          <tr>
            <td><p className="ui-code">placement</p></td>
            <td>"top" | "bottom" | "left" | "right"</td>
            <td>"top"</td>
            <td>Preferred side; the viewport can choose a fallback.</td>
          </tr>
          <tr>
            <td><p className="ui-code">relationship</p></td>
            <td>"label" | "description" | "inaccessible"</td>
            <td>"description"</td>
            <td>Controls the ARIA relationship between content and trigger.</td>
          </tr>
          <tr>
            <td><p className="ui-code">withArrow</p></td>
            <td>boolean</td>
            <td>false</td>
            <td>Renders a pointer from the surface to the trigger.</td>
          </tr>
          <tr>
            <td><p className="ui-code">disabled</p></td>
            <td>boolean</td>
            <td>false</td>
            <td>Prevents visual opening and removes Tooltip interaction.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PropsView;
