const ComboBoxImportCode = `import { ComboBox } from "@evanpatchouli/react-winui";
import ComboBoxDirect from "@evanpatchouli/react-winui/combo-box";`;

const ComboBoxUsageCode = `<ComboBox
  aria-label="Color"
  options={[
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "red", label: "Red", disabled: true }
  ]}
  value={color}
  onValueChange={setColor}
/>`;

const ComboBoxEditableCode = `<ComboBox
  editable
  aria-label="Recent name"
  options={recentNames}
  text={draft}
  onTextChange={setDraft}
  onTextSubmit={validateName}
  onValueChange={setName}
/>`;

export { ComboBoxEditableCode, ComboBoxImportCode, ComboBoxUsageCode };
