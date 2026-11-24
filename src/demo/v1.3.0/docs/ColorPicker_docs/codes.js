const ColorPickerPaletteImportCode =
`import { ColorPickerPalette } from "@evanpatchouli/react-winui";`;

const ColorPickerItemImportCode =
`import { ColorPickerItem } from "@evanpatchouli/react-winui";`;

const ColorPickerPaletteUsageCode =
`<ColorPickerPalette
  color="#6632a8"
  onChange={(color) => function(color)}
/>`;

const ColorPickerItemUsageCode =
`<ColorPickerItem
  name="1"
  color="#6632a8"
  defaultChecked={true}
  onChange={(color) => function(color)}
/>`;


export {
  ColorPickerPaletteImportCode,
  ColorPickerItemImportCode,
  ColorPickerItemUsageCode,
  ColorPickerPaletteUsageCode
}
