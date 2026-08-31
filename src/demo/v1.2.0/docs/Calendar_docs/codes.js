const CalendarImportCode = `import { Calendar } from "@evanpatchouli/react-winui";
import CalendarDirect from "@evanpatchouli/react-winui/calendar";`;

const CalendarUsageCode = `<Calendar
  label="Release date"
  defaultPickerDate={new Date(2024, 4, 15)}
  locale="en-US"
  today={new Date(2024, 4, 20)}
/>`;

const CalendarControlledCode = `<Calendar
  value={date}
  onValueChange={setDate}
  minDate={new Date(2024, 4, 1)}
  maxDate={new Date(2024, 4, 31)}
  restrictedDates={[new Date(2024, 4, 17)]}
/>`;

const CalendarVisibleMonthCode = `<Calendar
  pickerDate={pickerDate}
  onPickerDateChange={setPickerDate}
  defaultValue={date}
/>`;

export {
  CalendarControlledCode,
  CalendarImportCode,
  CalendarUsageCode,
  CalendarVisibleMonthCode
};
