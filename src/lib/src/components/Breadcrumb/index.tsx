import { Fragment, forwardRef, useState } from "react";
import type {
  HTMLAttributeAnchorTarget,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  RefAttributes,
  ForwardRefExoticComponent
} from "react";
import Popover from "../Popover";

/** Events emitted when an interactive Breadcrumb item is activated. */
export type BreadcrumbItemClickEvent =
  MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>;

/** Callback for an individual Breadcrumb item's activation. */
export type BreadcrumbItemClickHandler = (event: BreadcrumbItemClickEvent) => void;

/** Stable item data accepted by `Breadcrumb`. */
export interface BreadcrumbItem {
  /** Optional stable identifier used as the React key. */
  id?: string | number;
  /** Visible item label. */
  label: ReactNode;
  /** Optional destination. Items without `href` can use `onClick` as a button. */
  href?: string;
  /** Optional anchor target used when `href` is supplied. */
  target?: HTMLAttributeAnchorTarget;
  /** Optional relationship used when `href` is supplied. */
  rel?: string;
  /** Optional decorative visual placed before the label. */
  icon?: ReactNode;
  /** Renders the item as non-interactive while preserving its hierarchy. */
  disabled?: boolean;
  /** Accessible name override for the item. */
  ariaLabel?: string;
  /** Called when the item is activated. */
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
  /** Ordered path from the root location to the current location. */
  items: readonly BreadcrumbItem[];
  /** Visual separator between items. A chevron is used when omitted. */
  separator?: ReactNode;
  /** Maximum number of visible entries, including the overflow trigger. */
  maxVisibleItems?: number;
  /** Accessible name for the overflow trigger and menu. */
  overflowAriaLabel?: string;
  /** Called after a visible or overflow item is activated. */
  onItemClick?: BreadcrumbItemActivateHandler;
  /** Accessible name for the navigation landmark. @default "Breadcrumb" */
  "aria-label"?: string;
}

/** Public forward-ref type for Breadcrumb. */
export type BreadcrumbComponent = ForwardRefExoticComponent<
  BreadcrumbProps & RefAttributes<HTMLElement>
>;

interface BreadcrumbDisplayItems {
  visibleItems: readonly { item: BreadcrumbItem; index: number }[];
  overflowItems: readonly { item: BreadcrumbItem; index: number }[];
}

interface BreadcrumbRenderItem {
  type: "item";
  item: BreadcrumbItem;
  index: number;
}

interface BreadcrumbRenderOverflow {
  type: "overflow";
  items: readonly { item: BreadcrumbItem; index: number }[];
}

type BreadcrumbRenderEntry = BreadcrumbRenderItem | BreadcrumbRenderOverflow;

const ChevronIcon = () => (
  <svg aria-hidden="true" className="ui-breadcrumb-chevron" focusable="false" viewBox="0 0 12 12">
    <path d="m4.5 2.5 3.5 3.5-3.5 3.5" fill="none" stroke="currentColor" />
  </svg>
);

const MoreIcon = () => (
  <svg aria-hidden="true" className="ui-breadcrumb-more-icon" focusable="false" viewBox="0 0 16 16">
    <circle cx="3.5" cy="8" r="1" />
    <circle cx="8" cy="8" r="1" />
    <circle cx="12.5" cy="8" r="1" />
  </svg>
);

const getDisplayItems = (
  items: readonly BreadcrumbItem[],
  maxVisibleItems: number | undefined
): BreadcrumbDisplayItems => {
  const indexedItems = items.map((item, index) => ({ item, index }));

  if (
    indexedItems.length <= 2 ||
    maxVisibleItems === undefined ||
    !Number.isFinite(maxVisibleItems) ||
    indexedItems.length <= Math.max(3, Math.floor(maxVisibleItems))
  ) {
    return { overflowItems: [], visibleItems: indexedItems };
  }

  const visibleEntryCount = Math.max(3, Math.floor(maxVisibleItems));
  const middleItems = indexedItems.slice(1, -1);
  const visibleMiddleCount = Math.max(0, visibleEntryCount - 3);
  const overflowCount = Math.max(0, middleItems.length - visibleMiddleCount);

  return {
    overflowItems: middleItems.slice(0, overflowCount),
    visibleItems: [
      indexedItems[0],
      ...middleItems.slice(overflowCount),
      indexedItems[indexedItems.length - 1]
    ]
  };
};

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      "aria-label": ariaLabel = "Breadcrumb",
      className,
      items,
      maxVisibleItems,
      onItemClick,
      overflowAriaLabel = "Show more breadcrumb items",
      separator,
      ...navProps
    },
    forwardedRef
  ) => {
    const [overflowOpen, setOverflowOpen] = useState(false);
    const displayItems = getDisplayItems(items, maxVisibleItems);
    const separatorContent = separator === undefined ? <ChevronIcon /> : separator;
    const currentIndex = items.length - 1;
    const renderEntries: BreadcrumbRenderEntry[] = [
      ...displayItems.visibleItems.slice(0, 1).map(({ item, index }) => ({
        index,
        item,
        type: "item" as const
      })),
      ...(displayItems.overflowItems.length > 0
        ? [{ items: displayItems.overflowItems, type: "overflow" as const }]
        : []),
      ...displayItems.visibleItems.slice(1).map(({ item, index }) => ({
        index,
        item,
        type: "item" as const
      }))
    ];

    const activateItem = (
      item: BreadcrumbItem,
      index: number,
      event: BreadcrumbItemClickEvent,
      fromOverflow = false
    ) => {
      item.onClick?.(event);
      onItemClick?.(item, index, event);
      if (fromOverflow) {
        setOverflowOpen(false);
      }
    };

    const renderItemContent = (
      item: BreadcrumbItem,
      index: number,
      isCurrent: boolean,
      fromOverflow = false
    ) => {
      const content = (
        <>
          {item.icon !== undefined ? (
            <span aria-hidden="true" className="ui-breadcrumb-item-icon">
              {item.icon}
            </span>
          ) : null}
          <span className="ui-breadcrumb-item-label">{item.label}</span>
        </>
      );
      const itemClassName = [
        "ui-breadcrumb-item-content",
        isCurrent ? "ui-breadcrumb-item-current" : "",
        item.disabled ? "ui-breadcrumb-item-disabled" : ""
      ]
        .filter(Boolean)
        .join(" ");
      const commonProps = {
        "aria-current": isCurrent ? ("page" as const) : undefined,
        "aria-disabled": item.disabled ? ("true" as const) : undefined,
        "aria-label": item.ariaLabel,
        className: itemClassName,
        role: fromOverflow ? "menuitem" : undefined
      };

      if (isCurrent || item.disabled || (item.href === undefined && !item.onClick)) {
        return <span {...commonProps}>{content}</span>;
      }

      if (item.href !== undefined) {
        return (
          <a
            {...commonProps}
            href={item.href}
            rel={item.rel}
            target={item.target}
            onClick={(event) => activateItem(item, index, event, fromOverflow)}
          >
            {content}
          </a>
        );
      }

      return (
        <button
          {...commonProps}
          type="button"
          onClick={(event) => activateItem(item, index, event, fromOverflow)}
        >
          {content}
        </button>
      );
    };

    const renderListItem = (item: BreadcrumbItem, index: number, isCurrent: boolean) => (
      <li
        className={[
          "ui-breadcrumb-item",
          isCurrent ? "ui-breadcrumb-item-current-wrapper" : "",
          item.disabled ? "ui-breadcrumb-item-disabled-wrapper" : ""
        ]
          .filter(Boolean)
          .join(" ")}
        data-current={isCurrent ? "true" : undefined}
        data-index={index}
      >
        {renderItemContent(item, index, isCurrent)}
      </li>
    );

    const renderOverflowItem = ({ item, index }: { item: BreadcrumbItem; index: number }) => (
      <li
        className="ui-breadcrumb-overflow-list-item"
        key={item.id ?? `overflow-${index}`}
        role="none"
      >
        {renderItemContent(item, index, false, true)}
      </li>
    );

    const renderOverflow = (overflowItems: readonly { item: BreadcrumbItem; index: number }[]) => {
      const overflowContent = (
        <ul className="ui-breadcrumb-overflow-list">{overflowItems.map(renderOverflowItem)}</ul>
      );

      return (
        <li className="ui-breadcrumb-item ui-breadcrumb-overflow-wrapper">
          <Popover
            autoFocus
            className="ui-breadcrumb-overflow-trigger"
            closeOnFocusOut
            content={overflowContent}
            contentClassName="ui-breadcrumb-overflow-surface"
            contentProps={{ "aria-label": overflowAriaLabel, role: "menu" }}
            open={overflowOpen}
            placement="bottom"
            restoreFocus
            trapFocus
            onOpenChange={(open) => setOverflowOpen(open)}
          >
            <button
              aria-haspopup="menu"
              aria-label={overflowAriaLabel}
              className="ui-breadcrumb-overflow-button"
              title={overflowAriaLabel}
              type="button"
            >
              <MoreIcon />
            </button>
          </Popover>
        </li>
      );
    };

    return (
      <nav
        {...navProps}
        ref={forwardedRef}
        aria-label={ariaLabel}
        className={["ui-breadcrumb", className].filter(Boolean).join(" ")}
      >
        <ol className="ui-breadcrumb-list">
          {renderEntries.map((entry, entryIndex) => (
            <Fragment
              key={
                entry.type === "overflow"
                  ? "breadcrumb-overflow"
                  : `breadcrumb-item-${entry.index}-${entry.item.id ?? ""}`
              }
            >
              {entryIndex > 0 ? (
                <li aria-hidden="true" className="ui-breadcrumb-divider" role="presentation">
                  {separatorContent}
                </li>
              ) : null}
              {entry.type === "overflow"
                ? renderOverflow(entry.items)
                : renderListItem(entry.item, entry.index, entry.index === currentIndex)}
            </Fragment>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";

export default Breadcrumb;
