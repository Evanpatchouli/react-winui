const SettingsExpanderImportCode = `import { SettingsCard, SettingsExpander } from "@evanpatchouli/react-winui";
import SettingsExpanderDirect from "@evanpatchouli/react-winui/settings-expander";`;

const SettingsExpanderUsageCode = `<SettingsExpander
  header="Advanced network settings"
  description="Manage discovery and sharing"
  icon={<SettingsIcon />}
  content={<Switch aria-label="Advanced network features" />}
  itemsHeader="Related options"
  itemsFooter="Changes apply to the current network profile."
>
  <SettingsCard title="Network discovery">
    <Switch aria-label="Network discovery" />
  </SettingsCard>
  <SettingsCard title="File sharing">
    <Switch aria-label="File sharing" />
  </SettingsCard>
</SettingsExpander>`;

const SettingsExpanderControlledCode = `const [expanded, setExpanded] = useState(false);

<SettingsExpander
  title="Optional features"
  expanded={expanded}
  onExpandedChange={setExpanded}
  action={<Button onClick={resetFeatures}>Reset</Button>}
>
  <SettingsCard title="Developer mode" />
</SettingsExpander>`;

export {
  SettingsExpanderControlledCode,
  SettingsExpanderImportCode,
  SettingsExpanderUsageCode
};
