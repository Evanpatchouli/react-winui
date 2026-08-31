const BadgeImportCode = `import { Badge } from "@evanpatchouli/react-winui";
import "@evanpatchouli/react-winui/styles.css";`;

const BadgeUsageCode = `<Badge color="success">Ready</Badge>
<Badge appearance="outline" color="warning">Review</Badge>`;

const BadgeContentCode = `<Badge color="danger">3</Badge>
<Badge aria-label="New notifications" color="danger" />
<Badge aria-label="Sync status" icon={<SyncIcon />} />
<Badge icon={<StatusIcon />} iconPosition="after">
  Ready
</Badge>`;

export { BadgeContentCode, BadgeImportCode, BadgeUsageCode };
