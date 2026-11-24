import type { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react";

/** Properties for one-based navigation within paged content. */
export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Total number of pages. Zero pages hides the navigation. */
  pageCount: number;
  /** Current page in controlled mode. */
  page?: number;
  /** Initial uncontrolled page. Defaults to one. */
  defaultPage?: number;
  /** Called when a user requests a different page. */
  onPageChange?: (page: number) => void;
  /** Disables every navigation button. */
  disabled?: boolean;
  /** Accessible label for each numbered button. */
  getPageLabel?: (page: number) => string;
  /** Accessible label for the previous page button. */
  previousLabel?: string;
  /** Accessible label for the next page button. */
  nextLabel?: string;
}

declare const Pagination: ForwardRefExoticComponent<PaginationProps & RefAttributes<HTMLElement>>;
export default Pagination;
