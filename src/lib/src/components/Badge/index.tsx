import { forwardRef } from "react";
import type { ForwardRefExoticComponent, HTMLAttributes, ReactNode, RefAttributes } from "react";

/** Visual surface used by a Badge. */
export type BadgeAppearance = "filled" | "ghost" | "outline" | "tint";

/** Semantic tone used by a Badge. */
export type BadgeColor =
  "brand" | "danger" | "important" | "informative" | "severe" | "subtle" | "success" | "warning";

/** Position of the optional Badge icon relative to its content. */
export type BadgeIconPosition = "before" | "after";

/** Shape used by a Badge. */
export type BadgeShape = "circular" | "rounded" | "square";

/** Size used by a Badge. */
export type BadgeSize = "tiny" | "extra-small" | "small" | "medium" | "large" | "extra-large";

/** Props for a compact, non-interactive Windows-styled status Badge. */
export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "color"> {
  /** Optional short status text or numeric value. Omit it and `icon` to render a dot Badge. */
  children?: ReactNode;
  /** Visual surface for the Badge. @default "filled" */
  appearance?: BadgeAppearance;
  /** Semantic color used by the Badge. @default "brand" */
  color?: BadgeColor;
  /** Optional icon or decorative content. Icon-only Badges should provide an `aria-label`. */
  icon?: ReactNode;
  /** Places the icon before or after the content. @default "before" */
  iconPosition?: BadgeIconPosition;
  /** Shape of the Badge boundary. @default "circular" */
  shape?: BadgeShape;
  /** Badge diameter, height, and typography preset. @default "medium" */
  size?: BadgeSize;
}

/** Public forward-ref type for Badge. */
export type BadgeComponent = ForwardRefExoticComponent<BadgeProps & RefAttributes<HTMLSpanElement>>;

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      appearance = "filled",
      children,
      className,
      color = "brand",
      icon,
      iconPosition = "before",
      shape = "circular",
      size = "medium",
      ...rootProps
    },
    forwardedRef
  ) => {
    const hasChildren = children !== undefined && children !== null;
    const hasIcon = icon !== undefined && icon !== null;
    const badgeType = !hasChildren && !hasIcon ? "dot" : !hasChildren ? "icon" : "content";
    const iconContent = hasIcon ? (
      <span aria-hidden={hasChildren ? true : undefined} className="ui-badge-icon">
        {icon}
      </span>
    ) : null;

    return (
      <span
        {...rootProps}
        ref={forwardedRef}
        className={[
          "ui-badge",
          `ui-badge-appearance-${appearance}`,
          `ui-badge-color-${color}`,
          `ui-badge-shape-${shape}`,
          `ui-badge-size-${size}`,
          `ui-badge-type-${badgeType}`,
          className
        ]
          .filter(Boolean)
          .join(" ")}
        data-appearance={appearance}
        data-badge-type={badgeType}
        data-color={color}
        data-icon-position={iconPosition}
        data-rwu-component="badge"
        data-shape={shape}
        data-size={size}
      >
        {iconPosition === "before" ? iconContent : null}
        {hasChildren ? <span className="ui-badge-content">{children}</span> : null}
        {iconPosition === "after" ? iconContent : null}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
