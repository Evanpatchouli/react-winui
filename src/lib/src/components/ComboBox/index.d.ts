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

declare const ComboBox: ForwardRefExoticComponent<ComboBoxProps & RefAttributes<HTMLInputElement>>;

export default ComboBox;
