import { createPortal } from "react-dom";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import type {
  ChangeEvent,
  ChangeEventHandler,
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
  /** Controlled selected date. Use `null` for an empty picker. */
  value?: DatePickerValue;
  /** Initial selected date when `value` is uncontrolled. @default null */
  defaultValue?: DatePickerValue;
  /** Called when a calendar day or valid text input is committed. */
  onValueChange?: DatePickerValueChangeHandler;
  /** Controlled calendar popup visibility. */
  open?: boolean;
  /** Initial calendar popup visibility. @default false */
  defaultOpen?: boolean;
  /** Called when click, keyboard, Escape, or outside interaction requests visibility. */
  onOpenChange?: DatePickerOpenChangeHandler;
  /** Makes the input editable and enables text parsing. @default false */
  allowTextInput?: boolean;
  /** Called for every direct text edit when `allowTextInput` is enabled. */
  onTextChange?: (text: string, event: ChangeEvent<HTMLInputElement>) => void;
  /** Formats a committed date for the input. */
  formatDate?: (date: Date) => string;
  /** Parses editable input text. Return `null` for invalid text. */
  parseDate?: (text: string) => Date | null;
  /** Reports invalid, out-of-bounds, and required-input validation results. */
  onValidationResult?: (error?: DatePickerValidationError) => void;
  /** Locale used by the default date and calendar formatters. */
  locale?: string;
  /** First weekday in the calendar grid: Sunday `0` through Saturday `6`. @default 0 */
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Smallest selectable date, inclusive. */
  minDate?: Date;
  /** Largest selectable date, inclusive. */
  maxDate?: Date;
  /** Month shown the first time the picker opens without a selected value. */
  initialPickerDate?: Date;
  /** Stable date used for the today highlight; defaults to the client date. */
  today?: Date;
  /** Adds a footer button that selects the `today` date. @default false */
  showTodayButton?: boolean;
  /** Visible label associated with the input. */
  label?: ReactNode;
  /** Text shown when no date is selected. @default "Select a date" */
  placeholder?: string;
  /** Tooltip applied to the DatePicker root. */
  tooltip?: string;
  /** Accessible name for the calendar trigger button. */
  calendarButtonAriaLabel?: string;
  /** Accessible name for the calendar dialog. @default "Calendar" */
  calendarAriaLabel?: string;
  /** Opens the calendar when the input is clicked. @default true */
  openOnClick?: boolean;
  /** Closes the calendar after a day is selected. @default true */
  closeOnSelect?: boolean;
  /** Optional CSS width for the input. */
  width?: CSSProperties["width"];
  /** Extra class applied to the outer DatePicker wrapper. */
  rootClassName?: string;
  /** Native input id; generated when omitted. */
  id?: string;
  /** Native input disabled state. */
  disabled?: boolean;
  /** Makes the input read-only in addition to `allowTextInput={false}`. */
  readOnly?: boolean;
  /** Native input focus handler. */
  onFocus?: ReactFocusEventHandler;
  /** Native input blur handler. */
  onBlur?: ReactFocusEventHandler;
  /** Native input click handler. */
  onClick?: ReactMouseEventHandler;
  /** Native input keydown handler. */
  onKeyDown?: ReactKeyboardEventHandler;
}

type ReactFocusEventHandler = (event: FocusEvent<HTMLInputElement>) => void;
type ReactMouseEventHandler = (event: MouseEvent<HTMLInputElement>) => void;
type ReactKeyboardEventHandler = (event: KeyboardEvent<HTMLInputElement>) => void;

interface DatePickerPosition {
  left: number;
  minWidth: number;
  placement: "bottom" | "top";
  top: number;
}

const VIEWPORT_MARGIN = 8;
const POPUP_GAP = 4;
const CALENDAR_COLUMN_COUNT = 7;
const CALENDAR_ROW_COUNT = 6;
const MAX_DATE_SEARCH_DAYS = 3660;

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const isValidDate = (value: Date | null | undefined): value is Date =>
  value instanceof Date && !Number.isNaN(value.getTime());

const normalizeDate = (value: Date | null | undefined): DatePickerValue => {
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

const startOfWeek = (value: Date, firstDayOfWeek: number): Date => {
  const offset = (value.getDay() - firstDayOfWeek + CALENDAR_COLUMN_COUNT) % CALENDAR_COLUMN_COUNT;
  return addDays(value, -offset);
};

const dateKey = (value: Date): string =>
  [value.getFullYear(), value.getMonth() + 1, value.getDate()]
    .map((part) => String(part).padStart(2, "0"))
    .join("-");

const sameDate = (first: Date | null, second: Date | null): boolean =>
  Boolean(first && second && dateKey(first) === dateKey(second));

const compareDates = (first: Date, second: Date): number =>
  dateKey(first).localeCompare(dateKey(second));

const defaultFormatDate = (value: Date, locale?: string): string =>
  new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(value);

const defaultParseDate = (text: string): DatePickerValue => {
  const trimmedText = text.trim();
  if (!trimmedText) {
    return null;
  }

  const parsed = new Date(trimmedText);
  if (!isValidDate(parsed)) {
    return null;
  }

  return normalizeDate(parsed);
};

const getMonthDays = (month: Date, firstDayOfWeek: number): Date[] => {
  const firstDay = startOfWeek(startOfMonth(month), firstDayOfWeek);
  return Array.from({ length: CALENDAR_COLUMN_COUNT * CALENDAR_ROW_COUNT }, (_, index) =>
    addDays(firstDay, index)
  );
};

const getWeekdayLabels = (locale: string | undefined, firstDayOfWeek: number): string[] => {
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

const DatePicker: ForwardRefExoticComponent<DatePickerProps & RefAttributes<HTMLInputElement>> =
  forwardRef<HTMLInputElement, DatePickerProps>(
    (
      {
        allowTextInput = false,
        "aria-invalid": ariaInvalid,
        calendarAriaLabel = "Calendar",
        calendarButtonAriaLabel = "Open calendar",
        className,
        closeOnSelect = true,
        defaultOpen = false,
        defaultValue = null,
        disabled = false,
        firstDayOfWeek = 0,
        formatDate: formatDateProp,
        id,
        initialPickerDate,
        label,
        locale,
        maxDate,
        minDate,
        onBlur,
        onChange,
        onClick,
        onFocus,
        onKeyDown,
        onOpenChange,
        onTextChange,
        onValidationResult,
        onValueChange,
        open: openProp,
        openOnClick = true,
        parseDate: parseDateProp,
        placeholder = "Select a date",
        readOnly,
        rootClassName,
        showTodayButton = false,
        style,
        today,
        tooltip,
        value: valueProp,
        width,
        ...inputProps
      },
      forwardedRef
    ) => {
      const generatedId = useId().replace(/:/g, "");
      const inputId = id ?? `rwu-date-picker-${generatedId}`;
      const calendarId = `${inputId}-calendar`;
      const calendarTitleId = `${calendarId}-title`;
      const rootRef = useRef<HTMLDivElement>(null);
      const popupRef = useRef<HTMLDivElement>(null);
      const inputRef = useRef<HTMLInputElement | null>(null);
      const dayRefs = useRef(new Map<string, HTMLButtonElement>());
      const openStateRef = useRef(false);
      const restoreFocusRef = useRef(false);
      const [defaultToday] = useState(() => normalizeDate(new Date()) ?? new Date());
      const [uncontrolledValue, setUncontrolledValue] = useState<DatePickerValue>(() =>
        normalizeDate(defaultValue)
      );
      const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
      const [draftText, setDraftText] = useState(() => {
        const initialValue = normalizeDate(valueProp !== undefined ? valueProp : defaultValue);
        return initialValue
          ? (formatDateProp?.(initialValue) ?? defaultFormatDate(initialValue, locale))
          : "";
      });
      const [invalid, setInvalid] = useState(false);
      const [focusedDate, setFocusedDate] = useState<Date | null>(null);
      const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
      const [positionReady, setPositionReady] = useState(false);
      const [viewMonth, setViewMonth] = useState(() => {
        const initialValue = normalizeDate(valueProp !== undefined ? valueProp : defaultValue);
        const initialMonth = initialValue ?? normalizeDate(initialPickerDate) ?? defaultToday;
        return startOfMonth(initialMonth);
      });
      const [position, setPosition] = useState<DatePickerPosition>({
        left: 0,
        minWidth: 0,
        placement: "bottom",
        top: 0
      });

      const isValueControlled = valueProp !== undefined;
      const isOpenControlled = openProp !== undefined;
      const committedValue = isValueControlled ? normalizeDate(valueProp) : uncontrolledValue;
      const todayDate = useMemo(() => normalizeDate(today) ?? defaultToday, [defaultToday, today]);
      const normalizedMinDate = useMemo(() => normalizeDate(minDate), [minDate]);
      const normalizedMaxDate = useMemo(() => normalizeDate(maxDate), [maxDate]);
      const normalizedInitialPickerDate = useMemo(
        () => normalizeDate(initialPickerDate),
        [initialPickerDate]
      );
      const isOpen = !disabled && (isOpenControlled ? Boolean(openProp) : uncontrolledOpen);
      const selectedKey = committedValue ? dateKey(committedValue) : "";
      const focusedKey = focusedDate ? dateKey(focusedDate) : "";
      const calendarDays = useMemo(
        () => getMonthDays(viewMonth, firstDayOfWeek),
        [firstDayOfWeek, viewMonth]
      );
      const weekdayLabels = useMemo(
        () => getWeekdayLabels(locale, firstDayOfWeek),
        [firstDayOfWeek, locale]
      );
      const formatDateValue = useCallback(
        (value: Date): string => formatDateProp?.(value) ?? defaultFormatDate(value, locale),
        [formatDateProp, locale]
      );
      const isDateInRange = useCallback(
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
            (!normalizedMaxDate || compareDates(value, normalizedMaxDate) <= 0)
          );
        },
        [normalizedMaxDate, normalizedMinDate]
      );
      const findEnabledDate = useCallback(
        (candidate: Date | null, direction: 1 | -1 = 1): Date | null => {
          if (!candidate) {
            return null;
          }

          let nextDate = normalizeDate(candidate);
          for (let index = 0; nextDate && index < MAX_DATE_SEARCH_DAYS; index += 1) {
            if (isDateInRange(nextDate)) {
              return nextDate;
            }
            nextDate = addDays(nextDate, direction);
          }

          return null;
        },
        [isDateInRange]
      );
      const getInitialFocusedDate = useCallback((): Date | null => {
        const candidate = committedValue ?? normalizedInitialPickerDate ?? todayDate;
        if (!candidate) {
          return null;
        }

        const direction =
          normalizedMinDate && compareDates(candidate, normalizedMinDate) < 0
            ? 1
            : normalizedMaxDate && compareDates(candidate, normalizedMaxDate) > 0
              ? -1
              : 1;
        return findEnabledDate(candidate, direction);
      }, [
        findEnabledDate,
        normalizedInitialPickerDate,
        normalizedMaxDate,
        normalizedMinDate,
        selectedKey,
        todayDate
      ]);
      const hasEnabledDateInMonth = useCallback(
        (month: Date): boolean =>
          Array.from(
            { length: endOfMonth(month).getDate() },
            (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1)
          ).some(isDateInRange),
        [isDateInRange]
      );
      const requestOpen = useCallback(
        (nextOpen: boolean, event?: DatePickerOpenChangeEvent, shouldRestoreFocus = false) => {
          if (nextOpen && disabled) {
            return;
          }

          if (nextOpen === openStateRef.current) {
            return;
          }

          openStateRef.current = nextOpen;
          if (nextOpen) {
            const initialDate = getInitialFocusedDate();
            setFocusedDate(initialDate);
            if (initialDate) {
              setViewMonth(startOfMonth(initialDate));
            }
          } else if (shouldRestoreFocus) {
            restoreFocusRef.current = true;
          }

          if (!isOpenControlled) {
            setUncontrolledOpen(nextOpen);
          }

          onOpenChange?.(nextOpen, event);
        },
        [disabled, getInitialFocusedDate, isOpenControlled, onOpenChange]
      );
      const commitValue = useCallback(
        (nextValue: DatePickerValue, event: DatePickerValueChangeEvent): boolean => {
          const normalizedValue = normalizeDate(nextValue);
          if (normalizedValue && !isDateInRange(normalizedValue)) {
            setInvalid(true);
            onValidationResult?.("out-of-bounds");
            return false;
          }

          if (!isValueControlled) {
            setUncontrolledValue(normalizedValue);
          }

          setDraftText(normalizedValue ? formatDateValue(normalizedValue) : "");
          setInvalid(false);
          onValidationResult?.();
          onValueChange?.(normalizedValue, event);
          return true;
        },
        [formatDateValue, isDateInRange, isValueControlled, onValidationResult, onValueChange]
      );
      const commitDraft = useCallback(
        (event: DatePickerValueChangeEvent): boolean => {
          const trimmedText = draftText.trim();
          if (!trimmedText) {
            if (inputProps.required) {
              setInvalid(true);
              onValidationResult?.("required-input");
              return false;
            }
            return commitValue(null, event);
          }

          const parsedValue = normalizeDate(
            parseDateProp ? parseDateProp(trimmedText) : defaultParseDate(trimmedText)
          );
          if (!parsedValue) {
            setInvalid(true);
            onValidationResult?.("invalid-input");
            return false;
          }

          return commitValue(parsedValue, event);
        },
        [commitValue, draftText, inputProps.required, onValidationResult, parseDateProp]
      );
      const selectDate = useCallback(
        (value: Date, event: DatePickerValueChangeEvent) => {
          if (disabled || !isDateInRange(value)) {
            return;
          }

          setFocusedDate(value);
          setViewMonth(startOfMonth(value));
          if (commitValue(value, event) && closeOnSelect) {
            requestOpen(false, event, true);
          }
        },
        [closeOnSelect, commitValue, disabled, isDateInRange, requestOpen]
      );
      const focusDate = useCallback(
        (value: Date | null) => {
          const nextValue = findEnabledDate(value);
          if (!nextValue) {
            return;
          }

          setFocusedDate(nextValue);
          setViewMonth(startOfMonth(nextValue));
        },
        [findEnabledDate]
      );
      const moveFocusedDate = useCallback(
        (value: Date, amount: number, direction: 1 | -1 = amount >= 0 ? 1 : -1) => {
          const nextValue = findEnabledDate(addDays(value, amount), direction);
          focusDate(nextValue);
        },
        [findEnabledDate, focusDate]
      );
      const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!allowTextInput) {
          onChange?.(event);
          return;
        }

        setDraftText(event.currentTarget.value);
        setInvalid(false);
        onTextChange?.(event.currentTarget.value, event);
        onChange?.(event);
      };
      const handleInputClick = (event: MouseEvent<HTMLInputElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented && openOnClick) {
          requestOpen(true, event);
        }
      };
      const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
        onBlur?.(event);
        if (!event.defaultPrevented && allowTextInput) {
          commitDraft(event);
        }
      };
      const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || disabled) {
          return;
        }

        if (event.key === "Escape") {
          event.preventDefault();
          if (isOpen) {
            requestOpen(false, event, true);
          } else {
            setDraftText(committedValue ? formatDateValue(committedValue) : "");
            setInvalid(false);
          }
          return;
        }

        if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (allowTextInput && event.key === "Enter" && !commitDraft(event)) {
            return;
          }

          if (event.key === "Enter" && isOpen) {
            requestOpen(false, event, true);
          } else {
            requestOpen(true, event);
          }
        }
      };
      const handleCalendarButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
          return;
        }

        requestOpen(!isOpen, event, isOpen);
      };
      const handleMonthChange = (amount: -1 | 1, event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const nextMonth = startOfMonth(addMonths(viewMonth, amount));
        if (!hasEnabledDateInMonth(nextMonth)) {
          return;
        }

        const targetDay = focusedDate?.getDate() ?? committedValue?.getDate() ?? 1;
        const nextDate = new Date(
          nextMonth.getFullYear(),
          nextMonth.getMonth(),
          Math.min(targetDay, endOfMonth(nextMonth).getDate())
        );
        setViewMonth(nextMonth);
        setFocusedDate(findEnabledDate(nextDate, amount));
      };
      const handleDayKeyDown = (value: Date, event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "Escape") {
          event.preventDefault();
          requestOpen(false, event, true);
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectDate(value, event);
          return;
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          moveFocusedDate(value, -1, -1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          moveFocusedDate(value, 1, 1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          moveFocusedDate(value, -CALENDAR_COLUMN_COUNT, -1);
        } else if (event.key === "ArrowDown") {
          event.preventDefault();
          moveFocusedDate(value, CALENDAR_COLUMN_COUNT, 1);
        } else if (event.key === "Home") {
          event.preventDefault();
          focusDate(startOfWeek(value, firstDayOfWeek));
        } else if (event.key === "End") {
          event.preventDefault();
          focusDate(addDays(startOfWeek(value, firstDayOfWeek), CALENDAR_COLUMN_COUNT - 1));
        } else if (event.key === "PageUp") {
          event.preventDefault();
          moveFocusedDate(addMonths(value, -1), 0, -1);
        } else if (event.key === "PageDown") {
          event.preventDefault();
          moveFocusedDate(addMonths(value, 1), 0, 1);
        }
      };
      const handleTodayClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        selectDate(todayDate, event);
      };
      const registerDay = (key: string) => (node: HTMLButtonElement | null) => {
        if (node) {
          dayRefs.current.set(key, node);
        } else {
          dayRefs.current.delete(key);
        }
      };
      const assignInputRef = (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      };

      openStateRef.current = isOpen;

      useEffect(() => {
        const ownerDocument = rootRef.current?.ownerDocument;
        const nextPortalContainer =
          ownerDocument?.body ?? (typeof document !== "undefined" ? document.body : null);
        setPortalContainer(nextPortalContainer);
      }, []);

      useEffect(() => {
        if (disabled && !isOpenControlled) {
          setUncontrolledOpen(false);
        }
      }, [disabled, isOpenControlled]);

      useEffect(() => {
        if (!isOpen) {
          return;
        }

        const initialDate = getInitialFocusedDate();
        setFocusedDate(initialDate);
        if (initialDate) {
          setViewMonth(startOfMonth(initialDate));
        }
      }, [getInitialFocusedDate, isOpen]);

      useEffect(() => {
        setDraftText(committedValue ? formatDateValue(committedValue) : "");
        setInvalid(false);
        if (!isOpen && committedValue) {
          setViewMonth(startOfMonth(committedValue));
        }
      }, [formatDateValue, isOpen, selectedKey]);

      useEffect(() => {
        if (!isOpen || !portalContainer || !focusedDate) {
          return;
        }

        dayRefs.current.get(dateKey(focusedDate))?.focus();
      }, [focusedKey, focusedDate, isOpen, portalContainer, viewMonth]);

      useEffect(() => {
        if (isOpen || !restoreFocusRef.current) {
          return;
        }

        restoreFocusRef.current = false;
        inputRef.current?.focus();
      }, [isOpen]);

      useEffect(() => {
        if (!isOpen) {
          return;
        }

        const ownerDocument = rootRef.current?.ownerDocument;
        if (!ownerDocument) {
          return;
        }

        const handlePointerDown = (event: globalThis.PointerEvent) => {
          const target = event.target;
          if (
            target instanceof Node &&
            !rootRef.current?.contains(target) &&
            !popupRef.current?.contains(target)
          ) {
            requestOpen(false, event);
          }
        };
        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
          if (event.key === "Escape") {
            event.preventDefault();
            requestOpen(false, event, true);
          }
        };

        ownerDocument.addEventListener("pointerdown", handlePointerDown);
        ownerDocument.addEventListener("keydown", handleKeyDown);
        return () => {
          ownerDocument.removeEventListener("pointerdown", handlePointerDown);
          ownerDocument.removeEventListener("keydown", handleKeyDown);
        };
      }, [isOpen, requestOpen]);

      useIsomorphicLayoutEffect(() => {
        if (!isOpen || !portalContainer) {
          setPositionReady(false);
          return;
        }

        const anchorElement = rootRef.current;
        const popupElement = popupRef.current;
        const ownerWindow = anchorElement?.ownerDocument.defaultView;
        if (!anchorElement || !popupElement || !ownerWindow) {
          setPositionReady(false);
          return;
        }

        const updatePosition = () => {
          const anchorRect = anchorElement.getBoundingClientRect();
          const popupRect = popupElement.getBoundingClientRect();
          const shouldPlaceAbove =
            anchorRect.bottom + POPUP_GAP + popupRect.height >
              ownerWindow.innerHeight - VIEWPORT_MARGIN &&
            anchorRect.top - POPUP_GAP - popupRect.height >= VIEWPORT_MARGIN;
          const placement = shouldPlaceAbove ? "top" : "bottom";
          const preferredTop = shouldPlaceAbove
            ? anchorRect.top - popupRect.height - POPUP_GAP
            : anchorRect.bottom + POPUP_GAP;
          const maxLeft = Math.max(
            VIEWPORT_MARGIN,
            ownerWindow.innerWidth - popupRect.width - VIEWPORT_MARGIN
          );
          const maxTop = Math.max(
            VIEWPORT_MARGIN,
            ownerWindow.innerHeight - popupRect.height - VIEWPORT_MARGIN
          );

          setPosition({
            left: Math.min(Math.max(anchorRect.left, VIEWPORT_MARGIN), maxLeft),
            minWidth: Math.max(anchorRect.width, popupRect.width),
            placement,
            top: Math.min(Math.max(preferredTop, VIEWPORT_MARGIN), maxTop)
          });
          setPositionReady(true);
        };

        updatePosition();
        ownerWindow.addEventListener("resize", updatePosition);
        ownerWindow.addEventListener("scroll", updatePosition, true);
        return () => {
          ownerWindow.removeEventListener("resize", updatePosition);
          ownerWindow.removeEventListener("scroll", updatePosition, true);
        };
      }, [firstDayOfWeek, isOpen, portalContainer, viewMonth]);

      const inputStyle: CSSProperties | undefined =
        width === undefined ? style : { ...style, width };
      const displayedText =
        committedValue && !invalid && draftText === ""
          ? formatDateValue(committedValue)
          : draftText;
      const popupClassName = ["ui-date-picker-popup", `ui-date-picker-popup-${position.placement}`]
        .filter(Boolean)
        .join(" ");
      const popupStyle: CSSProperties = {
        left: position.left,
        minWidth: position.minWidth,
        top: position.top,
        visibility: positionReady ? "visible" : "hidden"
      };
      const popupElement = isOpen ? (
        <div
          ref={popupRef}
          aria-label={calendarAriaLabel}
          aria-modal="false"
          className={popupClassName}
          data-placement={position.placement}
          data-state="open"
          id={calendarId}
          role="dialog"
          style={popupStyle}
        >
          <div className="ui-date-picker-header">
            <button
              aria-label="Previous month"
              className="ui-date-picker-nav-button"
              disabled={!hasEnabledDateInMonth(startOfMonth(addMonths(viewMonth, -1)))}
              onClick={(event) => handleMonthChange(-1, event)}
              type="button"
            >
              <span
                aria-hidden="true"
                className="ui-date-picker-nav-icon ui-date-picker-nav-previous"
              />
            </button>
            <h2 aria-live="polite" className="ui-date-picker-month" id={calendarTitleId}>
              {getMonthLabel(locale, viewMonth)}
            </h2>
            <button
              aria-label="Next month"
              className="ui-date-picker-nav-button"
              disabled={!hasEnabledDateInMonth(startOfMonth(addMonths(viewMonth, 1)))}
              onClick={(event) => handleMonthChange(1, event)}
              type="button"
            >
              <span
                aria-hidden="true"
                className="ui-date-picker-nav-icon ui-date-picker-nav-next"
              />
            </button>
          </div>
          <div aria-label={calendarAriaLabel} className="ui-date-picker-grid" role="grid">
            <div className="ui-date-picker-weekdays" role="row">
              {weekdayLabels.map((weekday) => (
                <span className="ui-date-picker-weekday" key={weekday} role="columnheader">
                  {weekday}
                </span>
              ))}
            </div>
            <div className="ui-date-picker-days" role="rowgroup">
              {calendarDays.map((day) => {
                const key = dateKey(day);
                const isCurrentMonth = day.getMonth() === viewMonth.getMonth();
                const isSelected = sameDate(day, committedValue);
                const isToday = sameDate(day, todayDate);
                const isEnabled = isDateInRange(day);
                return (
                  <button
                    aria-current={isToday ? "date" : undefined}
                    aria-label={getFullDateLabel(locale, day)}
                    aria-selected={isSelected}
                    className={[
                      "ui-date-picker-day",
                      isCurrentMonth ? "" : "ui-date-picker-day-outside",
                      isSelected ? "ui-date-picker-day-selected" : "",
                      isToday ? "ui-date-picker-day-today" : ""
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    data-date={key}
                    disabled={!isEnabled}
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
          </div>
          {showTodayButton && (
            <div className="ui-date-picker-footer">
              <button
                className="ui-date-picker-today-button"
                disabled={!isDateInRange(todayDate)}
                onClick={handleTodayClick}
                type="button"
              >
                Today
              </button>
            </div>
          )}
        </div>
      ) : null;

      return (
        <div
          className={["ui-date-picker", rootClassName].filter(Boolean).join(" ")}
          ref={rootRef}
          title={tooltip}
        >
          {label !== undefined && label !== null && (
            <label className="ui-date-picker-label" htmlFor={inputId}>
              {label}
            </label>
          )}
          <div className="ui-date-picker-field">
            <input
              {...inputProps}
              aria-controls={calendarId}
              aria-expanded={isOpen}
              aria-haspopup="dialog"
              aria-invalid={invalid ? "true" : ariaInvalid}
              className={["ui-date-picker-input", className].filter(Boolean).join(" ")}
              disabled={disabled}
              id={inputId}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              onClick={handleInputClick}
              onFocus={onFocus}
              onKeyDown={handleInputKeyDown}
              placeholder={placeholder}
              readOnly={readOnly ?? !allowTextInput}
              ref={assignInputRef}
              role="combobox"
              style={inputStyle}
              type="text"
              value={displayedText}
            />
            <button
              aria-controls={calendarId}
              aria-expanded={isOpen}
              aria-haspopup="dialog"
              aria-label={calendarButtonAriaLabel}
              className="ui-date-picker-calendar-button"
              disabled={disabled}
              onClick={handleCalendarButtonClick}
              type="button"
            >
              <span aria-hidden="true" className="ui-date-picker-calendar-icon" />
            </button>
          </div>
          {portalContainer && popupElement ? createPortal(popupElement, portalContainer) : null}
        </div>
      );
    }
  );

DatePicker.displayName = "DatePicker";

export default DatePicker;
