import type { CSSProperties, FC, ReactNode } from "react";

export type TableViewCell = ReactNode;

export type TableViewRow = TableViewCell[];

export interface TableViewColumn {
  title?: ReactNode;
  showSortIcon?: boolean;
  sortable?: boolean;
}

export interface TableViewProps {
  rows?: TableViewRow[];
  columns?: TableViewColumn[];
  rowFontSize?: CSSProperties["fontSize"];
  headerFontSize?: CSSProperties["fontSize"];
  TableHeaderComponent?: ReactNode;
  TableFooterComponent?: ReactNode;
}

declare const TableView: FC<TableViewProps>;

export default TableView;
