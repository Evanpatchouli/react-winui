import { act, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Toast, { Toaster } from "../src/lib/src/components/Toast";
import type { ToasterHandle } from "../src/lib/src/components/Toast";

afterEach(() => {
  vi.useRealTimers();
  document.documentElement.removeAttribute("data-theme");
});

describe("Toast", () => {
  it("renders a polite atomic status without moving focus", () => {
    const trigger = document.createElement("button");
    document.body.append(trigger);
    trigger.focus();

    render(<Toast message="The file is ready." title="Download complete" />);

    const toast = screen.getByRole("status");
    expect(toast).toHaveAttribute("aria-atomic", "true");
    expect(toast).toHaveAttribute("aria-live", "polite");
    expect(toast).toHaveAttribute("data-intent", "info");
    expect(toast).toHaveTextContent("Download complete");
    expect(toast).toHaveTextContent("The file is ready.");
    expect(trigger).toHaveFocus();

    trigger.remove();
  });

  it("supports controlled visibility and an assertive error announcement", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Toast
        intent="error"
        onOpenChange={onOpenChange}
        open
        politeness="assertive"
        title="Failed"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));

    expect(onOpenChange).toHaveBeenCalledWith(false, {
      event: expect.anything(),
      reason: "close"
    });
    expect(screen.getByRole("alert")).toBeInTheDocument();

    rerender(
      <Toast
        intent="error"
        onOpenChange={onOpenChange}
        open={false}
        politeness="assertive"
        title="Failed"
      />
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("only emits one timeout request while a controlled Toast stays open", () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    render(<Toast duration={100} onOpenChange={onOpenChange} open title="Controlled" />);

    act(() => vi.advanceTimersByTime(100));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: "timeout" });

    act(() => vi.advanceTimersByTime(1000));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("auto-dismisses, pauses on pointer interaction, and resumes the remaining duration", () => {
    vi.useFakeTimers();
    const onOpenChange = vi.fn();
    render(<Toast duration={1000} onOpenChange={onOpenChange} title="Saving" />);

    const toast = screen.getByRole("status");
    act(() => vi.advanceTimersByTime(600));
    fireEvent.pointerEnter(toast);
    act(() => vi.advanceTimersByTime(1000));
    expect(toast).toBeInTheDocument();

    fireEvent.pointerLeave(toast);
    act(() => vi.advanceTimersByTime(399));
    expect(toast).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(onOpenChange).toHaveBeenLastCalledWith(false, { reason: "timeout" });
  });

  it("keeps persistent notifications open and pauses while an action has focus", () => {
    vi.useFakeTimers();
    const { rerender } = render(<Toast duration={100} persistent title="Needs attention" />);

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole("status")).toBeInTheDocument();

    rerender(
      <Toast
        action={{ dismissOnClick: false, label: "Review" }}
        duration={100}
        title="Needs attention"
      />
    );
    const action = screen.getByRole("button", { name: "Review" });
    action.focus();
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole("status")).toBeInTheDocument();

    fireEvent.blur(action, { relatedTarget: document.body });
    act(() => vi.advanceTimersByTime(100));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("runs an action, dismisses on Escape, and preserves native keyboard handlers", () => {
    const onAction = vi.fn();
    const onKeyDown = vi.fn();
    const onOpenChange = vi.fn();
    const { unmount } = render(
      <Toast
        action={{ label: "Undo", onClick: onAction }}
        onKeyDown={onKeyDown}
        onOpenChange={onOpenChange}
        title="Item deleted"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, {
      event: expect.anything(),
      reason: "action"
    });

    unmount();
    render(
      <Toast defaultOpen onKeyDown={onKeyDown} onOpenChange={onOpenChange} title="Item deleted" />
    );
    const closeButton = screen.getByRole("button", { name: "Dismiss notification" });
    closeButton.focus();
    fireEvent.keyDown(closeButton, { key: "Escape" });

    expect(onKeyDown).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenLastCalledWith(false, {
      event: expect.anything(),
      reason: "escape"
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("inherits the active light or dark token scope without a separate visual recipe", () => {
    document.documentElement.dataset.theme = "dark";
    render(<Toast className="theme-probe" intent="success" title="Synced" />);

    expect(screen.getByRole("status")).toHaveClass("ui-toast", "theme-probe");
    expect(screen.getByRole("status")).toHaveAttribute("data-intent", "success");
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
});

describe("Toaster", () => {
  it("updates an existing entry with the same id without growing the stack", () => {
    const ref = createRef<ToasterHandle>();
    render(<Toaster defaultDuration={0} ref={ref} />);

    act(() => {
      ref.current?.show({ id: "sync", message: "Queued", title: "Syncing" });
    });
    expect(screen.getAllByRole("status")).toHaveLength(1);

    act(() => {
      ref.current?.show({ id: "sync", message: "Complete", title: "Synced" });
    });

    expect(screen.getAllByRole("status")).toHaveLength(1);
    expect(screen.queryByText("Syncing")).not.toBeInTheDocument();
    expect(screen.getByText("Synced")).toBeInTheDocument();
    expect(screen.getByText("Complete").closest("[data-toast-id]")).toHaveAttribute(
      "data-toast-id",
      "sync"
    );
  });

  it("stacks up to the visible limit and promotes queued notifications in FIFO order", () => {
    const ref = createRef<ToasterHandle>();
    render(<Toaster defaultDuration={0} label="App notifications" maxVisible={2} ref={ref} />);

    act(() => {
      ref.current?.show({ id: "one", title: "First" });
      ref.current?.show({ id: "two", title: "Second" });
      ref.current?.show({ id: "three", title: "Third" });
    });

    expect(screen.getByRole("region", { name: "App notifications" })).toHaveAttribute(
      "data-position",
      "bottom-end"
    );
    expect(screen.getAllByRole("status")).toHaveLength(2);
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.queryByText("Third")).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "Dismiss notification" })[0]);

    expect(screen.queryByText("First")).not.toBeInTheDocument();
    expect(screen.getByText("Third")).toBeInTheDocument();
    expect(screen.getAllByRole("status")).toHaveLength(2);
  });

  it("supports imperative dismissal for visible and queued notifications", () => {
    const firstChange = vi.fn();
    const secondChange = vi.fn();
    const ref = createRef<ToasterHandle>();
    render(<Toaster defaultDuration={0} maxVisible={1} position="top-start" ref={ref} />);

    act(() => {
      ref.current?.show({ id: "one", onOpenChange: firstChange, title: "First" });
      ref.current?.show({ id: "two", onOpenChange: secondChange, title: "Second" });
    });

    act(() => ref.current?.dismiss("one"));
    expect(firstChange).toHaveBeenCalledWith(false, { reason: "programmatic" });
    expect(screen.getByText("Second")).toBeInTheDocument();

    act(() => ref.current?.dismissAll());
    expect(secondChange).toHaveBeenCalledWith(false, { reason: "programmatic" });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
