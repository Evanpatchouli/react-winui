import type {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefAttributes,
  SyntheticEvent
} from "react";

/** A normalized calendar value. `null` represents an empty DatePicker. */
export type DatePickerValue = Date | null;

/** Events that can request a DatePicker visibility change. */
export type DatePickerOpenChangeEvent = Event | SyntheticEvent<HTMLElement>;

/** Callback invoked when the calendar popup requests a visibility change. */
export type DatePickerOpenChangeHandler = (
  open: boolean,
  event?: DatePickerOpenChangeEvent
) => void;

/** Events that can commit a DatePicker value. */
export type DatePickerValueChangeEvent = Event | SyntheticEvent<HTMLElement>;

/** Callback invoked when a valid date is committed or cleared. */
export type DatePickerValueChangeHandler = (
  value: DatePickerValue,
  event: DatePickerValueChangeEvent
) => void;

/** Errors reported when editable DatePicker text cannot be committed. */
export type DatePickerValidationError = "invalid-input" | "out-of-bounds" | "required-input";

/** Props for the Windows-styled single-date picker. */
export interface DatePickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "children"
  | "defaultValue"
  | "disabled"
  | "id"
  | "onBlur"
  | "onClick"
  | "onFocus"
  | "onKeyDown"
  | "readOnly"
  | "role"
  | "type"
  | "value"
> {
  value?: DatePickerValue;
  defaultValue?: DatePickerValue;
  onValueChange?: DatePickerValueChangeHandler;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: DatePickerOpenChangeHandler;
  allowTextInput?: boolean;
  onTextChange?: (text: string, event: ChangeEvent<HTMLInputElement>) => void;
  formatDate?: (date: Date) => string;
  parseDate?: (text: string) => Date | null;
  onValidationResult?: (error?: DatePickerValidationError) => void;
  locale?: string;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  minDate?: Date;
  maxDate?: Date;
  initialPickerDate?: Date;
  today?: Date;
  showTodayButton?: boolean;
  label?: ReactNode;
  placeholder?: string;
  tooltip?: string;
  calendarButtonAriaLabel?: string;
  calendarAriaLabel?: string;
  openOnClick?: boolean;
  closeOnSelect?: boolean;
  width?: CSSProperties["width"];
  rootClassName?: string;
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

declare const DatePicker: ForwardRefExoticComponent<
  DatePickerProps & RefAttributes<HTMLInputElement>
>;

export default DatePicker;
