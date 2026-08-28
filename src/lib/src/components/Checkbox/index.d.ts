import type {
  ChangeEventHandler,
  ForwardRefExoticComponent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  RefAttributes
} from "react";

/** Props for the Windows-styled checkbox component. */
export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> {
  /** @deprecated Checkbox always renders an input with type="checkbox". */
  type?: HTMLInputTypeAttribute;
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
  label?: ReactNode;
  tooltip?: string;
  indeterminate?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

declare const Checkbox: ForwardRefExoticComponent<CheckboxProps & RefAttributes<HTMLInputElement>>;

export default Checkbox;
