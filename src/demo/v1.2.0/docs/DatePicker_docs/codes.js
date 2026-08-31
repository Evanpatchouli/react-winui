const DatePickerImportCode = `import { DatePicker } from "@evanpatchouli/react-winui";
import DatePickerDirect from "@evanpatchouli/react-winui/date-picker";`;

const DatePickerUsageCode = `<DatePicker
  label="Release date"
  defaultValue={new Date(2024, 4, 15)}
  locale="en-US"
  today={new Date(2024, 4, 20)}
/>`;

const DatePickerControlledCode = `<DatePicker
  value={date}
  onValueChange={setDate}
  minDate={new Date(2024, 4, 1)}
  maxDate={new Date(2024, 4, 31)}
  showTodayButton
/>`;

const DatePickerEditableCode = `<DatePicker
  allowTextInput
  formatDate={(date) => format(date)}
  parseDate={(text) => parse(text)}
  onValidationResult={(error) => setError(error)}
/>`;

export {
  DatePickerControlledCode,
  DatePickerEditableCode,
  DatePickerImportCode,
  DatePickerUsageCode
};
