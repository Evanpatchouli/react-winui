import { useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  AutoSuggestBox,
  ComboBox,
  CommandBar,
  ContextMenu,
  Expander,
  Flyout,
  InfoBar,
  NumberBox,
  Popover,
  SettingsCard,
  TreeItem,
  TreeView,
  Toast,
  Toaster
} from "@evanpatchouli/react-winui";
import ButtonDirect from "@evanpatchouli/react-winui/button";
import AutoSuggestBoxDirect from "@evanpatchouli/react-winui/auto-suggest-box";
import ComboBoxDirect from "@evanpatchouli/react-winui/combo-box";
import CommandBarDirect from "@evanpatchouli/react-winui/command-bar";
import ContextMenuDirect from "@evanpatchouli/react-winui/context-menu";
import ExpanderDirect from "@evanpatchouli/react-winui/expander";
import FlyoutDirect from "@evanpatchouli/react-winui/flyout";
import InfoBarDirect from "@evanpatchouli/react-winui/info-bar";
import NumberBoxDirect from "@evanpatchouli/react-winui/number-box";
import PopoverDirect from "@evanpatchouli/react-winui/popover";
import SettingsCardDirect from "@evanpatchouli/react-winui/settings-card";
import TreeViewDirect, { TreeItem as TreeItemDirect } from "@evanpatchouli/react-winui/tree-view";
import ToastDirect, { Toaster as ToasterDirect } from "@evanpatchouli/react-winui/toast";
import { Shadows } from "@evanpatchouli/react-winui/theme";
import "@evanpatchouli/react-winui/config/app-config.css";
import "@evanpatchouli/react-winui/styles.css";
import "@evanpatchouli/react-winui/icons/winui-icons.slim.css";

const ConsumerApp = () => {
  const toasterRef = useRef(null);
  const directToasterRef = useRef(null);

  return (
    <main style={{ display: "flex", gap: "8px", padding: "24px", boxShadow: Shadows.shadow8 }}>
      <Button type="primary" value="Root export" />
      <ButtonDirect type="subtle" value="Button subpath" />
      <AutoSuggestBox
        aria-label="Root AutoSuggestBox"
        defaultText="Win"
        queryButton
        suggestions={[{ value: "Windows 11" }]}
      />
      <AutoSuggestBoxDirect
        aria-label="AutoSuggestBox subpath"
        suggestions={[{ value: "WinUI Gallery" }]}
      />
      <ComboBox
        aria-label="Root ComboBox"
        defaultValue="one"
        options={[{ label: "One", value: "one" }]}
      />
      <ComboBoxDirect
        editable
        aria-label="ComboBox subpath"
        options={[{ label: "Two", value: "two" }]}
      />
      <CommandBar
        aria-label="Root CommandBar"
        secondaryCommands={<CommandBar.Button label="Root settings" />}
      >
        <CommandBar.Button label="Root save" />
      </CommandBar>
      <CommandBarDirect aria-label="CommandBar subpath">
        <CommandBarDirect.Button label="Direct save" />
      </CommandBarDirect>
      <ContextMenu content={<ContextMenu.Item>Root command</ContextMenu.Item>}>
        <button type="button">Root ContextMenu</button>
      </ContextMenu>
      <ContextMenuDirect content={<ContextMenuDirect.Item>Direct command</ContextMenuDirect.Item>}>
        <button type="button">ContextMenu subpath</button>
      </ContextMenuDirect>
      <Expander defaultExpanded header="Root Expander">
        Root content
      </Expander>
      <ExpanderDirect direction="up" header="Expander subpath">
        Direct content
      </ExpanderDirect>
      <Popover content="Root Popover" defaultOpen>
        <Button value="Popover" />
      </Popover>
      <PopoverDirect content="Direct Popover">
        <Button value="Direct Popover" />
      </PopoverDirect>
      <Flyout content="Root Flyout">
        <Button value="Flyout" />
      </Flyout>
      <FlyoutDirect content="Direct Flyout">
        <Button value="Direct Flyout" />
      </FlyoutDirect>
      <InfoBar open closable={false} message="Root InfoBar" />
      <InfoBarDirect open closable={false} message="InfoBar subpath" severity="success" />
      <NumberBox aria-label="Root NumberBox" defaultValue={2} min={0} max={10} />
      <NumberBoxDirect aria-label="NumberBox subpath" defaultValue={4} step={2} />
      <SettingsCard description="Root export" title="Notifications">
        <button type="button">Configure</button>
      </SettingsCard>
      <SettingsCardDirect href="#display" title="SettingsCard subpath" />
      <TreeView aria-label="Root TreeView" defaultExpandedItems={["root-folder"]}>
        <TreeItem label="Root folder" value="root-folder">
          <TreeItem label="Root file" value="root-file" />
        </TreeItem>
      </TreeView>
      <TreeViewDirect aria-label="TreeView subpath">
        <TreeItemDirect label="Direct item" value="direct-item" />
      </TreeViewDirect>
      <Toast duration={0} title="Root Toast" />
      <ToastDirect duration={0} title="Toast subpath" />
      <button
        onClick={() => toasterRef.current?.show({ title: "Root Toaster notification" })}
        type="button"
      >
        Root Toaster
      </button>
      <button
        onClick={() => directToasterRef.current?.show({ title: "Direct notification" })}
        type="button"
      >
        Toaster subpath
      </button>
      <Toaster ref={toasterRef} />
      <ToasterDirect position="top-end" ref={directToasterRef} />
    </main>
  );
};

createRoot(document.getElementById("root")).render(<ConsumerApp />);
