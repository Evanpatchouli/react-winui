import { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type {
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
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

const CALENDAR_COLUMN_COUNT = 7;
const CALENDAR_ROW_COUNT = 6;
const MAX_DATE_SEARCH_DAYS = 3660;

const isValidDate = (value: Date | null | undefined): value is Date =>
  value instanceof Date && !Number.isNaN(value.getTime());

const normalizeDate = (value: Date | null | undefined): CalendarValue => {
  if (!isValidDate(value)) {
    return null;
  }

  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
};

const startOfMonth = (value: Date): Date => new Date(value.getFullYear(), value.getMonth(), 1);

const endOfMonth = (value: Date): Date => new Date(value.getFullYear(), value.getMonth() + 1, 0);

const addDays = (value: Date, amount: number): Date => {
  const next = new Date(value);
  next.setDate(next.getDate() + amount);
  return normalizeDate(next) ?? new Date(value);
};

const addMonths = (value: Date, amount: number): Date => {
  const day = value.getDate();
  const nextMonth = new Date(value.getFullYear(), value.getMonth() + amount, 1);
  const lastDay = endOfMonth(nextMonth).getDate();
  return new Date(nextMonth.getFullYear(), nextMonth.getMonth(), Math.min(day, lastDay));
};

const startOfWeek = (value: Date, firstDayOfWeek: CalendarFirstDayOfWeek): Date => {
  const offset = (value.getDay() - firstDayOfWeek + CALENDAR_COLUMN_COUNT) % CALENDAR_COLUMN_COUNT;
  return addDays(value, -offset);
};

const dateKey = (value: Date): string =>
  [value.getFullYear(), value.getMonth() + 1, value.getDate()]
    .map((part) => String(part).padStart(2, "0"))
    .join("-");

const monthKey = (value: Date): string =>
  [value.getFullYear(), value.getMonth() + 1]
    .map((part) => String(part).padStart(2, "0"))
    .join("-");

const sameDate = (first: Date | null, second: Date | null): boolean =>
  Boolean(first && second && dateKey(first) === dateKey(second));

const compareDates = (first: Date, second: Date): number =>
  dateKey(first).localeCompare(dateKey(second));

const getSearchDirection = (
  candidate: Date,
  minDate: Date | null,
  maxDate: Date | null
): 1 | -1 => {
  if (minDate && compareDates(candidate, minDate) < 0) {
    return 1;
  }

  if (maxDate && compareDates(candidate, maxDate) > 0) {
    return -1;
  }

  return 1;
};

const getMonthDays = (month: Date, firstDayOfWeek: CalendarFirstDayOfWeek): Date[] => {
  const firstDay = startOfWeek(startOfMonth(month), firstDayOfWeek);
  return Array.from({ length: CALENDAR_COLUMN_COUNT * CALENDAR_ROW_COUNT }, (_, index) =>
    addDays(firstDay, index)
  );
};

const getWeekdayLabels = (
  locale: string | undefined,
  firstDayOfWeek: CalendarFirstDayOfWeek
): string[] => {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const sunday = new Date(2024, 0, 7);
  return Array.from({ length: CALENDAR_COLUMN_COUNT }, (_, index) =>
    formatter.format(addDays(sunday, firstDayOfWeek + index))
  );
};

const getFullDateLabel = (locale: string | undefined, value: Date): string =>
  new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric"
  }).format(value);

const getMonthLabel = (locale: string | undefined, value: Date): string =>
  new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(value);

const Calendar: ForwardRefExoticComponent<CalendarProps & RefAttributes<HTMLDivElement>> =
  forwardRef<HTMLDivElement, CalendarProps>(
    (
      {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        calendarAriaLabel = "Calendar",
        className,
        defaultPickerDate,
        defaultValue = null,
        disabled = false,
        firstDayOfWeek = 0,
        id,
        initialPickerDate,
        label,
        locale,
        maxDate,
        minDate,
        nextMonthAriaLabel = "Next month",
        onKeyDown: onRootKeyDown,
        onPickerDateChange,
        onValueChange,
        pickerDate: pickerDateProp,
        previousMonthAriaLabel = "Previous month",
        restrictedDates,
        rootClassName,
        showTodayButton = true,
        style,
        today,
        todayButtonLabel = "Today",
        value: valueProp,
        ...rootProps
      },
      forwardedRef
    ) => {
      const generatedId = useId().replace(/:/g, "");
      const rootId = id ?? `rwu-calendar-${generatedId}`;
      const labelId = `${rootId}-label`;
      const monthTitleId = `${rootId}-month`;
      const rootRef = useRef<HTMLDivElement | null>(null);
      const dayRefs = useRef(new Map<string, HTMLButtonElement>());
      const focusRequestRef = useRef(false);
      const [defaultToday] = useState(() => normalizeDate(new Date()) ?? new Date());
      const todayDate = useMemo(() => normalizeDate(today) ?? defaultToday, [defaultToday, today]);
      const normalizedMinDate = useMemo(() => normalizeDate(minDate), [minDate]);
      const normalizedMaxDate = useMemo(() => normalizeDate(maxDate), [maxDate]);
      const restrictedDateKeys = useMemo(
        () =>
          new Set(
            (restrictedDates ?? [])
              .map((value) => normalizeDate(value))
              .filter((value): value is Date => Boolean(value))
              .map(dateKey)
          ),
        [restrictedDates]
      );
      const isValueControlled = valueProp !== undefined;
      const isPickerDateControlled = pickerDateProp !== undefined;
      const [uncontrolledValue, setUncontrolledValue] = useState<CalendarValue>(() =>
        normalizeDate(defaultValue)
      );
      const committedValue = isValueControlled ? normalizeDate(valueProp) : uncontrolledValue;
      const initialNavigationDate =
        normalizeDate(pickerDateProp) ??
        normalizeDate(defaultPickerDate) ??
        normalizeDate(initialPickerDate) ??
        committedValue ??
        todayDate;
      const isDateSelectable = useCallback(
        (value: Date): boolean => {
          if (
            normalizedMinDate &&
            normalizedMaxDate &&
            compareDates(normalizedMinDate, normalizedMaxDate) > 0
          ) {
            return false;
          }

          return (
            (!normalizedMinDate || compareDates(value, normalizedMinDate) >= 0) &&
            (!normalizedMaxDate || compareDates(value, normalizedMaxDate) <= 0) &&
            !restrictedDateKeys.has(dateKey(value))
          );
        },
        [normalizedMaxDate, normalizedMinDate, restrictedDateKeys]
      );
      const findSelectableDate = useCallback(
        (candidate: Date | null, direction: 1 | -1 = 1): Date | null => {
          if (!candidate) {
            return null;
          }

          let nextDate = normalizeDate(candidate);
          for (let index = 0; nextDate && index < MAX_DATE_SEARCH_DAYS; index += 1) {
            if (isDateSelectable(nextDate)) {
              return nextDate;
            }
            nextDate = addDays(nextDate, direction);
          }

          return null;
        },
        [isDateSelectable]
      );
      const initialFocusedDate = findSelectableDate(
        initialNavigationDate,
        getSearchDirection(initialNavigationDate, normalizedMinDate, normalizedMaxDate)
      );
      const [uncontrolledPickerDate, setUncontrolledPickerDate] = useState(() =>
        startOfMonth(initialFocusedDate ?? initialNavigationDate)
      );
      const [focusedDate, setFocusedDate] = useState<Date | null>(initialFocusedDate);
      const visibleMonth = startOfMonth(
        normalizeDate(pickerDateProp) ?? uncontrolledPickerDate ?? initialNavigationDate
      );
      const selectedKey = committedValue ? dateKey(committedValue) : "";
      const focusedKey = focusedDate ? dateKey(focusedDate) : "";
      const lastControlledValueKeyRef = useRef(selectedKey);
      const calendarDays = useMemo(
        () => getMonthDays(visibleMonth, firstDayOfWeek),
        [firstDayOfWeek, visibleMonth]
      );
      const weekdayLabels = useMemo(
        () => getWeekdayLabels(locale, firstDayOfWeek),
        [firstDayOfWeek, locale]
      );
      const hasSelectableDateInMonth = useCallback(
        (month: Date): boolean =>
          Array.from(
            { length: endOfMonth(month).getDate() },
            (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1)
          ).some(isDateSelectable),
        [isDateSelectable]
      );
      const emitPickerDateChange = useCallback(
        (nextDate: Date, event: CalendarInteractionEvent) => {
          const nextMonth = startOfMonth(nextDate);
          if (monthKey(nextMonth) === monthKey(visibleMonth)) {
            return;
          }

          if (!isPickerDateControlled) {
            setUncontrolledPickerDate(nextMonth);
          }
          onPickerDateChange?.(nextMonth, event);
        },
        [isPickerDateControlled, onPickerDateChange, visibleMonth]
      );
      const moveFocusTo = useCallback(
        (candidate: Date | null, direction: 1 | -1, event: CalendarInteractionEvent) => {
          const nextDate = findSelectableDate(candidate, direction);
          if (!nextDate) {
            return;
          }

          setFocusedDate(nextDate);
          focusRequestRef.current = true;
          emitPickerDateChange(nextDate, event);
        },
        [emitPickerDateChange, findSelectableDate]
      );
      const changeMonth = useCallback(
        (amount: number, event: CalendarInteractionEvent) => {
          const nextMonth = startOfMonth(addMonths(visibleMonth, amount));
          if (!hasSelectableDateInMonth(nextMonth)) {
            return;
          }

          const targetDay = focusedDate?.getDate() ?? committedValue?.getDate() ?? 1;
          const candidate = new Date(
            nextMonth.getFullYear(),
            nextMonth.getMonth(),
            Math.min(targetDay, endOfMonth(nextMonth).getDate())
          );
          const nextDate = findSelectableDate(candidate, amount >= 0 ? 1 : -1);
          if (!nextDate) {
            return;
          }

          setFocusedDate(nextDate);
          focusRequestRef.current = true;
          emitPickerDateChange(nextMonth, event);
        },
        [
          committedValue,
          emitPickerDateChange,
          findSelectableDate,
          focusedDate,
          hasSelectableDateInMonth,
          visibleMonth
        ]
      );
      const selectDate = useCallback(
        (value: Date, event: CalendarInteractionEvent) => {
          if (disabled || !isDateSelectable(value)) {
            return;
          }

          setFocusedDate(value);
          focusRequestRef.current = true;
          emitPickerDateChange(value, event);
          if (!isValueControlled) {
            setUncontrolledValue(value);
          }
          onValueChange?.(value, event);
        },
        [disabled, emitPickerDateChange, isDateSelectable, isValueControlled, onValueChange]
      );
      const handleDayKeyDown = (value: Date, event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.defaultPrevented || disabled) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectDate(value, event);
          return;
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          moveFocusTo(addDays(value, -1), -1, event);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          moveFocusTo(addDays(value, 1), 1, event);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          moveFocusTo(addDays(value, -CALENDAR_COLUMN_COUNT), -1, event);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          moveFocusTo(addDays(value, CALENDAR_COLUMN_COUNT), 1, event);
        } else if (event.key === "Home") {
          event.preventDefault();
          moveFocusTo(startOfWeek(value, firstDayOfWeek), 1, event);
        } else if (event.key === "End") {
          event.preventDefault();
          moveFocusTo(
            addDays(startOfWeek(value, firstDayOfWeek), CALENDAR_COLUMN_COUNT - 1),
            -1,
            event
          );
        } else if (event.key === "PageUp") {
          event.preventDefault();
          changeMonth(event.ctrlKey ? -12 : -1, event);
        } else if (event.key === "PageDown") {
          event.preventDefault();
          changeMonth(event.ctrlKey ? 12 : 1, event);
        }
      };
      const registerDay = (key: string) => (node: HTMLButtonElement | null) => {
        if (node) {
          dayRefs.current.set(key, node);
        } else {
          dayRefs.current.delete(key);
        }
      };
      const assignRootRef = (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      };

      useEffect(() => {
        if (!focusRequestRef.current) {
          return;
        }

        const focusedElement = dayRefs.current.get(focusedKey);
        if (focusedElement) {
          focusedElement.focus();
          focusRequestRef.current = false;
        }
      }, [calendarDays, focusedKey, visibleMonth]);

      useEffect(() => {
        if (!isValueControlled || lastControlledValueKeyRef.current === selectedKey) {
          return;
        }
        lastControlledValueKeyRef.current = selectedKey;

        if (!committedValue || !isDateSelectable(committedValue)) {
          return;
        }

        if (!sameDate(committedValue, focusedDate)) {
          setFocusedDate(committedValue);
          focusRequestRef.current = true;
        }

        if (!isPickerDateControlled && monthKey(visibleMonth) !== monthKey(committedValue)) {
          setUncontrolledPickerDate(startOfMonth(committedValue));
        }
      }, [
        committedValue,
        focusedDate,
        isDateSelectable,
        isPickerDateControlled,
        isValueControlled,
        selectedKey,
        visibleMonth
      ]);

      const previousMonth = startOfMonth(addMonths(visibleMonth, -1));
      const nextMonth = startOfMonth(addMonths(visibleMonth, 1));
      const previousMonthDisabled = disabled || !hasSelectableDateInMonth(previousMonth);
      const nextMonthDisabled = disabled || !hasSelectableDateInMonth(nextMonth);
      const todayDisabled = disabled || !isDateSelectable(todayDate);
      const hasLabel = label !== undefined && label !== null;
      const resolvedLabelledBy = ariaLabelledBy ?? (hasLabel ? labelId : undefined);
      const rootClassNames = [
        "ui-calendar",
        disabled ? "ui-calendar-disabled" : "",
        rootClassName,
        className
      ]
        .filter(Boolean)
        .join(" ");

      return (
        <div
          {...rootProps}
          aria-disabled={disabled ? true : rootProps["aria-disabled"]}
          aria-label={resolvedLabelledBy ? undefined : (ariaLabel ?? calendarAriaLabel)}
          aria-labelledby={resolvedLabelledBy}
          className={rootClassNames}
          id={rootId}
          onKeyDown={onRootKeyDown}
          ref={assignRootRef}
          role="group"
          style={style}
        >
          {hasLabel ? (
            <div className="ui-calendar-label" id={labelId}>
              {label}
            </div>
          ) : null}
          <div className="ui-calendar-header">
            <button
              aria-label={previousMonthAriaLabel}
              className="ui-calendar-nav-button"
              disabled={previousMonthDisabled}
              onClick={(event) => changeMonth(-1, event)}
              type="button"
            >
              <span aria-hidden="true" className="ui-calendar-nav-icon ui-calendar-nav-previous" />
            </button>
            <h2 aria-live="polite" className="ui-calendar-month" id={monthTitleId}>
              {getMonthLabel(locale, visibleMonth)}
            </h2>
            <button
              aria-label={nextMonthAriaLabel}
              className="ui-calendar-nav-button"
              disabled={nextMonthDisabled}
              onClick={(event) => changeMonth(1, event)}
              type="button"
            >
              <span aria-hidden="true" className="ui-calendar-nav-icon ui-calendar-nav-next" />
            </button>
          </div>
          <div aria-live="polite" className="ui-calendar-live-region">
            {committedValue ? `Selected ${getFullDateLabel(locale, committedValue)}` : ""}
          </div>
          <div
            aria-colcount={CALENDAR_COLUMN_COUNT}
            aria-label={calendarAriaLabel}
            aria-labelledby={monthTitleId}
            aria-rowcount={CALENDAR_ROW_COUNT + 1}
            className="ui-calendar-grid"
            role="grid"
            tabIndex={disabled ? -1 : focusedDate ? undefined : 0}
          >
            <div aria-rowindex={1} className="ui-calendar-weekdays" role="row">
              {weekdayLabels.map((weekday) => (
                <span className="ui-calendar-weekday" key={weekday} role="columnheader">
                  {weekday}
                </span>
              ))}
            </div>
            {Array.from({ length: CALENDAR_ROW_COUNT }, (_, rowIndex) => (
              <div
                aria-rowindex={rowIndex + 2}
                className="ui-calendar-week"
                key={`week-${rowIndex}`}
                role="row"
              >
                {calendarDays
                  .slice(rowIndex * CALENDAR_COLUMN_COUNT, (rowIndex + 1) * CALENDAR_COLUMN_COUNT)
                  .map((day, columnIndex) => {
                    const key = dateKey(day);
                    const isCurrentMonth = monthKey(day) === monthKey(visibleMonth);
                    const isSelected = sameDate(day, committedValue);
                    const isToday = sameDate(day, todayDate);
                    const isEnabled = !disabled && isDateSelectable(day);

                    return (
                      <button
                        aria-colindex={columnIndex + 1}
                        aria-current={isToday ? "date" : undefined}
                        aria-label={getFullDateLabel(locale, day)}
                        aria-selected={isSelected}
                        className={[
                          "ui-calendar-day",
                          isCurrentMonth ? "" : "ui-calendar-day-outside",
                          isSelected ? "ui-calendar-day-selected" : "",
                          isToday ? "ui-calendar-day-today" : ""
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        data-date={key}
                        disabled={!isEnabled}
                        id={`${rootId}-day-${key}`}
                        key={key}
                        onClick={(event) => selectDate(day, event)}
                        onKeyDown={(event) => handleDayKeyDown(day, event)}
                        ref={registerDay(key)}
                        role="gridcell"
                        tabIndex={isEnabled && key === focusedKey ? 0 : -1}
                        type="button"
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>
          {showTodayButton ? (
            <div className="ui-calendar-footer">
              <button
                className="ui-calendar-today-button"
                disabled={todayDisabled}
                onClick={(event) => selectDate(todayDate, event)}
                type="button"
              >
                {todayButtonLabel}
              </button>
            </div>
          ) : null}
        </div>
      );
    }
  );

Calendar.displayName = "Calendar";

export default Calendar;
