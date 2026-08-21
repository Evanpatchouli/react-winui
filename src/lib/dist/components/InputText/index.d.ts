import type {
  ChangeEventHandler,
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  RefAttributes
} from "react";

/** Status values rendered in the input's trailing content area. */
export type InputTextStatus = "default" | "success" | "danger" | "loading";

/** Props for the Windows-styled text input component. */
export interface InputTextProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  label?: ReactNode;
  tooltip?: string;
  clearButton?: boolean;
  width?: CSSProperties["width"];
  onClearButtonClick?: () => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  setStatus?: InputTextStatus;
  type?: HTMLInputTypeAttribute | (string & {});
}

declare const InputText: ForwardRefExoticComponent<
  InputTextProps & RefAttributes<HTMLInputElement>
>;

export default InputText;
