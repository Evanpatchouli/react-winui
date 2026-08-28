import React, { useState } from "react";
import { DatePicker, NavPageContainer } from "@evanpatchouli/react-winui";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  DatePickerControlledCode,
  DatePickerEditableCode,
  DatePickerImportCode,
  DatePickerUsageCode
} from "./codes";
import PropsView from "./props-view";

const releaseDate = new Date(2024, 4, 15);
const today = new Date(2024, 4, 20);

const formatDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

const parseDate = (text) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text.trim());
  if (!match) {
    return null;
  }

  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return formatDate(date) === text.trim() ? date : null;
};

const DatePickerDocs = () => {
  const [selectedDate, setSelectedDate] = useState(releaseDate);
  const [editableDate, setEditableDate] = useState(null);

  return (
    <NavPageContainer animateTransition hasPadding>
      <h1>DatePicker</h1>
      <p>
        DatePicker combines a read-only date input with a Windows-style calendar popup. It supports
        controlled and uncontrolled values, date bounds, keyboard navigation, and optional text
        parsing without changing the existing Select or InputText components.
      </p>

      <h2>Basic selected date</h2>
      <DatePicker
        defaultValue={releaseDate}
        formatDate={formatDate}
        initialPickerDate={releaseDate}
        label="Release date"
        locale="en-US"
        today={today}
      />

      <h2>Controlled value and range</h2>
      <DatePicker
        label="Maintenance date"
        locale="en-US"
        maxDate={new Date(2024, 4, 31)}
        minDate={new Date(2024, 4, 1)}
        onValueChange={setSelectedDate}
        showTodayButton
        today={today}
        value={selectedDate}
        formatDate={formatDate}
      />
      <p>Selected date: {selectedDate ? formatDate(selectedDate) : "empty"}</p>

      <h2>Editable text</h2>
      <DatePicker
        allowTextInput
        aria-label="Custom date"
        formatDate={formatDate}
        locale="en-US"
        onValueChange={setEditableDate}
        parseDate={parseDate}
        placeholder="YYYY-MM-DD"
      />
      <p>Editable date: {editableDate ? formatDate(editableDate) : "empty"}</p>

      <h2>Read-only and disabled</h2>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "16px" }}>
        <DatePicker defaultValue={releaseDate} label="Read only" locale="en-US" />
        <DatePicker defaultValue={releaseDate} disabled label="Disabled" locale="en-US" />
      </div>

      <h2>Import</h2>
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="code code-container">
        {DatePickerImportCode}
      </SyntaxHighlighter>

      <h2>Usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {DatePickerUsageCode}
      </SyntaxHighlighter>

      <h2>Controlled usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {DatePickerControlledCode}
      </SyntaxHighlighter>

      <h2>Editable usage</h2>
      <SyntaxHighlighter language="jsx" style={vscDarkPlus} className="code code-container">
        {DatePickerEditableCode}
      </SyntaxHighlighter>

      <h2>Keyboard and accessibility</h2>
      <p>
        Enter, Space, or Arrow Down opens the calendar. Arrow keys move the focused date; Home and
        End move within the week, Page Up and Page Down change months, and Enter or Space commits
        the focused date. Escape and outside pointer close the popup and restore input focus.
      </p>

      <h2>Props</h2>
      <PropsView />

      <br />
      <br />
      <br />
    </NavPageContainer>
  );
};

export default DatePickerDocs;
