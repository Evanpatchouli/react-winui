import { useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  Breadcrumb,
  AutoSuggestBox,
  ComboBox,
  CommandBar,
  ContextMenu,
  DatePicker,
  Calendar,
  DataGrid,
  Expander,
  Flyout,
  InfoBar,
  NavigationView,
  NumberBox,
  Popover,
  SettingsCard,
  SettingsExpander,
  TreeItem,
  TreeView,
  Toast,
  Toaster,
  TeachingTip
} from "@evanpatchouli/react-winui";
import ButtonDirect from "@evanpatchouli/react-winui/button";
import BreadcrumbDirect from "@evanpatchouli/react-winui/breadcrumb";
import AutoSuggestBoxDirect from "@evanpatchouli/react-winui/auto-suggest-box";
import ComboBoxDirect from "@evanpatchouli/react-winui/combo-box";
import CommandBarDirect from "@evanpatchouli/react-winui/command-bar";
import ContextMenuDirect from "@evanpatchouli/react-winui/context-menu";
import DatePickerDirect from "@evanpatchouli/react-winui/date-picker";
import CalendarDirect from "@evanpatchouli/react-winui/calendar";
import DataGridDirect from "@evanpatchouli/react-winui/data-grid";
import ExpanderDirect from "@evanpatchouli/react-winui/expander";
import FlyoutDirect from "@evanpatchouli/react-winui/flyout";
import InfoBarDirect from "@evanpatchouli/react-winui/info-bar";
import NavigationViewDirect from "@evanpatchouli/react-winui/navigation-view";
import NumberBoxDirect from "@evanpatchouli/react-winui/number-box";
import PopoverDirect from "@evanpatchouli/react-winui/popover";
import SettingsCardDirect from "@evanpatchouli/react-winui/settings-card";
import SettingsExpanderDirect from "@evanpatchouli/react-winui/settings-expander";
import TreeViewDirect, { TreeItem as TreeItemDirect } from "@evanpatchouli/react-winui/tree-view";
import ToastDirect, { Toaster as ToasterDirect } from "@evanpatchouli/react-winui/toast";
import TeachingTipDirect from "@evanpatchouli/react-winui/teaching-tip";
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
      <Breadcrumb
        items={[
          { href: "/", label: "Home" },
          { href: "/projects", label: "Projects" },
          { label: "Root Breadcrumb" }
        ]}
      />
      <BreadcrumbDirect items={[{ href: "/direct", label: "Direct" }, { label: "Breadcrumb" }]} />
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
      <DatePicker defaultValue={new Date(2024, 0, 15)} label="Root DatePicker" locale="en-US" />
      <DatePickerDirect
        defaultValue={new Date(2024, 0, 20)}
        label="DatePicker subpath"
        locale="en-US"
      />
      <Calendar
        defaultPickerDate={new Date(2024, 0, 15)}
        label="Root Calendar"
        locale="en-US"
        today={new Date(2024, 0, 20)}
      />
      <CalendarDirect
        defaultPickerDate={new Date(2024, 0, 15)}
        label="Calendar subpath"
        locale="en-US"
        today={new Date(2024, 0, 20)}
      />
      <DataGrid
        aria-label="Root DataGrid"
        columns={[
          { accessor: "name", header: "Name", id: "name", sortable: true },
          { accessor: "status", header: "Status", id: "status" }
        ]}
        getRowId={(item) => item.id}
        items={[
          { id: "root-alpha", name: "Alpha", status: "Ready" },
          { id: "root-beta", name: "Beta", status: "Paused" }
        ]}
        selectionMode="single"
      />
      <DataGridDirect
        aria-label="DataGrid subpath"
        columns={[{ accessor: "name", header: "Name", id: "name" }]}
        getRowId={(item) => item.id}
        items={[{ id: "direct-alpha", name: "Direct Alpha" }]}
      />
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
      <TeachingTip content="Root teaching tip" defaultOpen title="Root TeachingTip">
        <Button value="Root TeachingTip target" />
      </TeachingTip>
      <TeachingTipDirect content="Direct teaching tip" title="Direct TeachingTip">
        <Button value="Direct TeachingTip target" />
      </TeachingTipDirect>
      <InfoBar open closable={false} message="Root InfoBar" />
      <InfoBarDirect open closable={false} message="InfoBar subpath" severity="success" />
      <NumberBox aria-label="Root NumberBox" defaultValue={2} min={0} max={10} />
      <NumberBoxDirect aria-label="NumberBox subpath" defaultValue={4} step={2} />
      <SettingsCard description="Root export" title="Notifications">
        <button type="button">Configure</button>
      </SettingsCard>
      <SettingsCardDirect href="#display" title="SettingsCard subpath" />
      <SettingsExpander
        content={<button type="button">Header control</button>}
        defaultExpanded
        title="Root SettingsExpander"
      >
        <SettingsCard title="Nested root setting" />
      </SettingsExpander>
      <SettingsExpanderDirect title="SettingsExpander subpath">
        Direct expanded content
      </SettingsExpanderDirect>
      <NavigationView
        defaultValue="home"
        paneDisplayMode="compact"
        content={<span>Root NavigationView content</span>}
      >
        <NavigationView.Item label="Home" value="home" />
      </NavigationView>
      <NavigationViewDirect paneDisplayMode="minimal" content="Direct content">
        <NavigationViewDirect.Item label="Direct navigation item" value="direct" />
      </NavigationViewDirect>
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
