import Popover from "../Popover";
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

/** Props for the semantic Flyout alias of Popover. */
export type FlyoutProps = PopoverProps;

/** A light-dismiss Windows Flyout backed by the Popover implementation. */
const Flyout = (props: FlyoutProps) => <Popover {...props} />;

Flyout.displayName = "Flyout";

export default Flyout;
