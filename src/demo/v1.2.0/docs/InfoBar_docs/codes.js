const InfoBarImportCode = `import { InfoBar } from "@evanpatchouli/react-winui";`;

const InfoBarUsageCode = `const [open, setOpen] = useState(true);

<InfoBar
  open={open}
  onOpenChange={setOpen}
  severity="warning"
  title="Connection interrupted"
  message="Changes will sync when the network returns."
  action={<Button>Network settings</Button>}
/>`;

const InfoBarContentCode = `<InfoBar
  defaultOpen
  closable={false}
  title="Backup in progress"
  message="Your documents are being saved."
  content={<ProgressBar setProgress={48} />}
/>`;

export { InfoBarContentCode, InfoBarImportCode, InfoBarUsageCode };
