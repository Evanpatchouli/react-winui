import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ContextMenu from "../src/lib/src/components/ContextMenu";

const renderContextMenu = (props: Partial<React.ComponentProps<typeof ContextMenu>> = {}) =>
  render(
    <>
      <ContextMenu
        content={
          <>
            <ContextMenu.Item secondaryContent="Ctrl+C">Copy</ContextMenu.Item>
            <ContextMenu.Item disabled>Paste</ContextMenu.Item>
            <ContextMenu.Divider />
            <ContextMenu.Item>Delete</ContextMenu.Item>
          </>
        }
        {...props}
      >
        <button type="button">File target</button>
      </ContextMenu>
      <button type="button">Outside target</button>
    </>
  );

describe("ContextMenu", () => {
  it("opens at the pointer in a portal and exposes menu semantics", () => {
    const onOpenChange = vi.fn();
    renderContextMenu({ onOpenChange });

    const trigger = screen.getByRole("button", { name: "File target" });
    fireEvent.contextMenu(trigger, { clientX: 120, clientY: 80 });

    const menu = screen.getByRole("menu", { name: "Context menu" });
    expect(menu.parentElement).toBe(document.body);
    expect(menu).toHaveStyle({ left: "120px", top: "80px" });
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("opens with Shift+F10 or the ContextMenu key and focuses the first command", () => {
    renderContextMenu();

    const trigger = screen.getByRole("button", { name: "File target" });
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "F10", shiftKey: true });
    expect(screen.getByRole("menuitem", { name: "Copy" })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(trigger).toHaveFocus();

    fireEvent.keyDown(trigger, { key: "ContextMenu" });
    expect(screen.getByRole("menuitem", { name: "Copy" })).toHaveFocus();
  });

  it("closes on Tab without forcing focus back to the trigger", () => {
    renderContextMenu();

    const trigger = screen.getByRole("button", { name: "File target" });
    trigger.focus();
    fireEvent.keyDown(trigger, { key: "F10", shiftKey: true });
    const firstCommand = screen.getByRole("menuitem", { name: "Copy" });
    expect(firstCommand).toHaveFocus();

    const tabWasNotCancelled = fireEvent.keyDown(firstCommand, { key: "Tab" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(tabWasNotCancelled).toBe(true);
    expect(trigger).not.toHaveFocus();
  });

  it("supports arrow, Home, End, and character keyboard navigation", () => {
    renderContextMenu({ defaultOpen: true });

    const menu = screen.getByRole("menu");
    const copy = screen.getByRole("menuitem", { name: "Copy" });
    const paste = screen.getByRole("menuitem", { name: "Paste" });
    const deleteItem = screen.getByRole("menuitem", { name: "Delete" });
    expect(copy).toHaveFocus();

    fireEvent.keyDown(copy, { key: "ArrowDown" });
    expect(paste).toHaveFocus();
    fireEvent.keyDown(paste, { key: "End" });
    expect(deleteItem).toHaveFocus();
    fireEvent.keyDown(deleteItem, { key: "Home" });
    expect(copy).toHaveFocus();
    fireEvent.keyDown(menu, { key: "d" });
    expect(deleteItem).toHaveFocus();
    fireEvent.keyDown(deleteItem, { key: "ArrowDown" });
    expect(copy).toHaveFocus();
  });

  it("does not activate disabled commands and closes after an enabled selection", () => {
    const onPaste = vi.fn();
    const onDelete = vi.fn();
    render(
      <ContextMenu
        content={
          <>
            <ContextMenu.Item disabled onSelect={onPaste}>
              Paste
            </ContextMenu.Item>
            <ContextMenu.Item onSelect={onDelete}>Delete</ContextMenu.Item>
          </>
        }
      >
        <button type="button">File target</button>
      </ContextMenu>
    );

    const trigger = screen.getByRole("button", { name: "File target" });
    fireEvent.contextMenu(trigger);
    const disabledItem = screen.getByRole("menuitem", { name: "Paste" });
    expect(disabledItem).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(disabledItem);
    expect(onPaste).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("activates commands with Enter or Space and supports cancelling dismissal", () => {
    const onKeepOpen = vi.fn((event: React.SyntheticEvent) => event.preventDefault());
    const onClose = vi.fn();
    render(
      <ContextMenu
        defaultOpen
        content={
          <>
            <ContextMenu.Item onSelect={onKeepOpen}>Keep open</ContextMenu.Item>
            <ContextMenu.Item onSelect={onClose}>Close</ContextMenu.Item>
          </>
        }
      >
        <button type="button">File target</button>
      </ContextMenu>
    );

    const keepOpen = screen.getByRole("menuitem", { name: "Keep open" });
    fireEvent.keyDown(keepOpen, { key: "Enter" });
    expect(onKeepOpen).toHaveBeenCalledOnce();
    expect(screen.getByRole("menu")).toBeInTheDocument();

    const close = screen.getByRole("menuitem", { name: "Close" });
    close.focus();
    fireEvent.keyDown(close, { key: " " });
    expect(onClose).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("supports light-dismiss, Escape, and controlled visibility", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <ContextMenu
        content={<ContextMenu.Item>Copy</ContextMenu.Item>}
        onOpenChange={onOpenChange}
        open={false}
      >
        <button type="button">Controlled target</button>
      </ContextMenu>
    );

    const trigger = screen.getByRole("button", { name: "Controlled target" });
    fireEvent.contextMenu(trigger, { clientX: 12, clientY: 16 });
    expect(onOpenChange).toHaveBeenLastCalledWith(true, expect.anything());
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    rerender(
      <ContextMenu
        content={<ContextMenu.Item>Copy</ContextMenu.Item>}
        onOpenChange={onOpenChange}
        open
      >
        <button type="button">Controlled target</button>
      </ContextMenu>
    );
    fireEvent.pointerDown(document.body);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything());

    rerender(
      <ContextMenu
        content={<ContextMenu.Item>Copy</ContextMenu.Item>}
        onOpenChange={onOpenChange}
        open
      >
        <button type="button">Controlled target</button>
      </ContextMenu>
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("preserves native context behavior when disabled or when the trigger cancels the event", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <ContextMenu
        content={<ContextMenu.Item>Copy</ContextMenu.Item>}
        disabled
        onOpenChange={onOpenChange}
      >
        <button type="button">File target</button>
      </ContextMenu>
    );

    const disabledTrigger = screen.getByRole("button", { name: "File target" });
    const nativeEvent = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
    fireEvent(disabledTrigger, nativeEvent);
    expect(nativeEvent.defaultPrevented).toBe(false);
    expect(onOpenChange).not.toHaveBeenCalled();

    rerender(
      <ContextMenu content={<ContextMenu.Item>Copy</ContextMenu.Item>}>
        <button onContextMenu={(event) => event.preventDefault()} type="button">
          File target
        </button>
      </ContextMenu>
    );
    fireEvent.contextMenu(screen.getByRole("button", { name: "File target" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("clamps pointer positioning to the viewport", () => {
    renderContextMenu();
    fireEvent.contextMenu(screen.getByRole("button", { name: "File target" }), {
      clientX: window.innerWidth + 100,
      clientY: window.innerHeight + 100
    });

    const menu = screen.getByRole("menu");
    vi.spyOn(menu, "getBoundingClientRect").mockReturnValue({
      bottom: 200,
      height: 160,
      left: 0,
      right: 240,
      top: 0,
      width: 240,
      x: 0,
      y: 0,
      toJSON: () => ({})
    });
    fireEvent(window, new Event("resize"));

    expect(menu).toHaveStyle({
      left: `${window.innerWidth - 248}px`,
      top: `${window.innerHeight - 168}px`
    });
  });
});
