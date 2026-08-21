import { forwardRef } from "react";
import type {
  ChangeEventHandler,
  ForwardedRef,
  TextareaHTMLAttributes,
  UIEventHandler
} from "react";

/** Supported textarea resize class variants. */
export type TextAreaResize = "both" | "none" | "horizontal" | "vertical";

/** Props for the Windows-styled multi-line text input component. */
export interface TextAreaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "rows" | "cols" | "value" | "defaultValue" | "onChange" | "onResize"
> {
  value?: TextareaHTMLAttributes<HTMLTextAreaElement>["value"];
  defaultValue?: TextareaHTMLAttributes<HTMLTextAreaElement>["defaultValue"];
  tooltip?: string;
  resizer?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onResize?: UIEventHandler<HTMLTextAreaElement>;
  rows?: string | number;
  cols?: string | number;
  resize?: TextAreaResize;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      rows,
      cols,
      value,
      tooltip,
      resize,
      resizer = true,
      disabled,
      readOnly,
      onChange,
      onResize,
      placeholder = "Enter Here",
      defaultValue,
      ...otherProps
    },
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const resizeProps = { onResize };

    return (
      <textarea
        className={
          `ui-textarea` +
          `${resizer ? "" : " resizer-none"}` +
          `${
            resize === "none"
              ? " resize-none"
              : resize === "horizontal"
                ? " resize-horizontal"
                : resize === "vertical"
                  ? " resize-vertical"
                  : ""
          }`
        }
        {...otherProps}
        {...resizeProps}
        ref={ref}
        rows={rows as number | undefined}
        cols={cols as number | undefined}
        value={value}
        title={tooltip}
        disabled={disabled}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    );
  }
);

export default TextArea;
