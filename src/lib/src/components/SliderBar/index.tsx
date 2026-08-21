import { forwardRef, useRef } from "react";
import type {
  ChangeEventHandler,
  CSSProperties,
  EventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
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

const noop: ChangeEventHandler<HTMLInputElement> = () => {};

const SliderBar = forwardRef<HTMLInputElement, SliderBarProps>(
  (
    {
      step = 1,
      min = 0,
      max = 100,
      defaultValue = 0,
      onChange = noop,
      showPopupValue = true,
      width,
      ticks,
      tooltip,
      orientation,
      onDragEnd,
      onDragStart,
      onMouseEnter,
      ...otherProps
    },
    ref
  ) => {
    const popupRef = useRef<HTMLSpanElement>(null);
    const defaultValueNumber = Number(defaultValue);
    const maxNumber = Number(max);
    const defaultPercentage = (defaultValueNumber / maxNumber) * 100;
    const popupPercentage = (defaultValueNumber / maxNumber) * 72;

    const toggleVisible = () => {
      const popup = popupRef.current;

      if (showPopupValue && popup && popup.style.visibility !== "visible") {
        popup.style.visibility = "visible";
        popup.style.opacity = "1";
      }
    };

    const toggleHidden = () => {
      const popup = popupRef.current;

      if (showPopupValue && popup) {
        popup.style.visibility = "hidden";
        popup.style.opacity = "0";
      }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      toggleVisible();
      onChange(event);
    };

    return (
      <div
        title={tooltip}
        style={{ width }}
        className="ui-range-slider"
        data-win-orient={orientation === "vertical" ? "vertical" : "horizontal"}
      >
        <input
          {...otherProps}
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue}
          onMouseUp={onDragEnd}
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
          onTouchEnd={onDragEnd}
          onChange={handleChange}
          onMouseEnter={onMouseEnter}
          onMouseLeave={toggleHidden}
          style={{
            background: `linear-gradient(90deg, var(--color-primary-adaptive) ${defaultPercentage}%, #999999 20.1%)`
          }}
        />
        {showPopupValue && (
          <span
            ref={popupRef}
            className="ui-range-slider-popup"
            style={{ left: `${popupPercentage}%` }}
          >
            {defaultValue}
          </span>
        )}
        {ticks && (
          <div className="ui-datalist">
            {ticks.map((tick, index) => {
              const tickProps = { value: tick };
              return <p key={index} {...tickProps} />;
            })}
          </div>
        )}
      </div>
    );
  }
);

export default SliderBar;
