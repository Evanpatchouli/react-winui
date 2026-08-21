import type { ChangeEventHandler, CSSProperties, InputHTMLAttributes } from "react";

/** Props for an individual radio-style color swatch. */
export interface ColorPickerItemProps {
  name?: InputHTMLAttributes<HTMLInputElement>["name"];
  color?: string;
  disabled?: InputHTMLAttributes<HTMLInputElement>["disabled"];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  defaultChecked?: InputHTMLAttributes<HTMLInputElement>["defaultChecked"];
}

declare const ColorPickerItem: (props: ColorPickerItemProps) => JSX.Element;

export default ColorPickerItem;
