import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AutoSuggestBox from "../src/lib/src/components/AutoSuggestBox";

const suggestions = [
  { value: "Tokyo" },
  { disabled: true, label: "London unavailable", value: "London" },
  { icon: <span>icon</span>, label: "Seattle, WA", value: "Seattle" }
] as const;

afterEach(() => {
  vi.restoreAllMocks();
});

describe("AutoSuggestBox", () => {
  it("renders labelled input guidance, forwards its ref, and exposes combobox relationships", () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <AutoSuggestBox
        defaultOpen
        defaultText="To"
        description="Search known cities"
        label="Destination"
        listboxAriaLabel="City suggestions"
        ref={ref}
        suggestions={suggestions}
      />
    );

    const combobox = screen.getByRole("combobox", { name: "Destination" });
    const listbox = screen.getByRole("listbox", { name: "City suggestions" });
    expect(combobox).toHaveValue("To");
    expect(combobox).toHaveAttribute("aria-autocomplete", "list");
    expect(combobox).toHaveAttribute("aria-expanded", "true");
    expect(combobox).toHaveAttribute("aria-controls", listbox.id);
    expect(combobox).toHaveAccessibleDescription("Search known cities");
    expect(listbox.parentElement).toBe(document.body);
    expect(ref.current).toBe(combobox);
  });

  it("updates uncontrolled text, reports the reason, and exposes an empty result message", () => {
    const onTextChange = vi.fn();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <AutoSuggestBox
        aria-label="City"
        noSuggestionsMessage="No matching cities"
        onOpenChange={onOpenChange}
        onTextChange={onTextChange}
        suggestions={suggestions}
      />
    );

    const combobox = screen.getByRole("combobox", { name: "City" });
    fireEvent.change(combobox, { target: { value: "Sea" } });
    expect(combobox).toHaveValue("Sea");
    expect(onTextChange).toHaveBeenCalledWith("Sea", expect.anything(), "input");
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());

    rerender(
      <AutoSuggestBox
        aria-label="City"
        noSuggestionsMessage="No matching cities"
        onOpenChange={onOpenChange}
        onTextChange={onTextChange}
        suggestions={[]}
      />
    );
    expect(screen.getByRole("status")).toHaveTextContent("No matching cities");
  });

  it("keeps controlled text and open state unchanged until the parent updates them", () => {
    const onTextChange = vi.fn();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <AutoSuggestBox
        aria-label="City"
        onOpenChange={onOpenChange}
        onTextChange={onTextChange}
        open={false}
        suggestions={suggestions}
        text="Parent text"
      />
    );

    const combobox = screen.getByRole("combobox", { name: "City" });
    fireEvent.change(combobox, { target: { value: "Requested text" } });
    expect(onTextChange).toHaveBeenCalledWith("Requested text", expect.anything(), "input");
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything());
    expect(combobox).toHaveValue("Parent text");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    rerender(
      <AutoSuggestBox
        aria-label="City"
        onOpenChange={onOpenChange}
        onTextChange={onTextChange}
        open
        suggestions={suggestions}
        text="Requested text"
      />
    );
    expect(combobox).toHaveValue("Requested text");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("navigates enabled suggestions and distinguishes choice from query submission", () => {
    const onQuerySubmit = vi.fn();
    const onSuggestionChoose = vi.fn();
    const onTextChange = vi.fn();
    render(
      <AutoSuggestBox
        aria-label="City"
        defaultOpen
        defaultText="S"
        onQuerySubmit={onQuerySubmit}
        onSuggestionChoose={onSuggestionChoose}
        onTextChange={onTextChange}
        suggestions={suggestions}
      />
    );

    const combobox = screen.getByRole("combobox", { name: "City" });
    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    expect(combobox).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Seattle, WA" }).id
    );

    fireEvent.keyDown(combobox, { key: "Enter" });
    expect(combobox).toHaveValue("Seattle");
    expect(onTextChange).toHaveBeenLastCalledWith("Seattle", expect.anything(), "suggestion");
    expect(onSuggestionChoose).toHaveBeenCalledWith(suggestions[2], expect.anything());
    expect(onQuerySubmit).toHaveBeenCalledWith("Seattle", suggestions[2], expect.anything());
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("submits typed text without a chosen suggestion and ignores Enter during composition", () => {
    const onQuerySubmit = vi.fn();
    render(
      <AutoSuggestBox
        aria-label="City"
        defaultText="北京"
        onQuerySubmit={onQuerySubmit}
        suggestions={suggestions}
      />
    );

    const combobox = screen.getByRole("combobox", { name: "City" });
    fireEvent.compositionStart(combobox);
    fireEvent.keyDown(combobox, { key: "Enter" });
    expect(onQuerySubmit).not.toHaveBeenCalled();

    fireEvent.compositionEnd(combobox);
    fireEvent.keyDown(combobox, { key: "Enter" });
    expect(onQuerySubmit).toHaveBeenCalledWith("北京", undefined, expect.anything());
    expect(onQuerySubmit).toHaveBeenCalledTimes(1);
  });

  it("supports pointer choice, query button submission, and clear requests", () => {
    const onQuerySubmit = vi.fn();
    const onSuggestionChoose = vi.fn();
    const onTextChange = vi.fn();
    render(
      <AutoSuggestBox
        aria-label="City"
        defaultOpen
        defaultText="To"
        onQuerySubmit={onQuerySubmit}
        onSuggestionChoose={onSuggestionChoose}
        onTextChange={onTextChange}
        queryButton
        suggestions={suggestions}
      />
    );

    fireEvent.click(screen.getByRole("option", { name: "Tokyo" }));
    expect(onSuggestionChoose).toHaveBeenCalledWith(suggestions[0], expect.anything());
    expect(onQuerySubmit).toHaveBeenCalledWith("Tokyo", suggestions[0], expect.anything());

    fireEvent.click(screen.getByRole("button", { name: "Submit query" }));
    expect(onQuerySubmit).toHaveBeenLastCalledWith("Tokyo", undefined, expect.anything());

    fireEvent.click(screen.getByRole("button", { name: "Clear text" }));
    expect(onTextChange).toHaveBeenLastCalledWith("", expect.anything(), "clear");
    expect(screen.getByRole("combobox", { name: "City" })).toHaveValue("");
  });

  it("light-dismisses with Escape or an outside pointer and blocks disabled interaction", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <AutoSuggestBox
        aria-label="City"
        defaultOpen
        onOpenChange={onOpenChange}
        suggestions={suggestions}
      />
    );

    const combobox = screen.getByRole("combobox", { name: "City" });
    fireEvent.keyDown(combobox, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    fireEvent.focus(combobox);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    rerender(
      <AutoSuggestBox
        disabled
        aria-label="City"
        defaultText="Tokyo"
        onOpenChange={onOpenChange}
        queryButton
        suggestions={suggestions}
      />
    );
    expect(combobox).toBeDisabled();
    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    fireEvent.click(screen.getByRole("button", { name: "Submit query" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("places the portal listbox above when the lower viewport cannot fit it", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
      this: HTMLElement
    ) {
      if (this.classList.contains("ui-auto-suggest-box-control")) {
        return DOMRect.fromRect({ x: 24, y: 730, width: 220, height: 32 });
      }

      return DOMRect.fromRect();
    });

    render(<AutoSuggestBox aria-label="City" defaultOpen suggestions={suggestions} text="Sea" />);

    expect(screen.getByRole("listbox")).toHaveAttribute("data-placement", "top");
  });
});
