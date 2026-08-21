import { forwardRef, useEffect, useRef, useState } from "react";
import type { FC, MouseEvent, ReactNode, RefAttributes, UIEvent } from "react";
import ScrollView from "../../../api/ScrollView";

/** Props for the Windows-styled navigation shell. */
export interface NavBarProps {
  title?: ReactNode;
  collapsed?: boolean;
  goBack?: () => void;
  children?: ReactNode;
  shadowOnScroll?: boolean;
  titleBarMobile?: ReactNode;
}

/** Public NavBar component type with an HTMLElement ref. */
export type NavBarComponent = FC<NavBarProps & RefAttributes<HTMLElement>>;

const NavBar: NavBarComponent = forwardRef<HTMLElement, NavBarProps>(
  ({ title, collapsed = false, children, shadowOnScroll = false, titleBarMobile }, ref) => {
    const prevWidth = useRef(window.innerWidth);
    const navRef = useRef<HTMLElement>(null);
    const resizeTimer = useRef<number | undefined>(undefined);
    const [isScrolling, setScrolling] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(collapsed);
    const [sidebarFloatCollapsed, setSidebarFloatCollapsed] = useState("");

    const toggleLargeNavbar = (callback: () => void) => {
      if (navRef.current) {
        navRef.current.style.transition = "transform 0.2s ease, width 0.2s ease";
      }
      callback();
      window.setTimeout(() => {
        if (navRef.current) {
          navRef.current.style.transition = "";
        }
      }, 1000);
    };

    const showSidebar = () => {
      const width =
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      width < 760
        ? setSidebarFloatCollapsed(sidebarFloatCollapsed === "" ? " collapsed-float" : "")
        : toggleLargeNavbar(() => setSidebarCollapsed(!sidebarCollapsed));
    };

    const onUlClickItems = (event: MouseEvent<HTMLUListElement>) => {
      if (event.target instanceof Element && event.target.matches("a")) {
        const width =
          window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (width < 760) {
          setSidebarFloatCollapsed("");
        }
      }
    };

    useEffect(() => {
      const navList = document.getElementById("ui-navbar-list");
      const navSearch = navList?.getElementsByClassName("ui-input-search-box")[0];
      const onSearchClick = () => {
        if (sidebarCollapsed) {
          setSidebarCollapsed(false);
        }
      };

      navSearch?.addEventListener("click", onSearchClick);
      return () => navSearch?.removeEventListener("click", onSearchClick);
    }, [sidebarCollapsed]);

    const scrollEvent = (event: UIEvent<HTMLUListElement>) => {
      if (event.target instanceof HTMLElement) {
        setScrolling(event.target.scrollTop >= 50);
      }
    };

    useEffect(() => {
      sidebarFloatCollapsed === " collapsed-float"
        ? ScrollView.disableScroll()
        : ScrollView.enableScroll();
    }, [sidebarFloatCollapsed]);

    useEffect(() => {
      const handleResize = () => {
        const currentWidth = window.innerWidth;

        if (prevWidth.current !== currentWidth) {
          if (resizeTimer.current) {
            window.clearTimeout(resizeTimer.current);
          }
          if (navRef.current) {
            navRef.current.style.transition = "unset";
          }
          resizeTimer.current = window.setTimeout(() => {
            if (navRef.current) {
              navRef.current.style.transition = "";
            }
            setSidebarFloatCollapsed("");
          }, 100);
          prevWidth.current = currentWidth;
        }
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        if (resizeTimer.current) {
          window.clearTimeout(resizeTimer.current);
        }
      };
    }, []);

    return (
      <aside
        ref={ref}
        role="navigation"
        id="ui-navbar-wrap"
        className={
          sidebarCollapsed
            ? `ui-navbar-wrap collapsed${sidebarFloatCollapsed}`
            : `ui-navbar-wrap${sidebarFloatCollapsed}`
        }
      >
        <div className="ui-navbar-header-mobile">
          <span
            className="ui-navbar-toggler"
            onClick={showSidebar}
            aria-label="Toggle navigation"
          />
          {titleBarMobile}
        </div>
        <nav className="ui-navbar" ref={navRef}>
          <div
            className="ui-navbar-header"
            style={
              shadowOnScroll
                ? isScrolling
                  ? { boxShadow: "0 4px 8px -8px #77777777" }
                  : { boxShadow: "" }
                : { boxShadow: "" }
            }
          >
            <span
              className="ui-navbar-toggler"
              onClick={showSidebar}
              aria-label="Toggle navigation"
            />
            <span className="ui-navbar-name">{title}</span>
          </div>
          <ul
            id="ui-navbar-list"
            onScroll={scrollEvent}
            className="ui-navbar-list"
            onClick={onUlClickItems}
          >
            {children}
          </ul>
        </nav>
        <div
          onClick={showSidebar}
          className={
            sidebarFloatCollapsed === " collapsed-float"
              ? "ui-navbar-overlay show"
              : "ui-navbar-overlay"
          }
        />
      </aside>
    );
  }
);

export default NavBar;
