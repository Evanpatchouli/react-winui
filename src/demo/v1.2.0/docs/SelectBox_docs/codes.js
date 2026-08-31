const SelectImportCode =
`import { Select } from "@evanpatchouli/react-winui";`;

const SelectNativeImportCode =
`import { SelectNative } from "@evanpatchouli/react-winui";`;

const SelectUsageCode =
`<Select
  defaultValue="blue" //Optional
  onChange={(value)=> alert(value)}
  data={[
    {label: "red", value: "red"},
    {label: "blue", value: "blue"},
    {label: "green", value: "green"},
    {label: "pink", value: "pink"},
  ]}
/>`;

const SelectNativeUsageCode =
`<SelectNative
  name="Some Name"
  data={[
    {label: "red", value: "red"},
    {label: "blue", value: "blue"},
    {label: "green", value: "green"},
    {label: "pink", value: "pink"},
  ]}
/>`;


export {
  SelectImportCode,
  SelectUsageCode,
  SelectNativeImportCode,
  SelectNativeUsageCode
}
