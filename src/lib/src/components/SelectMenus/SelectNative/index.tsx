import type {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  ReactNode,
  SelectHTMLAttributes
} from "react";

/** A selectable option rendered by `SelectNative`. */
export interface SelectNativeOption {
  value: string | number;
  label: ReactNode;
}

/** Props for the native select wrapper. */
export interface SelectNativeProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children" | "disabled" | "name" | "onChange" | "onClick"
> {
  data?: SelectNativeOption[];
  name?: string;
  tooltip?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onClick?: MouseEventHandler<HTMLSelectElement>;
}

const SelectNative: FC<SelectNativeProps> = ({
  data = [],
  name,
  tooltip,
  disabled,
  onChange,
  onClick,
  ...otherProps
}) => {
  return (
    <select
      className="ui-menu-title"
      {...otherProps}
      name={name}
      title={tooltip}
      onClick={onClick}
      disabled={disabled}
      onChange={onChange}
    >
      {data.map((item) => (
        <option value={item.value} key={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

SelectNative.defaultProps = {
  data: []
};

export default SelectNative;
