import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Flyout from "../src/lib/src/components/Flyout";
import Popover from "../src/lib/src/components/Popover";

afterEach(() => {
  vi.useRealTimers();
});

describe("Popover", () => {
  it("opens from the trigger, exposes ARIA state, and renders in a portal", () => {
    const onOpenChange = vi.fn();

    render(
      <Popover
        content={<button type="button">Save changes</button>}
        id="save-popover"
        onOpenChange={onOpenChange}
      >
        <button type="button">Open actions</button>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "Open actions" });
    expect(trigger).toHaveAttribute("aria-controls", "save-popover");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog")).toHaveTextContent("Save changes");
    expect(document.body.querySelector(".ui-popover-open")).toBeInTheDocument();
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("supports controlled visibility and closes from an outside pointer or Escape", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Popover content="Contextual details" onOpenChange={onOpenChange} open={false}>
        <button type="button">Controlled trigger</button>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "Controlled trigger" });
    fireEvent.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <Popover content="Contextual details" onOpenChange={onOpenChange} open>
        <button type="button">Controlled trigger</button>
      </Popover>
    );
    expect(screen.getByRole("dialog")).toHaveTextContent("Contextual details");

    fireEvent.pointerDown(document.body);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything());
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    rerender(
      <Popover content="Contextual details" onOpenChange={onOpenChange} open>
        <button type="button">Controlled trigger</button>
      </Popover>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("opens on hover after the configured delay and closes after leaving", () => {
    vi.useFakeTimers();

    render(
      <Popover content="Hover details" hideDelay={40} openOnHover showDelay={80}>
        <button type="button">Hover trigger</button>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "Hover trigger" });
    fireEvent.pointerEnter(trigger);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(80));
    expect(screen.getByRole("dialog")).toHaveTextContent("Hover details");

    fireEvent.pointerLeave(trigger);
    act(() => vi.advanceTimersByTime(40));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports autofocus and keeps focus within a trapped surface", () => {
    render(
      <Popover
        autoFocus
        content={
          <>
            <button type="button">First action</button>
            <button type="button">Last action</button>
          </>
        }
        defaultOpen
        trapFocus
      >
        <button type="button">Focus trigger</button>
      </Popover>
    );

    const firstAction = screen.getByRole("button", { name: "First action" });
    const lastAction = screen.getByRole("button", { name: "Last action" });
    expect(firstAction).toHaveFocus();

    lastAction.focus();
    fireEvent.keyDown(lastAction, { key: "Tab" });
    expect(firstAction).toHaveFocus();
  });

  it("supports Enter and Space for a custom keyboard trigger", () => {
    render(
      <Popover content="Keyboard content">
        <div role="button" tabIndex={0}>
          Custom trigger
        </div>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: "Custom trigger" });
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByRole("dialog")).toHaveTextContent("Keyboard content");

    fireEvent.keyDown(trigger, { key: " " });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not attach behavior when disabled and exposes Flyout as the same API", () => {
    const { rerender } = render(
      <Popover content="Disabled content" disabled>
        <button type="button">Disabled trigger</button>
      </Popover>
    );

    fireEvent.click(screen.getByRole("button", { name: "Disabled trigger" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <Flyout content="Flyout content">
        <button type="button">Flyout trigger</button>
      </Flyout>
    );
    fireEvent.click(screen.getByRole("button", { name: "Flyout trigger" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Flyout content");
  });
});
