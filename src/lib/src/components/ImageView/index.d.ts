import type { CSSProperties, FC, ImgHTMLAttributes } from "react";

export interface ImageViewProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "height" | "onError" | "onLoad" | "src" | "width"
> {
  alt?: string;
  src?: ImgHTMLAttributes<HTMLImageElement>["src"];
  tooltip?: string;
  onLoad?: () => void;
  onError?: () => void;
  objectFit?: CSSProperties["objectFit"];
  isLoading?: boolean;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  padding?: CSSProperties["padding"];
  margin?: CSSProperties["margin"];
  borderRadius?: CSSProperties["borderRadius"];
}

declare const ImageView: FC<ImageViewProps>;

export default ImageView;
