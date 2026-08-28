import type {
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  RefAttributes,
  SyntheticEvent
} from "react";

/** A normalized single-date value. `null` represents an empty Calendar. */
export type CalendarValue = Date | null;

/** Weekday indexes use the JavaScript convention: Sunday `0` through Saturday `6`. */
export type CalendarFirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Events that can commit a Calendar selection or navigate its visible month. */
export type CalendarInteractionEvent = Event | SyntheticEvent<HTMLElement>;

/** Callback invoked when a selectable day is committed. */
export type CalendarValueChangeHandler = (
  value: CalendarValue,
  event: CalendarInteractionEvent
) => void;

/** Callback invoked when the visible month changes. */
export type CalendarPickerDateChangeHandler = (
  value: Date,
  event: CalendarInteractionEvent
) => void;

/** Props for the Windows-styled standalone date calendar. */
export interface CalendarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "defaultValue" | "id" | "onKeyDown" | "role" | "style"
> {
  /** Controlled selected date. Use `null` for an empty calendar. */
  value?: CalendarValue;
  /** Initial selected date when `value` is uncontrolled. @default null */
  defaultValue?: CalendarValue;
  /** Called when a selectable day or Today is committed. */
  onValueChange?: CalendarValueChangeHandler;
  /** Controlled visible month. Any day in the date selects its month. */
  pickerDate?: Date;
  /** Initial visible month when `pickerDate` is uncontrolled. */
  defaultPickerDate?: Date;
  /** Month shown when no selected date or picker date is supplied. */
  initialPickerDate?: Date;
  /** Called when month navigation requests a new visible month. */
  onPickerDateChange?: CalendarPickerDateChangeHandler;
  /** Stable date used for the today highlight; defaults to the client date. */
  today?: Date;
  /** Locale used by the default month, weekday, and date formatters. */
  locale?: string;
  /** First weekday in the calendar grid. @default 0 */
  firstDayOfWeek?: CalendarFirstDayOfWeek;
  /** Smallest selectable date, inclusive. */
  minDate?: Date;
  /** Largest selectable date, inclusive. */
  maxDate?: Date;
  /** Dates that remain visible but cannot be selected. */
  restrictedDates?: Date[];
  /** Adds a footer button that selects the `today` date. @default true */
  showTodayButton?: boolean;
  /** Accessible name for the calendar. @default "Calendar" */
  calendarAriaLabel?: string;
  /** Accessible name for the previous-month button. @default "Previous month" */
  previousMonthAriaLabel?: string;
  /** Accessible name for the next-month button. @default "Next month" */
  nextMonthAriaLabel?: string;
  /** Visible label for the Today action. @default "Today" */
  todayButtonLabel?: string;
  /** Visible label associated with the calendar surface. */
  label?: ReactNode;
  /** Native disabled state for the calendar surface. */
  disabled?: boolean;
  /** Extra class applied to the outer Calendar wrapper. */
  rootClassName?: string;
  /** Optional root id; generated when omitted. */
  id?: string;
  /** Optional inline styles for the root element. */
  style?: CSSProperties;
  /** Optional accessible name override from HTML attributes. */
  "aria-label"?: string;
  /** Optional labelled-by override from HTML attributes. */
  "aria-labelledby"?: string;
  /** Native root keydown handler. */
  onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
}

declare const Calendar: ForwardRefExoticComponent<CalendarProps & RefAttributes<HTMLDivElement>>;

export default Calendar;
