import type { HTMLAttributes } from "react";

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

declare const LoaderBusy: (props: LoaderBusyProps) => JSX.Element;

export default LoaderBusy;
