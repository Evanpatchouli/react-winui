import type { FC } from "react";
import type {
  PopoverContentProps,
  PopoverOpenChangeEvent,
  PopoverOpenChangeHandler,
  PopoverPlacement,
  PopoverProps
} from "../Popover";

export type {
  PopoverContentProps,
  PopoverOpenChangeEvent,
  PopoverOpenChangeHandler,
  PopoverPlacement,
  PopoverProps
};

export type FlyoutProps = PopoverProps;

declare const Flyout: FC<FlyoutProps>;

export default Flyout;
