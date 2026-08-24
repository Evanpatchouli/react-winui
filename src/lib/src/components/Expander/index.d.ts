import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  RefAttributes
} from "react";

/** Directions in which Expander can reveal its content. */
export type ExpanderDirection = "down" | "up";

/** User event that can request an Expander state change. */
export type ExpanderExpandedChangeEvent = MouseEvent<HTMLButtonElement>;

/** Callback invoked when the header requests an expanded state change. */
export type ExpanderExpandedChangeHandler = (
  expanded: boolean,
  event: ExpanderExpandedChangeEvent
) => void;

/** Props for the Windows-styled single-panel disclosure. */
export interface ExpanderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onChange"
> {
  /** Content that remains visible in the disclosure header. */
  header: ReactNode;
  /** Optional decorative visual displayed before the header. */
  icon?: ReactNode;
  /** Secondary content revealed when the Expander is open. */
  children?: ReactNode;
  /** Controlled expanded state. */
  expanded?: boolean;
  /** Initial expanded state for an uncontrolled Expander. @default false */
  defaultExpanded?: boolean;
  /** Called when pointer or keyboard activation requests a state change. */
  onExpandedChange?: ExpanderExpandedChangeHandler;
  /** Direction in which content is revealed. @default "down" */
  direction?: ExpanderDirection;
  /** Prevents the header from changing the expanded state. */
  disabled?: boolean;
  /** Accessible name for the header button when visible header content is insufficient. */
  headerAriaLabel?: string;
  /** Stable id for the controlled content region. A generated id is used by default. */
  contentId?: string;
}

declare const Expander: ForwardRefExoticComponent<ExpanderProps & RefAttributes<HTMLDivElement>>;

export default Expander;
