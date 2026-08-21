import { useEffect, useMemo, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { ScrollView, getScreenOffset } from "../../../api";
import { useOutSideClick } from "../../../hooks";

/** The value type used by a custom Select option. */
export type SelectOptionValue = string | number;

/** An item rendered in the custom Select menu. */
export interface SelectOption {
  value: SelectOptionValue;
  label: ReactNode;
  icon?: ReactNode;
}

/** Callback invoked with the selected option value. */
export type SelectChangeHandler = (value: SelectOptionValue) => void;

/** Props for the Windows-styled custom Select menu. */
export interface SelectProps {
  data: SelectOption[];
  tooltip?: string;
  trigger?: ReactNode;
  defaultValue?: SelectOptionValue;
  onChange?: SelectChangeHandler;
  backdropBlur?: boolean;
}

const noop: SelectChangeHandler = () => {};

const Select: FC<SelectProps> = ({
  data,
  trigger,
  tooltip,
  defaultValue,
  backdropBlur = false,
  onChange = noop
}) => {
  const dataDefault: SelectOption[] = [];
  const [iValue, setIValue] = useState<SelectOptionValue>("");
  const [isOpen, setOpen] = useState(false);
  const [isReverse, setReverse] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [ilabel, setILabel] = useState<ReactNode>("Select");
  const [items, setItem] = useState<SelectOption[]>(dataDefault);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const firstItem = items[0];

    if (!firstItem) {
      setILabel("Select");
      setIValue("");
      return;
    }

    if (defaultValue) {
      const defaultItem = items.find((item) => item.value === defaultValue);

      if (defaultItem) {
        setIValue(defaultItem.value);
        setILabel(defaultItem.label);
        return;
      }
    }

    setILabel(firstItem.label);
    setIValue(firstItem.value);
  }, [data, defaultValue, items]);

  useMemo(() => setItem(data), [data]);

  useMemo(() => {
    isOpen ? ScrollView.disableScroll() : ScrollView.enableScroll();
  }, [isOpen]);

  const toggleDropdown = () => {
    !isShown ? setItem(data) : setIsShown(true);
    setOpen(!isOpen);
    getScreenOffset(wrapperRef) ? setReverse(" reverse") : setReverse("");
  };

  const handleItemClick = (value: SelectOptionValue, label: ReactNode) => {
    setILabel(label);
    setIValue(value);
    toggleDropdown();
    onChange(value);
  };

  useOutSideClick(wrapperRef, () => setOpen(false));

  return (
    <div ref={wrapperRef} onClick={toggleDropdown} className="ui-menu-select">
      {trigger ? (
        <>{trigger}</>
      ) : (
        <span className="ui-menu-title" title={tooltip}>
          {ilabel}
        </span>
      )}
      <ul
        className={`ui-menu-list${isOpen ? " show" : ""}${isReverse}${
          backdropBlur ? " ui-backdrop-blur" : ""
        }`}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={`ui-menu-list-item${item.value === iValue ? " selected" : ""}`}
            onClick={() => handleItemClick(item.value, item.label)}
          >
            <span>
              {item.icon}
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

Select.defaultProps = {
  onChange: noop
};

export default Select;
