import { useEffect, useState } from "react";
import type { CSSProperties, FC, ReactNode } from "react";

/** Props for the Windows-styled splash screen. */
export interface SplashScreenProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  logo?: ReactNode;
  duration?: number;
  isVisible?: boolean;
  backgroundColor?: CSSProperties["backgroundColor"];
}

const SplashScreen: FC<SplashScreenProps> = ({
  title = "",
  subtitle = "",
  logo,
  duration = 0,
  isVisible = false,
  backgroundColor
}) => {
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      isVisible ? setOpen(true) : setOpen(false);
    }, duration);
  }, [isVisible, duration]);

  const style: CSSProperties = isOpen ? { display: "flex", backgroundColor } : { display: "none" };

  return (
    <div style={style} className="ui-splash-screen ui-flex-center">
      {logo && <>{logo}</>}
      {title && <h1 className="color-white">{title}</h1>}
      {subtitle && <h3 className="color-white">{subtitle}</h3>}
    </div>
  );
};

export default SplashScreen;
