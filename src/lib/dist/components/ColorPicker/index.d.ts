import type { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react";

/** A named preset in the picker. */
export interface ColorPickerPreset {
  /** Six-digit sRGB color, including the leading hash. */
  value: string;
  /** Accessible name for the swatch. */
  label: string;
}

/** Props for a group of preset swatches and a native custom color picker. */
export interface ColorPickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "defaultValue" | "onChange"
> {
  /** Controlled color in #rrggbb format. */
  value?: string;
  /** Initial uncontrolled color. Defaults to black. */
  defaultValue?: string;
  /** Called with the lowercase hex color when the selection changes. */
  onValueChange?: (value: string) => void;
  /** Optional named colors displayed before the custom color control. */
  presets?: readonly ColorPickerPreset[];
  /** Accessible name for the native picker. Defaults to "Custom color". */
  customColorLabel?: string;
  /** Disables all preset and custom color inputs. */
  disabled?: boolean;
}

declare const ColorPicker: ForwardRefExoticComponent<
  ColorPickerProps & RefAttributes<HTMLDivElement>
>;
export default ColorPicker;
