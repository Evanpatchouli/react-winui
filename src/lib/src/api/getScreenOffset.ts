import type { RefObject } from "react";

const getScreenOffset = (ref: RefObject<HTMLElement>): boolean => {
  const element = ref.current;

  if (!element) {
    return false;
  }

  return element.getBoundingClientRect().top > window.innerHeight / 2;
};

export default getScreenOffset;
