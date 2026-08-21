import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import type {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode
} from "react";
import LoaderBusyWrapper from "../_common/LoaderBusyWrapper";

/** Status values rendered in the input's trailing content area. */
export type InputTextStatus = "default" | "success" | "danger" | "loading";

/** Props for the Windows-styled text input component. */
export interface InputTextProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  label?: ReactNode;
  tooltip?: string;
  clearButton?: boolean;
  width?: CSSProperties["width"];
  onClearButtonClick?: () => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  setStatus?: InputTextStatus;
  type?: HTMLInputTypeAttribute | (string & {});
}

const noop = () => {};

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      onClearButtonClick = noop,
      clearButton,
      setStatus = "default",
      onChange = noop,
      tooltip,
      label,
      type = "text",
      width,
      placeholder = "Input Text",
      name,
      value,
      ...otherProps
    },
    ref
  ) => {
    const inputTxtRef = useRef<HTMLInputElement>(null);
    const clrBtnRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => inputTxtRef.current!, [ref]);

    const renderLabel = () => <span className="ui-input-label">{label}</span>;

    const toggleInput = () => {
      const input = inputTxtRef.current;

      if (!input) {
        return;
      }

      input.type = input.type === "text" ? "password" : "text";
    };

    const RenderPassToggler = () =>
      type === "password" ? <button data-win-toggle="password" onClick={toggleInput} /> : null;

    const renderStatus = useMemo(() => {
      if (setStatus === "success" || setStatus === "danger") {
        return <i className="icons10-status" />;
      }

      if (setStatus === "loading") {
        return (
          <div className="ui-loader-busy loader-sm animate">
            <LoaderBusyWrapper />
          </div>
        );
      }

      return null;
    }, [setStatus]);

    const clearTxt = useCallback(() => {
      if (inputTxtRef.current) {
        inputTxtRef.current.value = "";
      }

      clrBtnRef.current?.classList.remove("show");

      // Preserve the legacy clear-button event shape used by existing consumers.
      const event = { target: { value: "" } } as ChangeEvent<HTMLInputElement>;
      onChange(event);
      onClearButtonClick();
    }, [onChange, onClearButtonClick]);

    const renderClearButton = useMemo(
      () =>
        clearButton ? (
          <button ref={clrBtnRef} type="button" onClick={clearTxt} data-win-clear="text" />
        ) : null,
      [clearButton, clearTxt]
    );

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange(event);

      if (clearButton) {
        const clearButtonElement = clrBtnRef.current;

        if (!clearButtonElement || !inputTxtRef.current) {
          return;
        }

        inputTxtRef.current.value !== ""
          ? clearButtonElement.classList.add("show")
          : clearButtonElement.classList.remove("show");
      }
    };

    return (
      <div
        className={`ui-input-container ${setStatus !== "default" ? `input-${setStatus}` : ""}`}
        title={tooltip}
      >
        {label && renderLabel()}
        <input
          className="ui-input-text"
          {...otherProps}
          ref={inputTxtRef}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          style={{ width }}
        />
        <div className="ui-input-end-content">
          {renderClearButton}
          {renderStatus}
          <RenderPassToggler />
        </div>
      </div>
    );
  }
);

export default InputText;
