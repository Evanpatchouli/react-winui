import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ComboBox from "../src/lib/src/components/ComboBox";

const options = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green", disabled: true },
  { value: "blue", label: "Blue" }
] as const;

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ComboBox", () => {
  it("renders a select-only value, forwards its ref, and exposes combobox relationships", () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <ComboBox ref={ref} aria-label="Color" defaultValue="red" name="color" options={options} />
    );

    const combobox = screen.getByRole("combobox", { name: "Color" });
    expect(combobox).toHaveValue("Red");
    expect(combobox).toHaveAttribute("aria-autocomplete", "none");
    expect(combobox).toHaveAttribute("aria-expanded", "false");
    expect(combobox).toHaveAttribute("readonly");
    expect(ref.current).toBe(combobox);
    expect(document.querySelector('input[type="hidden"][name="color"]')).toHaveValue("red");

    fireEvent.click(combobox);

    const listbox = screen.getByRole("listbox", { name: "Color" });
    expect(listbox.parentElement).toBe(document.body);
    expect(combobox).toHaveAttribute("aria-controls", listbox.id);
    expect(screen.getByRole("option", { name: "Red" })).toHaveAttribute("aria-selected", "true");
  });

  it("supports controlled value and open state without mutating them internally", () => {
    const onOpenChange = vi.fn();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <ComboBox
        aria-label="Color"
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
        open={false}
        options={options}
        value="red"
      />
    );

    const combobox = screen.getByRole("combobox", { name: "Color" });
    fireEvent.click(combobox);
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    rerender(
      <ComboBox
        aria-label="Color"
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
        open
        options={options}
        value="red"
      />
    );
    fireEvent.click(screen.getByRole("option", { name: "Blue" }));

    expect(onValueChange).toHaveBeenCalledWith("blue", options[2], expect.anything());
    expect(combobox).toHaveValue("Red");
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("navigates enabled options with arrows, Home, End, Enter, and Escape", () => {
    const onValueChange = vi.fn();
    render(
      <ComboBox aria-label="Color" defaultOpen onValueChange={onValueChange} options={options} />
    );

    const combobox = screen.getByRole("combobox", { name: "Color" });
    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    expect(combobox).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Red" }).id
    );

    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    expect(combobox).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Blue" }).id
    );

    fireEvent.keyDown(combobox, { key: "Home" });
    fireEvent.keyDown(combobox, { key: "End" });
    fireEvent.keyDown(combobox, { key: "Enter" });
    expect(combobox).toHaveValue("Blue");
    expect(onValueChange).toHaveBeenCalledWith("blue", options[2], expect.anything());
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    fireEvent.keyDown(combobox, { key: "ArrowUp" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.keyDown(combobox, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(combobox).toHaveValue("Blue");
  });

  it("uses case-insensitive typeahead without selecting until commit", () => {
    const onValueChange = vi.fn();
    render(<ComboBox aria-label="Color" onValueChange={onValueChange} options={options} />);

    const combobox = screen.getByRole("combobox", { name: "Color" });
    fireEvent.keyDown(combobox, { key: "b" });

    expect(combobox).toHaveValue("");
    expect(combobox).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Blue" }).id
    );
    expect(onValueChange).not.toHaveBeenCalled();

    fireEvent.keyDown(combobox, { key: "Enter" });
    expect(combobox).toHaveValue("Blue");
    expect(onValueChange).toHaveBeenCalledWith("blue", options[2], expect.anything());
  });

  it("filters editable options, skips disabled options, and submits custom text", () => {
    const onTextChange = vi.fn();
    const onTextSubmit = vi.fn();
    const onValueChange = vi.fn();
    render(
      <ComboBox
        editable
        aria-label="Color"
        noOptionsMessage="No matching colors"
        onTextChange={onTextChange}
        onTextSubmit={onTextSubmit}
        onValueChange={onValueChange}
        options={options}
      />
    );

    const combobox = screen.getByRole("combobox", { name: "Color" });
    expect(combobox).not.toHaveAttribute("readonly");
    expect(combobox).toHaveAttribute("aria-autocomplete", "list");

    fireEvent.change(combobox, { target: { value: "bl" } });
    expect(onTextChange).toHaveBeenCalledWith("bl", expect.anything());
    expect(screen.getByRole("option", { name: "Blue" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Red" })).not.toBeInTheDocument();

    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    fireEvent.keyDown(combobox, { key: "Enter" });
    expect(combobox).toHaveValue("Blue");
    expect(onValueChange).toHaveBeenLastCalledWith("blue", options[2], expect.anything());

    fireEvent.change(combobox, { target: { value: "Orchid" } });
    expect(screen.getByText("No matching colors")).toBeInTheDocument();
    fireEvent.keyDown(combobox, { key: "Enter" });

    expect(combobox).toHaveValue("Orchid");
    expect(onTextSubmit).toHaveBeenCalledWith("Orchid", expect.anything());
    expect(onValueChange).toHaveBeenLastCalledWith("Orchid", undefined, expect.anything());

    fireEvent.blur(combobox);
    expect(onTextSubmit).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledTimes(2);
  });

  it("treats controlled editable text changes as requests until the parent updates text", () => {
    const onTextChange = vi.fn();
    const { rerender } = render(
      <ComboBox
        editable
        aria-label="Color"
        onTextChange={onTextChange}
        options={options}
        text="Parent value"
      />
    );

    const combobox = screen.getByRole("combobox", { name: "Color" });
    fireEvent.change(combobox, { target: { value: "Requested value" } });

    expect(onTextChange).toHaveBeenCalledWith("Requested value", expect.anything());
    expect(combobox).toHaveValue("Parent value");

    rerender(
      <ComboBox
        editable
        aria-label="Color"
        onTextChange={onTextChange}
        options={options}
        text="Requested value"
      />
    );
    expect(combobox).toHaveValue("Requested value");
  });

  it("does not open or commit when the component or option is disabled", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <ComboBox disabled aria-label="Color" onValueChange={onValueChange} options={options} />
    );

    const disabledCombobox = screen.getByRole("combobox", { name: "Color" });
    expect(disabledCombobox).toBeDisabled();
    fireEvent.click(disabledCombobox);
    fireEvent.keyDown(disabledCombobox, { key: "ArrowDown" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    rerender(<ComboBox aria-label="Color" open onValueChange={onValueChange} options={options} />);
    fireEvent.click(screen.getByRole("option", { name: "Green" }));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("light-dismisses on an outside pointer without changing the selected value", () => {
    const onOpenChange = vi.fn();
    render(
      <ComboBox
        aria-label="Color"
        defaultOpen
        defaultValue="red"
        onOpenChange={onOpenChange}
        options={options}
      />
    );

    fireEvent.pointerDown(document.body);

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Color" })).toHaveValue("Red");
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("places the portal listbox above when the lower viewport cannot fit it", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
      this: HTMLElement
    ) {
      if (this.classList.contains("ui-combobox")) {
        return DOMRect.fromRect({ x: 24, y: 730, width: 200, height: 32 });
      }

      if (this.classList.contains("ui-combobox-listbox")) {
        return DOMRect.fromRect({ x: 0, y: 0, width: 200, height: 180 });
      }

      return DOMRect.fromRect();
    });

    render(<ComboBox aria-label="Color" defaultOpen options={options} />);

    const listbox = screen.getByRole("listbox", { name: "Color" });
    expect(listbox).toHaveAttribute("data-placement", "top");
    expect(listbox).toHaveStyle({ left: "24px", minWidth: "200px" });
  });

  it("keeps an explicit zero max-height when no viewport space is available", () => {
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(40);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
      this: HTMLElement
    ) {
      if (this.classList.contains("ui-combobox")) {
        return DOMRect.fromRect({ x: 24, y: 8, width: 200, height: 32 });
      }

      if (this.classList.contains("ui-combobox-listbox")) {
        return DOMRect.fromRect({ x: 0, y: 0, width: 200, height: 180 });
      }

      return DOMRect.fromRect();
    });

    render(<ComboBox aria-label="Color" defaultOpen options={options} />);

    expect(screen.getByRole("listbox", { name: "Color" }).style.maxHeight).toBe("0");
  });
});
