import {
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";
import type {
  CSSProperties,
  ChangeEvent,
  ForwardedRef,
  HTMLAttributes,
  KeyboardEvent,
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
  /** Called after a non-interactive element inside a row is clicked. */
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

interface DataGridRowModel<T> {
  item: T;
  sourceIndex: number;
  id: DataGridRowId;
  disabled: boolean;
}

interface DataGridCellPosition {
  rowIndex: number;
  columnIndex: number;
}

const getObjectValue = (item: unknown, key: PropertyKey): unknown => {
  if ((typeof item !== "object" || item === null) && typeof item !== "function") {
    return undefined;
  }

  return (item as Record<PropertyKey, unknown>)[key];
};

const getColumnValue = <T,>(item: T, column: DataGridColumn<T>): unknown => {
  if (typeof column.accessor === "function") {
    return column.accessor(item);
  }

  if (column.accessor !== undefined) {
    return getObjectValue(item, column.accessor as PropertyKey);
  }

  return getObjectValue(item, column.id);
};

const toReactNode = (value: unknown): ReactNode => {
  if (
    value === null ||
    value === undefined ||
    typeof value === "boolean" ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "bigint"
  ) {
    return value as ReactNode;
  }

  if (isValidElement(value)) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => toReactNode(entry));
  }

  return String(value);
};

const toTextValue = (value: unknown): string => {
  if (value === null || value === undefined || typeof value === "boolean") {
    return "";
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "bigint") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map((entry) => toTextValue(entry)).join(" ");
  }

  if (isValidElement(value)) {
    return "";
  }

  return String(value);
};

const getComparableValue = <T,>(
  item: T,
  sourceIndex: number,
  column: DataGridColumn<T>
): DataGridSortValue => {
  return column.sortValue
    ? column.sortValue(item, sourceIndex)
    : (() => {
        const value = getColumnValue(item, column);
        if (value instanceof Date) {
          return Number.isNaN(value.getTime()) ? null : value;
        }
        if (
          value === null ||
          value === undefined ||
          typeof value === "string" ||
          typeof value === "number"
        ) {
          return value;
        }
        return toTextValue(value);
      })();
};

const compareValues = (first: DataGridSortValue, second: DataGridSortValue): number => {
  if (first === null || first === undefined) {
    return second === null || second === undefined ? 0 : 1;
  }
  if (second === null || second === undefined) {
    return -1;
  }

  if (first instanceof Date && second instanceof Date) {
    return first.getTime() - second.getTime();
  }

  if (typeof first === "number" && typeof second === "number") {
    return first - second;
  }

  return new Intl.Collator(undefined, { numeric: true, sensitivity: "base" }).compare(
    String(first),
    String(second)
  );
};

const getNextSortState = (
  currentSortState: DataGridSortState | null,
  columnId: string
): DataGridSortState | null => {
  if (!currentSortState || currentSortState.columnId !== columnId) {
    return { columnId, direction: "ascending" };
  }

  if (currentSortState.direction === "ascending") {
    return { columnId, direction: "descending" };
  }

  return null;
};

const isInteractiveTarget = (target: EventTarget | null): boolean => {
  if (typeof Element === "undefined" || !(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest("button, input, a, select, textarea, [contenteditable='true']"));
};

const hasModifier = (event: DataGridInteractionEvent): boolean => {
  if (!("ctrlKey" in event) || typeof event.ctrlKey !== "boolean") {
    return false;
  }

  return (
    event.ctrlKey || ("metaKey" in event && typeof event.metaKey === "boolean" && event.metaKey)
  );
};

const scheduleFocus = (callback: () => void) => {
  if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
    window.requestAnimationFrame(callback);
    return;
  }

  queueMicrotask(callback);
};

const DataGridInner = <T,>(
  {
    items,
    columns,
    getRowId,
    sortState: controlledSortState,
    defaultSortState = null,
    onSortChange,
    selectionMode = "none",
    selectedRowIds: controlledSelectedRowIds,
    defaultSelectedRowIds = [],
    onSelectionChange,
    getRowDisabled,
    onRowClick,
    noRowsMessage = "No items",
    label,
    gridAriaLabel,
    selectionAriaLabel = "Select row",
    selectAllAriaLabel = "Select all rows",
    density = "standard",
    disabled = false,
    rootClassName,
    className,
    style,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    onKeyDown,
    ...rootProps
  }: DataGridProps<T>,
  forwardedRef: ForwardedRef<HTMLDivElement>
) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const selectAllCheckboxRef = useRef<HTMLInputElement>(null);
  const resolvedItems = items ?? [];
  const resolvedColumns = columns ?? [];
  const [uncontrolledSortState, setUncontrolledSortState] = useState<DataGridSortState | null>(
    defaultSortState
  );
  const [uncontrolledSelectedRowIds, setUncontrolledSelectedRowIds] = useState<DataGridRowId[]>(
    () => [...defaultSelectedRowIds]
  );
  const [focusedCell, setFocusedCell] = useState<DataGridCellPosition>({
    rowIndex: 0,
    columnIndex: 0
  });

  useImperativeHandle(forwardedRef, () => rootRef.current as HTMLDivElement);

  const isSortControlled = controlledSortState !== undefined;
  const activeSortState = isSortControlled ? controlledSortState : uncontrolledSortState;
  const activeSortColumn = activeSortState
    ? resolvedColumns.find(
        (column) => column.id === activeSortState.columnId && column.sortable === true
      )
    : undefined;
  const selectionColumnCount = selectionMode === "none" ? 0 : 1;

  const rowModels = useMemo<DataGridRowModel<T>[]>(
    () =>
      resolvedItems.map((item, sourceIndex) => ({
        item,
        sourceIndex,
        id: getRowId?.(item, sourceIndex) ?? sourceIndex,
        disabled: disabled || Boolean(getRowDisabled?.(item, sourceIndex))
      })),
    [disabled, getRowDisabled, getRowId, resolvedItems]
  );

  const displayRows = useMemo(() => {
    if (!activeSortColumn || !activeSortState) {
      return rowModels;
    }

    const direction = activeSortState.direction === "ascending" ? 1 : -1;
    return [...rowModels].sort((firstRow, secondRow) => {
      const result = compareValues(
        getComparableValue(firstRow.item, firstRow.sourceIndex, activeSortColumn),
        getComparableValue(secondRow.item, secondRow.sourceIndex, activeSortColumn)
      );

      return result === 0 ? firstRow.sourceIndex - secondRow.sourceIndex : result * direction;
    });
  }, [activeSortColumn, activeSortState, rowModels]);

  const isSelectionControlled = controlledSelectedRowIds !== undefined;
  const resolvedSelectedRowIds = isSelectionControlled
    ? [...(controlledSelectedRowIds ?? [])]
    : uncontrolledSelectedRowIds;
  const selectedRowIds =
    selectionMode === "single" ? resolvedSelectedRowIds.slice(0, 1) : resolvedSelectedRowIds;
  const selectedRowIdSet = useMemo(() => new Set(selectedRowIds), [selectedRowIds]);
  const selectableRows = useMemo(() => displayRows.filter((row) => !row.disabled), [displayRows]);
  const selectableRowIds = useMemo(() => selectableRows.map((row) => row.id), [selectableRows]);
  const allSelectableRowsSelected =
    selectableRowIds.length > 0 && selectableRowIds.every((rowId) => selectedRowIdSet.has(rowId));
  const someSelectableRowsSelected = selectableRowIds.some((rowId) => selectedRowIdSet.has(rowId));

  useEffect(() => {
    if (!selectAllCheckboxRef.current) {
      return;
    }

    selectAllCheckboxRef.current.indeterminate =
      someSelectableRowsSelected && !allSelectableRowsSelected;
  }, [allSelectableRowsSelected, someSelectableRowsSelected]);

  useEffect(() => {
    setFocusedCell((previous) => {
      const nextRowIndex = Math.min(previous.rowIndex, Math.max(displayRows.length - 1, 0));
      const nextColumnIndex = Math.min(
        previous.columnIndex,
        Math.max(resolvedColumns.length - 1, 0)
      );
      if (previous.rowIndex === nextRowIndex && previous.columnIndex === nextColumnIndex) {
        return previous;
      }
      return { rowIndex: nextRowIndex, columnIndex: nextColumnIndex };
    });
  }, [displayRows.length, resolvedColumns.length]);

  const requestSort = useCallback(
    (column: DataGridColumn<T>, event: MouseEvent<HTMLButtonElement>) => {
      if (disabled || column.sortable !== true) {
        return;
      }

      const nextSortState = getNextSortState(activeSortState ?? null, column.id);
      if (!isSortControlled) {
        setUncontrolledSortState(nextSortState);
      }
      onSortChange?.(nextSortState, event);
    },
    [activeSortState, disabled, isSortControlled, onSortChange]
  );

  const emitSelection = useCallback(
    (nextSelectedRowIds: DataGridRowId[], event: DataGridInteractionEvent) => {
      const uniqueSelectedRowIds = [...new Set(nextSelectedRowIds)];
      const normalizedSelectedRowIds =
        selectionMode === "single" ? uniqueSelectedRowIds.slice(0, 1) : uniqueSelectedRowIds;

      if (!isSelectionControlled) {
        setUncontrolledSelectedRowIds(normalizedSelectedRowIds);
      }
      onSelectionChange?.(normalizedSelectedRowIds, event);
    },
    [isSelectionControlled, onSelectionChange, selectionMode]
  );

  const selectRow = useCallback(
    (row: DataGridRowModel<T>, event: DataGridInteractionEvent, toggle: boolean) => {
      if (disabled || row.disabled || selectionMode === "none") {
        return;
      }

      if (selectionMode === "single") {
        emitSelection([row.id], event);
        return;
      }

      const nextSelectedRowIds = toggle
        ? selectedRowIdSet.has(row.id)
          ? selectedRowIds.filter((rowId) => rowId !== row.id)
          : [...selectedRowIds, row.id]
        : [row.id];
      emitSelection(nextSelectedRowIds, event);
    },
    [disabled, emitSelection, selectedRowIdSet, selectedRowIds, selectionMode]
  );

  const toggleSelectAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (disabled || selectionMode !== "multiple") {
        return;
      }

      const nextSelectedRowIds = event.currentTarget.checked
        ? [...new Set([...selectedRowIds, ...selectableRowIds])]
        : selectedRowIds.filter((rowId) => !selectableRowIds.includes(rowId));
      emitSelection(nextSelectedRowIds, event);
    },
    [disabled, emitSelection, selectableRowIds, selectedRowIds, selectionMode]
  );

  const focusCell = useCallback(
    (rowIndex: number, columnIndex: number) => {
      const row = displayRows[rowIndex];
      if (!row || row.disabled || !resolvedColumns[columnIndex]) {
        return;
      }

      setFocusedCell({ rowIndex, columnIndex });
      scheduleFocus(() => {
        rootRef.current
          ?.querySelector<HTMLElement>(
            `[data-rwu-grid-row-index="${rowIndex}"][data-rwu-grid-column-index="${columnIndex}"]`
          )
          ?.focus();
      });
    },
    [displayRows, resolvedColumns]
  );

  const findNavigableRow = useCallback(
    (rowIndex: number, direction: -1 | 1) => {
      let nextRowIndex = rowIndex + direction;
      while (nextRowIndex >= 0 && nextRowIndex < displayRows.length) {
        if (!displayRows[nextRowIndex].disabled) {
          return nextRowIndex;
        }
        nextRowIndex += direction;
      }
      return rowIndex;
    },
    [displayRows]
  );

  const findFirstNavigableRow = useCallback(() => {
    return displayRows.findIndex((row) => !row.disabled);
  }, [displayRows]);

  const findLastNavigableRow = useCallback(() => {
    for (let index = displayRows.length - 1; index >= 0; index -= 1) {
      if (!displayRows[index].disabled) {
        return index;
      }
    }
    return -1;
  }, [displayRows]);

  const handleGridKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || disabled) {
        return;
      }

      if (typeof Element === "undefined" || !(event.target instanceof Element)) {
        return;
      }

      const targetCell = event.target.closest<HTMLElement>(
        '[role="gridcell"][data-rwu-grid-row-index][data-rwu-grid-column-index]'
      );
      if (!targetCell || (event.target !== targetCell && isInteractiveTarget(event.target))) {
        return;
      }

      const rowIndex = Number(targetCell.dataset.rwuGridRowIndex);
      const columnIndex = Number(targetCell.dataset.rwuGridColumnIndex);
      if (!Number.isInteger(rowIndex) || !Number.isInteger(columnIndex)) {
        return;
      }

      const currentRow = displayRows[rowIndex];
      if (!currentRow || currentRow.disabled || resolvedColumns.length === 0) {
        return;
      }

      if (
        selectionMode === "multiple" &&
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "a"
      ) {
        event.preventDefault();
        emitSelection(selectableRowIds, event);
        return;
      }

      if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        if (selectionMode !== "none") {
          event.preventDefault();
          selectRow(currentRow, event, selectionMode === "multiple");
        }
        return;
      }

      const firstRowIndex = findFirstNavigableRow();
      const lastRowIndex = findLastNavigableRow();
      let nextRowIndex = rowIndex;
      let nextColumnIndex = columnIndex;

      switch (event.key) {
        case "ArrowLeft":
          nextColumnIndex -= 1;
          break;
        case "ArrowRight":
          nextColumnIndex += 1;
          break;
        case "ArrowUp":
          nextRowIndex = findNavigableRow(rowIndex, -1);
          break;
        case "ArrowDown":
          nextRowIndex = findNavigableRow(rowIndex, 1);
          break;
        case "Home":
          if (event.ctrlKey || event.metaKey) {
            nextRowIndex = firstRowIndex;
            nextColumnIndex = 0;
          } else {
            nextColumnIndex = 0;
          }
          break;
        case "End":
          if (event.ctrlKey || event.metaKey) {
            nextRowIndex = lastRowIndex;
            nextColumnIndex = resolvedColumns.length - 1;
          } else {
            nextColumnIndex = resolvedColumns.length - 1;
          }
          break;
        case "PageUp":
          nextRowIndex = findNavigableRow(rowIndex, -1);
          for (let count = 1; count < 5; count += 1) {
            nextRowIndex = findNavigableRow(nextRowIndex, -1);
          }
          break;
        case "PageDown":
          nextRowIndex = findNavigableRow(rowIndex, 1);
          for (let count = 1; count < 5; count += 1) {
            nextRowIndex = findNavigableRow(nextRowIndex, 1);
          }
          break;
        default:
          return;
      }

      if (
        nextRowIndex < 0 ||
        nextRowIndex >= displayRows.length ||
        nextColumnIndex < 0 ||
        nextColumnIndex >= resolvedColumns.length ||
        (nextRowIndex === rowIndex && nextColumnIndex === columnIndex)
      ) {
        return;
      }

      event.preventDefault();
      focusCell(nextRowIndex, nextColumnIndex);
    },
    [
      disabled,
      displayRows,
      emitSelection,
      findFirstNavigableRow,
      findLastNavigableRow,
      findNavigableRow,
      focusCell,
      onKeyDown,
      resolvedColumns,
      selectableRowIds,
      selectRow,
      selectionMode
    ]
  );

  const handleRowClick = useCallback(
    (row: DataGridRowModel<T>, event: MouseEvent<HTMLTableRowElement>) => {
      if (disabled || row.disabled) {
        return;
      }

      if (isInteractiveTarget(event.target)) {
        return;
      }

      onRowClick?.(row.item, row.sourceIndex, event);
      if (event.defaultPrevented) {
        return;
      }

      selectRow(row, event, selectionMode === "multiple" && hasModifier(event));
    },
    [disabled, onRowClick, selectRow, selectionMode]
  );

  const handleCellClick = useCallback(
    (rowIndex: number, columnIndex: number, event: MouseEvent<HTMLTableCellElement>) => {
      setFocusedCell({ rowIndex, columnIndex });
      event.currentTarget.focus();
    },
    []
  );

  const tableLabelledBy = ariaLabelledby ?? (label ? labelId : undefined);
  const tableAriaLabel = tableLabelledBy ? undefined : (gridAriaLabel ?? ariaLabel ?? "Data grid");
  const rootClassNames = [
    "ui-data-grid",
    `ui-data-grid-${density}`,
    disabled ? "ui-data-grid-disabled" : "",
    rootClassName,
    className
  ]
    .filter(Boolean)
    .join(" ");
  const gridColumnCount = Math.max(resolvedColumns.length + selectionColumnCount, 1);

  return (
    <div
      {...rootProps}
      aria-disabled={disabled || undefined}
      className={rootClassNames}
      data-selection-mode={selectionMode}
      data-state={disabled ? "disabled" : "active"}
      ref={rootRef}
      style={style}
      onKeyDown={handleGridKeyDown}
    >
      {label ? (
        <div className="ui-data-grid-label" id={labelId}>
          {label}
        </div>
      ) : null}
      <div className="ui-data-grid-scroll-region">
        <table
          aria-colcount={gridColumnCount}
          aria-label={tableAriaLabel}
          aria-labelledby={tableLabelledBy}
          aria-multiselectable={selectionMode === "multiple" ? true : undefined}
          aria-readonly="true"
          aria-rowcount={displayRows.length + 1}
          className="ui-data-grid-table"
          role="grid"
        >
          <thead className="ui-data-grid-head">
            <tr aria-rowindex={1} role="row">
              {selectionMode !== "none" ? (
                <th
                  aria-colindex={1}
                  aria-label="Selection"
                  className="ui-data-grid-selection-header"
                  role="columnheader"
                  scope="col"
                >
                  {selectionMode === "multiple" ? (
                    <input
                      ref={selectAllCheckboxRef}
                      aria-label={selectAllAriaLabel}
                      checked={allSelectableRowsSelected}
                      className="ui-data-grid-selection-control"
                      disabled={disabled || selectableRows.length === 0}
                      type="checkbox"
                      onChange={toggleSelectAll}
                    />
                  ) : null}
                </th>
              ) : null}
              {resolvedColumns.map((column, columnIndex) => {
                const isSortable = column.sortable === true;
                const isActiveSort = Boolean(
                  activeSortState?.columnId === column.id && activeSortColumn
                );
                const sortLabel =
                  column.headerAriaLabel ?? (toTextValue(column.header) || column.id);
                const nextSortState = getNextSortState(activeSortState ?? null, column.id);
                const sortActionLabel = nextSortState
                  ? `Sort ${sortLabel} ${nextSortState.direction}`
                  : `Clear sort for ${sortLabel}`;

                return (
                  <th
                    aria-colindex={columnIndex + selectionColumnCount + 1}
                    aria-sort={
                      isSortable
                        ? activeSortState?.columnId === column.id
                          ? activeSortState.direction
                          : "none"
                        : undefined
                    }
                    className={`ui-data-grid-header-cell ui-data-grid-align-${column.align ?? "start"}`}
                    key={column.id}
                    role="columnheader"
                    scope="col"
                    style={{ minWidth: column.minWidth, width: column.width }}
                  >
                    {isSortable ? (
                      <button
                        aria-label={sortActionLabel}
                        className="ui-data-grid-sort-button"
                        disabled={disabled}
                        type="button"
                        onClick={(event) => requestSort(column, event)}
                      >
                        <span className="ui-data-grid-header-label">{column.header}</span>
                        {column.showSortIcon === false ? null : (
                          <i
                            aria-hidden="true"
                            className={
                              isActiveSort && activeSortState?.direction === "ascending"
                                ? "icons10-arrow-up"
                                : "icons10-arrow-down"
                            }
                          />
                        )}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="ui-data-grid-body">
            {displayRows.length === 0 ? (
              <tr aria-rowindex={2} className="ui-data-grid-empty-row" role="row">
                <td
                  aria-colindex={selectionColumnCount > 0 ? 2 : 1}
                  className="ui-data-grid-empty-cell"
                  colSpan={gridColumnCount}
                  role="gridcell"
                >
                  {noRowsMessage}
                </td>
              </tr>
            ) : (
              displayRows.map((row, rowIndex) => {
                const rowSelected = selectedRowIdSet.has(row.id);
                const rowLabel =
                  resolvedColumns.length > 0
                    ? toTextValue(getColumnValue(row.item, resolvedColumns[0])) || String(row.id)
                    : String(row.id);

                return (
                  <tr
                    aria-disabled={row.disabled || undefined}
                    aria-rowindex={rowIndex + 2}
                    aria-selected={selectionMode !== "none" ? rowSelected : undefined}
                    className={[
                      "ui-data-grid-row",
                      rowSelected ? "ui-data-grid-row-selected" : "",
                      row.disabled ? "ui-data-grid-row-disabled" : ""
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    data-rwu-grid-row-id={String(row.id)}
                    key={`${String(row.id)}-${row.sourceIndex}`}
                    role="row"
                    onClick={(event) => handleRowClick(row, event)}
                  >
                    {selectionMode !== "none" ? (
                      <td aria-colindex={1} className="ui-data-grid-selection-cell" role="gridcell">
                        <input
                          aria-label={`${selectionAriaLabel}: ${rowLabel}`}
                          checked={rowSelected}
                          className="ui-data-grid-selection-control"
                          disabled={disabled || row.disabled}
                          name={selectionMode === "single" ? `data-grid-${labelId}` : undefined}
                          type={selectionMode === "single" ? "radio" : "checkbox"}
                          onChange={(event) => selectRow(row, event, true)}
                        />
                      </td>
                    ) : null}
                    {resolvedColumns.map((column, columnIndex) => {
                      const cellContent = column.renderCell
                        ? column.renderCell(row.item, row.sourceIndex)
                        : toReactNode(getColumnValue(row.item, column));
                      const isTabStop =
                        !disabled &&
                        !row.disabled &&
                        focusedCell.rowIndex === rowIndex &&
                        focusedCell.columnIndex === columnIndex;

                      return (
                        <td
                          aria-colindex={columnIndex + selectionColumnCount + 1}
                          className={`ui-data-grid-cell ui-data-grid-align-${column.align ?? "start"}`}
                          data-rwu-grid-column-index={columnIndex}
                          data-rwu-grid-row-index={rowIndex}
                          key={column.id}
                          role="gridcell"
                          tabIndex={isTabStop ? 0 : -1}
                          style={{ minWidth: column.minWidth, width: column.width }}
                          onClick={(event) => handleCellClick(rowIndex, columnIndex, event)}
                          onFocus={() => setFocusedCell({ rowIndex, columnIndex })}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DataGrid = forwardRef(DataGridInner) as DataGridComponent;

DataGrid.displayName = "DataGrid";

export default DataGrid;
