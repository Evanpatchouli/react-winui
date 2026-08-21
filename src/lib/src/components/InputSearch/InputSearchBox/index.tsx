import { forwardRef, useRef, useState } from "react";
import type {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  RefAttributes
} from "react";

/** An item rendered in the InputSearchBox suggestion list. */
export interface InputSearchSuggestion {
  text: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLSpanElement>;
}

/** Props for the Windows-styled search input with suggestions. */
export interface InputSearchBoxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "style" | "type"
> {
  width?: CSSProperties["width"];
  suggest?: InputSearchSuggestion[];
  tooltip?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const noopChange: ChangeEventHandler<HTMLInputElement> = () => {};

const InputSearchBox: ForwardRefExoticComponent<
  InputSearchBoxProps & RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, InputSearchBoxProps>(
  (
    {
      width,
      suggest = [],
      tooltip,
      onChange = noopChange,
      placeholder = "Search here..",
      ...otherProps
    },
    ref
  ) => {
    const suggestRef = useRef<HTMLUListElement>(null);
    const [suggestData, setSuggestData] = useState(suggest);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const listSuggest = suggestRef.current;

      if (listSuggest) {
        listSuggest.className = !event.target.value || !listSuggest.hasChildNodes() ? "" : "show";
      }

      onChange(event);

      const filteredData = suggest.filter((data) =>
        data.text.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setSuggestData(filteredData);
    };

    return (
      <div className="ui-input-search-box" title={tooltip}>
        <input
          className="ui-input-text"
          style={{ width }}
          ref={ref}
          {...otherProps}
          type="search"
          name={otherProps.name}
          value={otherProps.value}
          onClick={otherProps.onClick}
          placeholder={placeholder}
          disabled={otherProps.disabled}
          onChange={handleChange}
        />
        <ul ref={suggestRef} style={{ width }}>
          {suggestData.map((item) => (
            <li className="option" key={item.text}>
              <span onClick={item.onClick}>
                {item.icon}
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default InputSearchBox;
