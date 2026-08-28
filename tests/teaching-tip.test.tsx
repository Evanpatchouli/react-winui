import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TeachingTip from "../src/lib/src/components/TeachingTip";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("TeachingTip", () => {
  it("opens from its target, exposes heading relationships, and restores focus on close", () => {
    const onOpenChange = vi.fn();

    render(
      <TeachingTip
        content="Your changes are saved automatically."
        id="save-tip"
        onOpenChange={onOpenChange}
        subtitle="No manual save is needed."
        title="Save automatically"
      >
        <button type="button">Save</button>
      </TeachingTip>
    );

    const target = screen.getByRole("button", { name: "Save" });
    expect(target).toHaveAttribute("aria-controls", "save-tip");
    expect(target).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(target);

    const tip = screen.getByRole("dialog");
    expect(tip).toHaveTextContent("Save automatically");
    expect(tip).toHaveTextContent("No manual save is needed.");
    expect(tip).toHaveTextContent("Your changes are saved automatically.");
    expect(tip).toHaveAttribute("aria-labelledby", "save-tip-title");
    expect(tip).toHaveAttribute("aria-describedby", "save-tip-subtitle");
    expect(screen.getByRole("button", { name: "Close teaching tip" })).toBeInTheDocument();
    expect(target).toHaveAttribute("aria-expanded", "true");
    expect(onOpenChange).toHaveBeenLastCalledWith(true, expect.anything());

    fireEvent.click(screen.getByRole("button", { name: "Close teaching tip" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(target).toHaveFocus();
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("keeps an explicitly dismissed tip open for outside pointers and closes on Escape", () => {
    render(
      <TeachingTip defaultOpen title="Try keyboard shortcuts">
        <button type="button">Help</button>
      </TeachingTip>
    );

    const tip = screen.getByRole("dialog");
    fireEvent.pointerDown(document.body);
    expect(tip).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("light-dismisses from outside interaction and omits the close button", () => {
    render(
      <TeachingTip defaultOpen isLightDismiss title="New command">
        <button type="button">Command</button>
      </TeachingTip>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Close teaching tip" })).not.toBeInTheDocument();

    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports an action button, hero content, and cancelable action dismissal", () => {
    const onAction = vi.fn((event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault());
    const onSurfaceClick = vi.fn();

    render(
      <TeachingTip
        action={{ label: "Got it", onClick: onAction }}
        contentProps={{ onClick: onSurfaceClick }}
        defaultOpen
        heroContent={<img alt="Cloud illustration" src="/cloud.png" />}
        heroContentPlacement="bottom"
        icon={<span aria-hidden="true">★</span>}
        title="Sync is ready"
      >
        <button type="button">Sync</button>
      </TeachingTip>
    );

    expect(screen.getByRole("img", { name: "Cloud illustration" })).toBeInTheDocument();
    expect(screen.getByText("★")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Got it" }));

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onSurfaceClick).toHaveBeenCalledTimes(1);
    expect(onAction.mock.calls[0][0].defaultPrevented).toBe(true);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("supports controlled visibility and does not open when disabled", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <TeachingTip disabled onOpenChange={onOpenChange} open={false} title="Disabled tip">
        <button type="button">Disabled target</button>
      </TeachingTip>
    );

    fireEvent.click(screen.getByRole("button", { name: "Disabled target" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalled();

    rerender(
      <TeachingTip onOpenChange={onOpenChange} open title="Controlled tip">
        <button type="button">Controlled target</button>
      </TeachingTip>
    );
    expect(screen.getByRole("dialog")).toHaveTextContent("Controlled tip");

    rerender(
      <TeachingTip disabled onOpenChange={onOpenChange} open title="Disabled controlled tip">
        <button type="button">Disabled controlled target</button>
      </TeachingTip>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
