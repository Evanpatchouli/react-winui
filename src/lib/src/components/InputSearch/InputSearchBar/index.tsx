import { forwardRef } from "react";
import type {
  CSSProperties,
  InputHTMLAttributes,
  ForwardRefExoticComponent,
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

const noopSubmit: InputSearchSubmitHandler = () => {};

const InputSearchBar: ForwardRefExoticComponent<
  InputSearchBarProps & RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, InputSearchBarProps>(
  ({ width, tooltip, onSubmit = noopSubmit, ...otherProps }, ref) => {
    return (
      <div className="ui-input-search-bar" title={tooltip}>
        <input
          className="ui-input-text"
          {...otherProps}
          ref={ref}
          type="search"
          name={otherProps.name}
          value={otherProps.value}
          onClick={otherProps.onClick}
          disabled={otherProps.disabled}
          onChange={otherProps.onChange}
          style={{ width }}
          placeholder={otherProps.placeholder}
        />
        <div className="ui-input-end-content">
          <button type="submit" onClick={() => onSubmit(otherProps.value)} />
        </div>
      </div>
    );
  }
);

InputSearchBar.defaultProps = {
  onSubmit: noopSubmit,
  placeholder: "Search here.."
};

export default InputSearchBar;
