import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InfoBar from "../src/lib/src/components/InfoBar/index";

describe("InfoBar", () => {
  it("is closed by default and renders inline content when opened", () => {
    const { container, rerender } = render(
      <InfoBar title="Update available" message="Restart to finish installing." />
    );

    expect(container).toBeEmptyDOMElement();
    expect(InfoBar.displayName).toBe("InfoBar");

    rerender(
      <InfoBar
        open
        action={<button type="button">Restart now</button>}
        content={<span>Version 2.0 is ready.</span>}
        message="Restart to finish installing."
        title="Update available"
      />
    );

    expect(screen.getByText("Update available")).toHaveClass("ui-info-bar-title");
    expect(screen.getByText("Restart to finish installing.")).toHaveClass("ui-info-bar-message");
    expect(screen.getByRole("button", { name: "Restart now" })).toBeInTheDocument();
    expect(screen.getByText("Version 2.0 is ready.")).toBeInTheDocument();
  });

  it.each([
    ["informational", "status", "polite"],
    ["success", "alert", "assertive"],
    ["warning", "alert", "assertive"],
    ["error", "alert", "assertive"]
  ] as const)(
    "maps %s severity to an accessible live region",
    (severity, expectedRole, expectedLive) => {
      const { container } = render(
        <InfoBar open message={`${severity} message`} severity={severity} />
      );
      const infoBar = screen.getByRole(expectedRole);

      expect(infoBar).toHaveAttribute("aria-live", expectedLive);
      expect(infoBar).toHaveAttribute("aria-atomic", "true");
      expect(infoBar).toHaveAttribute("data-severity", severity);
      expect(infoBar).toHaveClass(`ui-info-bar-${severity}`);
      expect(container.querySelector(".ui-info-bar-icon svg")).toHaveAttribute(
        "aria-hidden",
        "true"
      );
    }
  );

  it("dismisses an uncontrolled InfoBar through the native keyboard-accessible button", () => {
    const onOpenChange = vi.fn();

    render(
      <InfoBar
        defaultOpen
        closeButtonAriaLabel="Dismiss update"
        message="An update is ready."
        onOpenChange={onOpenChange}
      />
    );

    const closeButton = screen.getByRole("button", { name: "Dismiss update" });
    closeButton.focus();

    expect(closeButton).toHaveFocus();
    expect(closeButton).toHaveAttribute("type", "button");

    fireEvent.click(closeButton, { detail: 0 });

    expect(onOpenChange).toHaveBeenCalledWith(false, expect.objectContaining({ type: "click" }));
    expect(screen.queryByText("An update is ready.")).not.toBeInTheDocument();
  });

  it("requests dismissal without mutating controlled visibility", () => {
    const onOpenChange = vi.fn();

    render(<InfoBar open message="Connection lost." onOpenChange={onOpenChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Object));
    expect(screen.getByText("Connection lost.")).toBeInTheDocument();
  });

  it("supports an unclosable persistent state", () => {
    render(<InfoBar open closable={false} message="Internet access is required." />);

    expect(screen.getByText("Internet access is required.")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("blocks close and action activation while disabled", () => {
    const onAction = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <InfoBar
        defaultOpen
        disabled
        action={
          <button type="button" onClick={onAction}>
            Retry
          </button>
        }
        message="Saving failed."
        onOpenChange={onOpenChange}
        severity="error"
      />
    );

    const infoBar = screen.getByRole("alert");
    const closeButton = screen.getByRole("button", { name: "Close" });

    expect(infoBar).toHaveAttribute("aria-disabled", "true");
    expect(closeButton).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    fireEvent.click(closeButton);

    expect(onAction).not.toHaveBeenCalled();
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByText("Saving failed.")).toBeInTheDocument();
  });

  it("forwards root props and refs while allowing ARIA overrides", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <InfoBar
        open
        ref={ref}
        aria-label="Background sync"
        aria-live="assertive"
        className="custom-info-bar"
        message="Syncing files."
        role="alert"
      />
    );

    const infoBar = screen.getByRole("alert", { name: "Background sync" });

    expect(ref.current).toBe(infoBar);
    expect(infoBar).toHaveClass("ui-info-bar", "custom-info-bar");
    expect(infoBar).toHaveAttribute("aria-live", "assertive");
    expect(infoBar).toHaveAttribute("data-state", "open");
  });
});
