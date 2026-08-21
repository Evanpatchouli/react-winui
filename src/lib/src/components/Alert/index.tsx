import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react";
import type { FC, ForwardRefExoticComponent, MouseEvent, ReactNode, RefAttributes } from "react";
import { ScrollView } from "../../api";

/** Methods exposed by an Alert ref. */
export interface AlertHandle {
  open: () => void;
  close: () => void;
}

/** Props for the Windows-styled alert surface. */
export interface AlertProps {
  title?: ReactNode;
  message?: ReactNode;
  isVisible?: boolean;
  children?: ReactNode;
  backdropBlur?: boolean;
  onBackdropPress?: () => void;
}

/** Props shared by Alert.Header and Alert.Footer. */
export interface AlertSlotProps {
  children?: ReactNode;
}

/** Public component type including Alert's compound slots. */
export interface AlertComponent extends ForwardRefExoticComponent<
  AlertProps & RefAttributes<AlertHandle>
> {
  Header: FC<AlertSlotProps>;
  Footer: FC<AlertSlotProps>;
}

const noop = () => {};

const AlertHeader: FC<AlertSlotProps> = ({ children }) => (
  <div className="ui-alert-haeder">{children}</div>
);

const AlertFooter: FC<AlertSlotProps> = ({ children }) => (
  <div className="ui-alert-footer">{children}</div>
);

const Alert: AlertComponent = Object.assign(
  forwardRef<AlertHandle, AlertProps>(
    (
      { title, message, children, isVisible = false, backdropBlur = false, onBackdropPress = noop },
      ref
    ) => {
      const [isVisibleInternal, setIsVisible] = useState(false);
      const alertRef = useRef<HTMLDivElement>(null);

      const open = () => {
        setIsVisible(true);
      };

      const close = () => {
        setIsVisible(false);
      };

      useImperativeHandle(ref, () => ({ open, close }));

      const onBackdropPressEvent = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
          onBackdropPress();
        }
      };

      useMemo(() => {
        isVisible || isVisibleInternal ? ScrollView.disableScroll() : ScrollView.enableScroll();
      }, [isVisible, isVisibleInternal]);

      return (
        <div
          ref={alertRef}
          tabIndex={-1}
          onClick={onBackdropPressEvent}
          className={isVisible || isVisibleInternal ? "ui-alert show" : "ui-alert"}
        >
          <div
            className={`ui-alert-modal${backdropBlur ? " ui-backdrop-blur" : ""}`}
            aria-modal="true"
            role="dialog"
          >
            {(title || message) && (
              <div className="ui-alert-header">
                {title && <h1>{title}</h1>}
                {message && <div className="ui-alert-message">{message}</div>}
              </div>
            )}
            {children}
          </div>
        </div>
      );
    }
  ),
  {
    Header: AlertHeader,
    Footer: AlertFooter
  }
);

export default Alert;
