import { render, screen } from "@testing-library/react";
import type { RefObject } from "react";
import { describe, expect, it } from "vitest";
import Badge from "../src/lib/src/components/Badge";

describe("Badge", () => {
  it("renders an empty non-interactive dot with the default semantics", () => {
    const ref = { current: null } as RefObject<HTMLSpanElement>;

    render(<Badge data-testid="badge" ref={ref} />);

    const badge = screen.getByTestId("badge");
    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass(
      "ui-badge",
      "ui-badge-appearance-filled",
      "ui-badge-color-brand",
      "ui-badge-shape-circular",
      "ui-badge-size-medium",
      "ui-badge-type-dot"
    );
    expect(badge).toHaveAttribute("data-badge-type", "dot");
    expect(badge).toHaveAttribute("data-rwu-component", "badge");
    expect(badge).not.toHaveAttribute("role");
    expect(badge).not.toHaveAttribute("tabindex");
    expect(ref.current).toBe(badge);
  });

  it("renders text, icon, and all visual API dimensions without exposing decorative icon text", () => {
    render(
      <Badge
        appearance="tint"
        color="warning"
        data-testid="badge"
        icon={<svg aria-label="Warning icon" />}
        iconPosition="after"
        shape="rounded"
        size="large"
      >
        Review
      </Badge>
    );

    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass(
      "ui-badge-appearance-tint",
      "ui-badge-color-warning",
      "ui-badge-shape-rounded",
      "ui-badge-size-large",
      "ui-badge-type-content"
    );
    expect(badge).toHaveAttribute("data-appearance", "tint");
    expect(badge).toHaveAttribute("data-color", "warning");
    expect(badge).toHaveAttribute("data-icon-position", "after");
    expect(badge).toHaveAttribute("data-shape", "rounded");
    expect(badge).toHaveAttribute("data-size", "large");
    expect(badge).toHaveTextContent("Review");
    expect(badge.querySelector(".ui-badge-icon")).toHaveAttribute("aria-hidden", "true");
    expect(badge.querySelector(".ui-badge-content")?.nextElementSibling).toHaveClass(
      "ui-badge-icon"
    );
  });

  it("keeps icon-only badges available to an accessible name and preserves numeric zero content", () => {
    render(
      <>
        <Badge aria-label="Sync status" data-testid="icon-badge" icon={<span>sync</span>} />
        <Badge data-testid="zero-badge" size="small">
          {0}
        </Badge>
      </>
    );

    const iconBadge = screen.getByTestId("icon-badge");
    const zeroBadge = screen.getByTestId("zero-badge");
    expect(iconBadge).toHaveAttribute("data-badge-type", "icon");
    expect(iconBadge).toHaveAttribute("aria-label", "Sync status");
    expect(iconBadge.querySelector(".ui-badge-icon")).not.toHaveAttribute("aria-hidden");
    expect(zeroBadge).toHaveAttribute("data-badge-type", "content");
    expect(zeroBadge).toHaveTextContent("0");
  });
});
