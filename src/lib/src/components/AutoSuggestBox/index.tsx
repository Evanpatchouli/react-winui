import { forwardRef, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import type {
  ChangeEvent,
  CompositionEvent,
  FocusEvent,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  MutableRefObject,
  ReactNode,
  RefAttributes
} from "react";
import { createPortal } from "react-dom";

/** An item offered by `AutoSuggestBox` while the user enters a query. */
export interface AutoSuggestBoxSuggestion {
  /** Text written to the input when the suggestion is chosen. Values must be unique. */
  value: string;
  /** Optional visual content. The suggestion value is rendered when omitted. */
  label?: ReactNode;
  /** Optional leading visual rendered before the label. */
  icon?: ReactNode;
  /** Prevents pointer and keyboard choice of this suggestion. */
  disabled?: boolean;
}

/** Why `AutoSuggestBox` requested a text update. */
export type AutoSuggestBoxTextChangeReason = "input" | "suggestion" | "clear";

/** Events that can request an `AutoSuggestBox` text update. */
export type AutoSuggestBoxTextChangeEvent =
  | ChangeEvent<HTMLInputElement>
  | ReactKeyboardEvent<HTMLInputElement>
  | ReactMouseEvent<HTMLElement>;

/** Events that can request an `AutoSuggestBox` open-state change. */
export type AutoSuggestBoxOpenChangeEvent =
  Event | AutoSuggestBoxTextChangeEvent | FocusEvent<HTMLInputElement>;

/** Events that can choose a suggestion or submit a query. */
export type AutoSuggestBoxSubmitEvent =
  ReactKeyboardEvent<HTMLInputElement> | ReactMouseEvent<HTMLElement>;

/** Called whenever the component requests a controlled or uncontrolled text update. */
export type AutoSuggestBoxTextChangeHandler = (
  text: string,
  event: AutoSuggestBoxTextChangeEvent,
  reason: AutoSuggestBoxTextChangeReason
) => void;

/** Called when the component requests a controlled or uncontrolled open-state update. */
export type AutoSuggestBoxOpenChangeHandler = (
  open: boolean,
  event?: AutoSuggestBoxOpenChangeEvent
) => void;

/** Called when an enabled suggestion is chosen by pointer or keyboard. */
export type AutoSuggestBoxSuggestionChooseHandler = (
  suggestion: AutoSuggestBoxSuggestion,
  event: AutoSuggestBoxSubmitEvent
) => void;

/** Called when text or a chosen suggestion is committed as a query. */
export type AutoSuggestBoxQuerySubmitHandler = (
  query: string,
  chosenSuggestion: AutoSuggestBoxSuggestion | undefined,
  event: AutoSuggestBoxSubmitEvent
) => void;

/** Props for the Windows-styled query input with dynamic suggestions. */
export interface AutoSuggestBoxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "children" | "defaultValue" | "onChange" | "type" | "value"
> {
  /** Suggestions supplied by the application for the current query. */
  suggestions: readonly AutoSuggestBoxSuggestion[];
  /** Controlled input text. */
  text?: string;
  /** Initial input text when `text` is uncontrolled. */
  defaultText?: string;
  /** Called for input, suggestion, and clear text-update requests. */
  onTextChange?: AutoSuggestBoxTextChangeHandler;
  /** Controlled suggestion popup visibility. */
  open?: boolean;
  /** Initial popup visibility when `open` is uncontrolled. */
  defaultOpen?: boolean;
  /** Called when input, keyboard, pointer, focus, or outside interaction requests visibility. */
  onOpenChange?: AutoSuggestBoxOpenChangeHandler;
  /** Called before query submission when a suggestion is committed. */
  onSuggestionChoose?: AutoSuggestBoxSuggestionChooseHandler;
  /** Called when Enter, the query button, or a suggestion commits a query. */
  onQuerySubmit?: AutoSuggestBoxQuerySubmitHandler;
  /** Optional header rendered as the input label. */
  label?: ReactNode;
  /** Optional guidance rendered below the input. */
  description?: ReactNode;
  /** Shows a WinUI-style query button at the end of the input. @default false */
  queryButton?: boolean;
  /** Accessible name for the query button. @default "Submit query" */
  queryButtonAriaLabel?: string;
  /** Accessible name for the clear button. @default "Clear text" */
  clearButtonAriaLabel?: string;
  /** Accessible name for the popup listbox. @default "Suggestions" */
  listboxAriaLabel?: string;
  /** Content shown while the popup is open without suggestions. @default "No results" */
  noSuggestionsMessage?: ReactNode;
  /** Extra class applied to the component root. */
  rootClassName?: string;
}

interface ResolvedSuggestion {
  disabled: boolean;
  id: string;
  suggestion: AutoSuggestBoxSuggestion;
}

interface AutoSuggestBoxPosition {
  left: number;
  maxHeight: number;
  top: number;
  width: number;
  placement: "bottom" | "top";
}

const VIEWPORT_GAP = 4;
const VIEWPORT_MARGIN = 8;
const MIN_POPUP_HEIGHT = 32;
const PREFERRED_POPUP_HEIGHT = 240;

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const AutoSuggestBox: ForwardRefExoticComponent<
  AutoSuggestBoxProps & RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, AutoSuggestBoxProps>(
  (
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      autoComplete = "off",
      className,
      clearButtonAriaLabel = "Clear text",
      defaultOpen = false,
      defaultText = "",
      description,
      disabled = false,
      id,
      label,
      listboxAriaLabel = "Suggestions",
      noSuggestionsMessage = "No results",
      onBlur,
      onClick,
      onCompositionEnd,
      onCompositionStart,
      onFocus,
      onKeyDown,
      onOpenChange,
      onQuerySubmit,
      onSuggestionChoose,
      onTextChange,
      open: openProp,
      queryButton = false,
      queryButtonAriaLabel = "Submit query",
      rootClassName,
      style,
      suggestions,
      text: textProp,
      ...inputProps
    },
    forwardedRef
  ) => {
    const generatedId = useId();
    const inputId = id ?? `${generatedId}-input`;
    const labelId = `${generatedId}-label`;
    const descriptionId = `${generatedId}-description`;
    const listboxId = `${generatedId}-listbox`;
    const controlRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const listboxRef = useRef<HTMLUListElement>(null);
    const isComposingRef = useRef(false);
    const [uncontrolledText, setUncontrolledText] = useState(defaultText);
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [activeValue, setActiveValue] = useState<string | null>(null);
    const [position, setPosition] = useState<AutoSuggestBoxPosition>({
      left: 0,
      maxHeight: PREFERRED_POPUP_HEIGHT,
      placement: "bottom",
      top: 0,
      width: 0
    });

    const text = textProp ?? uncontrolledText;
    const open = (openProp ?? uncontrolledOpen) && !disabled;
    const resolvedSuggestions = useMemo<readonly ResolvedSuggestion[]>(
      () =>
        suggestions.map((suggestion, index) => ({
          disabled: Boolean(suggestion.disabled),
          id: `${listboxId}-option-${index}`,
          suggestion
        })),
      [listboxId, suggestions]
    );
    const activeSuggestion = resolvedSuggestions.find(
      (resolvedSuggestion) => resolvedSuggestion.suggestion.value === activeValue
    );

    const setInputRef = (node: HTMLInputElement | null) => {
      inputRef.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as MutableRefObject<HTMLInputElement | null>).current = node;
      }
    };

    const requestOpen = (nextOpen: boolean, event?: AutoSuggestBoxOpenChangeEvent) => {
      if (nextOpen === open || disabled) {
        return;
      }

      if (openProp === undefined) {
        setUncontrolledOpen(nextOpen);
      }

      if (!nextOpen) {
        setActiveValue(null);
      }

      onOpenChange?.(nextOpen, event);
    };

    const requestText = (
      nextText: string,
      event: AutoSuggestBoxTextChangeEvent,
      reason: AutoSuggestBoxTextChangeReason
    ) => {
      if (textProp === undefined) {
        setUncontrolledText(nextText);
      }

      onTextChange?.(nextText, event, reason);
    };

    const getEnabledSuggestion = (direction: 1 | -1): ResolvedSuggestion | undefined => {
      if (resolvedSuggestions.length === 0) {
        return undefined;
      }

      let index = resolvedSuggestions.findIndex(
        (resolvedSuggestion) => resolvedSuggestion.suggestion.value === activeValue
      );

      for (let count = 0; count < resolvedSuggestions.length; count += 1) {
        if (index < 0) {
          index = direction === 1 ? 0 : resolvedSuggestions.length - 1;
        } else {
          index = (index + direction + resolvedSuggestions.length) % resolvedSuggestions.length;
        }

        if (!resolvedSuggestions[index].disabled) {
          return resolvedSuggestions[index];
        }
      }

      return undefined;
    };

    const chooseSuggestion = (
      resolvedSuggestion: ResolvedSuggestion,
      event: AutoSuggestBoxSubmitEvent
    ) => {
      if (resolvedSuggestion.disabled || disabled) {
        return;
      }

      const { suggestion } = resolvedSuggestion;
      requestText(suggestion.value, event, "suggestion");
      onSuggestionChoose?.(suggestion, event);
      onQuerySubmit?.(suggestion.value, suggestion, event);
      requestOpen(false, event);
      inputRef.current?.focus();
    };

    const updatePosition = () => {
      const control = controlRef.current;
      const listbox = listboxRef.current;

      if (!control || !listbox) {
        return;
      }

      const rect = control.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const availableBottom = Math.max(0, viewportHeight - rect.bottom - VIEWPORT_MARGIN);
      const availableTop = Math.max(0, rect.top - VIEWPORT_MARGIN);
      const desiredHeight = Math.min(
        Math.max(listbox.scrollHeight, MIN_POPUP_HEIGHT),
        PREFERRED_POPUP_HEIGHT
      );
      const placement =
        availableBottom < desiredHeight && availableTop > availableBottom ? "top" : "bottom";
      const availableHeight = placement === "top" ? availableTop : availableBottom;
      const maxHeight = Math.max(
        0,
        Math.min(PREFERRED_POPUP_HEIGHT, availableHeight - VIEWPORT_GAP)
      );
      const width = Math.max(0, Math.min(rect.width, viewportWidth - VIEWPORT_MARGIN * 2));
      const left = Math.min(
        Math.max(VIEWPORT_MARGIN, rect.left),
        Math.max(VIEWPORT_MARGIN, viewportWidth - width - VIEWPORT_MARGIN)
      );
      const measuredHeight = Math.min(listbox.scrollHeight, maxHeight);
      const top =
        placement === "top"
          ? Math.max(VIEWPORT_MARGIN, rect.top - VIEWPORT_GAP - measuredHeight)
          : rect.bottom + VIEWPORT_GAP;

      setPosition({
        left: Math.round(left),
        maxHeight: Math.floor(maxHeight),
        placement,
        top: Math.round(top),
        width: Math.round(width)
      });
    };

    useIsomorphicLayoutEffect(() => {
      if (!open) {
        return undefined;
      }

      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);

      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }, [open, resolvedSuggestions, noSuggestionsMessage]);

    useEffect(() => {
      if (!open) {
        return undefined;
      }

      const ownerDocument = controlRef.current?.ownerDocument;
      if (!ownerDocument) {
        return undefined;
      }

      const handleOutsidePointer = (event: PointerEvent) => {
        const target = event.target;
        if (!(target instanceof Node)) {
          return;
        }

        if (controlRef.current?.contains(target) || listboxRef.current?.contains(target)) {
          return;
        }

        requestOpen(false, event);
      };

      ownerDocument.addEventListener("pointerdown", handleOutsidePointer);
      return () => ownerDocument.removeEventListener("pointerdown", handleOutsidePointer);
    }, [open]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const nextText = event.currentTarget.value;
      requestText(nextText, event, "input");
      setActiveValue(null);
      requestOpen(nextText.length > 0 || resolvedSuggestions.length > 0, event);
    };

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || isComposingRef.current || event.nativeEvent.isComposing) {
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const direction = event.key === "ArrowDown" ? 1 : -1;
        const nextSuggestion = getEnabledSuggestion(direction);
        requestOpen(true, event);
        setActiveValue(nextSuggestion?.suggestion.value ?? null);
        return;
      }

      if (event.key === "Home" || event.key === "End") {
        if (!open) {
          return;
        }

        event.preventDefault();
        const enabledSuggestions = resolvedSuggestions.filter(
          (resolvedSuggestion) => !resolvedSuggestion.disabled
        );
        const nextSuggestion =
          event.key === "Home"
            ? enabledSuggestions[0]
            : enabledSuggestions[enabledSuggestions.length - 1];
        setActiveValue(nextSuggestion?.suggestion.value ?? null);
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        if (open && activeSuggestion) {
          chooseSuggestion(activeSuggestion, event);
        } else {
          onQuerySubmit?.(text, undefined, event);
          requestOpen(false, event);
        }
        return;
      }

      if (event.key === "Escape") {
        if (open) {
          event.preventDefault();
          requestOpen(false, event);
        }
        return;
      }

      if (event.key === "Tab" && open) {
        requestOpen(false, event);
      }
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);
      if (!event.defaultPrevented && (text.length > 0 || resolvedSuggestions.length > 0)) {
        requestOpen(true, event);
      }
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
    };

    const handleCompositionStart = (event: CompositionEvent<HTMLInputElement>) => {
      isComposingRef.current = true;
      onCompositionStart?.(event);
    };

    const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
      isComposingRef.current = false;
      onCompositionEnd?.(event);
    };

    const handleClear = (event: ReactMouseEvent<HTMLButtonElement>) => {
      requestText("", event, "clear");
      requestOpen(false, event);
      inputRef.current?.focus();
    };

    const handleQueryButton = (event: ReactMouseEvent<HTMLButtonElement>) => {
      onQuerySubmit?.(text, undefined, event);
      requestOpen(false, event);
      inputRef.current?.focus();
    };

    const describedBy =
      [ariaDescribedBy, description ? descriptionId : undefined].filter(Boolean).join(" ") ||
      undefined;
    const labelledBy = ariaLabelledBy ?? (ariaLabel === undefined && label ? labelId : undefined);
    const rootClasses = ["ui-auto-suggest-box", rootClassName].filter(Boolean).join(" ");
    const controlClasses = [
      "ui-auto-suggest-box-control",
      open ? "open" : "",
      queryButton ? "has-query" : "",
      text.length > 0 ? "has-clear" : "",
      disabled ? "disabled" : ""
    ]
      .filter(Boolean)
      .join(" ");
    const inputClasses = ["ui-auto-suggest-box-input", className].filter(Boolean).join(" ");

    const listbox = open ? (
      <ul
        aria-label={listboxAriaLabel}
        className="ui-auto-suggest-box-listbox"
        data-placement={position.placement}
        id={listboxId}
        ref={listboxRef}
        role="listbox"
        style={{
          left: position.left,
          maxHeight: position.maxHeight,
          top: position.top,
          width: position.width
        }}
      >
        {resolvedSuggestions.length === 0 ? (
          <li className="ui-auto-suggest-box-empty" role="presentation">
            <span aria-live="polite" role="status">
              {noSuggestionsMessage}
            </span>
          </li>
        ) : (
          resolvedSuggestions.map((resolvedSuggestion) => {
            const { suggestion } = resolvedSuggestion;
            const active = suggestion.value === activeSuggestion?.suggestion.value;
            const optionClasses = [
              "ui-auto-suggest-box-option",
              active ? "active" : "",
              resolvedSuggestion.disabled ? "disabled" : ""
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <li
                aria-disabled={resolvedSuggestion.disabled || undefined}
                aria-selected={active}
                className={optionClasses}
                id={resolvedSuggestion.id}
                key={suggestion.value}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => {
                  if (!resolvedSuggestion.disabled) {
                    setActiveValue(suggestion.value);
                  }
                }}
                onClick={(event) => chooseSuggestion(resolvedSuggestion, event)}
                role="option"
              >
                {suggestion.icon ? (
                  <span aria-hidden="true" className="ui-auto-suggest-box-option-icon">
                    {suggestion.icon}
                  </span>
                ) : null}
                <span className="ui-auto-suggest-box-option-label">
                  {suggestion.label ?? suggestion.value}
                </span>
              </li>
            );
          })
        )}
      </ul>
    ) : null;

    return (
      <div className={rootClasses}>
        {label ? (
          <label className="ui-auto-suggest-box-label" htmlFor={inputId} id={labelId}>
            {label}
          </label>
        ) : null}
        <div className={controlClasses} ref={controlRef}>
          <input
            {...inputProps}
            aria-activedescendant={open ? activeSuggestion?.id : undefined}
            aria-autocomplete="list"
            aria-controls={open ? listboxId : undefined}
            aria-describedby={describedBy}
            aria-expanded={open}
            aria-label={ariaLabel}
            aria-labelledby={labelledBy}
            autoComplete={autoComplete}
            className={inputClasses}
            disabled={disabled}
            id={inputId}
            onBlur={handleBlur}
            onChange={handleChange}
            onClick={(event) => {
              onClick?.(event);
              if (!event.defaultPrevented && (text.length > 0 || resolvedSuggestions.length > 0)) {
                requestOpen(true, event);
              }
            }}
            onCompositionEnd={handleCompositionEnd}
            onCompositionStart={handleCompositionStart}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            ref={setInputRef}
            role="combobox"
            style={style}
            type="search"
            value={text}
          />
          {text.length > 0 ? (
            <button
              aria-label={clearButtonAriaLabel}
              className="ui-auto-suggest-box-clear"
              disabled={disabled}
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleClear}
              type="button"
            >
              <i aria-hidden="true" className="icons10-cross" />
            </button>
          ) : null}
          {queryButton ? (
            <button
              aria-label={queryButtonAriaLabel}
              className="ui-auto-suggest-box-query"
              disabled={disabled}
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleQueryButton}
              type="button"
            >
              <i aria-hidden="true" className="icons10-search" />
            </button>
          ) : null}
        </div>
        {description ? (
          <div className="ui-auto-suggest-box-description" id={descriptionId}>
            {description}
          </div>
        ) : null}
        {typeof document === "undefined" ? null : createPortal(listbox, document.body)}
      </div>
    );
  }
);

AutoSuggestBox.displayName = "AutoSuggestBox";

export default AutoSuggestBox;
