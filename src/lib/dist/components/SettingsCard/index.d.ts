import type { AnchorHTMLAttributes, HTMLAttributes, MouseEvent, ReactNode } from "react";

/** Native event emitted by the card-level button or link trigger. */
export type SettingsCardClickEvent = MouseEvent<HTMLButtonElement | HTMLAnchorElement>;

/** Callback invoked when the card-level trigger is activated. */
export type SettingsCardClickHandler = (event: SettingsCardClickEvent) => void;

/** Props for a Windows 11-styled settings row. */
export interface SettingsCardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "content" | "onClick" | "title"
> {
  /** Primary label for the setting. `header` takes precedence when both labels are provided. */
  title?: ReactNode;
  /** WinUI-compatible alias for the setting label. */
  header?: ReactNode;
  /** Supporting text rendered below the label. */
  description?: ReactNode;
  /** Decorative leading icon associated with the setting. */
  icon?: ReactNode;
  /** Right-aligned setting control or summary. */
  content?: ReactNode;
  /** JSX form of `content`. When both are provided, children take precedence. */
  children?: ReactNode;
  /** Optional supplementary action rendered after the main content. */
  action?: ReactNode;
  /**
   * Disables the card-level trigger and makes descendant controls inert.
   * Descendant controls should still receive their own `disabled` prop when their visual state
   * needs to communicate the disabled condition independently.
   */
  disabled?: boolean;
  /** Turns the card into a navigation entry while keeping content controls outside the link. */
  href?: string;
  /** Link target used when `href` is provided. */
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  /** Link relationship used when `href` is provided. */
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  /** Download hint used when `href` is provided. */
  download?: AnchorHTMLAttributes<HTMLAnchorElement>["download"];
  /**
   * Turns the card into a button-like entry. The handler belongs to a sibling overlay trigger,
   * so interactive `content`, `children`, or `action` elements are never nested inside it.
   */
  onClick?: SettingsCardClickHandler;
  /**
   * Trailing icon for a clickable card. Pass `null` to hide the default chevron.
   * This icon is decorative and hidden from assistive technology.
   */
  actionIcon?: ReactNode | null;
}

declare const SettingsCard: import("react").ForwardRefExoticComponent<
  SettingsCardProps & import("react").RefAttributes<HTMLDivElement>
>;

export default SettingsCard;
