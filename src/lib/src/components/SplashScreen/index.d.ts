import type { CSSProperties, ReactNode } from "react";

/** Props for the Windows-styled splash screen. */
export interface SplashScreenProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  logo?: ReactNode;
  duration?: number;
  isVisible?: boolean;
  backgroundColor?: CSSProperties["backgroundColor"];
}

declare const SplashScreen: (props: SplashScreenProps) => JSX.Element;

export default SplashScreen;
