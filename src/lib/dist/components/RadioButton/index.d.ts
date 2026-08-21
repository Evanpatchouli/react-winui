import type {
  ChangeEventHandler,
  ForwardRefExoticComponent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  RefAttributes
} from "react";

/** Props for the Windows-styled radio button component. */
export interface RadioButtonProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> {
  type?: HTMLInputTypeAttribute;
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
  label?: ReactNode;
  tooltip?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

declare const RadioButton: ForwardRefExoticComponent<
  RadioButtonProps & RefAttributes<HTMLInputElement>
>;

export default RadioButton;
