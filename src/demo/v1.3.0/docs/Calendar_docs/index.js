import React, { useState } from "react";
import { Calendar, NavPageContainer } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  CalendarControlledCode,
  CalendarImportCode,
  CalendarUsageCode,
  CalendarVisibleMonthCode
} from "./codes";
import PropsView from "./props-view";

const releaseDate = new Date(2024, 4, 15);
const today = new Date(2024, 4, 20);

const formatDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

const CalendarDocs = () => {
  const [selectedDate, setSelectedDate] = useState(releaseDate);
  const [pickerDate, setPickerDate] = useState(releaseDate);

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>Calendar</h1>
      <p>
        Calendar is a standalone Windows-style single-date surface. It keeps the existing
        react-winui visual language while exposing a persistent six-week grid, date bounds,
        restricted dates, Today, and keyboard navigation.
      </p>

      <h2>Basic calendar</h2>
      <Calendar
        defaultPickerDate={releaseDate}
        firstDayOfWeek={1}
        label="Release date"
        locale="en-US"
        today={today}
      />

      <h2>Controlled value and range</h2>
      <Calendar
        defaultPickerDate={releaseDate}
        label="Maintenance date"
        locale="en-US"
        maxDate={new Date(2024, 4, 31)}
        minDate={new Date(2024, 4, 1)}
        onValueChange={setSelectedDate}
        restrictedDates={[new Date(2024, 4, 17)]}
        today={today}
        value={selectedDate}
      />
      <p>Selected date: {selectedDate ? formatDate(selectedDate) : "empty"}</p>

      <h2>Controlled visible month</h2>
      <Calendar
        onPickerDateChange={setPickerDate}
        pickerDate={pickerDate}
        today={today}
        locale="en-US"
        label="Browse months"
      />

      <h2>Disabled</h2>
      <Calendar
        defaultPickerDate={releaseDate}
        defaultValue={releaseDate}
        disabled
        label="Disabled calendar"
        locale="en-US"
        today={today}
      />

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {CalendarImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {CalendarUsageCode}
      </SyntaxHighlighter>

      <h2>Controlled value</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {CalendarControlledCode}
      </SyntaxHighlighter>

      <h2>Controlled visible month</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {CalendarVisibleMonthCode}
      </SyntaxHighlighter>

      <h2>Keyboard and accessibility</h2>
      <p>
        Arrow keys move the focused day, Home and End move within the week, Page Up and Page Down
        change months, and Ctrl plus Page Up or Page Down changes years. Enter or Space selects the
        focused day. The calendar exposes an ARIA grid with a roving tab stop.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default CalendarDocs;
