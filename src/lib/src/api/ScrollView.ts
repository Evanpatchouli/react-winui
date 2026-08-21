const getScrollbarWidth = (): number => {
  if (navigator.maxTouchPoints > 0) {
    return 0;
  }

  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.top = "-9999px";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.overflowY = "scroll";
  div.style.visibility = "hidden";
  document.body.appendChild(div);

  const scrollbarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  return scrollbarWidth;
};

const hasVerticalScrollbar = (element: HTMLElement): boolean =>
  element.scrollHeight > element.clientHeight;

const setHeaderMobilePadding = (paddingRight: number): void => {
  const headerMobile = document.getElementsByClassName("ui-navbar-header-mobile")[0];

  if (headerMobile instanceof HTMLElement) {
    headerMobile.style.paddingRight = `${paddingRight}px`;
  }
};

const disableScroll = (): void => {
  const container = document.body;

  if (hasVerticalScrollbar(container)) {
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    setHeaderMobilePadding(scrollbarWidth);
  }

  document.body.classList.add("modal-open");
};

const enableScroll = (): void => {
  document.body.style.paddingRight = "";
  setHeaderMobilePadding(0);
  document.body.classList.remove("modal-open");
};

const ScrollView = {
  disableScroll,
  enableScroll
};

export default ScrollView;
