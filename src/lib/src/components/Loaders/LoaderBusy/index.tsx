import type { HTMLAttributes } from "react";
import LoaderBusyWrapper from "../../_common/LoaderBusyWrapper";

/** Supported loader sizes. */
export type LoaderBusySize = "small" | "default" | "large";

/** Props for the Windows-styled busy loader. */
export interface LoaderBusyProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "className"
> {
  /** Use the light loader color variant. */
  setTheme?: string;
  /** Whether the loader is visible and animating. */
  isLoading?: boolean;
  /** Render the small, default, or large loader size. */
  size?: LoaderBusySize;
  className?: string;
}

const LoaderBusy = ({
  size,
  setTheme,
  isLoading = true,
  ...otherProps
}: LoaderBusyProps) => {
  const toggleLoading = () => (isLoading ? " animate" : "");

  const setSize = () => {
    if (size === "large") return " loader-lg";
    if (size === "small") return " loader-sm";
    return "";
  };

  const renderLoader = () => (
    <div
      className={`ui-loader-busy ${setTheme === "light" ? "light" : ""}${setSize()}${toggleLoading()}`}
      {...otherProps}
    >
      <LoaderBusyWrapper />
    </div>
  );

  return <>{renderLoader()}</>;
};

export default LoaderBusy;
