import { forwardRef } from "react";
import type {
  ChangeEventHandler,
  CSSProperties,
  HTMLInputTypeAttribute,
  InputHTMLAttributes
} from "react";

/** Props for the Windows-styled switch component. */
export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  type?: HTMLInputTypeAttribute;
  label?: boolean;
  tooltip?: string;
  labelOn?: string;
  labelOff?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  labelPosition?: "start" | "end";
  labelFixedWidth?: CSSProperties["width"];
}

const noop: ChangeEventHandler<HTMLInputElement> = () => {};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      tooltip,
      disabled,
      label = true,
      labelOn = "On",
      labelOff = "Off",
      defaultChecked,
      labelFixedWidth,
      onChange = noop,
      labelPosition = "end",
      ...otherProps
    },
    ref
  ) => {
    return (
      <label className="ui-switch-container" title={tooltip}>
        {label && labelPosition === "start" && (
          <span
            className="ui-switch-label"
            data-on={labelOn}
            data-off={labelOff}
            style={{ width: labelFixedWidth }}
          />
        )}

        <input
          ref={ref}
          {...otherProps}
          type="checkbox"
          className="ui-switch"
          disabled={disabled}
          onChange={onChange}
          defaultChecked={defaultChecked}
        />

        {label && labelPosition === "end" && (
          <span
            className="ui-switch-label"
            data-on={labelOn}
            data-off={labelOff}
            style={{ width: labelFixedWidth }}
          />
        )}
      </label>
    );
  }
);

export default Switch;
