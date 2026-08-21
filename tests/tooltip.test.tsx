import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState, type ComponentProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Tooltip from "../src/lib/src/components/Tooltip";

const getTooltip = () => document.querySelector('[role="tooltip"]') as HTMLElement | null;

const renderTooltip = (props: Partial<ComponentProps<typeof Tooltip>> = {}) => {
  const result = render(
    <Tooltip content="More information" showDelay={0} {...props}>
      <button type="button">Action</button>
    </Tooltip>
  );

  const trigger = result.container.querySelector("button") as HTMLButtonElement;
  const wrapper = trigger.parentElement as HTMLElement;

  return { ...result, trigger, wrapper };
};

afterEach(() => {
  vi.useRealTimers();
});

describe("Tooltip", () => {
  it("renders a description relationship and keeps the content in the document while closed", () => {
    renderTooltip();

    const trigger = screen.getByRole("button", { name: "Action" });
    const describedBy = trigger.getAttribute("aria-describedby");
    const tooltip = getTooltip();

    expect(describedBy).toBeTruthy();
    expect(tooltip).toHaveAttribute("id", describedBy);
    expect(tooltip).toHaveAttribute("role", "tooltip");
    expect(tooltip).toHaveTextContent("More information");
    expect(tooltip).not.toHaveClass("ui-tooltip-open");
  });

  it("opens on pointer enter after the configured delay and closes after pointer leave", () => {
    vi.useFakeTimers();
    const { wrapper } = renderTooltip({ hideDelay: 120, showDelay: 180 });

    fireEvent.pointerEnter(wrapper);
    expect(getTooltip()).not.toHaveClass("ui-tooltip-open");

    act(() => vi.advanceTimersByTime(179));
    expect(getTooltip()).not.toHaveClass("ui-tooltip-open");

    act(() => vi.advanceTimersByTime(1));
    expect(getTooltip()).toHaveClass("ui-tooltip-open");

    fireEvent.pointerLeave(wrapper);
    act(() => vi.advanceTimersByTime(119));
    expect(getTooltip()).toHaveClass("ui-tooltip-open");

    fireEvent.pointerEnter(wrapper);
    act(() => vi.advanceTimersByTime(120));
    expect(getTooltip()).toHaveClass("ui-tooltip-open");

    fireEvent.pointerLeave(wrapper);
    act(() => vi.advanceTimersByTime(1));
    expect(getTooltip()).toHaveClass("ui-tooltip-open");

    act(() => vi.advanceTimersByTime(119));
    expect(getTooltip()).not.toHaveClass("ui-tooltip-open");
  });

  it("opens from keyboard focus and closes immediately on blur", () => {
    vi.useFakeTimers();
    const { trigger, wrapper } = renderTooltip();

    fireEvent.focus(trigger);
    expect(getTooltip()).toHaveClass("ui-tooltip-open");

    fireEvent.blur(trigger, { relatedTarget: document.body });
    expect(getTooltip()).not.toHaveClass("ui-tooltip-open");

    expect(wrapper).toContainElement(trigger);
  });

  it("dismisses on Escape and reports visibility changes", () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    const { trigger, wrapper } = renderTooltip({ onOpenChange });

    fireEvent.focus(trigger);
    act(() => vi.runOnlyPendingTimers());
    expect(getTooltip()).toHaveClass("ui-tooltip-open");

    fireEvent.keyDown(wrapper, { key: "Escape" });

    expect(getTooltip()).not.toHaveClass("ui-tooltip-open");
    expect(onOpenChange).toHaveBeenCalledTimes(2);
    expect(onOpenChange.mock.calls.map(([open]) => open)).toEqual([true, false]);
  });

  it("supports controlled visibility while preserving trigger events", () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    const { rerender, wrapper } = renderTooltip({ onOpenChange, open: false });

    fireEvent.pointerEnter(wrapper);
    act(() => vi.runOnlyPendingTimers());

    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
    expect(getTooltip()).not.toHaveClass("ui-tooltip-open");

    rerender(
      <Tooltip content="More information" open onOpenChange={onOpenChange} showDelay={0}>
        <button type="button">Action</button>
      </Tooltip>
    );
    expect(getTooltip()).toHaveClass("ui-tooltip-open");

    fireEvent.pointerLeave(
      screen.getByRole("button", { name: "Action" }).parentElement as HTMLElement
    );
    act(() => vi.advanceTimersByTime(250));
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("falls back to another placement when the preferred side is outside the viewport", () => {
    const { container, rerender } = render(
      <Tooltip content="More information" open={false} placement="top">
        <button type="button">Action</button>
      </Tooltip>
    );
    const wrapper = container.querySelector(".ui-tooltip-trigger") as HTMLSpanElement;

    vi.spyOn(wrapper, "getBoundingClientRect").mockReturnValue({
      bottom: 32,
      height: 32,
      left: 120,
      right: 160,
      top: 0,
      width: 40
    } as DOMRect);

    rerender(
      <Tooltip content="More information" open placement="top">
        <button type="button">Action</button>
      </Tooltip>
    );

    expect(getTooltip()).toHaveAttribute("data-placement", "bottom");
  });

  it("maps label and inaccessible relationships without overwriting an existing label", () => {
    const { rerender, trigger } = renderTooltip({ relationship: "label" });

    expect(trigger).toHaveAttribute("aria-label", "More information");
    expect(trigger).not.toHaveAttribute("aria-describedby");

    rerender(
      <Tooltip content="More information" relationship="label">
        <button aria-label="Existing label" type="button">
          Action
        </button>
      </Tooltip>
    );
    expect(screen.getByRole("button", { name: "Existing label" })).toHaveAttribute(
      "aria-label",
      "Existing label"
    );

    rerender(
      <Tooltip content="More information" relationship="inaccessible">
        <button type="button">Action</button>
      </Tooltip>
    );
    expect(screen.getByRole("button", { name: "Action" })).not.toHaveAttribute("aria-describedby");
    expect(getTooltip()).toBeNull();
  });

  it("does not open when disabled or when content is empty", () => {
    vi.useFakeTimers();
    const { wrapper, rerender } = renderTooltip({ disabled: true });

    fireEvent.pointerEnter(wrapper);
    act(() => vi.runOnlyPendingTimers());
    expect(getTooltip()).not.toHaveClass("ui-tooltip-open");

    rerender(
      <Tooltip content="   " showDelay={0}>
        <button type="button">Action</button>
      </Tooltip>
    );
    fireEvent.pointerEnter(
      screen.getByRole("button", { name: "Action" }).parentElement as HTMLElement
    );
    expect(getTooltip()).toBeNull();
  });

  it("only leaves the most recently opened Tooltip visible", () => {
    vi.useFakeTimers();
    const Demo = () => {
      const [active, setActive] = useState<"one" | "two">("one");

      return (
        <>
          <Tooltip content="First" open={active === "one"}>
            <button onClick={() => setActive("two")} type="button">
              One
            </button>
          </Tooltip>
          <Tooltip content="Second" open={active === "two"}>
            <button type="button">Two</button>
          </Tooltip>
        </>
      );
    };

    render(<Demo />);
    expect(document.querySelectorAll('[role="tooltip"].ui-tooltip-open')).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "One" }));
    act(() => vi.runOnlyPendingTimers());
    expect(document.querySelectorAll('[role="tooltip"].ui-tooltip-open')).toHaveLength(1);
    expect(document.querySelector('[role="tooltip"].ui-tooltip-open')).toHaveTextContent("Second");
  });
});
