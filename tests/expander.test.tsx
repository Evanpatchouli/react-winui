import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Expander from "../src/lib/src/components/Expander";

describe("Expander", () => {
  it("renders a labelled native disclosure button and forwards the root ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Expander
        ref={ref}
        className="custom-expander"
        contentId="advanced-panel"
        header="Advanced settings"
        icon={<span>settings</span>}
      >
        Secondary options
      </Expander>
    );

    const button = screen.getByRole("button", { name: "Advanced settings" });
    const content = document.getElementById("advanced-panel");

    expect(ref.current).toHaveClass("ui-expander", "ui-expander-down", "custom-expander");
    expect(ref.current).toHaveAttribute("data-state", "collapsed");
    expect(button).toHaveAttribute("aria-controls", "advanced-panel");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(content).toHaveAttribute("aria-hidden", "true");
    expect(content).toHaveAttribute("inert");
    expect(document.querySelector(".ui-expander-icon")).toHaveAttribute("aria-hidden", "true");
    expect(Expander.displayName).toBe("Expander");
  });

  it("toggles an uncontrolled Expander and reports pointer activation", () => {
    const onExpandedChange = vi.fn();
    render(
      <Expander header="Details" onExpandedChange={onExpandedChange}>
        Dynamic content
      </Expander>
    );

    const button = screen.getByRole("button", { name: "Details" });
    const content = screen.getByText("Dynamic content").closest(".ui-expander-content");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(content).toHaveAttribute("aria-hidden", "false");
    expect(content).not.toHaveAttribute("inert");
    expect(onExpandedChange).toHaveBeenLastCalledWith(true, expect.any(Object));

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(content).toHaveAttribute("aria-hidden", "true");
    expect(onExpandedChange).toHaveBeenLastCalledWith(false, expect.any(Object));
  });

  it("requests controlled changes without mutating the rendered state", () => {
    const onExpandedChange = vi.fn();
    const { rerender } = render(
      <Expander expanded={false} header="Controlled" onExpandedChange={onExpandedChange}>
        Controlled content
      </Expander>
    );

    const button = screen.getByRole("button", { name: "Controlled" });
    fireEvent.click(button);

    expect(onExpandedChange).toHaveBeenCalledWith(true, expect.any(Object));
    expect(button).toHaveAttribute("aria-expanded", "false");

    rerender(
      <Expander expanded header="Controlled" onExpandedChange={onExpandedChange}>
        Controlled content
      </Expander>
    );
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("blocks interaction when disabled", () => {
    const onExpandedChange = vi.fn();
    render(
      <Expander disabled defaultExpanded header="Unavailable" onExpandedChange={onExpandedChange}>
        Readable content
      </Expander>
    );

    const button = screen.getByRole("button", { name: "Unavailable" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button.closest(".ui-expander")).toHaveClass("ui-expander-disabled");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(onExpandedChange).not.toHaveBeenCalled();
  });

  it("supports upward layout and preserves dynamic children without inline height measurement", () => {
    const { rerender } = render(
      <Expander defaultExpanded direction="up" header="History">
        <span>First entry</span>
      </Expander>
    );

    const root = screen.getByRole("button", { name: "History" }).closest(".ui-expander");
    const button = screen.getByRole("button", { name: "History" });
    const content = root?.querySelector<HTMLElement>(".ui-expander-content");
    expect(root).toHaveClass("ui-expander-up", "ui-expander-expanded");
    expect(root).toHaveAttribute("data-direction", "up");
    expect(button.compareDocumentPosition(content as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
    expect(button).toHaveAttribute("aria-controls", content?.id);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(content?.style.height).toBe("");

    rerender(
      <Expander defaultExpanded direction="up" header="History">
        <span>First entry</span>
        <span>Second entry</span>
      </Expander>
    );
    expect(screen.getByText("Second entry")).toBeInTheDocument();
    expect(content?.style.height).toBe("");
  });

  it("restores focus to the header when controlled content collapses", () => {
    const { rerender } = render(
      <Expander expanded header="Focus behavior">
        <button type="button">Nested action</button>
      </Expander>
    );

    screen.getByRole("button", { name: "Nested action" }).focus();
    expect(screen.getByRole("button", { name: "Nested action" })).toHaveFocus();

    rerender(
      <Expander expanded={false} header="Focus behavior">
        <button type="button">Nested action</button>
      </Expander>
    );

    expect(screen.getByRole("button", { name: "Focus behavior" })).toHaveFocus();
  });
});
