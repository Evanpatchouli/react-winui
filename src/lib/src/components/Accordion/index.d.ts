import type { CSSProperties, FC, ReactNode } from "react";

export interface AccordionProps {
  style?: CSSProperties;
  headerTitle?: ReactNode;
  headerStyle?: CSSProperties;
  children?: ReactNode;
  onExpand?: () => void;
  onCollapse?: () => void;
}

export interface AccordionSlotProps {
  children?: ReactNode;
}

export interface AccordionComponent extends FC<AccordionProps> {
  Trigger: FC<AccordionSlotProps>;
  Body: FC<AccordionSlotProps>;
}

declare const Accordion: AccordionComponent;

export default Accordion;
