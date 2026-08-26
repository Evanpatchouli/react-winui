const SettingsCardImportCode = `import { SettingsCard } from "@evanpatchouli/react-winui";
import SettingsCardDirect from "@evanpatchouli/react-winui/settings-card";`;

const SettingsCardUsageCode = `<SettingsCard
  title="Notifications"
  description="Allow desktop notifications"
  icon={<NotificationIcon />}
>
  <Switch aria-label="Desktop notifications" />
</SettingsCard>`;

const SettingsCardClickableCode = `<SettingsCard
  title="Display"
  description="Brightness, night light, and display profile"
  icon={<DisplayIcon />}
  onClick={() => navigate("/settings/display")}
/>

// Content and action controls are siblings of the card trigger,
// so they remain valid independent interactions.
<SettingsCard title="Updates" onClick={openUpdateDetails}>
  <Button onClick={checkForUpdates}>Check now</Button>
</SettingsCard>`;

export { SettingsCardClickableCode, SettingsCardImportCode, SettingsCardUsageCode };
