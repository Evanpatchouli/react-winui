import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CommandBar from "../src/lib/src/components/CommandBar";

const renderCommandBar = (props: Partial<React.ComponentProps<typeof CommandBar>> = {}) =>
  render(
    <>
      <CommandBar
        aria-label="Editor commands"
        secondaryCommands={
          <>
            <CommandBar.Button label="Rename" />
            <CommandBar.Separator />
            <CommandBar.Button disabled label="Delete unavailable" />
          </>
        }
        {...props}
      >
        <CommandBar.Button icon={<span>save-icon</span>} label="Save" />
        <CommandBar.Button label="Copy" />
        <CommandBar.Separator />
        <CommandBar.Button disabled label="Paste unavailable" />
      </CommandBar>
      <button type="button">Outside</button>
    </>
  );

afterEach(() => {
  vi.restoreAllMocks();
});

describe("CommandBar", () => {
  it("renders primary AppBarButton commands with toolbar and separator semantics", () => {
    renderCommandBar();

    const toolbar = screen.getByRole("toolbar", { name: "Editor commands" });
    expect(toolbar).toHaveAttribute("aria-orientation", "horizontal");
    expect(screen.getByRole("button", { name: "Save" })).toHaveTextContent("save-iconSave");
    expect(screen.getByRole("button", { name: "Paste unavailable" })).toBeDisabled();
    expect(toolbar.getElementsByClassName("ui-command-bar-separator")[0]).toHaveAttribute(
      "aria-orientation",
      "vertical"
    );
    expect(screen.getByRole("button", { name: "More commands" })).toHaveAttribute(
      "aria-haspopup",
      "menu"
    );
  });

  it("uses roving focus for ArrowLeft, ArrowRight, Home, and End while skipping disabled commands", () => {
    renderCommandBar();

    const save = screen.getByRole("button", { name: "Save" });
    const copy = screen.getByRole("button", { name: "Copy" });
    const more = screen.getByRole("button", { name: "More commands" });

    expect(save).toHaveAttribute("tabindex", "0");
    expect(copy).toHaveAttribute("tabindex", "-1");
    save.focus();
    fireEvent.keyDown(save, { key: "ArrowRight" });
    expect(copy).toHaveFocus();
    fireEvent.keyDown(copy, { key: "ArrowRight" });
    expect(more).toHaveFocus();
    fireEvent.keyDown(more, { key: "ArrowRight" });
    expect(save).toHaveFocus();
    fireEvent.keyDown(save, { key: "End" });
    expect(more).toHaveFocus();
    fireEvent.keyDown(more, { key: "Home" });
    expect(save).toHaveFocus();
    fireEvent.keyDown(save, { key: "ArrowLeft" });
    expect(more).toHaveFocus();
  });

  it("opens a portaled menu, activates commands, and restores focus after selection", () => {
    const onRename = vi.fn();
    render(
      <CommandBar
        aria-label="File commands"
        secondaryCommands={
          <>
            <CommandBar.Button label="Rename" onClick={onRename} />
            <CommandBar.Separator />
            <CommandBar.Button disabled label="Delete unavailable" />
          </>
        }
      >
        <CommandBar.Button label="Save" />
      </CommandBar>
    );

    const more = screen.getByRole("button", { name: "More commands" });
    fireEvent.click(more);

    const menu = screen.getByRole("menu", { name: "More commands" });
    expect(menu.parentElement).toBe(document.body);
    expect(more).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menuitem", { name: "Rename" })).toHaveFocus();
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
    expect(screen.getByRole("menuitem", { name: "Delete unavailable" })).toBeDisabled();

    fireEvent.click(screen.getByRole("menuitem", { name: "Rename" }));
    expect(onRename).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(more).toHaveFocus();
  });

  it("supports controlled overflow without mutating visibility internally", () => {
    const onOpenChange = vi.fn();
    const secondaryCommands = <CommandBar.Button label="Rename" />;
    const { rerender } = render(
      <CommandBar
        aria-label="File commands"
        onOverflowOpenChange={onOpenChange}
        overflowOpen={false}
        secondaryCommands={secondaryCommands}
      >
        <CommandBar.Button label="Save" />
      </CommandBar>
    );

    const more = screen.getByRole("button", { name: "More commands" });
    fireEvent.click(more);
    expect(onOpenChange).toHaveBeenLastCalledWith(true, expect.anything());
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    rerender(
      <CommandBar
        aria-label="File commands"
        onOverflowOpenChange={onOpenChange}
        overflowOpen
        secondaryCommands={secondaryCommands}
      >
        <CommandBar.Button label="Save" />
      </CommandBar>
    );
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything());
    expect(screen.getByRole("menu")).toBeInTheDocument();

    rerender(
      <CommandBar
        aria-label="File commands"
        onOverflowOpenChange={onOpenChange}
        overflowOpen={false}
        secondaryCommands={secondaryCommands}
      >
        <CommandBar.Button label="Save" />
      </CommandBar>
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(more).toHaveFocus();
  });

  it("handles menu arrows, Home, End, typeahead, Enter, Space, and Escape", () => {
    const onKeepOpen = vi.fn((event: React.MouseEvent<HTMLButtonElement>) =>
      event.preventDefault()
    );
    const onShare = vi.fn();
    render(
      <CommandBar
        aria-label="File commands"
        defaultOverflowOpen
        secondaryCommands={
          <>
            <CommandBar.Button label="Rename" />
            <CommandBar.Button label="Keep open" onClick={onKeepOpen} />
            <CommandBar.Button label="Share" onClick={onShare} />
          </>
        }
      >
        <CommandBar.Button label="Save" />
      </CommandBar>
    );

    const menu = screen.getByRole("menu");
    const rename = screen.getByRole("menuitem", { name: "Rename" });
    const keepOpen = screen.getByRole("menuitem", { name: "Keep open" });
    const share = screen.getByRole("menuitem", { name: "Share" });
    expect(rename).toHaveFocus();

    fireEvent.keyDown(rename, { key: "ArrowDown" });
    expect(keepOpen).toHaveFocus();
    fireEvent.keyDown(keepOpen, { key: "End" });
    expect(share).toHaveFocus();
    fireEvent.keyDown(menu, { key: "r" });
    expect(rename).toHaveFocus();
    fireEvent.keyDown(rename, { key: "End" });
    fireEvent.keyDown(share, { key: "Home" });
    expect(rename).toHaveFocus();

    keepOpen.focus();
    fireEvent.keyDown(keepOpen, { key: "Enter" });
    expect(onKeepOpen).toHaveBeenCalledOnce();
    expect(screen.getByRole("menu")).toBeInTheDocument();
    share.focus();
    fireEvent.keyDown(share, { key: " " });
    expect(onShare).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens toward the requested end with arrow keys and light-dismisses outside", () => {
    const onOpenChange = vi.fn();
    render(
      <>
        <CommandBar
          aria-label="File commands"
          onOverflowOpenChange={onOpenChange}
          secondaryCommands={
            <>
              <CommandBar.Button label="Rename" />
              <CommandBar.Button label="Archive" />
              <CommandBar.Button disabled label="Delete unavailable" />
            </>
          }
        >
          <CommandBar.Button label="Save" />
        </CommandBar>
        <button type="button">Outside</button>
      </>
    );

    const more = screen.getByRole("button", { name: "More commands" });
    fireEvent.keyDown(more, { key: "ArrowUp" });
    expect(screen.getByRole("menuitem", { name: "Archive" })).toHaveFocus();

    fireEvent.pointerDown(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("moves trailing primary commands into overflow on resize without ResizeObserver", () => {
    let toolbarWidth = 200;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
      this: HTMLElement
    ) {
      if (this.classList.contains("ui-command-bar")) {
        return DOMRect.fromRect({ width: toolbarWidth, height: 40 });
      }
      if (this.hasAttribute("data-rwu-command-index")) {
        return DOMRect.fromRect({ width: 80, height: 32 });
      }
      if (this.classList.contains("ui-command-bar-overflow-button")) {
        return DOMRect.fromRect({ width: 32, height: 32 });
      }
      return DOMRect.fromRect({ width: 160, height: 120 });
    });

    render(
      <CommandBar aria-label="Responsive commands">
        <CommandBar.Button label="Save" />
        <CommandBar.Button label="Copy" />
        <CommandBar.Button label="Share" />
      </CommandBar>
    );

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Share" })).not.toBeInTheDocument();
    const more = screen.getByRole("button", { name: "More commands" });
    fireEvent.click(more);
    expect(screen.getByRole("menuitem", { name: "Share" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("menuitem", { name: "Share" }));
    toolbarWidth = 400;
    fireEvent(window, new Event("resize"));
    expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "More commands" })).not.toBeInTheDocument();
  });
});
