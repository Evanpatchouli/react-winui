const TeachingTipImportCode = `import { Button, TeachingTip } from "@evanpatchouli/react-winui";`;

const TeachingTipUsageCode = `const [open, setOpen] = useState(false);

<TeachingTip
  action={{
    label: "Got it",
    onClick: () => setStatus("tip action selected")
  }}
  content="We will keep your changes synchronized on this device."
  icon={<i aria-hidden="true" className="icons10-idea" />}
  onOpenChange={setOpen}
  open={open}
  subtitle="No extra setup is required."
  title="Sync is ready"
>
  <Button value="Show teaching tip" />
</TeachingTip>`;

const TeachingTipLightDismissCode = `<TeachingTip
  defaultOpen
  isLightDismiss
  content="This tip closes when the user interacts elsewhere."
  title="A quick reminder"
>
  <Button value="Tip target" />
</TeachingTip>`;

export { TeachingTipImportCode, TeachingTipLightDismissCode, TeachingTipUsageCode };
