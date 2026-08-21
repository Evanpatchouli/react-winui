import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import type {
  CSSProperties,
  FC,
  ForwardRefExoticComponent,
  MouseEvent,
  ReactNode,
  RefAttributes
} from "react";
import { ScrollView } from "../../api";

/** Methods exposed by a Dialog ref. */
export interface DialogHandle {
  open: () => void;
  close: () => void;
}

/** Props for the Windows-styled dialog surface. */
export interface DialogProps {
  style?: CSSProperties;
  isVisible?: boolean;
  children?: ReactNode;
  backdropBlur?: boolean;
  onBackdropPress?: () => void;
}

/** Props shared by Dialog.Body and Dialog.Footer. */
export interface DialogSlotProps {
  style?: CSSProperties;
  children?: ReactNode;
}

/** Public component type including Dialog's compound slots. */
export interface DialogComponent extends ForwardRefExoticComponent<
  DialogProps & RefAttributes<DialogHandle>
> {
  Body: FC<DialogSlotProps>;
  Footer: FC<DialogSlotProps>;
}

const noop = () => {};

const DialogBody: FC<DialogSlotProps> = ({ style, children }) => (
  <div className="ui-dialog-body" style={style}>
    {children}
  </div>
);

const DialogFooter: FC<DialogSlotProps> = ({ style, children }) => (
  <div className="ui-dialog-footer" style={style}>
    {children}
  </div>
);

const Dialog: DialogComponent = Object.assign(
  forwardRef<DialogHandle, DialogProps>(
    ({ style, children, isVisible = false, backdropBlur = false, onBackdropPress = noop }, ref) => {
      const [isVisibleInternal, setIsVisible] = useState(false);
      const dialogRef = useRef<HTMLDivElement>(null);

      const open = () => {
        setIsVisible(true);
      };

      const close = () => {
        setIsVisible(false);
      };

      const onBackdropPressEvent = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
          onBackdropPress();
        }
      };

      useImperativeHandle(ref, () => ({ open, close }));

      useMemo(() => {
        isVisible || isVisibleInternal ? ScrollView.disableScroll() : ScrollView.enableScroll();
      }, [isVisible, isVisibleInternal]);

      return (
        <div
          ref={dialogRef}
          className={isVisible || isVisibleInternal ? "ui-dialog show" : "ui-dialog"}
          onClick={onBackdropPressEvent}
          tabIndex={-1}
        >
          <div
            className={`ui-dialog-modal${backdropBlur ? " ui-backdrop-blur" : ""}`}
            style={style}
          >
            {children}
          </div>
        </div>
      );
    }
  ),
  {
    Body: DialogBody,
    Footer: DialogFooter
  }
);

export default Dialog;
