/**
 * CSS custom-property references for the react-winui elevation tokens.
 *
 * The Sass/CSS token layer remains the source of truth. These references are
 * intended for React inline styles and other JavaScript-facing CSS APIs.
 */
export const Shadows = {
  /** CSS reference to no shadow. */
  none: "var(--rwu-shadow-none)",
  /** CSS reference to the smallest elevation shadow. */
  shadow2: "var(--rwu-shadow-2)",
  /** CSS reference to the small elevation shadow. */
  shadow4: "var(--rwu-shadow-4)",
  /** CSS reference to the Tooltip-sized elevation shadow. */
  shadow8: "var(--rwu-shadow-8)",
  /** CSS reference to the medium elevation shadow. */
  shadow16: "var(--rwu-shadow-16)",
  /** CSS reference to the large elevation shadow. */
  shadow28: "var(--rwu-shadow-28)",
  /** CSS reference to the largest elevation shadow. */
  shadow64: "var(--rwu-shadow-64)",
  /** CSS reference to the existing Flyout shadow. */
  flyout: "var(--rwu-shadow-flyout)",
  /** CSS reference to the existing nested Flyout shadow. */
  flyoutNested: "var(--rwu-shadow-flyout-nested)",
  /** CSS reference to the existing Dialog shadow. */
  dialog: "var(--rwu-shadow-dialog)",
  /** CSS reference to the existing Alert shadow. */
  alert: "var(--rwu-shadow-alert)"
} as const;

export type ShadowName = keyof typeof Shadows;
export type ShadowToken = (typeof Shadows)[ShadowName];
