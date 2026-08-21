import type { FC } from "react";

const LoaderBusyWrapper: FC = () => {
  return (
    <svg viewBox="0 0 16 16">
      <circle className="ui-ldr-busy" cx="8px" cy="8px" r="7px" />
    </svg>
  );
};

export default LoaderBusyWrapper;
