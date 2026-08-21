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

const ProgressBar = ({ color, width, height, tooltip, setProgress = 0 }: ProgressBarProps) => {
  return (
    <div
      title={tooltip}
      className={`ui-progress-bar${setProgress === "hidden" ? "hide" : ""}`}
      style={{
        height,
        width
      }}
    >
      <span
        role="progressbar"
        {...(setProgress === "indeterminate" ? { className: "indeterminate" } : {})}
        style={{
          width: setProgress !== "indeterminate" ? `${setProgress}%` : "",
          backgroundColor: color
        }}
      />
    </div>
  );
};

export default ProgressBar;
