import { fireEvent, render, screen } from "@testing-library/react";
import { createRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import DatePicker, { type DatePickerValue } from "../src/lib/src/components/DatePicker";

const makeDate = (year: number, month: number, day: number): Date => new Date(year, month - 1, day);

const formatDate = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

describe("DatePicker", () => {
  it("renders a labelled combobox, calendar trigger, and input ref", () => {
    const ref = createRef<HTMLInputElement>();

    render(
      <DatePicker
        ref={ref}
        defaultValue={makeDate(2024, 1, 15)}
        formatDate={formatDate}
        label="Release date"
        locale="en-US"
      />
    );

    const input = screen.getByRole("combobox", { name: "Release date" });
    expect(input).toHaveValue("2024-01-15");
    expect(input).toHaveAttribute("readonly");
    expect(input).toHaveAttribute("aria-haspopup", "dialog");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(ref.current).toBe(input);
    expect(screen.getByRole("button", { name: "Open calendar" })).toHaveAttribute(
      "aria-controls",
      input.getAttribute("aria-controls")
    );
  });

  it("opens from the input and selects a day from the calendar grid", () => {
    const onValueChange = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <DatePicker
        aria-label="Due date"
        defaultValue={makeDate(2024, 1, 15)}
        formatDate={formatDate}
        locale="en-US"
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
        today={makeDate(2024, 1, 15)}
      />
    );

    const input = screen.getByRole("combobox", { name: "Due date" });
    fireEvent.click(input);

    const dialog = screen.getByRole("dialog", { name: "Calendar" });
    expect(dialog).toBeInTheDocument();
    expect(dialog.querySelectorAll('[role="gridcell"]')).toHaveLength(42);
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(onOpenChange).toHaveBeenLastCalledWith(true, expect.anything());

    fireEvent.click(screen.getByRole("gridcell", { name: "Saturday, January 20, 2024" }));

    expect(onValueChange).toHaveBeenCalledWith(makeDate(2024, 1, 20), expect.anything());
    expect(screen.queryByRole("dialog", { name: "Calendar" })).not.toBeInTheDocument();
    expect(input).toHaveValue("2024-01-20");
    expect(input).toHaveFocus();
  });

  it("moves the roving calendar focus with arrows and commits with Enter", () => {
    const onValueChange = vi.fn();

    render(
      <DatePicker
        aria-label="Meeting date"
        defaultValue={makeDate(2024, 1, 15)}
        formatDate={formatDate}
        locale="en-US"
        onValueChange={onValueChange}
      />
    );

    const input = screen.getByRole("combobox", { name: "Meeting date" });
    fireEvent.keyDown(input, { key: "Enter" });

    const selectedDay = screen.getByRole("gridcell", { name: "Monday, January 15, 2024" });
    expect(selectedDay).toHaveFocus();

    fireEvent.keyDown(selectedDay, { key: "ArrowRight" });
    const nextDay = screen.getByRole("gridcell", { name: "Tuesday, January 16, 2024" });
    expect(nextDay).toHaveFocus();

    fireEvent.keyDown(nextDay, { key: "Enter" });
    expect(onValueChange).toHaveBeenCalledWith(makeDate(2024, 1, 16), expect.anything());
    expect(input).toHaveValue("2024-01-16");
    expect(input).toHaveFocus();
  });

  it("supports controlled value and open state without mutating parent state", () => {
    const onValueChange = vi.fn();

    const ControlledDatePicker = () => {
      const [value, setValue] = useState<DatePickerValue>(makeDate(2024, 2, 10));
      const [open, setOpen] = useState(false);
      return (
        <DatePicker
          aria-label="Controlled date"
          formatDate={formatDate}
          locale="en-US"
          open={open}
          onOpenChange={setOpen}
          onValueChange={(nextValue, event) => {
            onValueChange(nextValue, event);
            setValue(nextValue);
          }}
          value={value}
        />
      );
    };

    render(<ControlledDatePicker />);
    const input = screen.getByRole("combobox", { name: "Controlled date" });
    fireEvent.click(input);
    expect(input).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(screen.getByRole("gridcell", { name: "Thursday, February 15, 2024" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("2024-02-15");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("parses editable text on blur and reports invalid or out-of-range values", () => {
    const onTextChange = vi.fn();
    const onValueChange = vi.fn();
    const onValidationResult = vi.fn();

    render(
      <DatePicker
        allowTextInput
        aria-label="Editable date"
        defaultValue={makeDate(2024, 3, 10)}
        formatDate={formatDate}
        locale="en-US"
        maxDate={makeDate(2024, 3, 31)}
        minDate={makeDate(2024, 3, 1)}
        onTextChange={onTextChange}
        onValidationResult={onValidationResult}
        onValueChange={onValueChange}
        parseDate={(text) => {
          const [year, month, day] = text.split("-").map(Number);
          return year && month && day ? makeDate(year, month, day) : null;
        }}
      />
    );

    const input = screen.getByRole("combobox", { name: "Editable date" });
    expect(input).not.toHaveAttribute("readonly");

    fireEvent.change(input, { target: { value: "2024-03-20" } });
    expect(onTextChange).toHaveBeenCalledWith("2024-03-20", expect.anything());
    fireEvent.blur(input);
    expect(onValueChange).toHaveBeenLastCalledWith(makeDate(2024, 3, 20), expect.anything());
    expect(input).toHaveValue("2024-03-20");
    expect(input).not.toHaveAttribute("aria-invalid");

    fireEvent.change(input, { target: { value: "not-a-date" } });
    fireEvent.blur(input);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(onValidationResult).toHaveBeenLastCalledWith("invalid-input");

    fireEvent.change(input, { target: { value: "2024-04-01" } });
    fireEvent.blur(input);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValidationResult).toHaveBeenLastCalledWith("out-of-bounds");
  });

  it("honors min/max dates, today action, and first weekday", () => {
    render(
      <DatePicker
        aria-label="Bounded date"
        defaultOpen
        firstDayOfWeek={1}
        initialPickerDate={makeDate(2024, 4, 15)}
        locale="en-US"
        maxDate={makeDate(2024, 4, 30)}
        minDate={makeDate(2024, 4, 10)}
        showTodayButton
        today={makeDate(2024, 4, 20)}
      />
    );

    expect(screen.getByRole("columnheader", { name: "Mon" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Sun" })).toBeInTheDocument();
    expect(screen.getByRole("gridcell", { name: "Wednesday, May 1, 2024" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous month" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Today" })).not.toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Today" }));
    expect(screen.getByRole("combobox", { name: "Bounded date" })).toHaveValue("04/20/2024");
  });

  it("closes on Escape or outside pointer and keeps disabled pickers inert", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <DatePicker aria-label="Dismissible date" locale="en-US" onOpenChange={onOpenChange} />
    );

    const input = screen.getByRole("combobox", { name: "Dismissible date" });
    fireEvent.click(input);
    const todayCell = document.querySelector<HTMLElement>('[role="gridcell"][aria-current="date"]');
    expect(todayCell).not.toBeNull();
    fireEvent.keyDown(todayCell!, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: "Calendar" })).not.toBeInTheDocument();
    expect(input).toHaveFocus();

    fireEvent.click(input);
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("dialog", { name: "Calendar" })).not.toBeInTheDocument();

    rerender(<DatePicker aria-label="Disabled date" defaultOpen disabled locale="en-US" />);
    expect(screen.getByRole("combobox", { name: "Disabled date" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Open calendar" })).toBeDisabled();
    expect(screen.queryByRole("dialog", { name: "Calendar" })).not.toBeInTheDocument();
    expect(onOpenChange).toHaveBeenCalledTimes(4);
  });
});
