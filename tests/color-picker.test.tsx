import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ColorPicker from "../src/lib/src/components/ColorPicker";

const presets = [
  { value: "#FF0000", label: "Red" },
  { value: "#0000ff", label: "Blue" }
];

describe("ColorPicker", () => {
  it("keeps the native picker and the selected preset in sync", () => {
    const change = vi.fn();
    render(<ColorPicker defaultValue="#0000FF" presets={presets} onValueChange={change} />);
    const custom = screen.getByLabelText("Custom color");
    const red = screen.getByRole("radio", { name: "Red" });
    expect(screen.getByRole("radio", { name: "Blue" })).toBeChecked();
    expect(custom).toHaveValue("#0000ff");
    fireEvent.click(red);
    expect(custom).toHaveValue("#ff0000");
    expect(change).toHaveBeenNthCalledWith(1, "#ff0000");
    fireEvent.change(custom, { target: { value: "#345678" } });
    expect(red).not.toBeChecked();
    expect(change).toHaveBeenNthCalledWith(2, "#345678");
    fireEvent.change(custom, { target: { value: "#0000ff" } });
    expect(screen.getByRole("radio", { name: "Blue" })).toBeChecked();
  });

  it("waits for the owner to accept either source of a controlled change", () => {
    const change = vi.fn();
    const { rerender } = render(
      <ColorPicker presets={presets} value="#ff0000" onValueChange={change} />
    );
    const custom = screen.getByLabelText("Custom color");
    fireEvent.change(custom, { target: { value: "#123456" } });
    expect(change).toHaveBeenCalledWith("#123456");
    expect(custom).toHaveValue("#ff0000");
    fireEvent.click(screen.getByRole("radio", { name: "Blue" }));
    expect(screen.getByRole("radio", { name: "Red" })).toBeChecked();
    rerender(<ColorPicker presets={presets} value="#0000ff" onValueChange={change} />);
    expect(screen.getByRole("radio", { name: "Blue" })).toBeChecked();
    expect(custom).toHaveValue("#0000ff");
  });

  it("isolates radio groups and disables every input", () => {
    render(
      <>
        <ColorPicker presets={presets} aria-label="Foreground" defaultValue="#ff0000" />
        <ColorPicker
          presets={presets}
          aria-label="Background"
          customColorLabel="Custom background"
          disabled
        />
      </>
    );
    const foreground = within(screen.getByRole("group", { name: "Foreground" }));
    const background = within(screen.getByRole("group", { name: "Background" }));
    const first = foreground.getByRole("radio", { name: "Red" });
    const second = background.getByRole("radio", { name: "Red" });
    expect(first.getAttribute("name")).not.toBe(second.getAttribute("name"));
    expect(second).toBeDisabled();
    expect(background.getByLabelText("Custom background")).toBeDisabled();
  });

  it("filters invalid and duplicate presets and supports custom-only selection", () => {
    const { rerender } = render(
      <ColorPicker
        value="invalid"
        presets={[
          ...presets,
          { value: "#ff0000", label: "Duplicate" },
          { value: "invalid", label: "Invalid" }
        ]}
      />
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
    expect(screen.getByLabelText("Custom color")).toHaveValue("#000000");
    rerender(<ColorPicker />);
    expect(screen.queryAllByRole("radio")).toHaveLength(0);
    expect(screen.getByLabelText("Custom color")).toBeEnabled();
  });
});
