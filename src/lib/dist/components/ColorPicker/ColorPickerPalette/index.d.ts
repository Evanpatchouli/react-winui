import type { ChangeEventHandler, CSSProperties, InputHTMLAttributes } from "react";

/** Props for the native color-picker palette control. */
export interface ColorPickerPaletteProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange" | "onChangeCapture"
> {
  color?: string;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

declare const ColorPickerPalette: (props: ColorPickerPaletteProps) => JSX.Element;

export default ColorPickerPalette;
