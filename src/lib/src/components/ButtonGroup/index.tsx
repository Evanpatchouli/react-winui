import { forwardRef } from "react";
import type { HTMLAttributes } from "react";

/** Props for the Windows-styled button group container. */
export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {}

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, ...otherProps }, ref) => {
    return (
      <div className="ui-btn-group" {...otherProps} ref={ref}>
        {children}
      </div>
    );
  }
);

export default ButtonGroup;
