import { forwardRef, useId, useState } from "react";
import type {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode
} from "react";

/** Numeric values committed by `NumberBox`. `null` represents an empty input. */
export type NumberBoxValue = number | null;

/** User events that can commit a `NumberBox` value. */
export type NumberBoxValueChangeEvent =
  FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>;

/** Callback invoked when a parsed, clamped value is committed. */
export type NumberBoxValueChangeHandler = (
  value: NumberBoxValue,
  event: NumberBoxValueChangeEvent
) => void;

/** Props for the Windows-styled numeric spinbutton. */
export interface NumberBoxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultValue" | "max" | "min" | "onChange" | "step" | "type" | "value"
> {
  /** Controlled numeric value. Use `null` for an empty input. */
  value?: NumberBoxValue;
  /** Initial numeric value when `value` is uncontrolled. @default null */
  defaultValue?: NumberBoxValue;
  /** Smallest value accepted on commit. */
  min?: number;
  /** Largest value accepted on commit. */
  max?: number;
  /** Amount applied by Arrow keys and the spin buttons. @default 1 */
  step?: number;
  /** Amount applied by Page Up and Page Down. @default step * 10 */
  largeStep?: number;
  /** Decimal places used for rounding. By default this is inferred from `step`. */
  precision?: number;
  /** Called when Enter, blur, keyboard stepping, or a spin button commits a new value. */
  onValueChange?: NumberBoxValueChangeHandler;
  /** Called for every direct text edit before parsing and commit. */
  onTextChange?: (text: string, event: ChangeEvent<HTMLInputElement>) => void;
  /** Optional visible label associated with the spinbutton. */
  label?: ReactNode;
  /** Shows the inline increment and decrement buttons. @default true */
  showSpinButtons?: boolean;
  /** Accessible name for the increment button. @default "Increment" */
  incrementButtonAriaLabel?: string;
  /** Accessible name for the decrement button. @default "Decrement" */
  decrementButtonAriaLabel?: string;
  /** Extra class applied to the outer field wrapper. */
  rootClassName?: string;
}

interface DraftValue {
  baseValue: NumberBoxValue;
  precision: number;
  text: string;
}

const DECIMAL_NUMBER_PATTERN = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/;
const MAX_PRECISION = 15;

const normalizeValue = (value: NumberBoxValue | undefined): NumberBoxValue =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

const normalizeBound = (value: number | undefined): number | undefined =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;

const decimalPlaces = (value: number): number => {
  const [, fraction = "", exponentText] =
    Math.abs(value)
      .toString()
      .match(/^(?:\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/i) ?? [];
  const exponent = Number(exponentText ?? 0);

  return Math.min(MAX_PRECISION, Math.max(0, fraction.length - exponent));
};

const valuesEqual = (first: NumberBoxValue, second: NumberBoxValue): boolean => first === second;

const NumberBox = forwardRef<HTMLInputElement, NumberBoxProps>(
  (
    {
      "aria-invalid": ariaInvalid,
      className,
      decrementButtonAriaLabel = "Decrement",
      defaultValue = null,
      disabled = false,
      form,
      id,
      incrementButtonAriaLabel = "Increment",
      inputMode,
      label,
      largeStep,
      max,
      min,
      name,
      onBlur,
      onFocus,
      onKeyDown,
      onTextChange,
      onValueChange,
      precision,
      readOnly = false,
      required = false,
      rootClassName,
      showSpinButtons = true,
      step = 1,
      value: valueProp,
      ...inputProps
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? `rwu-number-box-${generatedId}`;
    const resolvedMin = normalizeBound(min);
    const resolvedMax = normalizeBound(max);
    const resolvedStep = Number.isFinite(step) && step > 0 ? step : 1;
    const resolvedLargeStep =
      typeof largeStep === "number" && Number.isFinite(largeStep) && largeStep > 0
        ? largeStep
        : resolvedStep * 10;
    const resolvedPrecision = Math.min(
      MAX_PRECISION,
      Math.max(
        0,
        precision === undefined || !Number.isFinite(precision)
          ? decimalPlaces(resolvedStep)
          : Math.trunc(precision)
      )
    );
    const isControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState<NumberBoxValue>(() =>
      normalizeValue(defaultValue)
    );
    const committedValue = isControlled ? normalizeValue(valueProp) : uncontrolledValue;

    const roundValue = (value: number): number => Number(Number(value).toFixed(resolvedPrecision));

    const clampValue = (value: number): number => {
      if (resolvedMin !== undefined && resolvedMax !== undefined && resolvedMin > resolvedMax) {
        return roundValue(value);
      }

      return roundValue(
        Math.min(
          resolvedMax ?? Number.POSITIVE_INFINITY,
          Math.max(resolvedMin ?? Number.NEGATIVE_INFINITY, value)
        )
      );
    };

    const formatValue = (value: NumberBoxValue): string => {
      if (value === null) {
        return "";
      }

      const roundedValue = roundValue(value);
      return precision === undefined
        ? String(roundedValue)
        : roundedValue.toFixed(resolvedPrecision);
    };

    const [draft, setDraft] = useState<DraftValue>(() => ({
      baseValue: committedValue,
      precision: resolvedPrecision,
      text: formatValue(committedValue)
    }));
    const displayText =
      valuesEqual(draft.baseValue, committedValue) && draft.precision === resolvedPrecision
        ? draft.text
        : formatValue(committedValue);

    const parseText = (text: string): NumberBoxValue | undefined => {
      const trimmedText = text.trim();
      if (trimmedText === "") {
        return null;
      }

      if (!DECIMAL_NUMBER_PATTERN.test(trimmedText)) {
        return undefined;
      }

      const parsedValue = Number(trimmedText);
      return Number.isFinite(parsedValue) ? parsedValue : undefined;
    };

    const parsedDraft = parseText(displayText);
    const isOutsideBounds =
      typeof parsedDraft === "number" &&
      ((resolvedMin !== undefined && parsedDraft < resolvedMin) ||
        (resolvedMax !== undefined && parsedDraft > resolvedMax));
    const isInvalid =
      parsedDraft === undefined || isOutsideBounds || (required && parsedDraft === null);
    const ariaValue = typeof parsedDraft === "number" ? parsedDraft : committedValue;
    const steppingValue = parsedDraft === undefined ? committedValue : parsedDraft;
    const incrementDisabled =
      disabled ||
      readOnly ||
      (typeof steppingValue === "number" &&
        resolvedMax !== undefined &&
        steppingValue >= resolvedMax);
    const decrementDisabled =
      disabled ||
      readOnly ||
      (typeof steppingValue === "number" &&
        resolvedMin !== undefined &&
        steppingValue <= resolvedMin);

    const resetDraft = () => {
      setDraft({
        baseValue: committedValue,
        precision: resolvedPrecision,
        text: formatValue(committedValue)
      });
    };

    const commitValue = (nextValue: NumberBoxValue, event: NumberBoxValueChangeEvent) => {
      const normalizedNextValue = nextValue === null ? null : clampValue(nextValue);

      setDraft({
        baseValue: normalizedNextValue,
        precision: resolvedPrecision,
        text: formatValue(normalizedNextValue)
      });

      if (valuesEqual(normalizedNextValue, committedValue)) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue(normalizedNextValue);
      }

      onValueChange?.(normalizedNextValue, event);
    };

    const commitDraft = (event: NumberBoxValueChangeEvent) => {
      const parsedValue = parseText(displayText);
      if (parsedValue === undefined) {
        resetDraft();
        return;
      }

      commitValue(parsedValue, event);
    };

    const stepValue = (
      direction: 1 | -1,
      amount: number,
      event: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>
    ) => {
      const parsedValue = parseText(displayText);
      const currentValue = parsedValue === undefined ? committedValue : parsedValue;
      const baseValue = currentValue ?? resolvedMin ?? 0;
      commitValue(baseValue + amount * direction, event);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const nextText = event.currentTarget.value;
      setDraft({ baseValue: committedValue, precision: resolvedPrecision, text: nextText });
      onTextChange?.(nextText, event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
      if (!event.defaultPrevented && !disabled && !readOnly) {
        commitDraft(event);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (
        event.defaultPrevented ||
        disabled ||
        readOnly ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          stepValue(1, resolvedStep, event);
          return;
        case "ArrowDown":
          event.preventDefault();
          stepValue(-1, resolvedStep, event);
          return;
        case "PageUp":
          event.preventDefault();
          stepValue(1, resolvedLargeStep, event);
          return;
        case "PageDown":
          event.preventDefault();
          stepValue(-1, resolvedLargeStep, event);
          return;
        case "Home":
          if (!event.shiftKey && resolvedMin !== undefined) {
            event.preventDefault();
            commitValue(resolvedMin, event);
          }
          return;
        case "End":
          if (!event.shiftKey && resolvedMax !== undefined) {
            event.preventDefault();
            commitValue(resolvedMax, event);
          }
          return;
        case "Enter":
          event.preventDefault();
          commitDraft(event);
          return;
        case "Escape":
          if (displayText !== formatValue(committedValue)) {
            event.preventDefault();
            resetDraft();
          }
      }
    };

    const handleIncrement = (event: MouseEvent<HTMLButtonElement>) => {
      stepValue(1, resolvedStep, event);
    };

    const handleDecrement = (event: MouseEvent<HTMLButtonElement>) => {
      stepValue(-1, resolvedStep, event);
    };

    return (
      <div
        className={[
          "ui-number-box-field",
          disabled ? "ui-number-box-disabled" : "",
          readOnly ? "ui-number-box-readonly" : "",
          isInvalid ? "ui-number-box-invalid" : "",
          rootClassName
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label !== null && label !== undefined ? (
          <label className="ui-number-box-label" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        <span className="ui-number-box">
          <input
            {...inputProps}
            ref={ref}
            aria-invalid={isInvalid ? true : ariaInvalid}
            aria-valuemax={resolvedMax}
            aria-valuemin={resolvedMin}
            aria-valuenow={ariaValue ?? undefined}
            className={["ui-number-box-input", className].filter(Boolean).join(" ")}
            disabled={disabled}
            form={form}
            id={inputId}
            inputMode={inputMode ?? "decimal"}
            readOnly={readOnly}
            required={required}
            role="spinbutton"
            type="text"
            value={displayText}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={onFocus}
            onKeyDown={handleKeyDown}
          />
          {showSpinButtons ? (
            <span className="ui-number-box-buttons">
              <button
                aria-label={incrementButtonAriaLabel}
                className="ui-number-box-button ui-number-box-increment"
                disabled={incrementDisabled}
                tabIndex={-1}
                type="button"
                onClick={handleIncrement}
                onPointerDown={(event) => event.preventDefault()}
              >
                <span aria-hidden="true" className="ui-number-box-chevron" />
              </button>
              <button
                aria-label={decrementButtonAriaLabel}
                className="ui-number-box-button ui-number-box-decrement"
                disabled={decrementDisabled}
                tabIndex={-1}
                type="button"
                onClick={handleDecrement}
                onPointerDown={(event) => event.preventDefault()}
              >
                <span aria-hidden="true" className="ui-number-box-chevron" />
              </button>
            </span>
          ) : null}
        </span>
        {name ? (
          <input
            disabled={disabled}
            form={form}
            name={name}
            type="hidden"
            value={committedValue === null ? "" : String(committedValue)}
          />
        ) : null}
      </div>
    );
  }
);

NumberBox.displayName = "NumberBox";

export default NumberBox;
