import React from "react";
import DocsPropsTable from "../../../common/components/DocsPropsTable";

const rows = [
  ["pageCount", "number", "Required", "Total page count. Zero pages hides the navigation."],
  ["page", "number", "—", "Controlled page, starting at 1. Out-of-range values display the nearest valid page."],
  ["defaultPage", "number", "1", "Initial page when page is omitted."],
  ["onPageChange", "(page: number) => void", "—", "Called when the user requests a different page."],
  ["disabled", "boolean", "false", "Disable all navigation buttons."],
  ["getPageLabel", "(page: number) => string", '"Page {page}"', "Accessible name of each numbered button."],
  ["previousLabel", "string", '"Previous page"', "Accessible name of the previous-page button."],
  ["nextLabel", "string", '"Next page"', "Accessible name of the next-page button."],
  ["aria-label", "string", '"Pagination"', "Accessible name of the navigation landmark."],
  ["ref", "React.Ref<HTMLElement>", "—", "Ref to the root nav element."]
];

export default function PropsView() {
  return <DocsPropsTable rows={rows} />;
}
