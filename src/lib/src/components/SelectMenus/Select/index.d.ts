import type { FC, ReactNode } from "react";

/** The value type used by a custom Select option. */
export type SelectOptionValue = string | number;

/** An item rendered in the custom Select menu. */
export interface SelectOption {
  value: SelectOptionValue;
  label: ReactNode;
  icon?: ReactNode;
}

/** Callback invoked with the selected option value. */
export type SelectChangeHandler = (value: SelectOptionValue) => void;

/** Props for the Windows-styled custom Select menu. */
export interface SelectProps {
  data: SelectOption[];
  tooltip?: string;
  trigger?: ReactNode;
  defaultValue?: SelectOptionValue;
  onChange?: SelectChangeHandler;
  backdropBlur?: boolean;
}

declare const Select: FC<SelectProps>;

export default Select;
