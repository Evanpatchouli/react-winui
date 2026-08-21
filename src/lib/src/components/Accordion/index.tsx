import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import type { CSSProperties, FC, ReactNode } from "react";

/** Props for the Accordion root component. */
export interface AccordionProps {
  style?: CSSProperties;
  headerTitle?: ReactNode;
  headerStyle?: CSSProperties;
  children?: ReactNode;
  onExpand?: () => void;
  onCollapse?: () => void;
}

/** Props shared by Accordion.Trigger and Accordion.Body. */
export interface AccordionSlotProps {
  children?: ReactNode;
}

/** Public component type including Accordion's compound slots. */
export interface AccordionComponent extends FC<AccordionProps> {
  Trigger: FC<AccordionSlotProps>;
  Body: FC<AccordionSlotProps>;
}

const getDisplayName = (child: ReactNode): string | undefined => {
  if (!isValidElement(child) || typeof child.type === "string") {
    return undefined;
  }

  if (!("displayName" in child.type)) {
    return undefined;
  }

  return typeof child.type.displayName === "string" ? child.type.displayName : undefined;
};

const selectChildren = (children: ReactNode, displayName: string): ReactNode[] =>
  Children.map(children, (child) => (getDisplayName(child) === displayName ? child : null)) ?? [];

const AccordionTrigger: FC<AccordionSlotProps> = ({ children }) => <>{children}</>;
AccordionTrigger.displayName = "Trigger";

const AccordionBody: FC<AccordionSlotProps> = ({ children }) => <>{children}</>;
AccordionBody.displayName = "Body";

const Accordion: AccordionComponent = Object.assign(
  ({
    style,
    children,
    headerStyle,
    headerTitle,
    onExpand = () => {},
    onCollapse = () => {}
  }: AccordionProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [panelHeight, setPanelHeight] = useState(10);

    const header = selectChildren(children, "Trigger");
    const body = selectChildren(children, "Body");

    const measurePanelHeight = () => {
      panelRef.current?.childNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          setPanelHeight(node.clientHeight + 20);
        }
      });
    };

    const updateWidth = useCallback(() => {
      setTimeout(measurePanelHeight, 800);
    }, [panelRef]);

    useEffect(() => {
      window.addEventListener("resize", updateWidth);
      return () => {
        window.removeEventListener("resize", updateWidth);
      };
    }, [updateWidth]);

    const toggleHeader = () => {
      setIsExpanded(!isExpanded);
      isExpanded ? onCollapse() : onExpand();
    };

    useLayoutEffect(() => {
      measurePanelHeight();
    }, []);

    return (
      <div className="ui-accordion" style={style}>
        <div
          style={headerStyle}
          className="ui-accordion-header"
          aria-expanded={isExpanded}
          onClick={toggleHeader}
        >
          {header.length === 0 ? (
            <div className="ui-accordion-title">
              <span>{headerTitle}</span>
            </div>
          ) : (
            header
          )}
        </div>
        <div
          className={isExpanded ? "ui-accordion-body show" : "ui-accordion-body"}
          ref={panelRef}
          style={{ height: isExpanded ? panelHeight : 0 }}
        >
          {body}
        </div>
      </div>
    );
  },
  {
    Trigger: AccordionTrigger,
    Body: AccordionBody
  }
);

export default Accordion;
