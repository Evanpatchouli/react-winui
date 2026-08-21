import type {
  ChangeEventHandler,
  CSSProperties,
  EventHandler,
  ForwardRefExoticComponent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  RefAttributes,
  SyntheticEvent
} from "react";

/** Pointer/touch handler used by the slider drag lifecycle props. */
export type SliderDragHandler = EventHandler<SyntheticEvent<HTMLInputElement>>;

/** Props for the Windows-styled range slider component. */
export interface SliderBarProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "min" | "max" | "step" | "defaultValue" | "onChange" | "width"
> {
  type?: HTMLInputTypeAttribute;
  width?: CSSProperties["width"];
  min?: number | string;
  max?: number | string;
  step?: number | string;
  tooltip?: string;
  showPopupValue?: boolean;
  defaultValue?: number | string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onDragEnd?: SliderDragHandler;
  onDragStart?: SliderDragHandler;
  onMouseEnter?: InputHTMLAttributes<HTMLInputElement>["onMouseEnter"];
  orientation?: "vertical" | "horizontal";
  ticks?: Array<number | string>;
}

declare const SliderBar: ForwardRefExoticComponent<
  SliderBarProps & RefAttributes<HTMLInputElement>
>;

export default SliderBar;
