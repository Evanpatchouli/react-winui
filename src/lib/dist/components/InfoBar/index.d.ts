import type { HTMLAttributes, MouseEvent, ReactNode } from "react";

/** Status levels supported by the Windows-styled InfoBar. */
export type InfoBarSeverity = "informational" | "success" | "warning" | "error";

/** Events that can request an InfoBar visibility change. */
export type InfoBarOpenChangeEvent = MouseEvent<HTMLButtonElement>;

/** Callback for controlled and uncontrolled visibility changes. */
export type InfoBarOpenChangeHandler = (open: boolean, event: InfoBarOpenChangeEvent) => void;

/** Props for the inline Windows-styled InfoBar status message. */
export interface InfoBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "content" | "title"
> {
  /** Status level used for the icon and live-region priority. @default "informational" */
  severity?: InfoBarSeverity;
  /** Short summary displayed with stronger emphasis. */
  title?: ReactNode;
  /** Main status message. */
  message?: ReactNode;
  /** Custom content rendered on its own line below the summary. */
  content?: ReactNode;
  /** Alternative JSX form of `content`. When both are set, children take precedence. */
  children?: ReactNode;
  /** Optional action rendered after the title and message. */
  action?: ReactNode;
  /** Controls visibility. When omitted, visibility is managed internally. */
  open?: boolean;
  /** Initial visibility for an uncontrolled InfoBar. @default false */
  defaultOpen?: boolean;
  /** Called when the close button requests a visibility change. */
  onOpenChange?: InfoBarOpenChangeHandler;
  /** Shows a close button that dismisses the InfoBar. @default true */
  closable?: boolean;
  /** Accessible name for the close button. @default "Close" */
  closeButtonAriaLabel?: string;
  /**
   * Disables user interaction without hiding the status message.
   * Programmatic changes to the controlled `open` prop remain available.
   */
  disabled?: boolean;
}

declare const InfoBar: import("react").ForwardRefExoticComponent<
  InfoBarProps & import("react").RefAttributes<HTMLDivElement>
>;

export default InfoBar;
