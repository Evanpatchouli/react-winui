import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefAttributes
} from "react";

/** Visual surface used by a Tag. */
export type TagAppearance = "filled" | "outline" | "brand";

/** Shape used by a Tag. */
export type TagShape = "rounded" | "circular";

/** Size used by a Tag. */
export type TagSize = "extra-small" | "small" | "medium";

/** Native events that can request dismissal of a Tag. */
export type TagDismissEvent = MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>;

/** Called when a dismissible Tag is activated for removal. */
export type TagDismissHandler = (event: TagDismissEvent) => void;

/** Props for a compact Windows-styled value Tag. */
export interface TagProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "onClick" | "onKeyDown"
> {
  /** Visible text or content represented by the Tag. */
  children: ReactNode;
  /** Surface treatment for the Tag. @default "filled" */
  appearance?: TagAppearance;
  /** Shape of the Tag boundary. @default "rounded" */
  shape?: TagShape;
  /** Control height and spacing. @default "medium" */
  size?: TagSize;
  /** Optional decorative content displayed before the label. */
  icon?: ReactNode;
  /** Makes the whole Tag a dismiss action. @default false */
  dismissible?: boolean;
  /** Called by click, Delete, or Backspace when a dismissible Tag is activated. */
  onDismiss?: TagDismissHandler;
  /** Disables the dismiss action and applies the disabled visual state. @default false */
  disabled?: boolean;
}

/** Public forward-ref type for Tag. */
export type TagComponent = ForwardRefExoticComponent<TagProps & RefAttributes<HTMLElement>>;

declare const Tag: TagComponent;

export default Tag;
