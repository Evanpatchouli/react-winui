import { forwardRef } from "react";
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

const DismissIcon = () => (
  <svg aria-hidden="true" className="ui-tag-dismiss-svg" focusable="false" viewBox="0 0 16 16">
    <path
      d="m4 4 8 8m0-8-8 8"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
  </svg>
);

const Tag = forwardRef<HTMLElement, TagProps>(
  (
    {
      "aria-disabled": ariaDisabled,
      appearance = "filled",
      children,
      className,
      disabled = false,
      dismissible = false,
      icon,
      onDismiss,
      shape = "rounded",
      size = "medium",
      ...rootProps
    },
    forwardedRef
  ) => {
    const setRootRef = (element: HTMLElement | null) => {
      if (typeof forwardedRef === "function") {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
    };

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }

      onDismiss?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled || (event.key !== "Backspace" && event.key !== "Delete")) {
        return;
      }

      event.preventDefault();
      onDismiss?.(event);
    };

    const tagClassName = [
      "ui-tag",
      `ui-tag-appearance-${appearance}`,
      `ui-tag-shape-${shape}`,
      `ui-tag-size-${size}`,
      dismissible ? "ui-tag-interactive" : "",
      disabled ? "ui-tag-disabled" : "",
      className
    ]
      .filter(Boolean)
      .join(" ");
    const resolvedAriaDisabled = disabled ? "true" : ariaDisabled;
    const content = (
      <>
        {icon !== undefined ? (
          <span aria-hidden="true" className="ui-tag-icon">
            {icon}
          </span>
        ) : null}
        <span className="ui-tag-label">{children}</span>
        {dismissible ? (
          <span aria-hidden="true" className="ui-tag-dismiss-icon">
            <DismissIcon />
          </span>
        ) : null}
      </>
    );

    if (dismissible) {
      return (
        <button
          {...rootProps}
          ref={setRootRef}
          aria-disabled={resolvedAriaDisabled}
          className={tagClassName}
          data-appearance={appearance}
          data-dismissible="true"
          data-disabled={disabled ? "true" : undefined}
          data-shape={shape}
          data-size={size}
          disabled={disabled}
          type="button"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {content}
        </button>
      );
    }

    return (
      <span
        {...rootProps}
        ref={setRootRef}
        aria-disabled={resolvedAriaDisabled}
        className={tagClassName}
        data-appearance={appearance}
        data-dismissible="false"
        data-disabled={disabled ? "true" : undefined}
        data-shape={shape}
        data-size={size}
      >
        {content}
      </span>
    );
  }
);

Tag.displayName = "Tag";

export default Tag;
