const DataGridImportCode = `import { DataGrid } from "@evanpatchouli/react-winui";
import DataGridDirect from "@evanpatchouli/react-winui/data-grid";`;

const DataGridUsageCode = `<DataGrid
  columns={[
    { id: "name", header: "Name", accessor: "name", sortable: true },
    { id: "status", header: "Status", accessor: "status" }
  ]}
  getRowId={(item) => item.id}
  items={projects}
  selectionMode="multiple"
/>`;

const DataGridControlledCode = `const [sortState, setSortState] = useState(null);
const [selectedRowIds, setSelectedRowIds] = useState([]);

<DataGrid
  columns={columns}
  getRowId={(item) => item.id}
  items={projects}
  onSelectionChange={setSelectedRowIds}
  onSortChange={setSortState}
  selectedRowIds={selectedRowIds}
  selectionMode="multiple"
  sortState={sortState}
/>`;

export { DataGridControlledCode, DataGridImportCode, DataGridUsageCode };
