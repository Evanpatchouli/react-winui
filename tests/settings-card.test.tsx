import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SettingsCard from "../src/lib/src/components/SettingsCard/index";

describe("SettingsCard", () => {
  it("renders the Windows settings anatomy and resolves compatible aliases", () => {
    const { container } = render(
      <SettingsCard
        action={<span>Recommended</span>}
        content={<span>Content fallback</span>}
        description="Allow desktop notifications"
        header="Notifications"
        icon={<span>!</span>}
        title="Ignored title"
      >
        <button type="button">Configure</button>
      </SettingsCard>
    );

    expect(SettingsCard.displayName).toBe("SettingsCard");
    expect(screen.getByText("Notifications")).toHaveClass("ui-settings-card-header");
    expect(screen.queryByText("Ignored title")).not.toBeInTheDocument();
    expect(screen.queryByText("Content fallback")).not.toBeInTheDocument();
    expect(screen.getByText("Allow desktop notifications")).toHaveClass(
      "ui-settings-card-description"
    );
    expect(screen.getByRole("button", { name: "Configure" })).toBeInTheDocument();
    expect(screen.getByText("Recommended").closest(".ui-settings-card-action")).toBeInTheDocument();
    expect(container.querySelector(".ui-settings-card-icon")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("keeps static action controls as independent native interactions", () => {
    const onAction = vi.fn();

    render(
      <SettingsCard description="Choose how updates are installed" title="Windows Update">
        <button type="button" onClick={onAction}>
          Check now
        </button>
      </SettingsCard>
    );

    const action = screen.getByRole("button", { name: "Check now" });
    const card = action.closest(".ui-settings-card");

    expect(card).toHaveAttribute("data-interactive", "false");
    expect(card?.querySelector(".ui-settings-card-trigger")).toBeNull();
    fireEvent.click(action);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("uses a sibling native button trigger without nesting interactive children", () => {
    const onAction = vi.fn();
    const onCardClick = vi.fn();
    const onDescriptionAction = vi.fn();

    render(
      <SettingsCard
        action={
          <button type="button" onClick={onAction}>
            More options
          </button>
        }
        description={
          <a href="#privacy-help" onClick={onDescriptionAction}>
            Review app access
          </a>
        }
        onClick={onCardClick}
        title="Privacy"
      />
    );

    const cardTrigger = screen.getByRole("button", { name: "Privacy" });
    const action = screen.getByRole("button", { name: "More options" });
    const descriptionAction = screen.getByRole("link", { name: "Review app access" });

    expect(cardTrigger).toHaveAttribute("type", "button");
    expect(cardTrigger).toHaveAccessibleDescription("Review app access");
    expect(cardTrigger.contains(action)).toBe(false);
    expect(cardTrigger.contains(descriptionAction)).toBe(false);
    expect(cardTrigger.parentElement).toBe(action.closest(".ui-settings-card"));

    fireEvent.click(action);
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onCardClick).not.toHaveBeenCalled();

    fireEvent.click(descriptionAction);
    expect(onDescriptionAction).toHaveBeenCalledTimes(1);
    expect(onCardClick).not.toHaveBeenCalled();

    fireEvent.click(cardTrigger, { detail: 0 });
    expect(onCardClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click" }));
  });

  it("renders link semantics and safe external-link defaults", () => {
    render(
      <SettingsCard
        aria-label="Open display settings"
        description="Resolution and brightness"
        href="/display"
        target="_blank"
        title="Display"
      />
    );

    const link = screen.getByRole("link", { name: "Open display settings" });

    expect(link).toHaveAttribute("href", "/display");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAccessibleDescription("Resolution and brightness");
  });

  it("invokes a combined href and onClick trigger exactly once", () => {
    const onClick = vi.fn((event: { preventDefault: () => void }) => event.preventDefault());

    render(<SettingsCard href="/updates" onClick={onClick} title="Windows Update" />);

    fireEvent.click(screen.getByRole("link", { name: "Windows Update" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("blocks card and descendant activation while disabled", () => {
    const onAction = vi.fn();
    const onCardClick = vi.fn();

    const { container } = render(
      <SettingsCard
        disabled
        action={
          <button type="button" onClick={onAction}>
            Reset
          </button>
        }
        onClick={onCardClick}
        title="Disabled setting"
      />
    );

    const card = container.querySelector(".ui-settings-card");
    const trigger = screen.getByRole("button", { name: "Disabled setting", hidden: true });

    expect(card).toHaveAttribute("aria-disabled", "true");
    expect(card).toHaveAttribute("inert");
    expect(trigger).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Reset", hidden: true }));
    fireEvent.click(trigger);

    expect(onAction).not.toHaveBeenCalled();
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it("disables link navigation by removing href and tab order", () => {
    const { container } = render(
      <SettingsCard disabled href="/privacy" title="Privacy settings" />
    );
    const trigger = container.querySelector(".ui-settings-card-trigger");

    expect(trigger).toHaveAttribute("aria-disabled", "true");
    expect(trigger).not.toHaveAttribute("href");
    expect(trigger).toHaveAttribute("tabindex", "-1");
  });

  it("forwards root attributes and a stable div ref across interaction modes", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <SettingsCard
        ref={ref}
        className="custom-settings-card"
        data-testid="card-root"
        onClick={() => {}}
        title="Accounts"
      />
    );

    const root = screen.getByTestId("card-root");

    expect(ref.current).toBe(root);
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("ui-settings-card", "ui-settings-card-interactive");
    expect(root).toHaveAttribute("data-interactive", "true");
    expect(root.querySelector(".ui-settings-card-action-icon svg")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });
});
