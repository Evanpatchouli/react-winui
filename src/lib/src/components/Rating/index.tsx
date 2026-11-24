import { forwardRef, useId, useState } from "react";
import type { HTMLAttributes } from "react";

/** Properties for an editable star rating or read-only average. */
export interface RatingProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "defaultValue" | "onChange"
> {
  /** Current score. Zero represents an unrated item. */
  value?: number;
  /** Initial score for an uncontrolled rating. Defaults to zero. */
  defaultValue?: number;
  /** Called when the user selects a different score. */
  onValueChange?: (value: number) => void;
  /** Number of stars, from 1 to 100. Defaults to five. */
  max?: number;
  /** Displays a non-interactive score and preserves fractional values. */
  readOnly?: boolean;
  /** Disables all rating inputs. */
  disabled?: boolean;
  /** Form field name shared by the radio inputs. Defaults to a unique name. */
  name?: string;
  /** Returns the accessible text for an individual score or displayed average. */
  getItemLabel?: (value: number, max: number) => string;
}

const defaultLabel = (value: number, max: number) => `${value} of ${max}`;

// A single outline is shared by the empty, filled and fractional parts of each star.
const starPath = "10,1.8 12.5,7 18.2,7.8 14.1,11.9 15.1,17.7 10,15 4.9,17.7 5.9,11.9 1.8,7.8 7.5,7";

function Star({ fill }: { fill: number }) {
  return (
    <span className="ui-rating-star" aria-hidden="true">
      <svg viewBox="0 0 20 20" focusable="false">
        <polygon points={starPath} />
      </svg>
      <span className="ui-rating-fill" style={{ inlineSize: `${fill * 100}%` }}>
        <svg viewBox="0 0 20 20" focusable="false">
          <polygon points={starPath} />
        </svg>
      </span>
    </span>
  );
}

const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating(
  {
    value,
    defaultValue = 0,
    max = 5,
    readOnly = false,
    disabled = false,
    name,
    onValueChange,
    getItemLabel = defaultLabel,
    className,
    "aria-label": label = "Rating",
    ...rootProps
  },
  ref
) {
  const groupId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hovered, setHovered] = useState(0);
  const count = Number.isFinite(max) ? Math.min(100, Math.max(1, Math.floor(max))) : 5;
  const rawScore = value ?? internalValue;
  const bounded = Number.isFinite(rawScore) ? Math.max(0, Math.min(count, rawScore)) : 0;
  const score = readOnly ? bounded : Math.round(bounded);
  const preview = !disabled && !readOnly && hovered > 0 ? hovered : score;

  return (
    <div
      {...rootProps}
      ref={ref}
      className={["ui-rating", className].filter(Boolean).join(" ")}
      role={readOnly ? "meter" : "radiogroup"}
      aria-label={label}
      aria-disabled={disabled || undefined}
      aria-valuemin={readOnly ? 0 : undefined}
      aria-valuemax={readOnly ? count : undefined}
      aria-valuenow={readOnly ? score : undefined}
      aria-valuetext={readOnly ? getItemLabel(score, count) : undefined}
    >
      {Array.from({ length: count }, (_, index) => {
        const option = index + 1;
        const star = <Star fill={Math.min(1, Math.max(0, preview - index))} />;
        if (readOnly)
          return (
            <span key={option} className="ui-rating-item">
              {star}
            </span>
          );
        return (
          <label
            key={option}
            className="ui-rating-item"
            onMouseEnter={() => {
              if (!disabled) setHovered(option);
            }}
            onMouseLeave={() => setHovered(0)}
          >
            <input
              type="radio"
              name={name ?? groupId}
              value={option}
              checked={score === option}
              disabled={disabled}
              aria-label={getItemLabel(option, count)}
              onKeyDown={() => setHovered(0)}
              onChange={() => {
                if (value === undefined) setInternalValue(option);
                onValueChange?.(option);
              }}
            />
            {star}
          </label>
        );
      })}
    </div>
  );
});

export default Rating;
