import type {
  ChangeEventHandler,
  ForwardRefExoticComponent,
  RefAttributes,
  TextareaHTMLAttributes,
  UIEventHandler
} from "react";

/** Supported textarea resize class variants. */
export type TextAreaResize = "both" | "none" | "horizontal" | "vertical";

/** Props for the Windows-styled multi-line text input component. */
export interface TextAreaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "rows" | "cols" | "value" | "defaultValue" | "onChange" | "onResize"
> {
  value?: TextareaHTMLAttributes<HTMLTextAreaElement>["value"];
  defaultValue?: TextareaHTMLAttributes<HTMLTextAreaElement>["defaultValue"];
  tooltip?: string;
  resizer?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onResize?: UIEventHandler<HTMLTextAreaElement>;
  rows?: string | number;
  cols?: string | number;
  resize?: TextAreaResize;
}

declare const TextArea: ForwardRefExoticComponent<
  TextAreaProps & RefAttributes<HTMLTextAreaElement>
>;

export default TextArea;
