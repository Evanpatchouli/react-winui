import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Pagination from "../src/lib/src/components/Pagination";

const button = (name: string) => screen.getByRole("button", { name });

describe("Pagination", () => {
  it("changes the page once per action and respects both boundaries", () => {
    const change = vi.fn();
    render(<Pagination pageCount={3} onPageChange={change} />);
    expect(button("Previous page")).toBeDisabled();
    fireEvent.click(button("Next page"));
    expect(button("Page 2")).toHaveAttribute("aria-current", "page");
    fireEvent.click(button("Page 2"));
    fireEvent.click(button("Page 3"));
    expect(change.mock.calls).toEqual([[2], [3]]);
    expect(button("Next page")).toBeDisabled();
  });

  it("waits for the controlled value and supports localized names", () => {
    const change = vi.fn();
    const props = {
      pageCount: 12,
      getPageLabel: (page: number) => `第${page}页`,
      onPageChange: change
    };
    const { rerender } = render(<Pagination {...props} page={2} nextLabel="下一页" />);
    fireEvent.click(button("下一页"));
    expect(change).toHaveBeenCalledWith(3);
    expect(button("第2页")).toHaveAttribute("aria-current", "page");
    rerender(<Pagination {...props} page={3} disabled />);
    expect(button("第3页")).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByRole("button").every((item) => item.hasAttribute("disabled"))).toBe(true);
  });

  it("clamps an uncontrolled page after the result set shrinks", () => {
    const { rerender } = render(<Pagination pageCount={10} defaultPage={7} />);
    rerender(<Pagination pageCount={3} />);
    expect(button("Page 3")).toHaveAttribute("aria-current", "page");
    rerender(<Pagination pageCount={20} />);
    expect(button("Page 3")).toHaveAttribute("aria-current", "page");
    rerender(<Pagination pageCount={0} />);
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("keeps a bounded number of buttons and moves focus across the page window", () => {
    render(<Pagination pageCount={1000000} defaultPage={12345} />);
    const current = button("Page 12345");
    current.focus();
    fireEvent.keyDown(current, { key: "ArrowRight" });
    expect(button("Page 12346")).toHaveFocus();
    fireEvent.keyDown(button("Page 12346"), { key: "End" });
    expect(button("Page 1000000")).toHaveFocus();
    fireEvent.keyDown(button("Page 1000000"), { key: "Home" });
    expect(button("Page 1")).toHaveFocus();
    expect(screen.getAllByRole("button").length).toBeLessThanOrEqual(9);
  });

  it("moves keyboard focus to an already selected neighbor without another change", () => {
    const onPageChange = vi.fn();
    render(<Pagination pageCount={100} page={50} onPageChange={onPageChange} />);
    const previous = button("Page 49");
    previous.focus();
    fireEvent.keyDown(previous, { key: "ArrowRight" });
    expect(button("Page 50")).toHaveFocus();
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
