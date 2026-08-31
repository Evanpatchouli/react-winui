const CheckboxImportCode =
`import { Checkbox } from "@evanpatchouli/react-winui";`;

const CheckboxUsageCode =
`<Checkbox
  label="Some Text"
  onChange={() => {}}
  defaultChecked={true}
/>`;

const CheckboxInlineUsageCode =
`<p>Lorem ipsum dolor sit amet 
  <Checkbox
    onChange={() => {}}
    defaultChecked={true}
    tooltip="inline checkbox"
  /> 
sed do eiusmod tempor incididunt ut labore.
</p>`;


export {
  CheckboxImportCode,
  CheckboxUsageCode,
  CheckboxInlineUsageCode
}
