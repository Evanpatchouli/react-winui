const PopoverImportCode = `import { Button, Flyout, Popover } from "@evanpatchouli/react-winui";`;

const PopoverUsageCode = `<Popover
  content={
    <div>
      <strong>Quick actions</strong>
      <p>Choose an action for this document.</p>
      <Button type="primary" value="Continue" />
    </div>
  }
  placement="bottom"
  withArrow
>
  <Button value="Open Popover" />
</Popover>`;

const PopoverControlledCode = `const [open, setOpen] = useState(false);

<Popover
  content="This Popover is controlled by React state"
  open={open}
  onOpenChange={setOpen}
>
  <Button value="Controlled Popover" />
</Popover>`;

const FlyoutUsageCode = `<Flyout content="Flyout content closes on outside click or Escape">
  <Button value="Open Flyout" />
</Flyout>`;

export { FlyoutUsageCode, PopoverControlledCode, PopoverImportCode, PopoverUsageCode };
