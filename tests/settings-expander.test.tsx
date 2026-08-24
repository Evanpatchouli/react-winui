import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SettingsExpander from "../src/lib/src/components/SettingsExpander";

describe("SettingsExpander", () => {
  it("renders the settings anatomy, compatible label alias, item boundaries, and root ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <SettingsExpander
        ref={ref}
        className="custom-settings-expander"
        content={<button type="button">Primary control</button>}
        contentId="privacy-options"
        description="Choose which apps can use your location"
        header="Location"
        icon={<span>location</span>}
        itemsFooter={<span>Items footer</span>}
        itemsHeader={<span>Items header</span>}
        title="Ignored title"
      >
        <button type="button">Expanded setting</button>
      </SettingsExpander>
    );

    const toggle = screen.getByRole("button", { name: "Location" });
    const region = document.getElementById("privacy-options");

    expect(SettingsExpander.displayName).toBe("SettingsExpander");
    expect(ref.current).toHaveClass("ui-settings-expander", "custom-settings-expander");
    expect(ref.current).toHaveAttribute("data-state", "collapsed");
    expect(screen.queryByText("Ignored title")).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-controls", "privacy-options");
    expect(toggle).toHaveAccessibleDescription("Choose which apps can use your location");
    expect(region).toHaveAttribute("role", "region");
    expect(region).toHaveAttribute("aria-labelledby", toggle.id);
    expect(region).toHaveAttribute("aria-hidden", "true");
    expect(region).toHaveAttribute("inert");
    expect(region?.textContent).toMatch(/Items header.*Expanded setting.*Items footer/);
    expect(document.querySelector(".ui-settings-expander-icon")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("toggles an uncontrolled group and reports pointer or native keyboard activation", () => {
    const onExpandedChange = vi.fn();
    render(
      <SettingsExpander header="Advanced" onExpandedChange={onExpandedChange}>
        Advanced options
      </SettingsExpander>
    );

    const toggle = screen.getByRole("button", { name: "Advanced" });
    const region = screen.getByText("Advanced options").closest(".ui-settings-expander-items");

    fireEvent.click(toggle, { detail: 0 });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(region).toHaveAttribute("aria-hidden", "false");
    expect(region).not.toHaveAttribute("inert");
    expect(onExpandedChange).toHaveBeenLastCalledWith(true, expect.any(Object));

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(region).toHaveAttribute("inert");
    expect(onExpandedChange).toHaveBeenLastCalledWith(false, expect.any(Object));
  });

  it("requests controlled state changes without mutating parent-owned state", () => {
    const onExpandedChange = vi.fn();
    const { rerender } = render(
      <SettingsExpander expanded={false} header="Controlled" onExpandedChange={onExpandedChange}>
        Controlled items
      </SettingsExpander>
    );

    const toggle = screen.getByRole("button", { name: "Controlled" });
    fireEvent.click(toggle);

    expect(onExpandedChange).toHaveBeenCalledWith(true, expect.any(Object));
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    rerender(
      <SettingsExpander expanded header="Controlled" onExpandedChange={onExpandedChange}>
        Controlled items
      </SettingsExpander>
    );
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("keeps header content and action independent from the disclosure trigger", () => {
    const onAction = vi.fn();
    const onContent = vi.fn();
    const onExpandedChange = vi.fn();

    render(
      <SettingsExpander
        action={
          <button type="button" onClick={onAction}>
            Reset
          </button>
        }
        content={
          <button type="button" onClick={onContent}>
            Configure
          </button>
        }
        header="Network"
        onExpandedChange={onExpandedChange}
      >
        Network options
      </SettingsExpander>
    );

    const toggle = screen.getByRole("button", { name: "Network" });
    const contentControl = screen.getByRole("button", { name: "Configure" });
    const action = screen.getByRole("button", { name: "Reset" });

    expect(toggle.contains(contentControl)).toBe(false);
    expect(toggle.contains(action)).toBe(false);
    expect(contentControl.closest(".ui-settings-expander-content-slot")).toBeInTheDocument();
    expect(action.closest(".ui-settings-expander-action")).toBeInTheDocument();

    fireEvent.click(contentControl);
    fireEvent.click(action);
    expect(onContent).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onExpandedChange).not.toHaveBeenCalled();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("disables every interaction in the header and expanded settings", () => {
    const onAction = vi.fn();
    const onExpandedAction = vi.fn();
    const onExpandedChange = vi.fn();

    const { container } = render(
      <SettingsExpander
        action={
          <button type="button" onClick={onAction}>
            Header action
          </button>
        }
        defaultExpanded
        disabled
        header="Managed setting"
        onExpandedChange={onExpandedChange}
      >
        <button type="button" onClick={onExpandedAction}>
          Expanded action
        </button>
      </SettingsExpander>
    );

    const root = container.querySelector(".ui-settings-expander");
    const toggle = screen.getByRole("button", { name: "Managed setting", hidden: true });

    expect(root).toHaveAttribute("aria-disabled", "true");
    expect(root).toHaveAttribute("inert");
    expect(toggle).toBeDisabled();
    expect(document.querySelector(".ui-settings-expander-items")).toHaveAttribute("inert");

    fireEvent.click(screen.getByRole("button", { name: "Header action", hidden: true }));
    fireEvent.click(screen.getByRole("button", { name: "Expanded action", hidden: true }));
    fireEvent.click(toggle);

    expect(onAction).not.toHaveBeenCalled();
    expect(onExpandedAction).not.toHaveBeenCalled();
    expect(onExpandedChange).not.toHaveBeenCalled();
  });

  it("restores focus to the disclosure when a focused expanded control is collapsed", () => {
    const { rerender } = render(
      <SettingsExpander expanded header="Focus behavior">
        <button type="button">Nested control</button>
      </SettingsExpander>
    );

    const nestedControl = screen.getByRole("button", { name: "Nested control" });
    nestedControl.focus();
    expect(nestedControl).toHaveFocus();

    rerender(
      <SettingsExpander expanded={false} header="Focus behavior">
        <button type="button">Nested control</button>
      </SettingsExpander>
    );

    expect(screen.getByRole("button", { name: "Focus behavior" })).toHaveFocus();
  });

  it("removes focus safely when the whole group becomes disabled", () => {
    const renderExpander = (disabled = false) => (
      <SettingsExpander
        action={<button type="button">Header action</button>}
        disabled={disabled}
        expanded
        header="Runtime state"
      >
        Expanded content
      </SettingsExpander>
    );
    const { rerender } = render(renderExpander());
    const action = screen.getByRole("button", { name: "Header action" });

    action.focus();
    expect(action).toHaveFocus();
    rerender(renderExpander(true));

    expect(action).not.toHaveFocus();
    expect(document.body).toHaveFocus();
  });

  it("uses a dedicated accessible name when the visible header is insufficient", () => {
    render(
      <SettingsExpander
        header={<span aria-hidden="true">•••</span>}
        headerAriaLabel="More settings"
      >
        More content
      </SettingsExpander>
    );

    const toggle = screen.getByRole("button", { name: "More settings" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
