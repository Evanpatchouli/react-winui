const TableViewImportCode =
`import { TableView } from "@evanpatchouli/react-winui";`;

const TableViewUsageCode =
`<TableView
  columns={[
    {
      "title": "Fruits",
      "showSortIcon": false
    },
    {
      "title": "Energy (KCal)",
      "showSortIcon": true
    },
    { "title": "Color",
      "showSortIcon": false,
      "sortable": false
    },
  ]}
  rows={[
    [ "Papaya", 11845, "Orange" ],
    [ "Grapes", 12867, "Green"],
    [ "Apple", 10867, "Red"]
  ]}
/>`;



export {
  TableViewImportCode,
  TableViewUsageCode
}
