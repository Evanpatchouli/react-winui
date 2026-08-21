import { useState } from "react";
import type { CSSProperties, FC, ImgHTMLAttributes } from "react";
import LoaderBusyWrapper from "../_common/LoaderBusyWrapper";

/** Props for the Windows-styled image view. */
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

const noop = () => {};

const ImageView: FC<ImageViewProps> = (props) => {
  const {
    src,
    alt,
    objectFit,
    tooltip,
    width,
    height,
    margin,
    padding,
    borderRadius,
    isLoading,
    onLoad = noop,
    onError = noop,
    ...otherProps
  } = props;

  const [didLoad, setLoad] = useState(false);

  const renderLoader = () => {
    return (
      <div className="ui-img-view-loader">
        <div className="ui-loader-busy light animate">
          <LoaderBusyWrapper />
        </div>
      </div>
    );
  };

  const handleOnLoad = () => {
    setLoad(true);
  };

  return (
    <div
      className="ui-img-view-container"
      title={tooltip}
      style={{
        width,
        height,
        margin,
        padding,
        borderRadius
      }}
    >
      <img
        className="ui-img-view"
        src={src}
        alt={alt}
        {...otherProps}
        style={{
          objectFit
        }}
        onLoad={() => {
          handleOnLoad();
          onLoad();
        }}
        onError={() => {
          handleOnLoad();
          onError();
        }}
      />
      {isLoading ? renderLoader() : ""}
      {didLoad ? "" : renderLoader()}
    </div>
  );
};

ImageView.defaultProps = {
  width: 124,
  height: 124,
  alt: "image",
  isLoading: false,
  objectFit: "cover",
  onLoad: noop,
  onError: noop
};

export default ImageView;
