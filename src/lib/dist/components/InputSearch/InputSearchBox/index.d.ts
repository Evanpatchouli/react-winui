import type {
  ChangeEventHandler,
  CSSProperties,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  RefAttributes
} from "react";

export interface InputSearchSuggestion {
  text: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

export interface InputSearchBoxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "style" | "type"
> {
  width?: CSSProperties["width"];
  suggest?: InputSearchSuggestion[];
  tooltip?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

declare const InputSearchBox: ForwardRefExoticComponent<
  InputSearchBoxProps & RefAttributes<HTMLInputElement>
>;

export default InputSearchBox;
