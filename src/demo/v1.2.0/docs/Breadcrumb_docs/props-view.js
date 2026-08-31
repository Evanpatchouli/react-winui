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
            <td>
              <p className="ui-code">items</p>
            </td>
            <td>readonly BreadcrumbItem[]</td>
            <td>required</td>
            <td>Ordered path from the root to the current location.</td>
          </tr>
          <tr>
            <td>
              <p className="ui-code">separator</p>
            </td>
            <td>ReactNode</td>
            <td>chevron</td>
            <td>Visual separator rendered between items.</td>
          </tr>
          <tr>
            <td>
              <p className="ui-code">maxVisibleItems</p>
            </td>
            <td>number</td>
            <td>undefined</td>
            <td>Visible entry limit including the overflow trigger.</td>
          </tr>
          <tr>
            <td>
              <p className="ui-code">overflowAriaLabel</p>
            </td>
            <td>string</td>
            <td>Show more breadcrumb items</td>
            <td>Accessible name for the overflow trigger and menu.</td>
          </tr>
          <tr>
            <td>
              <p className="ui-code">onItemClick</p>
            </td>
            <td>(item, index, event) =&gt; void</td>
            <td>undefined</td>
            <td>Called after a visible or overflow item is activated.</td>
          </tr>
          <tr>
            <td>
              <p className="ui-code">aria-label</p>
            </td>
            <td>string</td>
            <td>Breadcrumb</td>
            <td>Accessible name for the navigation landmark.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PropsView;
