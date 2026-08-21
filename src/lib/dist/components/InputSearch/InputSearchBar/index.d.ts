import type {
  CSSProperties,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  RefAttributes
} from "react";

/** The value passed to an InputSearchBar submit handler. */
export type InputSearchValue = InputHTMLAttributes<HTMLInputElement>["value"];

/** Callback invoked when the search button is pressed. */
export type InputSearchSubmitHandler = (value: InputSearchValue) => void;

/** Props for the Windows-styled search bar. */
export interface InputSearchBarProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onSubmit" | "style" | "type"
> {
  width?: CSSProperties["width"];
  tooltip?: string;
  onSubmit?: InputSearchSubmitHandler;
}

declare const InputSearchBar: ForwardRefExoticComponent<
  InputSearchBarProps & RefAttributes<HTMLInputElement>
>;

export default InputSearchBar;
