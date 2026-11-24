import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Rating from "../src/lib/src/components/Rating";

describe("Rating", () => {
  it("submits a selected score and leaves other groups independent", () => {
    const change = vi.fn();
    render(
      <form data-testid="form">
        <Rating name="score" defaultValue={2} onValueChange={change} aria-label="Product" />
        <Rating defaultValue={1} aria-label="Service" />
      </form>
    );
    const group = within(screen.getByRole("radiogroup", { name: "Product" }));
    expect(group.getByRole("radio", { name: "2 of 5" })).toBeChecked();
    fireEvent.click(group.getByRole("radio", { name: "4 of 5" }));
    expect(change).toHaveBeenCalledWith(4);
    expect(new FormData(screen.getByTestId<HTMLFormElement>("form")).get("score")).toBe("4");
    expect(
      within(screen.getByRole("radiogroup", { name: "Service" })).getByRole("radio", {
        checked: true
      })
    ).toHaveAccessibleName("1 of 5");
  });

  it("waits for a controlled update and supports localized labels", () => {
    const change = vi.fn();
    const props = { max: 3, onValueChange: change, getItemLabel: (n: number) => `${n} 星` };
    const { rerender } = render(<Rating value={0} {...props} />);
    fireEvent.click(screen.getByRole("radio", { name: "2 星" }));
    expect(change).toHaveBeenCalledWith(2);
    expect(screen.queryByRole("radio", { checked: true })).toBeNull();
    rerender(<Rating value={2} {...props} />);
    expect(screen.getByRole("radio", { checked: true })).toHaveAccessibleName("2 星");
  });

  it("restores the committed display when interaction switches from hover to keyboard", () => {
    const change = vi.fn();
    render(<Rating defaultValue={2} onValueChange={change} />);
    const fourth = screen.getByRole("radio", { name: "4 of 5" });
    const item = fourth.closest("label")!;
    fireEvent.mouseEnter(item);
    expect(item.querySelector(".ui-rating-fill")).toHaveStyle({ inlineSize: "100%" });
    expect(change).not.toHaveBeenCalled();
    fireEvent.keyDown(screen.getByRole("radio", { checked: true }), { key: "ArrowRight" });
    expect(item.querySelector(".ui-rating-fill")).toHaveStyle({ inlineSize: "0%" });
  });

  it("disables every input and shows fractional averages as a single meter", () => {
    const { rerender } = render(<Rating disabled max={3} />);
    for (const radio of screen.getAllByRole("radio")) expect(radio).toBeDisabled();
    rerender(<Rating readOnly value={3.5} />);
    expect(screen.queryByRole("radio")).toBeNull();
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuetext", "3.5 of 5");
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "3.5");
    rerender(<Rating readOnly value={9} max={3} />);
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "3");
  });
});
