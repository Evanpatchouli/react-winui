import { useEffect, useState } from "react";
import type { CSSProperties, FC, ReactNode } from "react";

/** A value rendered into one TableView cell. */
export type TableViewCell = ReactNode;

/** A row of TableView cell values. */
export type TableViewRow = TableViewCell[];

/** Configuration for one TableView column. */
export interface TableViewColumn {
  title?: ReactNode;
  showSortIcon?: boolean;
  sortable?: boolean;
}

/** Props for the sortable Windows-styled table. */
export interface TableViewProps {
  rows?: TableViewRow[];
  columns?: TableViewColumn[];
  rowFontSize?: CSSProperties["fontSize"];
  headerFontSize?: CSSProperties["fontSize"];
  TableHeaderComponent?: ReactNode;
  TableFooterComponent?: ReactNode;
}

const EMPTY_ROWS: TableViewRow[] = [];
const EMPTY_COLUMNS: TableViewColumn[] = [];

const getSortableValue = (cell: TableViewCell): string | number => {
  if (typeof cell === "number" || typeof cell === "string") {
    return cell;
  }

  return String(cell ?? "");
};

const generateKey = () => `row_${Math.random()}`;

const TableView: FC<TableViewProps> = ({
  rows = EMPTY_ROWS,
  columns = EMPTY_COLUMNS,
  rowFontSize = 16,
  headerFontSize = 18,
  TableHeaderComponent,
  TableFooterComponent
}) => {
  const [rowsState, setRows] = useState<TableViewRow[]>(rows);
  const [tappedColumn, setTappedColumn] = useState<number | undefined>();

  useEffect(() => {
    setRows(rows);
  }, [rows]);

  const alphaOrder = (columnIndex: number) => {
    const sortedRows = [...rowsState].sort((firstRow, secondRow) => {
      const firstValue = getSortableValue(firstRow[columnIndex]);
      const secondValue = getSortableValue(secondRow[columnIndex]);

      return firstValue > secondValue ? 1 : -1;
    });

    if (tappedColumn === columnIndex) {
      setRows(rows);
      setTappedColumn(undefined);
    } else {
      setRows(sortedRows);
      setTappedColumn(columnIndex);
    }
  };

  return (
    <div className="ui-table-view-container">
      {TableHeaderComponent}
      <table className="ui-table-view">
        <thead style={{ fontSize: headerFontSize }}>
          <tr className="ui-table-tr">
            {columns.map((column, index) => (
              <th
                align="left"
                className={column.sortable === false ? "no-sortable" : "sortable"}
                key={`${index}-${String(column.title ?? "")}`}
                onClick={() => alphaOrder(index)}
              >
                {column.title}{" "}
                {column.showSortIcon === false ? (
                  ""
                ) : tappedColumn === index ? (
                  <i className="icons10-arrow-up" />
                ) : (
                  <i className="icons10-arrow-down" />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ fontSize: rowFontSize }}>
          {rowsState.map((row) => (
            <tr key={generateKey()}>
              {row.map((cell, index) => (
                <td key={`${index}-${String(cell ?? "")}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {TableFooterComponent}
    </div>
  );
};

export default TableView;
