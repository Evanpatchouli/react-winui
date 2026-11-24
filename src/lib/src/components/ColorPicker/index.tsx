import { forwardRef, useId, useState } from "react";
import type { HTMLAttributes } from "react";
import ColorPickerItem from "./ColorPickerItem";
import ColorPickerPalette from "./ColorPickerPalette";

/** A named preset in the picker. */
export interface ColorPickerPreset {
  /** Six-digit sRGB color, including the leading hash. */
  value: string;
  /** Accessible name for the swatch. */
  label: string;
}

/** Props for a group of preset swatches and a native custom color picker. */
export interface ColorPickerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "defaultValue" | "onChange"
> {
  /** Controlled color in #rrggbb format. */
  value?: string;
  /** Initial uncontrolled color. Defaults to black. */
  defaultValue?: string;
  /** Called with the lowercase hex color when the selection changes. */
  onValueChange?: (value: string) => void;
  /** Optional named colors displayed before the custom color control. */
  presets?: readonly ColorPickerPreset[];
  /** Accessible name for the native picker. Defaults to "Custom color". */
  customColorLabel?: string;
  /** Disables all preset and custom color inputs. */
  disabled?: boolean;
}

const hexColor = /^#[0-9a-f]{6}$/i;

const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
  {
    value,
    defaultValue = "#000000",
    onValueChange,
    presets = [],
    customColorLabel = "Custom color",
    disabled = false,
    className,
    "aria-label": label = "Color picker",
    ...groupProps
  },
  ref
) {
  const name = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const selected = hexColor.test(currentValue) ? currentValue.toLowerCase() : "#000000";
  const options = new Map<string, string>();
  for (const preset of presets) {
    const color = preset.value.toLowerCase();
    if (hexColor.test(color) && !options.has(color)) options.set(color, preset.label);
  }

  function select(color: string) {
    if (disabled || selected === color) return;
    if (value === undefined) setInternalValue(color);
    onValueChange?.(color);
  }

  return (
    <div
      {...groupProps}
      ref={ref}
      role="group"
      aria-label={label}
      className={["ui-color-picker", className].filter(Boolean).join(" ")}
    >
      {Array.from(options, ([color, title]) => (
        <ColorPickerItem
          key={color}
          name={name}
          color={color}
          aria-label={title}
          checked={selected === color}
          disabled={disabled}
          onChange={() => select(color)}
        />
      ))}
      <ColorPickerPalette
        value={selected}
        aria-label={customColorLabel}
        disabled={disabled}
        onChange={(event) => select(event.currentTarget.value)}
      />
    </div>
  );
});

export default ColorPicker;
