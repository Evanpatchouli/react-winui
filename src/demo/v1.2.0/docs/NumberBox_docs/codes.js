const NumberBoxImportCode = `import { NumberBox } from "@evanpatchouli/react-winui";
import NumberBoxDirect from "@evanpatchouli/react-winui/number-box";`;

const NumberBoxUsageCode = `<NumberBox
  label="Quantity"
  min={1}
  max={20}
  step={1}
  defaultValue={4}
  onValueChange={(value) => setQuantity(value)}
/>`;

const NumberBoxControlledCode = `<NumberBox
  aria-label="Opacity"
  value={opacity}
  min={0}
  max={1}
  step={0.1}
  precision={1}
  onValueChange={setOpacity}
/>`;

export { NumberBoxControlledCode, NumberBoxImportCode, NumberBoxUsageCode };
