import type { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react";

/** Props for the Windows-styled button group container. */
export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {}

declare const ButtonGroup: ForwardRefExoticComponent<
  ButtonGroupProps & RefAttributes<HTMLDivElement>
>;

export default ButtonGroup;
