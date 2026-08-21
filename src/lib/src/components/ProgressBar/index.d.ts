import type { CSSProperties } from "react";

/** Supported progress bar display states. */
export type ProgressBarValue = number | "hidden" | "indeterminate";

/** Props for the Windows-styled progress bar component. */
export interface ProgressBarProps {
  tooltip?: string;
  color?: CSSProperties["backgroundColor"];
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
  setProgress?: ProgressBarValue;
}

declare const ProgressBar: (props: ProgressBarProps) => JSX.Element;

export default ProgressBar;
