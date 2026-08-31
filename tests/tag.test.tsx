import { fireEvent, render, screen } from "@testing-library/react";
import type { RefObject } from "react";
import { describe, expect, it, vi } from "vitest";
import Tag from "../src/lib/src/components/Tag";

describe("Tag", () => {
  it("renders a static tag with variants, decorative icon content, and native props", () => {
    const ref = { current: null } as RefObject<HTMLElement>;

    render(
      <Tag
        ref={ref}
        appearance="outline"
        aria-label="Design category"
        className="custom-tag"
        data-testid="tag"
        icon={<svg aria-label="Decorative marker" />}
        shape="circular"
        size="small"
      >
        Design
      </Tag>
    );

    const tag = screen.getByTestId("tag");
    expect(tag.tagName).toBe("SPAN");
    expect(tag).toHaveClass(
      "ui-tag",
      "ui-tag-appearance-outline",
      "ui-tag-shape-circular",
      "ui-tag-size-small",
      "custom-tag"
    );
    expect(tag).toHaveAttribute("aria-label", "Design category");
    expect(tag).toHaveAttribute("data-dismissible", "false");
    expect(tag).toHaveAttribute("data-shape", "circular");
    expect(tag).toHaveAttribute("data-size", "small");
    expect(tag.querySelector(".ui-tag-icon")).toHaveAttribute("aria-hidden", "true");
    expect(tag.querySelector(".ui-tag-dismiss-icon")).toBeNull();
    expect(ref.current).toBe(tag);
  });

  it("renders a dismissible tag as a button and handles click and removal keys", () => {
    const onDismiss = vi.fn();

    render(
      <Tag appearance="brand" data-testid="tag" dismissible onDismiss={onDismiss}>
        Design
      </Tag>
    );

    const tag = screen.getByRole("button", { name: "Design" });
    expect(tag).toHaveAttribute("type", "button");
    expect(tag).toHaveAttribute("data-dismissible", "true");
    expect(tag.querySelector(".ui-tag-dismiss-icon")).toHaveAttribute("aria-hidden", "true");

    fireEvent.click(tag);
    fireEvent.keyDown(tag, { key: "Delete" });
    fireEvent.keyDown(tag, { key: "Backspace" });
    fireEvent.keyDown(tag, { key: "Enter" });

    expect(onDismiss).toHaveBeenCalledTimes(3);
    expect(onDismiss.mock.calls.map(([event]) => event.type)).toEqual([
      "click",
      "keydown",
      "keydown"
    ]);
    expect(onDismiss.mock.calls[1][0]).toHaveProperty("key", "Delete");
    expect(onDismiss.mock.calls[2][0]).toHaveProperty("key", "Backspace");
  });

  it("applies disabled semantics to static and dismissible tags", () => {
    const onDismiss = vi.fn();

    render(
      <>
        <Tag data-testid="static-disabled" disabled>
          Static
        </Tag>
        <Tag data-testid="dismissible-disabled" disabled dismissible onDismiss={onDismiss}>
          Disabled
        </Tag>
      </>
    );

    const staticTag = screen.getByTestId("static-disabled");
    const dismissibleTag = screen.getByTestId("dismissible-disabled");
    expect(staticTag).toHaveAttribute("aria-disabled", "true");
    expect(staticTag).not.toHaveAttribute("disabled");
    expect(dismissibleTag).toBeDisabled();
    expect(dismissibleTag).toHaveAttribute("aria-disabled", "true");

    fireEvent.click(dismissibleTag);
    fireEvent.keyDown(dismissibleTag, { key: "Delete" });
    expect(onDismiss).not.toHaveBeenCalled();
  });
});
