import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { InputHTMLAttributes } from "react";

export type SelectionControlType = "checkbox" | "radio";

export interface SelectionControlProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: SelectionControlType;
  indeterminate?: boolean;
}

const SelectionControl = forwardRef<HTMLInputElement, SelectionControlProps>(
  ({ className, indeterminate = false, type = "checkbox", ...inputProps }, forwardedRef) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = type === "checkbox" && indeterminate;
      }
    }, [indeterminate, type]);

    const controlClassName = ["ui-selection-control", `ui-selection-control-${type}`, className]
      .filter(Boolean)
      .join(" ");

    return <input {...inputProps} className={controlClassName} ref={inputRef} type={type} />;
  }
);

SelectionControl.displayName = "SelectionControl";

export default SelectionControl;
