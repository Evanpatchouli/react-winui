import type {
  ForwardRefExoticComponent,
  HTMLAttributeAnchorTarget,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  RefAttributes
} from "react";

/** Events emitted when an interactive Breadcrumb item is activated. */
export type BreadcrumbItemClickEvent =
  MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>;

/** Callback for an individual Breadcrumb item's activation. */
export type BreadcrumbItemClickHandler = (event: BreadcrumbItemClickEvent) => void;

/** Stable item data accepted by `Breadcrumb`. */
export interface BreadcrumbItem {
  id?: string | number;
  label: ReactNode;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  icon?: ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: BreadcrumbItemClickHandler;
}

/** Callback emitted when an item in the visible trail or overflow menu is activated. */
export type BreadcrumbItemActivateHandler = (
  item: BreadcrumbItem,
  index: number,
  event: BreadcrumbItemClickEvent
) => void;

/** Props for the Windows-styled hierarchical Breadcrumb navigation. */
export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  items: readonly BreadcrumbItem[];
  separator?: ReactNode;
  maxVisibleItems?: number;
  overflowAriaLabel?: string;
  onItemClick?: BreadcrumbItemActivateHandler;
  "aria-label"?: string;
}

/** Public forward-ref type for Breadcrumb. */
export type BreadcrumbComponent = ForwardRefExoticComponent<
  BreadcrumbProps & RefAttributes<HTMLElement>
>;

declare const Breadcrumb: BreadcrumbComponent;

export default Breadcrumb;
