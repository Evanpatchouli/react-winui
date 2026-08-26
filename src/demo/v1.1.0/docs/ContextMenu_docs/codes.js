const ContextMenuImportCode = `import { ContextMenu } from "@evanpatchouli/react-winui";`;

const ContextMenuUsageCode = `<ContextMenu
  content={
    <>
      <ContextMenu.Item secondaryContent="Ctrl+C" onSelect={copy}>
        Copy
      </ContextMenu.Item>
      <ContextMenu.Item disabled>Paste</ContextMenu.Item>
      <ContextMenu.Divider />
      <ContextMenu.Item onSelect={remove}>Delete</ContextMenu.Item>
    </>
  }
>
  <button type="button">Right-click this target</button>
</ContextMenu>`;

export { ContextMenuImportCode, ContextMenuUsageCode };
