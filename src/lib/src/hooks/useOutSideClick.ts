import { useEffect } from "react";
import type { RefObject } from "react";

const useOutSideClick = (ref: RefObject<HTMLElement>, handleOutsideClick: () => void): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;

      if (ref.current && target instanceof Node && !ref.current.contains(target)) {
        handleOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleOutsideClick]);
};

export default useOutSideClick;
