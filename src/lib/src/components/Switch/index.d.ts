import type {
  ChangeEventHandler,
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  RefAttributes
} from "react";

/** Props for the Windows-styled switch component. */
export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  type?: HTMLInputTypeAttribute;
  label?: boolean;
  tooltip?: string;
  labelOn?: string;
  labelOff?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  labelPosition?: "start" | "end";
  labelFixedWidth?: CSSProperties["width"];
}

declare const Switch: ForwardRefExoticComponent<SwitchProps & RefAttributes<HTMLInputElement>>;

export default Switch;
