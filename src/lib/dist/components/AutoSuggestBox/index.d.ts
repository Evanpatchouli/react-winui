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

declare const AutoSuggestBox: ForwardRefExoticComponent<
  AutoSuggestBoxProps & RefAttributes<HTMLInputElement>
>;

export default AutoSuggestBox;
