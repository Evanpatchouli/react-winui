import type { ChangeEventHandler, CSSProperties, FC, InputHTMLAttributes } from "react";

/** Props for an individual radio-style color swatch. */
export interface ColorPickerItemProps {
  name?: InputHTMLAttributes<HTMLInputElement>["name"];
  color?: string;
  disabled?: InputHTMLAttributes<HTMLInputElement>["disabled"];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  defaultChecked?: InputHTMLAttributes<HTMLInputElement>["defaultChecked"];
}

const ColorPickerItem: FC<ColorPickerItemProps> = (props) => {
  const { color = "#eee" } = props;

  return (
    <label className="ui-color-picker-item">
      <input
        type="radio"
        className="item"
        name={props.name}
        value={color}
        disabled={props.disabled}
        onChange={props.onChange}
        defaultChecked={props.defaultChecked}
      />
      <div
        style={{
          width: props.width,
          height: props.height,
          backgroundColor: color
        }}
      />
    </label>
  );
};

export default ColorPickerItem;
