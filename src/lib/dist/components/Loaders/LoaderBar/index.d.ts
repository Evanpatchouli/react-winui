/** Props for the animated horizontal loader bar. */
export interface LoaderBarProps {
  /** Use the light loader color variant. */
  setTheme?: string;
  /** Whether the four loader balls should animate. */
  isLoading?: boolean;
}

declare const LoaderBar: (props: LoaderBarProps) => JSX.Element;

export default LoaderBar;
