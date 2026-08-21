import { forwardRef } from "react";
import type {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode
} from "react";

/** Props for the Windows-styled checkbox component. */
export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> {
  type?: HTMLInputTypeAttribute;
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
  label?: ReactNode;
  tooltip?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  return (
    <label>
      <input
        ref={ref}
        className="ui-checkbox"
        {...props}
        type="checkbox"
        name={props.name}
        value={props.value}
        title={props.tooltip}
        disabled={props.disabled}
        onChange={props.onChange}
        defaultChecked={props.defaultChecked}
      />
      {props.label && <span> {props.label}</span>}
    </label>
  );
});

export default Checkbox;
