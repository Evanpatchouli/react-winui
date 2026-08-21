/**
 * CSS custom-property references for the react-winui elevation tokens.
 * The CSS stylesheet must be loaded before these references are used.
 */
export declare const Shadows: {
  readonly none: "var(--rwu-shadow-none)";
  readonly shadow2: "var(--rwu-shadow-2)";
  readonly shadow4: "var(--rwu-shadow-4)";
  readonly shadow8: "var(--rwu-shadow-8)";
  readonly shadow16: "var(--rwu-shadow-16)";
  readonly shadow28: "var(--rwu-shadow-28)";
  readonly shadow64: "var(--rwu-shadow-64)";
  readonly flyout: "var(--rwu-shadow-flyout)";
  readonly flyoutNested: "var(--rwu-shadow-flyout-nested)";
  readonly dialog: "var(--rwu-shadow-dialog)";
  readonly alert: "var(--rwu-shadow-alert)";
};

export type ShadowName = keyof typeof Shadows;
export type ShadowToken = (typeof Shadows)[ShadowName];
