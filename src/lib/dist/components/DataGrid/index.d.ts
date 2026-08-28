import type {
  CSSProperties,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefAttributes,
  SyntheticEvent
} from "react";

/** A stable identifier for a DataGrid row. */
export type DataGridRowId = string | number;

/** The direction used by a DataGrid column sort. */
export type DataGridSortDirection = "ascending" | "descending";

/** A controlled or uncontrolled DataGrid sort state. */
export interface DataGridSortState {
  columnId: string;
  direction: DataGridSortDirection;
}

/** Primitive values that can be compared by the built-in client-side sorter. */
export type DataGridSortValue = string | number | Date | null | undefined;

/** The row-selection model supported by DataGrid. */
export type DataGridSelectionMode = "none" | "single" | "multiple";

/** Horizontal alignment for a DataGrid column. */
export type DataGridCellAlign = "start" | "center" | "end";

/** Events emitted by DataGrid actions. */
export type DataGridInteractionEvent = Event | SyntheticEvent<HTMLElement>;

/** A column definition for a typed DataGrid item. */
export interface DataGridColumn<T = unknown> {
  /** Unique column identifier used by sorting and ARIA metadata. */
  id: string;
  /** Content rendered in the column header. */
  header: ReactNode;
  /** Item property or accessor used for the default cell content. */
  accessor?: keyof T | ((item: T) => ReactNode);
  /** Optional custom cell renderer. */
  renderCell?: (item: T, index: number) => ReactNode;
  /** Primitive value used by the built-in sorter. */
  sortValue?: (item: T, index: number) => DataGridSortValue;
  /** Enables the header sort action. @default false */
  sortable?: boolean;
  /** Shows the sort glyph when the column is sortable. @default true */
  showSortIcon?: boolean;
  /** Optional CSS width for the column. */
  width?: CSSProperties["width"];
  /** Optional CSS minimum width for the column. */
  minWidth?: CSSProperties["minWidth"];
  /** Horizontal content alignment. @default start */
  align?: DataGridCellAlign;
  /** Accessible header label when `header` is not plain text. */
  headerAriaLabel?: string;
}

/** Handles a DataGrid sort request. */
export type DataGridSortChangeHandler = (
  sortState: DataGridSortState | null,
  event: DataGridInteractionEvent
) => void;

/** Handles a DataGrid selected-row update. */
export type DataGridSelectionChangeHandler = (
  selectedRowIds: DataGridRowId[],
  event: DataGridInteractionEvent
) => void;

/** Handles a click on a DataGrid row. */
export type DataGridRowClickHandler<T> = (
  item: T,
  index: number,
  event: MouseEvent<HTMLTableRowElement>
) => void;

/** Props for the accessible, sortable Windows-styled data grid. */
export interface DataGridProps<T = unknown> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "defaultValue" | "role"
> {
  /** Items rendered into the data rows. */
  items?: readonly T[];
  /** Column definitions rendered from left to right. */
  columns?: readonly DataGridColumn<T>[];
  /** Resolves a stable row id. Defaults to the item index. */
  getRowId?: (item: T, index: number) => DataGridRowId;
  /** Controlled sort state. */
  sortState?: DataGridSortState | null;
  /** Initial sort state for uncontrolled usage. */
  defaultSortState?: DataGridSortState | null;
  /** Called when a sortable header requests a new sort state. */
  onSortChange?: DataGridSortChangeHandler;
  /** Enables row selection. @default none */
  selectionMode?: DataGridSelectionMode;
  /** Controlled selected row ids. */
  selectedRowIds?: readonly DataGridRowId[];
  /** Initial selected row ids for uncontrolled usage. */
  defaultSelectedRowIds?: readonly DataGridRowId[];
  /** Called when row selection changes. */
  onSelectionChange?: DataGridSelectionChangeHandler;
  /** Marks a data row as non-interactive. */
  getRowDisabled?: (item: T, index: number) => boolean;
  /** Called after a row is clicked. */
  onRowClick?: DataGridRowClickHandler<T>;
  /** Content shown when `items` is empty. @default No items */
  noRowsMessage?: ReactNode;
  /** Optional visible label rendered above the grid. */
  label?: ReactNode;
  /** Accessible name used when there is no visible `label`. */
  gridAriaLabel?: string;
  /** Accessible name prefix for row selection controls. */
  selectionAriaLabel?: string;
  /** Accessible name for the multiple-selection header checkbox. */
  selectAllAriaLabel?: string;
  /** Density of the grid rows. @default standard */
  density?: "compact" | "standard";
  /** Disables sorting, selection and row interaction. */
  disabled?: boolean;
  /** Additional class name for the DataGrid root. */
  rootClassName?: string;
}

/** Generic component type used to preserve item inference through forwardRef. */
export interface DataGridComponent {
  <T = unknown>(props: DataGridProps<T> & RefAttributes<HTMLDivElement>): ReactElement | null;
  displayName?: string;
}

declare const DataGrid: DataGridComponent;

export default DataGrid;
