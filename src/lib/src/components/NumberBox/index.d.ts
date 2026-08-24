import type {
  ChangeEvent,
  FocusEvent,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefAttributes
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

declare const NumberBox: ForwardRefExoticComponent<
  NumberBoxProps & RefAttributes<HTMLInputElement>
>;

export default NumberBox;
