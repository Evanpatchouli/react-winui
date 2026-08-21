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

const SplashScreen: FC<SplashScreenProps> = (props) => {
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      props.isVisible ? setOpen(true) : setOpen(false);
    }, props.duration);
  }, [props.isVisible, props.duration]);

  const style: CSSProperties = isOpen
    ? { display: "flex", backgroundColor: props.backgroundColor }
    : { display: "none" };

  return (
    <div style={style} className="ui-splash-screen ui-flex-center">
      {props.logo && <>{props.logo}</>}
      {props.title && <h1 className="color-white">{props.title}</h1>}
      {props.subtitle && <h3 className="color-white">{props.subtitle}</h3>}
    </div>
  );
};

SplashScreen.defaultProps = {
  title: "",
  subtitle: "",
  duration: 0,
  isVisible: false
};

export default SplashScreen;
