import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import NumberBox from "../src/lib/src/components/NumberBox";

describe("NumberBox", () => {
  it("renders a labelled spinbutton, forwards its ref, and exposes range semantics", () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <NumberBox ref={ref} defaultValue={4} label="Quantity" max={8} min={1} name="quantity" />
    );

    const spinbutton = screen.getByRole("spinbutton", { name: "Quantity" });
    expect(spinbutton).toHaveValue("4");
    expect(spinbutton).toHaveAttribute("aria-valuemin", "1");
    expect(spinbutton).toHaveAttribute("aria-valuemax", "8");
    expect(spinbutton).toHaveAttribute("aria-valuenow", "4");
    expect(spinbutton).toHaveAttribute("inputmode", "decimal");
    expect(ref.current).toBe(spinbutton);
    expect(document.querySelector('input[type="hidden"][name="quantity"]')).toHaveValue("4");
  });

  it("steps an uncontrolled value with inline buttons and stops at its bounds", () => {
    const onValueChange = vi.fn();
    render(
      <NumberBox
        aria-label="Opacity"
        defaultValue={0.5}
        max={0.7}
        min={0.3}
        precision={1}
        step={0.1}
        onValueChange={onValueChange}
      />
    );

    const spinbutton = screen.getByRole("spinbutton", { name: "Opacity" });
    const increment = screen.getByRole("button", { name: "Increment" });
    const decrement = screen.getByRole("button", { name: "Decrement" });

    fireEvent.click(increment);
    expect(spinbutton).toHaveValue("0.6");
    expect(onValueChange).toHaveBeenLastCalledWith(0.6, expect.anything());

    fireEvent.click(increment);
    expect(spinbutton).toHaveValue("0.7");
    expect(increment).toBeDisabled();

    fireEvent.click(decrement);
    expect(spinbutton).toHaveValue("0.6");
    expect(decrement).not.toBeDisabled();
  });

  it("supports Arrow, Page, Home, and End keyboard stepping", () => {
    const onValueChange = vi.fn();
    render(
      <NumberBox
        aria-label="Temperature"
        defaultValue={10}
        largeStep={20}
        max={50}
        min={-10}
        step={2}
        onValueChange={onValueChange}
      />
    );

    const spinbutton = screen.getByRole("spinbutton", { name: "Temperature" });
    fireEvent.keyDown(spinbutton, { key: "ArrowUp" });
    expect(spinbutton).toHaveValue("12");

    fireEvent.keyDown(spinbutton, { key: "PageUp" });
    expect(spinbutton).toHaveValue("32");

    fireEvent.keyDown(spinbutton, { key: "PageDown" });
    expect(spinbutton).toHaveValue("12");

    fireEvent.keyDown(spinbutton, { key: "Home" });
    expect(spinbutton).toHaveValue("-10");

    fireEvent.keyDown(spinbutton, { key: "End" });
    expect(spinbutton).toHaveValue("50");
    expect(onValueChange).toHaveBeenCalledTimes(5);
  });

  it("parses direct text only on commit, clamps bounds, and restores invalid text", () => {
    const onTextChange = vi.fn();
    const onValueChange = vi.fn();
    render(
      <NumberBox
        aria-label="Score"
        defaultValue={5}
        max={10}
        min={0}
        onTextChange={onTextChange}
        onValueChange={onValueChange}
      />
    );

    const spinbutton = screen.getByRole("spinbutton", { name: "Score" });
    fireEvent.change(spinbutton, { target: { value: "14" } });
    expect(onTextChange).toHaveBeenCalledWith("14", expect.anything());
    expect(onValueChange).not.toHaveBeenCalled();
    expect(spinbutton).toHaveAttribute("aria-invalid", "true");

    fireEvent.keyDown(spinbutton, { key: "Enter" });
    expect(spinbutton).toHaveValue("10");
    expect(onValueChange).toHaveBeenLastCalledWith(10, expect.anything());

    fireEvent.change(spinbutton, { target: { value: "not a number" } });
    fireEvent.blur(spinbutton);
    expect(spinbutton).toHaveValue("10");
    expect(onValueChange).toHaveBeenCalledTimes(1);

    fireEvent.change(spinbutton, { target: { value: "" } });
    fireEvent.keyDown(spinbutton, { key: "Enter" });
    expect(spinbutton).toHaveValue("");
    expect(onValueChange).toHaveBeenLastCalledWith(null, expect.anything());
  });

  it("keeps controlled values strict until the parent updates the prop", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <NumberBox aria-label="Controlled" value={2} onValueChange={onValueChange} />
    );

    const spinbutton = screen.getByRole("spinbutton", { name: "Controlled" });
    fireEvent.change(spinbutton, { target: { value: "7" } });
    expect(spinbutton).toHaveValue("7");

    fireEvent.keyDown(spinbutton, { key: "Enter" });
    expect(onValueChange).toHaveBeenCalledWith(7, expect.anything());
    expect(spinbutton).toHaveValue("2");

    rerender(<NumberBox aria-label="Controlled" value={7} onValueChange={onValueChange} />);
    expect(spinbutton).toHaveValue("7");

    fireEvent.keyDown(spinbutton, { key: "ArrowUp" });
    expect(onValueChange).toHaveBeenLastCalledWith(8, expect.anything());
    expect(spinbutton).toHaveValue("7");
  });

  it("reverts edits with Escape and leaves browser text-editing shortcuts alone", () => {
    const onValueChange = vi.fn();
    render(<NumberBox aria-label="Count" defaultValue={3} onValueChange={onValueChange} />);

    const spinbutton = screen.getByRole("spinbutton", { name: "Count" });
    fireEvent.change(spinbutton, { target: { value: "9" } });
    fireEvent.keyDown(spinbutton, { key: "Escape" });
    expect(spinbutton).toHaveValue("3");

    fireEvent.keyDown(spinbutton, { ctrlKey: true, key: "ArrowUp" });
    expect(spinbutton).toHaveValue("3");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("blocks commits when disabled or read-only and supports hiding spin buttons", () => {
    const onDisabledChange = vi.fn();
    const { rerender } = render(
      <NumberBox disabled aria-label="Disabled" defaultValue={3} onValueChange={onDisabledChange} />
    );

    const disabledInput = screen.getByRole("spinbutton", { name: "Disabled" });
    expect(disabledInput).toBeDisabled();
    expect(screen.getByRole("button", { name: "Increment" })).toBeDisabled();
    fireEvent.keyDown(disabledInput, { key: "ArrowUp" });
    expect(onDisabledChange).not.toHaveBeenCalled();

    rerender(
      <NumberBox
        readOnly
        aria-label="Read only"
        defaultValue={3}
        onValueChange={onDisabledChange}
      />
    );
    const readOnlyInput = screen.getByRole("spinbutton", { name: "Read only" });
    expect(readOnlyInput).toHaveAttribute("readonly");
    expect(screen.getByRole("button", { name: "Increment" })).toBeDisabled();
    fireEvent.keyDown(readOnlyInput, { key: "ArrowUp" });
    expect(onDisabledChange).not.toHaveBeenCalled();

    rerender(<NumberBox showSpinButtons={false} aria-label="Plain" defaultValue={3} />);
    expect(screen.queryByRole("button", { name: "Increment" })).not.toBeInTheDocument();
  });

  it("marks required empty and out-of-range drafts as invalid", () => {
    render(<NumberBox required aria-label="Required amount" max={5} min={1} />);

    const spinbutton = screen.getByRole("spinbutton", { name: "Required amount" });
    expect(spinbutton).toHaveAttribute("aria-invalid", "true");

    fireEvent.change(spinbutton, { target: { value: "3" } });
    expect(spinbutton).not.toHaveAttribute("aria-invalid");

    fireEvent.change(spinbutton, { target: { value: "9" } });
    expect(spinbutton).toHaveAttribute("aria-invalid", "true");
  });
});
