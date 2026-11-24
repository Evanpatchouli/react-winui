import { useState } from "react";
import type { ChangeEventHandler, CSSProperties, FC, InputHTMLAttributes } from "react";

/** Props for the native color-picker palette control. */
export interface ColorPickerPaletteProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange" | "onChangeCapture"
> {
  color?: string;
  /** Controlled six-digit hex value. The legacy color prop sets the initial color. */
  value?: string;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const noop: ChangeEventHandler<HTMLInputElement> = () => {};

const ColorPickerPalette: FC<ColorPickerPaletteProps> = (props) => {
  const { color = "#eee", value, width, height, onChange = noop, ...otherProps } = props;
  const [internalColor, setColor] = useState(color);
  const icolor = value ?? internalColor;

  return (
    <label className="ui-color-picker-item palette">
      <input
        type="color"
        value={icolor}
        {...otherProps}
        disabled={props.disabled}
        onChange={onChange}
        onChangeCapture={(event) => {
          if (value === undefined) setColor(event.currentTarget.value);
        }}
      />
      <div
        style={{
          width,
          height,
          backgroundColor: icolor
        }}
      />
    </label>
  );
};

export default ColorPickerPalette;
