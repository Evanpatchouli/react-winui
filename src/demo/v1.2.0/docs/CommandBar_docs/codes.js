const CommandBarImportCode = `import { CommandBar } from "@evanpatchouli/react-winui";
import CommandBarDirect from "@evanpatchouli/react-winui/command-bar";`;

const CommandBarUsageCode = `<CommandBar
  aria-label="Document commands"
  secondaryCommands={
    <>
      <CommandBar.Button label="Rename" onClick={rename} />
      <CommandBar.Button label="Properties" onClick={showProperties} />
    </>
  }
>
  <CommandBar.Button icon={<SaveIcon />} label="Save" onClick={save} />
  <CommandBar.Button icon={<CopyIcon />} label="Copy" onClick={copy} />
  <CommandBar.Separator />
  <CommandBar.Button disabled icon={<PasteIcon />} label="Paste" />
</CommandBar>`;

const CommandBarControlledCode = `const [overflowOpen, setOverflowOpen] = useState(false);

<CommandBar
  aria-label="Controlled commands"
  overflowOpen={overflowOpen}
  onOverflowOpenChange={setOverflowOpen}
  secondaryCommands={<CommandBar.Button label="Settings" />}
>
  <CommandBar.Button label="Refresh" />
</CommandBar>`;

export { CommandBarControlledCode, CommandBarImportCode, CommandBarUsageCode };
