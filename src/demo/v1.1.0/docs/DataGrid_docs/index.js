import React, { useState } from "react";
import { DataGrid, NavPageContainer } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  DataGridControlledCode,
  DataGridImportCode,
  DataGridUsageCode
} from "./codes";
import PropsView from "./props-view";

const rows = [
  { id: "alpha", name: "Alpha", owner: "Design", status: "Ready", updated: 12 },
  { id: "beta", name: "Beta", owner: "Platform", status: "Paused", updated: 8 },
  { id: "gamma", name: "Gamma", owner: "Research", status: "Ready", updated: 4 },
  { id: "delta", name: "Delta", owner: "Support", status: "Review", updated: 2 }
];

const columns = [
  { accessor: "name", header: "Name", id: "name", sortable: true },
  { accessor: "owner", header: "Owner", id: "owner" },
  { accessor: "status", header: "Status", id: "status" },
  { accessor: "updated", header: "Updated", id: "updated", sortable: true }
];

const DataGridDocs = () => {
  const [sortState, setSortState] = useState(null);
  const [selectedRowIds, setSelectedRowIds] = useState(["alpha"]);

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>DataGrid</h1>
      <p>
        DataGrid is a typed, accessible Windows-style table surface for local data. It adds
        client-side sorting, single or multiple row selection, disabled rows, and a roving grid
        focus model while keeping the react-winui visual language.
      </p>

      <h2>Sortable and selectable data</h2>
      <DataGrid
        columns={columns}
        getRowId={(item) => item.id}
        gridAriaLabel="Project data"
        items={rows}
        onSelectionChange={setSelectedRowIds}
        onSortChange={setSortState}
        selectedRowIds={selectedRowIds}
        selectionMode="multiple"
        sortState={sortState}
      />
      <p>Selected rows: {selectedRowIds.length ? selectedRowIds.join(", ") : "none"}</p>

      <h2>Disabled row and custom cell</h2>
      <DataGrid
        columns={columns.map((column) =>
          column.id === "status"
            ? {
                ...column,
                renderCell: (item) => <strong>{item.status}</strong>
              }
            : column
        )}
        getRowDisabled={(item) => item.id === "beta"}
        getRowId={(item) => item.id}
        items={rows}
        label="Review queue"
        selectionMode="single"
      />

      <h2>Empty compact grid</h2>
      <DataGrid
        columns={columns.slice(0, 2)}
        density="compact"
        gridAriaLabel="Empty projects"
        items={[]}
        noRowsMessage="No projects match this view"
      />

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {DataGridImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {DataGridUsageCode}
      </SyntaxHighlighter>

      <h2>Controlled sorting and selection</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {DataGridControlledCode}
      </SyntaxHighlighter>

      <h2>Keyboard and accessibility</h2>
      <p>
        The grid keeps one tabbable cell. Arrow keys move between cells, Home and End move within a
        row, Ctrl or Command plus Home and End move to the grid edges, and Page Up or Page Down
        moves by a viewport-sized step. Enter or Space toggles the focused row when selection is
        enabled; Ctrl or Command plus A selects all available rows in multiple-selection mode.
      </p>

      <h2>Current boundary</h2>
      <p>
        DataGrid currently targets local arrays and client-side interaction. Editing, column
        resizing, virtualization, grouping, pagination, row details, async data sources, and
        server-side sorting are intentionally outside this component.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default DataGridDocs;
