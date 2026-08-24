import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import NavigationView from "../src/lib/src/components/NavigationView";

const originalInnerWidth = window.innerWidth;

const setViewportWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
  fireEvent(window, new Event("resize"));
};

const icon = (text: string) => <span>{text}</span>;

afterEach(() => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    value: originalInnerWidth
  });
});

describe("NavigationView", () => {
  it("renders data and compound items in a named WinUI navigation shell", () => {
    render(
      <NavigationView
        defaultValue="home"
        footerItems={[{ icon: icon("?"), label: "Help", value: "help" }]}
        header={<h1>Dashboard</h1>}
        items={[{ icon: icon("H"), label: "Home", value: "home" }]}
        paneAriaLabel="Primary navigation"
        paneDisplayMode="expanded"
        paneHeader="Contoso"
        settingsItem={{ icon: icon("S"), label: "Settings", value: "settings" }}
        content={<p>Page content</p>}
      >
        <NavigationView.Item icon={icon("D")} label="Documents" value="documents" />
        <NavigationView.Separator data-testid="navigation-separator" />
      </NavigationView>
    );

    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Documents" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Help" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByTestId("navigation-separator")).toHaveAttribute("role", "separator");
  });

  it("shares uncontrolled selection across menu, footer, and settings items", () => {
    const onValueChange = vi.fn();
    render(
      <NavigationView
        defaultValue="home"
        footerItems={[{ label: "Help", value: "help" }]}
        onValueChange={onValueChange}
        paneDisplayMode="expanded"
        settingsItem={{ label: "Settings", value: "settings" }}
      >
        <NavigationView.Item label="Home" value="home" />
      </NavigationView>
    );

    fireEvent.click(screen.getByRole("button", { name: "Help" }));
    expect(screen.getByRole("button", { name: "Help" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Home" })).not.toHaveAttribute("aria-current");

    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.getByRole("button", { name: "Settings" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(onValueChange).toHaveBeenLastCalledWith("settings", expect.anything());
  });

  it("emits controlled selection requests without mutating the rendered value", () => {
    const onValueChange = vi.fn();
    render(
      <NavigationView onValueChange={onValueChange} paneDisplayMode="expanded" value="home">
        <NavigationView.Item label="Home" value="home" />
        <NavigationView.Item label="Documents" value="documents" />
      </NavigationView>
    );

    fireEvent.click(screen.getByRole("button", { name: "Documents" }));
    expect(onValueChange).toHaveBeenCalledWith("documents", expect.anything());
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Documents" })).not.toHaveAttribute("aria-current");
  });

  it("keeps disabled items out of selection and roving keyboard focus", () => {
    const onValueChange = vi.fn();
    render(
      <NavigationView onValueChange={onValueChange} paneDisplayMode="expanded">
        <NavigationView.Item label="Home" value="home" />
        <NavigationView.Item disabled label="Locked" value="locked" />
        <NavigationView.Item label="Documents" value="documents" />
      </NavigationView>
    );

    const home = screen.getByRole("button", { name: "Home" });
    const locked = screen.getByRole("button", { name: "Locked" });
    const documents = screen.getByRole("button", { name: "Documents" });
    fireEvent.click(locked);
    expect(onValueChange).not.toHaveBeenCalled();

    home.focus();
    fireEvent.keyDown(home, { key: "ArrowDown" });
    expect(documents).toHaveFocus();
    expect(locked).toBeDisabled();
  });

  it("exposes disclosure relationships and lifts a hidden child indicator to its ancestor", () => {
    const onExpandedItemsChange = vi.fn();
    render(
      <NavigationView
        defaultValue="reports"
        onExpandedItemsChange={onExpandedItemsChange}
        paneDisplayMode="expanded"
      >
        <NavigationView.Item icon={icon("W")} label="Workspace" value="workspace">
          <NavigationView.Item label="Reports" value="reports" />
        </NavigationView.Item>
      </NavigationView>
    );

    const workspace = screen.getByRole("button", { name: "Workspace" });
    const disclosure = screen.getByRole("button", { name: "Expand Workspace" });
    const workspaceRow = workspace.closest("li");
    const groupId = disclosure.getAttribute("aria-controls");

    expect(workspace).not.toHaveAttribute("aria-expanded");
    expect(disclosure).toHaveAttribute("aria-expanded", "false");
    expect(groupId).toBeTruthy();
    expect(document.getElementById(groupId ?? "")).toHaveAttribute("hidden");
    expect(screen.queryByRole("button", { name: "Reports" })).not.toBeInTheDocument();
    expect(workspaceRow).toHaveAttribute("data-selected-descendant", "true");
    expect(workspace).not.toHaveAttribute("aria-current");

    fireEvent.click(disclosure);
    expect(onExpandedItemsChange).toHaveBeenCalledWith(["workspace"], expect.anything());
    expect(screen.getByRole("button", { name: "Collapse Workspace" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("button", { name: "Reports" })).toHaveAttribute("aria-current", "page");
  });

  it("supports non-selectable disclosure branches and hierarchical arrow keys", async () => {
    render(
      <NavigationView paneDisplayMode="expanded">
        <NavigationView.Item label="Home" value="home" />
        <NavigationView.Item label="Workspace" selectable={false} value="workspace">
          <NavigationView.Item label="Reports" value="reports" />
        </NavigationView.Item>
      </NavigationView>
    );

    const workspace = screen.getByRole("button", { name: "Workspace" });
    workspace.focus();
    fireEvent.keyDown(workspace, { key: "ArrowRight" });
    expect(workspace).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(workspace, { key: "ArrowRight" });
    await waitFor(() => expect(screen.getByRole("button", { name: "Reports" })).toHaveFocus());
    fireEvent.keyDown(screen.getByRole("button", { name: "Reports" }), { key: "ArrowLeft" });
    expect(workspace).toHaveFocus();

    fireEvent.keyDown(workspace, { key: "ArrowLeft" });
    expect(workspace).toHaveAttribute("aria-expanded", "false");
  });

  it("resolves auto breakpoints and resets uncontrolled pane defaults on resize", () => {
    setViewportWidth(1200);
    const onDisplayModeChange = vi.fn();
    const { container } = render(
      <NavigationView onDisplayModeChange={onDisplayModeChange}>
        <NavigationView.Item label="Home" value="home" />
      </NavigationView>
    );
    const root = container.querySelector(".ui-navigation-view");

    expect(root).toHaveAttribute("data-pane-display-mode", "expanded");
    expect(root).toHaveAttribute("data-pane-open", "true");

    setViewportWidth(800);
    expect(root).toHaveAttribute("data-pane-display-mode", "compact");
    expect(root).toHaveAttribute("data-pane-open", "false");
    expect(onDisplayModeChange).toHaveBeenLastCalledWith("compact");

    setViewportWidth(640);
    expect(root).toHaveAttribute("data-pane-display-mode", "minimal");
    expect(onDisplayModeChange).toHaveBeenLastCalledWith("minimal");
  });

  it("re-measures the viewport when switching from an explicit mode to auto", () => {
    setViewportWidth(620);
    const { container, rerender } = render(
      <NavigationView paneDisplayMode="expanded">
        <NavigationView.Item label="Home" value="home" />
      </NavigationView>
    );
    const root = container.querySelector(".ui-navigation-view");
    expect(root).toHaveAttribute("data-pane-display-mode", "expanded");

    rerender(
      <NavigationView paneDisplayMode="auto">
        <NavigationView.Item label="Home" value="home" />
      </NavigationView>
    );
    expect(root).toHaveAttribute("data-pane-display-mode", "minimal");
  });

  it("light-dismisses a minimal overlay and restores focus to the visible toggle", async () => {
    setViewportWidth(600);
    const onPaneOpenChange = vi.fn();
    render(
      <NavigationView onPaneOpenChange={onPaneOpenChange}>
        <NavigationView.Item label="Home" value="home" />
      </NavigationView>
    );

    const toggle = screen.getByRole("button", { name: "Toggle navigation pane" });
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    fireEvent.click(toggle);
    expect(screen.getByRole("navigation", { name: "Navigation" })).toBeInTheDocument();
    expect(onPaneOpenChange).toHaveBeenLastCalledWith(true, expect.anything());

    fireEvent.click(screen.getByTestId("navigation-view-overlay"));
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Toggle navigation pane" })).toHaveFocus()
    );
    expect(onPaneOpenChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("prioritizes closing an overlay when Back is pressed", () => {
    const onBack = vi.fn();
    render(
      <NavigationView defaultPaneOpen onBack={onBack} paneDisplayMode="minimal">
        <NavigationView.Item label="Home" value="home" />
      </NavigationView>
    );

    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(onBack).not.toHaveBeenCalled();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("emits controlled pane requests without hiding the pane", () => {
    const onPaneOpenChange = vi.fn();
    render(
      <NavigationView onPaneOpenChange={onPaneOpenChange} paneDisplayMode="compact" paneOpen>
        <NavigationView.Item label="Home" value="home" />
      </NavigationView>
    );

    const navigation = screen.getByRole("navigation");
    fireEvent.keyDown(within(navigation).getByRole("button", { name: "Home" }), {
      key: "Escape"
    });
    expect(onPaneOpenChange).toHaveBeenCalledWith(false, expect.anything());
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
