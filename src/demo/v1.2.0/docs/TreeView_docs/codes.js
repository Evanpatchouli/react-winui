const TreeViewImportCode = `import { TreeItem, TreeView } from "@evanpatchouli/react-winui";
import TreeViewDirect, { TreeItem as TreeItemDirect } from "@evanpatchouli/react-winui/tree-view";`;

const TreeViewUsageCode = `<TreeView
  aria-label="Project files"
  defaultExpandedItems={["documents"]}
  defaultValue="readme"
  onValueChange={(value) => setSelected(value)}
>
  <TreeItem label="Documents" value="documents">
    <TreeItem label="Readme" value="readme" />
    <TreeItem label="Roadmap" value="roadmap" />
  </TreeItem>
  <TreeItem disabled label="System" value="system" />
</TreeView>`;

const TreeViewControlledCode = `<TreeView
  aria-label="Controlled files"
  expandedItems={expandedItems}
  value={selectedValue}
  onExpandedItemsChange={setExpandedItems}
  onValueChange={setSelectedValue}
>
  {items}
</TreeView>`;

export { TreeViewControlledCode, TreeViewImportCode, TreeViewUsageCode };
