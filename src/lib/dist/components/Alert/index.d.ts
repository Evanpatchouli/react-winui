import type { FC, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

export interface AlertHandle {
  open: () => void;
  close: () => void;
}

export interface AlertProps {
  title?: ReactNode;
  message?: ReactNode;
  isVisible?: boolean;
  children?: ReactNode;
  backdropBlur?: boolean;
  onBackdropPress?: () => void;
}

export interface AlertSlotProps {
  children?: ReactNode;
}

export interface AlertComponent extends ForwardRefExoticComponent<
  AlertProps & RefAttributes<AlertHandle>
> {
  Header: FC<AlertSlotProps>;
  Footer: FC<AlertSlotProps>;
}

declare const Alert: AlertComponent;

export default Alert;
