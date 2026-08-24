import { forwardRef, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import type {
  ChangeEvent,
  FocusEvent,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefAttributes
} from "react";
import { createPortal } from "react-dom";

/** A value committed by `ComboBox`. */
export type ComboBoxValue = string | number;

/** An item shown in the `ComboBox` listbox. */
export interface ComboBoxOption {
  /** Stable value committed when this option is selected. Values must be unique. */
  value: ComboBoxValue;
  /** Visual content for the option. Keep it to a single line for WinUI parity. */
  label: ReactNode;
  /** Text used for display, filtering, typeahead, and accessibility when `label` is not text. */
  textValue?: string;
  /** Optional leading visual rendered before the label. */
  icon?: ReactNode;
  /** Prevents pointer and keyboard selection of this option. */
  disabled?: boolean;
}

/** Events that can request a `ComboBox` open-state change. */
export type ComboBoxOpenChangeEvent =
  | Event
  | ChangeEvent<HTMLInputElement>
  | FocusEvent<HTMLInputElement>
  | ReactKeyboardEvent<HTMLInputElement>
  | ReactMouseEvent<HTMLElement>;

/** Events that can commit a `ComboBox` value. */
export type ComboBoxValueChangeEvent =
  | FocusEvent<HTMLInputElement>
  | ReactKeyboardEvent<HTMLInputElement>
  | ReactMouseEvent<HTMLLIElement>;

/** Callback invoked when the listbox requests an open-state change. */
export type ComboBoxOpenChangeHandler = (open: boolean, event?: ComboBoxOpenChangeEvent) => void;

/** Callback invoked when an option or editable custom value is committed. */
export type ComboBoxValueChangeHandler = (
  value: ComboBoxValue,
  option: ComboBoxOption | undefined,
  event: ComboBoxValueChangeEvent
) => void;

/** Callback invoked when custom editable text is submitted with Enter or blur. */
export type ComboBoxTextSubmitHandler = (
  text: string,
  event: FocusEvent<HTMLInputElement> | ReactKeyboardEvent<HTMLInputElement>
) => void;

/** Props for the Windows-styled single-select ComboBox. */
export interface ComboBoxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "children" | "defaultValue" | "onChange" | "readOnly" | "role" | "type" | "value"
> {
  /** Options available for single selection. */
  options: readonly ComboBoxOption[];
  /** Controlled committed value. Use `null` for no selection. */
  value?: ComboBoxValue | null;
  /** Initial committed value when `value` is uncontrolled. */
  defaultValue?: ComboBoxValue | null;
  /** Called when an option or custom editable value is committed. */
  onValueChange?: ComboBoxValueChangeHandler;
  /** Enables text editing, list filtering, and custom value submission. @default false */
  editable?: boolean;
  /** Controlled text displayed by an editable ComboBox. */
  text?: string;
  /** Initial text displayed by an uncontrolled editable ComboBox. */
  defaultText?: string;
  /** Called for every editable text change. */
  onTextChange?: (text: string, event: ChangeEvent<HTMLInputElement>) => void;
  /** Called when non-option editable text is submitted. */
  onTextSubmit?: ComboBoxTextSubmitHandler;
  /** Controlled listbox visibility. */
  open?: boolean;
  /** Initial listbox visibility when `open` is uncontrolled. */
  defaultOpen?: boolean;
  /** Called when pointer, keyboard, focus, or outside interaction requests visibility. */
  onOpenChange?: ComboBoxOpenChangeHandler;
  /** Accessible name for the popup listbox. @default "Options" */
  listboxAriaLabel?: string;
  /** Content shown when editable filtering has no matches. @default "No options" */
  noOptionsMessage?: ReactNode;
  /** Accessible label for the chevron button. */
  toggleButtonAriaLabel?: string;
  /** Extra class applied to the root wrapper. */
  rootClassName?: string;
}

interface ResolvedOption {
  disabled: boolean;
  id: string;
  option: ComboBoxOption;
  text: string;
}

interface ComboBoxPosition {
  left: number;
  maxHeight: number;
  minWidth: number;
  placement: "bottom" | "top";
  top: number;
}

interface DraftText {
  baseValue: ComboBoxValue | null;
  text: string;
}

const TYPEAHEAD_RESET_MS = 700;
const FALLBACK_VIEWPORT_GAP = 4;
const FALLBACK_VIEWPORT_MARGIN = 8;

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const valuesEqual = (
  firstValue: ComboBoxValue | null,
  secondValue: ComboBoxValue | null
): boolean => Object.is(firstValue, secondValue);

const getOptionText = (option: ComboBoxOption): string => {
  if (option.textValue !== undefined) {
    return option.textValue;
  }

  if (typeof option.label === "string" || typeof option.label === "number") {
    return String(option.label);
  }

  return String(option.value);
};

const findOptionByValue = (
  options: readonly ResolvedOption[],
  value: ComboBoxValue | null
): ResolvedOption | undefined =>
  value === null
    ? undefined
    : options.find((resolvedOption) => valuesEqual(resolvedOption.option.value, value));

const ComboBox: ForwardRefExoticComponent<ComboBoxProps & RefAttributes<HTMLInputElement>> =
  forwardRef<HTMLInputElement, ComboBoxProps>(
    (
      {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        autoComplete = "off",
        className,
        defaultOpen = false,
        defaultText,
        defaultValue = null,
        disabled = false,
        editable = false,
        form,
        id,
        listboxAriaLabel,
        name,
        noOptionsMessage = "No options",
        onBlur,
        onClick,
        onFocus,
        onKeyDown,
        onOpenChange,
        onTextChange,
        onTextSubmit,
        onValueChange,
        open: openProp,
        options,
        placeholder,
        required,
        rootClassName,
        text: textProp,
        toggleButtonAriaLabel,
        value: valueProp,
        ...inputProps
      },
      forwardedRef
    ) => {
      const generatedId = useId().replace(/:/g, "");
      const inputId = id ?? `rwu-combobox-${generatedId}`;
      const listboxId = `${inputId}-listbox`;
      const rootRef = useRef<HTMLDivElement>(null);
      const inputRef = useRef<HTMLInputElement | null>(null);
      const listboxRef = useRef<HTMLUListElement>(null);
      const openStateRef = useRef(false);
      const typeaheadRef = useRef({ query: "", timestamp: 0 });
      const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
      const [uncontrolledValue, setUncontrolledValue] = useState<ComboBoxValue | null>(
        defaultValue
      );
      const [draftText, setDraftText] = useState<DraftText | null>(() =>
        defaultText === undefined ? null : { baseValue: defaultValue, text: defaultText }
      );
      const [filterText, setFilterText] = useState(defaultText ?? "");
      const [activeValue, setActiveValue] = useState<ComboBoxValue | null>(null);
      const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
      const [positionReady, setPositionReady] = useState(false);
      const [position, setPosition] = useState<ComboBoxPosition>({
        left: 0,
        maxHeight: 0,
        minWidth: 0,
        placement: "bottom",
        top: 0
      });

      const isOpenControlled = openProp !== undefined;
      const isValueControlled = valueProp !== undefined;
      const selectedValue = isValueControlled ? valueProp : uncontrolledValue;
      const resolvedOptions = useMemo<ResolvedOption[]>(
        () =>
          options.map((option, optionIndex) => ({
            disabled: Boolean(option.disabled),
            id: `${listboxId}-option-${optionIndex}`,
            option,
            text: getOptionText(option)
          })),
        [listboxId, options]
      );
      const selectedOption = findOptionByValue(resolvedOptions, selectedValue);
      const selectedText =
        selectedOption?.text ?? (editable && selectedValue !== null ? String(selectedValue) : "");
      const uncontrolledText =
        draftText && valuesEqual(draftText.baseValue, selectedValue)
          ? draftText.text
          : selectedText;
      const displayText = editable ? (textProp ?? uncontrolledText) : selectedText;
      const normalizedFilter = filterText.trim().toLocaleLowerCase();
      const visibleOptions = useMemo(
        () =>
          !editable || normalizedFilter.length === 0
            ? resolvedOptions
            : resolvedOptions.filter((resolvedOption) =>
                resolvedOption.text.toLocaleLowerCase().includes(normalizedFilter)
              ),
        [editable, normalizedFilter, resolvedOptions]
      );
      const isOpen = !disabled && (isOpenControlled ? Boolean(openProp) : uncontrolledOpen);
      const activeOption = findOptionByValue(visibleOptions, activeValue);
      const activeOptionId = isOpen && !activeOption?.disabled ? activeOption?.id : undefined;

      openStateRef.current = isOpen;

      const assignInputRef = (node: HTMLInputElement | null) => {
        inputRef.current = node;

        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      };

      const getInitialActiveValue = (
        direction: "first" | "last" = "first"
      ): ComboBoxValue | null => {
        const selectedVisibleOption = findOptionByValue(visibleOptions, selectedValue);
        if (selectedVisibleOption && !selectedVisibleOption.disabled) {
          return selectedVisibleOption.option.value;
        }

        const candidates = direction === "last" ? [...visibleOptions].reverse() : visibleOptions;
        return candidates.find((resolvedOption) => !resolvedOption.disabled)?.option.value ?? null;
      };

      const requestOpen = (
        nextOpen: boolean,
        event?: ComboBoxOpenChangeEvent,
        initialDirection: "first" | "last" = "first",
        initializeActive = true
      ) => {
        if (disabled || nextOpen === openStateRef.current) {
          return;
        }

        openStateRef.current = nextOpen;
        if (nextOpen && initializeActive) {
          setActiveValue(getInitialActiveValue(initialDirection));
        } else if (!nextOpen) {
          setActiveValue(null);
        }

        if (!isOpenControlled) {
          setUncontrolledOpen(nextOpen);
        }

        onOpenChange?.(nextOpen, event);
      };

      const commitOption = (
        resolvedOption: ResolvedOption,
        event: ComboBoxValueChangeEvent,
        restoreFocus = true
      ) => {
        if (disabled || resolvedOption.disabled) {
          return;
        }

        const nextValue = resolvedOption.option.value;
        if (!isValueControlled) {
          setUncontrolledValue(nextValue);
        }

        setDraftText({ baseValue: nextValue, text: resolvedOption.text });
        setFilterText("");
        onValueChange?.(nextValue, resolvedOption.option, event);
        requestOpen(false, event);
        if (restoreFocus) {
          inputRef.current?.focus();
        }
      };

      const commitCustomText = (
        event: FocusEvent<HTMLInputElement> | ReactKeyboardEvent<HTMLInputElement>
      ) => {
        if (!editable) {
          return;
        }

        const submittedText = displayText;
        if (submittedText.trim().length === 0) {
          return;
        }

        const matchingOption = resolvedOptions.find(
          (resolvedOption) =>
            !resolvedOption.disabled &&
            resolvedOption.text.toLocaleLowerCase() === submittedText.toLocaleLowerCase()
        );

        if (matchingOption) {
          if (valuesEqual(matchingOption.option.value, selectedValue)) {
            return;
          }

          commitOption(matchingOption, event, event.type !== "blur");
          return;
        }

        if (
          selectedOption === undefined &&
          selectedValue !== null &&
          String(selectedValue) === submittedText
        ) {
          return;
        }

        if (!isValueControlled) {
          setUncontrolledValue(submittedText);
        }

        setDraftText({ baseValue: submittedText, text: submittedText });
        setFilterText("");
        onTextSubmit?.(submittedText, event);
        onValueChange?.(submittedText, undefined, event);
      };

      const moveActiveOption = (direction: 1 | -1) => {
        const enabledOptions = visibleOptions.filter((resolvedOption) => !resolvedOption.disabled);
        if (enabledOptions.length === 0) {
          setActiveValue(null);
          return;
        }

        const currentIndex = enabledOptions.findIndex((resolvedOption) =>
          valuesEqual(resolvedOption.option.value, activeValue)
        );
        if (currentIndex === -1) {
          setActiveValue(
            (direction === 1 ? enabledOptions[0] : enabledOptions[enabledOptions.length - 1]).option
              .value
          );
          return;
        }

        const nextIndex = Math.min(
          Math.max(currentIndex + direction, 0),
          enabledOptions.length - 1
        );
        setActiveValue(enabledOptions[nextIndex].option.value);
      };

      const handleTypeahead = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        const now = Date.now();
        const previousQuery =
          now - typeaheadRef.current.timestamp > TYPEAHEAD_RESET_MS
            ? ""
            : typeaheadRef.current.query;
        const pressedKey = event.key.toLocaleLowerCase();
        const isRepeatedCharacter =
          previousQuery.length > 0 &&
          [...previousQuery].every((queryCharacter) => queryCharacter === pressedKey);
        const nextQuery = isRepeatedCharacter ? pressedKey : `${previousQuery}${pressedKey}`;
        const enabledOptions = resolvedOptions.filter((resolvedOption) => !resolvedOption.disabled);
        const currentIndex = enabledOptions.findIndex((resolvedOption) =>
          valuesEqual(resolvedOption.option.value, activeValue ?? selectedValue)
        );
        const orderedOptions = [
          ...enabledOptions.slice(currentIndex + 1),
          ...enabledOptions.slice(0, currentIndex + 1)
        ];
        const match = orderedOptions.find((resolvedOption) =>
          resolvedOption.text.toLocaleLowerCase().startsWith(nextQuery)
        );

        typeaheadRef.current = { query: nextQuery, timestamp: now };
        if (!match) {
          return;
        }

        event.preventDefault();
        setFilterText("");
        requestOpen(true, event, "first", false);
        setActiveValue(match.option.value);
      };

      const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextText = event.currentTarget.value;
        setDraftText({ baseValue: selectedValue, text: nextText });
        setFilterText(nextText);
        setActiveValue(null);
        onTextChange?.(nextText, event);
        requestOpen(true, event, "first", false);
      };

      const handleInputClick = (event: ReactMouseEvent<HTMLInputElement>) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) {
          return;
        }

        setFilterText("");
        requestOpen(true, event);
      };

      const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
        onFocus?.(event);
      };

      const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
        onBlur?.(event);
        if (event.defaultPrevented) {
          return;
        }

        if (editable) {
          commitCustomText(event);
        }
        requestOpen(false, event);
      };

      const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || disabled) {
          return;
        }

        if (event.altKey && event.key === "ArrowDown") {
          event.preventDefault();
          requestOpen(true, event);
          return;
        }

        if (event.altKey && event.key === "ArrowUp") {
          event.preventDefault();
          requestOpen(false, event);
          return;
        }

        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            if (!isOpen) {
              requestOpen(true, event, "first");
            } else {
              moveActiveOption(1);
            }
            return;
          case "ArrowUp":
            event.preventDefault();
            if (!isOpen) {
              requestOpen(true, event, "last");
            } else {
              moveActiveOption(-1);
            }
            return;
          case "Home":
            if (isOpen || !editable) {
              event.preventDefault();
              requestOpen(true, event, "first");
              setActiveValue(getInitialActiveValue("first"));
            }
            return;
          case "End":
            if (isOpen || !editable) {
              event.preventDefault();
              requestOpen(true, event, "last");
              setActiveValue(getInitialActiveValue("last"));
            }
            return;
          case "Enter":
            event.preventDefault();
            if (isOpen && activeOption && !activeOption.disabled) {
              commitOption(activeOption, event);
            } else if (editable) {
              commitCustomText(event);
              requestOpen(false, event);
            } else {
              requestOpen(true, event);
            }
            return;
          case " ":
            if (!editable) {
              event.preventDefault();
              if (isOpen && activeOption && !activeOption.disabled) {
                commitOption(activeOption, event);
              } else {
                requestOpen(true, event);
              }
            }
            return;
          case "Escape":
            if (isOpen) {
              event.preventDefault();
              event.stopPropagation();
              requestOpen(false, event);
            }
            return;
          default:
            if (
              !editable &&
              !event.altKey &&
              !event.ctrlKey &&
              !event.metaKey &&
              event.key.length === 1 &&
              event.key !== " "
            ) {
              handleTypeahead(event);
            }
        }
      };

      const handleToggleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
        if (disabled) {
          return;
        }

        inputRef.current?.focus();
        setFilterText("");
        requestOpen(!isOpen, event);
      };

      useEffect(() => {
        setPortalContainer(inputRef.current?.ownerDocument.body ?? null);
      }, []);

      useEffect(() => {
        const ownerDocument = inputRef.current?.ownerDocument;
        if (!isOpen || !ownerDocument) {
          return;
        }

        const handleOutsidePointer = (event: PointerEvent) => {
          const target = event.target;
          if (
            !(target instanceof Node) ||
            rootRef.current?.contains(target) ||
            listboxRef.current?.contains(target)
          ) {
            return;
          }

          requestOpen(false, event);
        };

        ownerDocument.addEventListener("pointerdown", handleOutsidePointer);
        return () => ownerDocument.removeEventListener("pointerdown", handleOutsidePointer);
      }, [isOpen]);

      useEffect(() => {
        if (!isOpen || !activeOptionId) {
          return;
        }

        const activeElement = inputRef.current?.ownerDocument.getElementById(activeOptionId);
        if (activeElement && "scrollIntoView" in activeElement) {
          activeElement.scrollIntoView({ block: "nearest" });
        }
      }, [activeOptionId, isOpen, portalContainer]);

      useIsomorphicLayoutEffect(() => {
        if (!isOpen || !portalContainer) {
          setPositionReady(false);
          return;
        }

        const rootElement = rootRef.current;
        const listboxElement = listboxRef.current;
        const ownerWindow = rootElement?.ownerDocument.defaultView;
        if (!rootElement || !listboxElement || !ownerWindow) {
          setPositionReady(false);
          return;
        }

        const updatePosition = () => {
          const rootRect = rootElement.getBoundingClientRect();
          const listboxRect = listboxElement.getBoundingClientRect();
          const rootStyles = ownerWindow.getComputedStyle(rootElement);
          const gap =
            Number.parseFloat(rootStyles.getPropertyValue("--rwu-spacing-xs")) ||
            FALLBACK_VIEWPORT_GAP;
          const margin =
            Number.parseFloat(rootStyles.getPropertyValue("--rwu-spacing-md")) ||
            FALLBACK_VIEWPORT_MARGIN;
          const availableBelow = ownerWindow.innerHeight - rootRect.bottom - margin - gap;
          const availableAbove = rootRect.top - margin - gap;
          const placement =
            availableBelow >= Math.min(listboxRect.height, availableAbove) ||
            availableBelow >= availableAbove
              ? "bottom"
              : "top";
          const availableHeight = Math.max(
            0,
            placement === "bottom" ? availableBelow : availableAbove
          );
          const minWidth = rootRect.width;
          const measuredWidth = Math.max(listboxRect.width, minWidth);
          const maxLeft = Math.max(margin, ownerWindow.innerWidth - measuredWidth - margin);
          const left = Math.min(Math.max(rootRect.left, margin), maxLeft);
          const renderedHeight = Math.min(listboxRect.height, availableHeight);
          const top =
            placement === "bottom"
              ? rootRect.bottom + gap
              : Math.max(margin, rootRect.top - gap - renderedHeight);

          setPosition({ left, maxHeight: availableHeight, minWidth, placement, top });
          setPositionReady(true);
        };

        updatePosition();
        ownerWindow.addEventListener("resize", updatePosition);
        ownerWindow.addEventListener("scroll", updatePosition, true);
        return () => {
          ownerWindow.removeEventListener("resize", updatePosition);
          ownerWindow.removeEventListener("scroll", updatePosition, true);
        };
      }, [isOpen, noOptionsMessage, portalContainer, visibleOptions.length]);

      const rootClasses = [
        "ui-combobox",
        editable ? "ui-combobox-editable" : "ui-combobox-select-only",
        isOpen ? "ui-combobox-open" : "",
        disabled ? "ui-combobox-disabled" : "",
        rootClassName
      ]
        .filter(Boolean)
        .join(" ");
      const inputClasses = ["ui-combobox-input", className].filter(Boolean).join(" ");
      const popup = isOpen ? (
        <ul
          ref={listboxRef}
          aria-label={listboxAriaLabel ?? ariaLabel ?? (ariaLabelledBy ? undefined : "Options")}
          aria-labelledby={
            listboxAriaLabel === undefined && ariaLabel === undefined ? ariaLabelledBy : undefined
          }
          className="ui-combobox-listbox"
          data-placement={position.placement}
          id={listboxId}
          role="listbox"
          style={{
            left: position.left,
            maxHeight: positionReady ? position.maxHeight : undefined,
            minWidth: position.minWidth || undefined,
            top: position.top,
            visibility: positionReady ? "visible" : "hidden"
          }}
        >
          {visibleOptions.map((resolvedOption) => {
            const isSelected = valuesEqual(resolvedOption.option.value, selectedValue);
            const isActive = valuesEqual(resolvedOption.option.value, activeValue);
            const optionClasses = [
              "ui-combobox-option",
              isSelected ? "selected" : "",
              isActive ? "active" : "",
              resolvedOption.disabled ? "disabled" : ""
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <li
                aria-disabled={resolvedOption.disabled || undefined}
                aria-label={resolvedOption.text}
                aria-selected={isSelected}
                className={optionClasses}
                id={resolvedOption.id}
                key={`${typeof resolvedOption.option.value}:${String(resolvedOption.option.value)}`}
                role="option"
                onClick={(event) => commitOption(resolvedOption, event)}
                onPointerDown={(event) => event.preventDefault()}
                onPointerMove={() => {
                  if (!resolvedOption.disabled) {
                    setActiveValue(resolvedOption.option.value);
                  }
                }}
              >
                {resolvedOption.option.icon ? (
                  <span aria-hidden="true" className="ui-combobox-option-icon">
                    {resolvedOption.option.icon}
                  </span>
                ) : null}
                <span className="ui-combobox-option-label">{resolvedOption.option.label}</span>
              </li>
            );
          })}
          {visibleOptions.length === 0 ? (
            <li aria-live="polite" className="ui-combobox-empty" role="presentation">
              {noOptionsMessage}
            </li>
          ) : null}
        </ul>
      ) : null;

      return (
        <div ref={rootRef} className={rootClasses}>
          <input
            {...inputProps}
            ref={assignInputRef}
            aria-activedescendant={activeOptionId}
            aria-autocomplete={editable ? "list" : "none"}
            aria-controls={listboxId}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            autoComplete={autoComplete}
            className={inputClasses}
            disabled={disabled}
            form={form}
            id={inputId}
            onBlur={handleInputBlur}
            onChange={editable ? handleInputChange : undefined}
            onClick={handleInputClick}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            readOnly={!editable}
            required={required}
            role="combobox"
            type="text"
            value={displayText}
          />
          {name ? (
            <input
              disabled={disabled}
              form={form}
              name={name}
              type="hidden"
              value={selectedValue === null ? "" : String(selectedValue)}
            />
          ) : null}
          <button
            aria-controls={listboxId}
            aria-expanded={isOpen}
            aria-label={
              toggleButtonAriaLabel ?? `${isOpen ? "Close" : "Open"} ${ariaLabel ?? "options"}`
            }
            className="ui-combobox-toggle"
            disabled={disabled}
            tabIndex={-1}
            type="button"
            onClick={handleToggleClick}
            onPointerDown={(event) => event.preventDefault()}
          >
            <span aria-hidden="true" className="ui-combobox-chevron" />
          </button>
          {portalContainer && popup ? createPortal(popup, portalContainer) : null}
        </div>
      );
    }
  );

ComboBox.displayName = "ComboBox";

export default ComboBox;
