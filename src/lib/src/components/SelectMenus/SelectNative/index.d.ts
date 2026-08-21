import type { ChangeEventHandler, MouseEventHandler, ReactNode, SelectHTMLAttributes } from "react";

/** A selectable option rendered by `SelectNative`. */
export interface SelectNativeOption {
  value: string | number;
  label: ReactNode;
}

/** Props for the native select wrapper. */
export interface SelectNativeProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children" | "disabled" | "name" | "onChange" | "onClick"
> {
  data?: SelectNativeOption[];
  name?: string;
  tooltip?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onClick?: MouseEventHandler<HTMLSelectElement>;
}

declare const SelectNative: (props: SelectNativeProps) => JSX.Element;

export default SelectNative;
