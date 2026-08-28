import { forwardRef } from "react";
import type {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode
} from "react";
import SelectionControl from "../_common/SelectionControl";

/** Props for the Windows-styled radio button component. */
export interface RadioButtonProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> {
  /** @deprecated RadioButton always renders an input with type="radio". */
  type?: HTMLInputTypeAttribute;
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
  label?: ReactNode;
  tooltip?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
  const {
    className,
    defaultChecked,
    disabled,
    label,
    name,
    onChange,
    title,
    tooltip,
    type: _legacyType,
    value,
    ...otherProps
  } = props;

  return (
    <label title={tooltip}>
      <SelectionControl
        {...otherProps}
        className={className ? `ui-radio-btn ${className}` : "ui-radio-btn"}
        defaultChecked={defaultChecked}
        disabled={disabled}
        ref={ref}
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        title={title}
      />
      {label && <span> {label}</span>}
    </label>
  );
});

export default RadioButton;
