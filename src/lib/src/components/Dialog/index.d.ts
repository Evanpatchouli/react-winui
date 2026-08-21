import type { CSSProperties, FC, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

export interface DialogHandle {
  open: () => void;
  close: () => void;
}

export interface DialogProps {
  style?: CSSProperties;
  isVisible?: boolean;
  children?: ReactNode;
  backdropBlur?: boolean;
  onBackdropPress?: () => void;
}

export interface DialogSlotProps {
  style?: CSSProperties;
  children?: ReactNode;
}

export interface DialogComponent extends ForwardRefExoticComponent<
  DialogProps & RefAttributes<DialogHandle>
> {
  Body: FC<DialogSlotProps>;
  Footer: FC<DialogSlotProps>;
}

declare const Dialog: DialogComponent;

export default Dialog;
