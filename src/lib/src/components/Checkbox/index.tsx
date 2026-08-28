import { forwardRef } from "react";
import type {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode
} from "react";
import SelectionControl from "../_common/SelectionControl";

/** Props for the Windows-styled checkbox component. */
export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
> {
  /** @deprecated Checkbox always renders an input with type="checkbox". */
  type?: HTMLInputTypeAttribute;
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
  label?: ReactNode;
  tooltip?: string;
  indeterminate?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    className,
    indeterminate,
    label,
    title,
    tooltip,
    type: _legacyType,
    ...inputProps
  } = props;

  return (
    <label>
      <SelectionControl
        {...inputProps}
        className={className ? `ui-checkbox ${className}` : "ui-checkbox"}
        indeterminate={indeterminate}
        ref={ref}
        type="checkbox"
        title={tooltip ?? title}
      />
      {label && <span> {label}</span>}
    </label>
  );
});

export default Checkbox;
