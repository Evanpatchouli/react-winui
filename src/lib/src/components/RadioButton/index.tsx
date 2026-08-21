import { forwardRef } from "react";
import type {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode
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

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
  const { name, value, label, tooltip, disabled, onChange, defaultChecked, ...otherProps } = props;

  return (
    <label title={tooltip}>
      <input
        ref={ref}
        {...otherProps}
        className="ui-radio-btn"
        type="radio"
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
      {label && <span> {label}</span>}
    </label>
  );
});

export default RadioButton;
