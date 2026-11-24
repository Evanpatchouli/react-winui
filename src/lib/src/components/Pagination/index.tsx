import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import type { HTMLAttributes, KeyboardEvent } from "react";

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

function clampPage(page: number, count: number) {
  return Math.max(1, Math.min(count, Number.isFinite(page) ? Math.floor(page) : 1));
}

function visiblePages(current: number, count: number): (number | string)[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "end-gap", count];
  if (current >= count - 3)
    return [1, "start-gap", count - 4, count - 3, count - 2, count - 1, count];
  return [1, "start-gap", current - 1, current, current + 1, "end-gap", count];
}

const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    pageCount,
    page,
    defaultPage = 1,
    onPageChange,
    disabled = false,
    getPageLabel = (number) => `Page ${number}`,
    previousLabel = "Previous page",
    nextLabel = "Next page",
    "aria-label": label = "Pagination",
    className,
    ...navProps
  },
  ref
) {
  const count = Number.isFinite(pageCount)
    ? Math.max(0, Math.min(Number.MAX_SAFE_INTEGER, Math.floor(pageCount)))
    : 0;
  const [internalPage, setInternalPage] = useState(() => clampPage(defaultPage, count));
  const current = clampPage(page ?? internalPage, count);
  if (page === undefined && internalPage !== current) setInternalPage(current);

  const currentButton = useRef<HTMLButtonElement>(null);
  const focusRequest = useRef<{ page: number; source: HTMLButtonElement } | null>(null);
  useLayoutEffect(() => {
    const requested = focusRequest.current;
    focusRequest.current = null;
    if (requested?.page !== current || !currentButton.current) return;
    const active = requested.source.ownerDocument.activeElement;
    if (active === requested.source || active === requested.source.ownerDocument.body)
      currentButton.current.focus();
  }, [current]);

  function select(next: number, focusFrom?: HTMLButtonElement) {
    if (disabled || next === current || next < 1 || next > count) return;
    focusRequest.current = focusFrom ? { page: next, source: focusFrom } : null;
    if (page === undefined) setInternalPage(next);
    onPageChange?.(next);
  }

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, number: number) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    let next: number;
    switch (event.key) {
      case "Home":
        next = 1;
        break;
      case "End":
        next = count;
        break;
      case "ArrowLeft":
        next = number + (rtl ? 1 : -1);
        break;
      case "ArrowRight":
        next = number + (rtl ? -1 : 1);
        break;
      default:
        return;
    }
    event.preventDefault();
    if (next === current) {
      currentButton.current?.focus();
    } else {
      select(next, event.currentTarget);
    }
  }

  if (!count) return null;
  return (
    <nav
      {...navProps}
      ref={ref}
      aria-label={label}
      className={["ui-pagination", className].filter(Boolean).join(" ")}
    >
      <button
        type="button"
        aria-label={previousLabel}
        disabled={disabled || current === 1}
        onClick={(event) => select(current - 1, current === 2 ? event.currentTarget : undefined)}
      >
        <span className="ui-pagination-arrow" aria-hidden="true">
          ‹
        </span>
      </button>
      {visiblePages(current, count).map((number) =>
        typeof number === "string" ? (
          <span key={number} aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={number}
            ref={number === current ? currentButton : undefined}
            type="button"
            aria-label={getPageLabel(number)}
            aria-current={number === current ? "page" : undefined}
            disabled={disabled}
            onClick={() => select(number)}
            onKeyDown={(event) => handleKey(event, number)}
          >
            {number}
          </button>
        )
      )}
      <button
        type="button"
        aria-label={nextLabel}
        disabled={disabled || current === count}
        onClick={(event) =>
          select(current + 1, current === count - 1 ? event.currentTarget : undefined)
        }
      >
        <span className="ui-pagination-arrow" aria-hidden="true">
          ›
        </span>
      </button>
    </nav>
  );
});

export default Pagination;
