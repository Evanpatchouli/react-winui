import { fireEvent, render, screen } from "@testing-library/react";
import type { RefObject } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Breadcrumb from "../src/lib/src/components/Breadcrumb";
import type { BreadcrumbItem } from "../src/lib/src/components/Breadcrumb";

const createItems = (): BreadcrumbItem[] => [
  { href: "/", id: "home", label: "Home", onClick: (event) => event.preventDefault() },
  {
    href: "/projects",
    id: "projects",
    label: "Projects",
    onClick: (event) => event.preventDefault()
  },
  { href: "/design", id: "design", label: "Design", onClick: (event) => event.preventDefault() },
  {
    href: "/release",
    id: "release",
    label: "Release",
    onClick: (event) => event.preventDefault()
  },
  { id: "preview", label: "Preview" }
];

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Breadcrumb", () => {
  it("renders a labelled navigation hierarchy with a non-interactive current item", () => {
    render(
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/settings", label: "Settings" },
          { label: "Notifications" }
        ]}
      />
    );

    const navigation = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(navigation.querySelectorAll("ol > li")).toHaveLength(5);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    const currentItem = navigation.querySelector(".ui-breadcrumb-item-current");
    expect(currentItem).toHaveTextContent("Notifications");
    expect(currentItem).toHaveAttribute("aria-current", "page");
    expect(currentItem?.closest("li")).toHaveAttribute("data-current", "true");
    expect(navigation.querySelectorAll('[role="presentation"][aria-hidden="true"]')).toHaveLength(
      2
    );
  });

  it("supports button items, item callbacks, and ignores disabled items", () => {
    const onItemClick = vi.fn();
    const itemClick = vi.fn((event) => event.preventDefault());

    render(
      <Breadcrumb
        items={[
          { href: "/", label: "Home", onClick: itemClick },
          { disabled: true, label: "Unavailable" },
          { label: "Current" }
        ]}
        onItemClick={onItemClick}
      />
    );

    fireEvent.click(screen.getByRole("link", { name: "Home" }));
    expect(itemClick).toHaveBeenCalledOnce();
    expect(onItemClick).toHaveBeenCalledWith(
      expect.objectContaining({ label: "Home" }),
      0,
      expect.anything()
    );
    expect(screen.getByText("Unavailable").closest(".ui-breadcrumb-item-content")).toHaveAttribute(
      "aria-disabled",
      "true"
    );
    expect(screen.queryByRole("button", { name: "Unavailable" })).not.toBeInTheDocument();

    const buttonItem = { label: "Local view", onClick: vi.fn() };
    render(
      <Breadcrumb
        aria-label="Secondary path"
        items={[{ href: "/", label: "Home" }, buttonItem, { label: "Current" }]}
        onItemClick={onItemClick}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Local view" }));
    expect(buttonItem.onClick).toHaveBeenCalledOnce();
    expect(onItemClick).toHaveBeenLastCalledWith(buttonItem, 1, expect.anything());
  });

  it("collapses middle items into a focusable overflow menu", () => {
    const onItemClick = vi.fn();

    render(<Breadcrumb items={createItems()} maxVisibleItems={4} onItemClick={onItemClick} />);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Release" })).toBeInTheDocument();
    expect(screen.getByText("Preview").closest(".ui-breadcrumb-item-content")).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.queryByRole("link", { name: "Projects" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Design" })).not.toBeInTheDocument();

    const overflowButton = screen.getByRole("button", { name: "Show more breadcrumb items" });
    expect(overflowButton).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(overflowButton);

    expect(overflowButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Design" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("menuitem", { name: "Projects" }));
    expect(onItemClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: "projects" }),
      1,
      expect.anything()
    );
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("restores focus after the overflow menu closes with Escape", () => {
    render(<Breadcrumb items={createItems()} maxVisibleItems={3} />);

    const overflowButton = screen.getByRole("button", { name: "Show more breadcrumb items" });
    fireEvent.click(overflowButton);
    expect(screen.getByRole("menuitem", { name: "Projects" })).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(overflowButton).toHaveFocus();
  });

  it("keeps an empty path structurally valid and forwards native nav props and ref", () => {
    const ref = { current: null } as RefObject<HTMLElement>;

    render(<Breadcrumb ref={ref} aria-label="Empty path" data-testid="breadcrumb" items={[]} />);

    expect(screen.getByRole("navigation", { name: "Empty path" })).toHaveAttribute(
      "data-testid",
      "breadcrumb"
    );
    expect(ref.current).toBe(screen.getByTestId("breadcrumb"));
    expect(screen.getByTestId("breadcrumb").querySelector("ol")).toBeEmptyDOMElement();
  });
});
