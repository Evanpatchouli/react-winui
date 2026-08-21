const TooltipImportCode = `import { Tooltip } from "@evanpatchouli/react-winui";`;

const TooltipUsageCode = `<Tooltip content="Create a new document">
  <Button value="New document" />
</Tooltip>`;

const TooltipControlledCode = `const [open, setOpen] = useState(false);

<Tooltip
  content="This Tooltip is controlled by React state"
  open={open}
  onOpenChange={setOpen}
  showDelay={0}
>
  <Button value="Controlled Tooltip" />
</Tooltip>`;

const TooltipPlacementCode = `<Tooltip
  content="Save your work"
  placement="bottom"
  relationship="description"
  withArrow
>
  <Button value="Save" />
</Tooltip>`;

export {
  TooltipControlledCode,
  TooltipImportCode,
  TooltipPlacementCode,
  TooltipUsageCode
};
