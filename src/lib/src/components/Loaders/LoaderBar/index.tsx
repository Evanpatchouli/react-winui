/** Props for the animated horizontal loader bar. */
export interface LoaderBarProps {
  /** Use the light loader color variant. */
  setTheme?: string;
  /** Whether the four loader balls should animate. */
  isLoading?: boolean;
}

const LoaderBar = ({ setTheme, isLoading = true }: LoaderBarProps) => {
  const setupTheme = () => {
    return setTheme === "light" ? " light" : "";
  };

  return (
    <div
      className={
        isLoading
          ? `ui-loader-bar animate${setupTheme()}`
          : `ui-loader-bar${setupTheme()}`
      }
    >
      <div className="ui-ldr-bar ball-1" />
      <div className="ui-ldr-bar ball-2" />
      <div className="ui-ldr-bar ball-3" />
      <div className="ui-ldr-bar ball-4" />
    </div>
  );
};

export default LoaderBar;
