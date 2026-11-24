import type { CSSProperties, ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react";

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
  /** Fill color for selected and preview stars. Defaults to the theme accent. */
  starColor?: CSSProperties["color"];
  /** Displays a non-interactive score and preserves fractional values. */
  readOnly?: boolean;
  /** Disables all rating inputs. */
  disabled?: boolean;
  /** Form field name shared by the radio inputs. Defaults to a unique name. */
  name?: string;
  /** Returns the accessible text for an individual score or displayed average. */
  getItemLabel?: (value: number, max: number) => string;
}

declare const Rating: ForwardRefExoticComponent<RatingProps & RefAttributes<HTMLDivElement>>;
export default Rating;
