import React from "react";
import DocsPropsTable from "../../../common/components/DocsPropsTable";

const rows = [
  ["value", "number", "—", "Controlled score. Zero means unrated. Editable scores are rounded to whole stars."],
  ["defaultValue", "number", "0", "Initial score when value is omitted."],
  ["onValueChange", "(value: number) => void", "—", "Called when the user selects a different score."],
  ["max", "number", "5", "Number of stars, from 1 to 100. Fractional limits are rounded down."],
  ["starColor", 'CSSProperties["color"]', "Theme accent", "Fill for selected, hovered and fractional stars. Disabled stars use the theme’s disabled color."],
  ["readOnly", "boolean", "false", "Display a score, including fractional averages, as a meter."],
  ["disabled", "boolean", "false", "Disable input and show the disabled appearance."],
  ["name", "string", "Generated per instance", "Form field name shared by the star inputs."],
  ["getItemLabel", "(value: number, max: number) => string", '"{value} of {max}"', "Accessible text for each score or the read-only average."],
  ["aria-label", "string", '"Rating"', "Accessible name of the rating."],
  ["ref", "React.Ref<HTMLDivElement>", "—", "Ref to the root div."]
];

export default function PropsView() {
  return <DocsPropsTable rows={rows} />;
}
