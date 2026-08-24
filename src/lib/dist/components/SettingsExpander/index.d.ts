import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  RefAttributes
} from "react";

/** User event that can request a SettingsExpander state change. */
export type SettingsExpanderExpandedChangeEvent = MouseEvent<HTMLButtonElement>;

/** Callback invoked when the disclosure header requests an expanded state change. */
export type SettingsExpanderExpandedChangeHandler = (
  expanded: boolean,
  event: SettingsExpanderExpandedChangeEvent
) => void;

/** Props for a Windows 11-styled group of related settings. */
export interface SettingsExpanderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "content" | "onChange" | "title"
> {
  /** Primary label for the setting group. `header` takes precedence over `title`. */
  header?: ReactNode;
  /** SettingsCard-compatible alias for the primary label. */
  title?: ReactNode;
  /** Supporting text displayed below the primary label. */
  description?: ReactNode;
  /** Decorative leading icon associated with the setting group. */
  icon?: ReactNode;
  /** Primary setting control or summary displayed on the right side of the header row. */
  content?: ReactNode;
  /** Supplementary action displayed beside `content` without nesting it in the disclosure button. */
  action?: ReactNode;
  /** Settings or other secondary content revealed by the disclosure. */
  children?: ReactNode;
  /** Optional content rendered before the expanded settings. */
  itemsHeader?: ReactNode;
  /** Optional content rendered after the expanded settings. */
  itemsFooter?: ReactNode;
  /** Controlled expanded state. */
  expanded?: boolean;
  /** Initial expanded state for an uncontrolled SettingsExpander. @default false */
  defaultExpanded?: boolean;
  /** Called when pointer or keyboard activation requests an expanded state change. */
  onExpandedChange?: SettingsExpanderExpandedChangeHandler;
  /** Disables the disclosure and makes the complete setting group inert. */
  disabled?: boolean;
  /** Accessible name for the disclosure button when visible header content is insufficient. */
  headerAriaLabel?: string;
  /** Stable id for the expanded settings region. A generated id is used by default. */
  contentId?: string;
}

declare const SettingsExpander: ForwardRefExoticComponent<
  SettingsExpanderProps & RefAttributes<HTMLDivElement>
>;

export default SettingsExpander;
