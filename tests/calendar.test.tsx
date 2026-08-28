import { fireEvent, render, screen } from "@testing-library/react";
import { createRef, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import Calendar, {
  type CalendarValue,
  type CalendarValueChangeHandler
} from "../src/lib/src/components/Calendar";

const makeDate = (year: number, month: number, day: number): Date => new Date(year, month - 1, day);

describe("Calendar", () => {
  it("renders a labelled six-week grid, today semantics, and a root ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Calendar
        ref={ref}
        defaultPickerDate={makeDate(2024, 5, 15)}
        firstDayOfWeek={1}
        label="Release date"
        locale="en-US"
        today={makeDate(2024, 5, 20)}
      />
    );

    const root = screen.getByRole("group", { name: "Release date" });
    expect(ref.current).toBe(root);
    expect(screen.getByRole("grid")).toHaveAttribute("aria-rowcount", "7");
    expect(screen.getAllByRole("gridcell")).toHaveLength(42);
    expect(screen.getAllByRole("columnheader").map((header) => header.textContent)).toEqual([
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun"
    ]);
    expect(screen.getByRole("gridcell", { name: "Monday, May 20, 2024" })).toHaveAttribute(
      "aria-current",
      "date"
    );
  });

  it("selects a day and updates uncontrolled value", () => {
    const onValueChange = vi.fn<CalendarValueChangeHandler>();

    render(
      <Calendar
        defaultPickerDate={makeDate(2024, 5, 15)}
        locale="en-US"
        onValueChange={onValueChange}
        today={makeDate(2024, 5, 20)}
      />
    );

    const selectedDay = screen.getByRole("gridcell", { name: "Saturday, May 18, 2024" });
    fireEvent.click(selectedDay);

    expect(onValueChange).toHaveBeenCalledWith(makeDate(2024, 5, 18), expect.anything());
    expect(selectedDay).toHaveAttribute("aria-selected", "true");
    expect(selectedDay).toHaveFocus();
  });

  it("supports roving focus, month navigation, and Enter selection", () => {
    const onValueChange = vi.fn<CalendarValueChangeHandler>();

    render(
      <Calendar
        defaultPickerDate={makeDate(2024, 5, 15)}
        defaultValue={makeDate(2024, 5, 15)}
        locale="en-US"
        onValueChange={onValueChange}
        today={makeDate(2024, 5, 20)}
      />
    );

    const selectedDay = screen.getByRole("gridcell", { name: "Wednesday, May 15, 2024" });
    selectedDay.focus();
    fireEvent.keyDown(selectedDay, { key: "ArrowRight" });
    expect(screen.getByRole("gridcell", { name: "Thursday, May 16, 2024" })).toHaveFocus();

    const nextDay = screen.getByRole("gridcell", { name: "Thursday, May 16, 2024" });
    fireEvent.keyDown(nextDay, { key: "PageDown" });
    const nextMonthDay = screen.getByRole("gridcell", { name: "Sunday, June 16, 2024" });
    expect(screen.getByRole("heading", { name: "June 2024" })).toBeInTheDocument();
    expect(nextMonthDay).toHaveFocus();

    fireEvent.keyDown(nextMonthDay, { key: "Enter" });
    expect(onValueChange).toHaveBeenLastCalledWith(makeDate(2024, 6, 16), expect.anything());
  });

  it("honors bounds and restricted dates while allowing Today selection", () => {
    const onValueChange = vi.fn<CalendarValueChangeHandler>();

    render(
      <Calendar
        defaultPickerDate={makeDate(2024, 5, 15)}
        locale="en-US"
        maxDate={makeDate(2024, 5, 30)}
        minDate={makeDate(2024, 5, 10)}
        onValueChange={onValueChange}
        restrictedDates={[makeDate(2024, 5, 12)]}
        showTodayButton
        today={makeDate(2024, 5, 20)}
      />
    );

    expect(screen.getByRole("gridcell", { name: "Wednesday, May 1, 2024" })).toBeDisabled();
    expect(screen.getByRole("gridcell", { name: "Sunday, May 12, 2024" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous month" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Today" }));
    expect(onValueChange).toHaveBeenLastCalledWith(makeDate(2024, 5, 20), expect.anything());
    expect(screen.getByRole("gridcell", { name: "Monday, May 20, 2024" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("supports controlled visible month navigation", () => {
    const onPickerDateChange = vi.fn();

    const ControlledCalendar = () => {
      const [pickerDate, setPickerDate] = useState(makeDate(2024, 5, 15));
      return (
        <Calendar
          locale="en-US"
          onPickerDateChange={(nextDate, event) => {
            onPickerDateChange(nextDate, event);
            setPickerDate(nextDate);
          }}
          pickerDate={pickerDate}
          today={makeDate(2024, 5, 20)}
        />
      );
    };

    render(<ControlledCalendar />);
    fireEvent.click(screen.getByRole("button", { name: "Next month" }));

    expect(screen.getByRole("heading", { name: "June 2024" })).toBeInTheDocument();
    expect(onPickerDateChange).toHaveBeenCalledWith(makeDate(2024, 6, 1), expect.anything());
  });

  it("keeps a disabled calendar inert", () => {
    const onValueChange = vi.fn<CalendarValueChangeHandler>();

    render(
      <Calendar
        defaultPickerDate={makeDate(2024, 5, 15)}
        defaultValue={makeDate(2024, 5, 15)}
        disabled
        locale="en-US"
        onValueChange={onValueChange}
        today={makeDate(2024, 5, 20)}
      />
    );

    expect(screen.getByRole("group")).toHaveAttribute("aria-disabled", "true");
    expect(
      screen.getAllByRole("gridcell").every((cell) => (cell as HTMLButtonElement).disabled)
    ).toBe(true);
    expect(screen.getByRole("button", { name: "Previous month" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Today" })).toBeDisabled();

    fireEvent.click(screen.getByRole("gridcell", { name: "Wednesday, May 15, 2024" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("accepts controlled values without changing them internally", () => {
    const onValueChange = vi.fn<CalendarValueChangeHandler>();

    const ControlledCalendar = () => {
      const [value, setValue] = useState<CalendarValue>(makeDate(2024, 5, 15));
      return (
        <Calendar
          defaultPickerDate={makeDate(2024, 5, 15)}
          locale="en-US"
          onValueChange={(nextValue, event) => {
            onValueChange(nextValue, event);
            setValue(nextValue);
          }}
          value={value}
        />
      );
    };

    render(<ControlledCalendar />);
    fireEvent.click(screen.getByRole("gridcell", { name: "Saturday, May 18, 2024" }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("gridcell", { name: "Saturday, May 18, 2024" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
});
