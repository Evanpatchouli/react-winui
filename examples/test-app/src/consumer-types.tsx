import { createRef, type CSSProperties, type ReactElement } from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  AppContainer,
  AppTheme,
  Alert,
  AutoSuggestBox,
  Dialog,
  Accordion,
  Expander,
  ColorPickerItem,
  ColorPickerPalette,
  ComboBox,
  CommandBar,
  ImageView,
  InfoBar,
  InputSearchBar,
  InputSearchBox,
  InputText,
  Link,
  LoaderBar,
  LoaderBusy,
  MenuBar,
  ContextMenu,
  NavigationView,
  NumberBox,
  SettingsCard,
  SettingsExpander,
  NavBar,
  NavBarLink,
  NavBarSubMenu,
  NavBarThemeSwitch,
  NavPageContainer,
  ProgressBar,
  RadioButton,
  SliderBar,
  SplashScreen,
  Select,
  SelectNative,
  Switch,
  TableView,
  TreeItem,
  TreeView,
  TextArea,
  Tooltip,
  Popover,
  Flyout,
  Toast,
  Toaster
} from "@evanpatchouli/react-winui";
import type {
  ButtonProps,
  ButtonGroupProps,
  CheckboxProps,
  AppContainerProps,
  AppThemeProps,
  AppThemeScheme,
  AlertProps,
  AlertHandle,
  AutoSuggestBoxOpenChangeEvent,
  AutoSuggestBoxOpenChangeHandler,
  AutoSuggestBoxProps,
  AutoSuggestBoxQuerySubmitHandler,
  AutoSuggestBoxSubmitEvent,
  AutoSuggestBoxSuggestion,
  AutoSuggestBoxSuggestionChooseHandler,
  AutoSuggestBoxTextChangeEvent,
  AutoSuggestBoxTextChangeHandler,
  AutoSuggestBoxTextChangeReason,
  DialogProps,
  DialogHandle,
  AccordionProps,
  AccordionSlotProps,
  ExpanderDirection,
  ExpanderExpandedChangeEvent,
  ExpanderExpandedChangeHandler,
  ExpanderProps,
  ColorPickerItemProps,
  ColorPickerPaletteProps,
  ComboBoxOpenChangeEvent,
  ComboBoxOpenChangeHandler,
  ComboBoxOption,
  ComboBoxProps,
  ComboBoxTextSubmitHandler,
  ComboBoxValue,
  ComboBoxValueChangeEvent,
  ComboBoxValueChangeHandler,
  CommandBarButtonProps,
  CommandBarComponent,
  CommandBarOpenChangeEvent,
  CommandBarOpenChangeHandler,
  CommandBarProps,
  CommandBarSeparatorProps,
  ImageViewProps,
  InfoBarOpenChangeEvent,
  InfoBarOpenChangeHandler,
  InfoBarProps,
  InfoBarSeverity,
  InputSearchBarProps,
  InputSearchBoxProps,
  InputSearchSuggestion,
  InputTextProps,
  LinkProps,
  LoaderBarProps,
  LoaderBusyProps,
  MenuBarComponent,
  MenuBarDividerProps,
  MenuBarHandle,
  MenuBarItemClickHandler,
  MenuBarItemComponent,
  MenuBarItemProps,
  MenuBarProps,
  MenuBarSubMenuProps,
  ContextMenuComponent,
  ContextMenuDividerProps,
  ContextMenuItemProps,
  ContextMenuOpenChangeHandler,
  ContextMenuProps,
  ContextMenuSelectEvent,
  ContextMenuSurfaceProps,
  NavigationViewComponent,
  NavigationViewDisplayModeChangeHandler,
  NavigationViewExpandedChangeHandler,
  NavigationViewInteractionEvent,
  NavigationViewItemData,
  NavigationViewItemProps,
  NavigationViewItemValue,
  NavigationViewPaneDisplayMode,
  NavigationViewPaneOpenChangeHandler,
  NavigationViewProps,
  NavigationViewResolvedDisplayMode,
  NavigationViewSeparatorProps,
  NavigationViewValueChangeHandler,
  NumberBoxProps,
  NumberBoxValue,
  NumberBoxValueChangeEvent,
  NumberBoxValueChangeHandler,
  SettingsCardClickEvent,
  SettingsCardClickHandler,
  SettingsCardProps,
  SettingsExpanderExpandedChangeEvent,
  SettingsExpanderExpandedChangeHandler,
  SettingsExpanderProps,
  NavBarComponent,
  NavBarLinkProps,
  NavBarProps,
  NavBarSubMenuProps,
  NavBarTheme,
  NavBarThemeSwitchProps,
  NavPageContainerProps,
  ProgressBarProps,
  RadioButtonProps,
  SliderBarProps,
  SplashScreenProps,
  SelectChangeHandler,
  SelectOption,
  SelectOptionValue,
  SelectProps,
  SelectNativeProps,
  SwitchProps,
  TableViewColumn,
  TableViewProps,
  TableViewRow,
  TreeItemComponent,
  TreeItemProps,
  TreeItemValue,
  TreeViewComponent,
  TreeViewExpandedChangeHandler,
  TreeViewInteractionEvent,
  TreeViewProps,
  TreeViewSelectionMode,
  TreeViewValueChangeHandler,
  TextAreaProps,
  TooltipPlacement,
  TooltipProps,
  TooltipRelationship,
  PopoverProps,
  FlyoutProps,
  ToasterHandle,
  ToasterProps,
  ToastAction,
  ToastContentProps,
  ToastDismissReason,
  ToastId,
  ToastIntent,
  ToastOpenChangeData,
  ToastOpenChangeHandler,
  ToastOptions,
  ToastPoliteness,
  ToastPosition,
  ToastProps
} from "@evanpatchouli/react-winui";
import ButtonDirect from "@evanpatchouli/react-winui/button";
import AutoSuggestBoxDirect, {
  type AutoSuggestBoxProps as AutoSuggestBoxDirectProps,
  type AutoSuggestBoxSuggestion as AutoSuggestBoxDirectSuggestion
} from "@evanpatchouli/react-winui/auto-suggest-box";
import ComboBoxDirect, {
  type ComboBoxOption as ComboBoxDirectOption,
  type ComboBoxProps as ComboBoxDirectProps
} from "@evanpatchouli/react-winui/combo-box";
import CommandBarDirect, {
  type CommandBarButtonProps as CommandBarDirectButtonProps,
  type CommandBarProps as CommandBarDirectProps
} from "@evanpatchouli/react-winui/command-bar";
import { Shadows } from "@evanpatchouli/react-winui/theme";
import type { ShadowName, ShadowToken } from "@evanpatchouli/react-winui/theme";
import TooltipDirect from "@evanpatchouli/react-winui/tooltip";
import PopoverDirect from "@evanpatchouli/react-winui/popover";
import FlyoutDirect from "@evanpatchouli/react-winui/flyout";
import ExpanderDirect, {
  type ExpanderDirection as ExpanderDirectDirection,
  type ExpanderProps as ExpanderDirectProps
} from "@evanpatchouli/react-winui/expander";
import InfoBarDirect, {
  type InfoBarProps as InfoBarDirectProps,
  type InfoBarSeverity as InfoBarDirectSeverity
} from "@evanpatchouli/react-winui/info-bar";
import ContextMenuDirect, {
  type ContextMenuProps as ContextMenuDirectProps
} from "@evanpatchouli/react-winui/context-menu";
import ToastDirect, {
  Toaster as ToasterDirect,
  type ToasterProps as ToasterDirectProps,
  type ToastProps as ToastDirectProps
} from "@evanpatchouli/react-winui/toast";
import NumberBoxDirect, {
  type NumberBoxProps as NumberBoxDirectProps
} from "@evanpatchouli/react-winui/number-box";
import NavigationViewDirect, {
  type NavigationViewItemProps as NavigationViewDirectItemProps,
  type NavigationViewProps as NavigationViewDirectProps
} from "@evanpatchouli/react-winui/navigation-view";
import SettingsCardDirect, {
  type SettingsCardProps as SettingsCardDirectProps
} from "@evanpatchouli/react-winui/settings-card";
import SettingsExpanderDirect, {
  type SettingsExpanderProps as SettingsExpanderDirectProps
} from "@evanpatchouli/react-winui/settings-expander";
import TreeViewDirect, {
  TreeItem as TreeItemDirect,
  type TreeItemProps as TreeItemDirectProps,
  type TreeViewProps as TreeViewDirectProps
} from "@evanpatchouli/react-winui/tree-view";

const typedProps: [
  ButtonProps,
  ButtonGroupProps,
  CheckboxProps,
  AppContainerProps,
  AppThemeProps,
  AlertProps,
  AutoSuggestBoxProps,
  DialogProps,
  AccordionProps,
  ExpanderProps,
  ColorPickerItemProps,
  ColorPickerPaletteProps,
  ComboBoxProps,
  CommandBarProps,
  ImageViewProps,
  InfoBarProps,
  InputSearchBarProps,
  InputSearchBoxProps,
  InputTextProps,
  LinkProps,
  LoaderBarProps,
  LoaderBusyProps,
  MenuBarProps,
  ContextMenuProps,
  NumberBoxProps,
  SettingsExpanderProps,
  NavBarProps,
  NavBarLinkProps,
  NavBarSubMenuProps,
  NavBarThemeSwitchProps,
  NavPageContainerProps,
  ProgressBarProps,
  RadioButtonProps,
  SliderBarProps,
  SplashScreenProps,
  SelectNativeProps,
  SelectProps,
  SwitchProps,
  TableViewProps,
  TreeViewProps,
  TextAreaProps,
  TooltipProps,
  ToastProps,
  ToasterProps
] = [
  { value: "Button" },
  { "aria-label": "Actions" },
  { label: "Checkbox" },
  { style: { gap: "8px" } },
  { color: "#123456", colorDarkMode: "#abcdef", scheme: "dark" },
  { message: "Please confirm", title: "Notice" },
  { suggestions: [{ value: "Windows" }] },
  { backdropBlur: true, isVisible: true, style: { width: "320px" } },
  { headerTitle: "General", style: { gap: "8px" } },
  { header: "Advanced settings", direction: "down" },
  { color: "#ff0000", name: "accent" },
  { color: "#00ff00" },
  { options: [{ label: "One", value: "one" }] },
  { "aria-label": "Document commands", minimumPrimaryCommands: 1 },
  { alt: "Windows logo", src: "/windows.png", width: 128 },
  { defaultOpen: true, message: "Update available", severity: "informational" },
  { placeholder: "Search", width: 240 },
  { suggest: [{ text: "Windows" }], width: 240 },
  { label: "Input" },
  { to: "/docs" },
  { setTheme: "light" },
  { isLoading: true, size: "small" },
  { backdropBlur: true, menuDirection: "leftJustify" },
  {
    content: <ContextMenu.Item>Copy</ContextMenu.Item>,
    children: <button type="button">Target</button>
  },
  { defaultValue: 2, max: 10, min: 0 },
  { header: "Advanced settings", itemsHeader: "Related options" },
  { shadowOnScroll: true, title: "Navigation" },
  { active: true, href: "/home", text: "Home" },
  { title: "Utilities" },
  { onChange: (theme) => theme },
  { hasPadding: true, style: { padding: "8px" } },
  { setProgress: 50 },
  { label: "Radio", name: "platform" },
  { defaultValue: 50, ticks: [0, 50, 100] },
  { title: "Loading", isVisible: true },
  { data: [{ label: "One", value: "one" }] },
  { data: [{ label: "One", value: "one" }] },
  { label: true },
  {
    columns: [{ title: "Name" }],
    rows: [["Apple", 1]]
  },
  { "aria-label": "Files", defaultExpandedItems: ["documents"] },
  { placeholder: "Text" },
  { content: "More information", children: <button type="button">Action</button> },
  { duration: 0, title: "Saved" },
  { label: "Notifications", maxVisible: 3 }
];

export const rootImport: ReactElement = <Button value="Root export" />;
export const subpathImport: ReactElement = <ButtonDirect value="Button subpath" />;
export const tooltipSubpathImport: ReactElement = (
  <TooltipDirect content="Tooltip subpath" showDelay={0}>
    <button type="button">Tooltip trigger</button>
  </TooltipDirect>
);
export const propsTypeCheck = typedProps;
export const schemeTypeCheck: AppThemeScheme = "system";
export const alertHandleTypeCheck: AlertHandle | undefined = undefined;
export const dialogHandleTypeCheck: DialogHandle | undefined = undefined;
export const accordionSlotTypeCheck: AccordionSlotProps = { children: "Content" };
export const expanderDirectionTypeCheck: ExpanderDirection = "up";
export const expanderExpandedChangeEventTypeCheck = (_event: ExpanderExpandedChangeEvent) => {};
export const expanderExpandedChangeTypeCheck: ExpanderExpandedChangeHandler = (_expanded, event) =>
  expanderExpandedChangeEventTypeCheck(event);
export const expanderDirectDirectionTypeCheck: ExpanderDirectDirection = "down";
export const expanderDirectPropsTypeCheck: ExpanderDirectProps = {
  header: "Direct Expander",
  direction: expanderDirectDirectionTypeCheck
};
export const searchSuggestionTypeCheck: InputSearchSuggestion = { text: "Windows" };
export const autoSuggestBoxSuggestionTypeCheck: AutoSuggestBoxSuggestion = { value: "Windows" };
export const autoSuggestBoxTextChangeReasonTypeCheck: AutoSuggestBoxTextChangeReason = "input";
export const autoSuggestBoxOpenChangeEventTypeCheck = (_event: AutoSuggestBoxOpenChangeEvent) => {};
export const autoSuggestBoxOpenChangeTypeCheck: AutoSuggestBoxOpenChangeHandler = (
  _open,
  event
) => {
  if (event) {
    autoSuggestBoxOpenChangeEventTypeCheck(event);
  }
};
export const autoSuggestBoxTextChangeEventTypeCheck = (_event: AutoSuggestBoxTextChangeEvent) => {};
export const autoSuggestBoxTextChangeTypeCheck: AutoSuggestBoxTextChangeHandler = (
  _text,
  event,
  _reason
) => autoSuggestBoxTextChangeEventTypeCheck(event);
export const autoSuggestBoxSubmitEventTypeCheck = (_event: AutoSuggestBoxSubmitEvent) => {};
export const autoSuggestBoxSuggestionChooseTypeCheck: AutoSuggestBoxSuggestionChooseHandler = (
  _suggestion,
  event
) => autoSuggestBoxSubmitEventTypeCheck(event);
export const autoSuggestBoxQuerySubmitTypeCheck: AutoSuggestBoxQuerySubmitHandler = (
  _query,
  _suggestion,
  event
) => autoSuggestBoxSubmitEventTypeCheck(event);
export const autoSuggestBoxDirectSuggestionTypeCheck: AutoSuggestBoxDirectSuggestion = {
  value: "Direct"
};
export const autoSuggestBoxDirectPropsTypeCheck: AutoSuggestBoxDirectProps = {
  suggestions: [autoSuggestBoxDirectSuggestionTypeCheck]
};
export const selectOptionTypeCheck: SelectOption = { label: "One", value: "one" };
export const selectOptionValueTypeCheck: SelectOptionValue = 1;
export const selectChangeTypeCheck: SelectChangeHandler = () => {};
export const comboBoxOptionTypeCheck: ComboBoxOption = { label: "One", value: "one" };
export const comboBoxValueTypeCheck: ComboBoxValue = "one";
export const comboBoxOpenChangeEventTypeCheck = (_event: ComboBoxOpenChangeEvent) => {};
export const comboBoxOpenChangeTypeCheck: ComboBoxOpenChangeHandler = (_open, event) => {
  if (event) {
    comboBoxOpenChangeEventTypeCheck(event);
  }
};
export const comboBoxValueChangeEventTypeCheck = (_event: ComboBoxValueChangeEvent) => {};
export const comboBoxValueChangeTypeCheck: ComboBoxValueChangeHandler = (_value, _option, event) =>
  comboBoxValueChangeEventTypeCheck(event);
export const comboBoxTextSubmitTypeCheck: ComboBoxTextSubmitHandler = () => {};
export const comboBoxDirectOptionTypeCheck: ComboBoxDirectOption = {
  label: "Direct",
  value: "direct"
};
export const comboBoxDirectPropsTypeCheck: ComboBoxDirectProps = {
  editable: true,
  options: [comboBoxDirectOptionTypeCheck]
};
export const commandBarComponentTypeCheck: CommandBarComponent | undefined = undefined;
export const commandBarButtonTypeCheck: CommandBarButtonProps = { label: "Save" };
export const commandBarSeparatorTypeCheck: CommandBarSeparatorProps = {};
export const commandBarOpenChangeEventTypeCheck = (_event: CommandBarOpenChangeEvent) => {};
export const commandBarOpenChangeTypeCheck: CommandBarOpenChangeHandler = (_open, event) => {
  if (event) {
    commandBarOpenChangeEventTypeCheck(event);
  }
};
export const commandBarDirectButtonTypeCheck: CommandBarDirectButtonProps = { label: "Share" };
export const commandBarDirectPropsTypeCheck: CommandBarDirectProps = {
  "aria-label": "Direct commands",
  secondaryCommands: <CommandBarDirect.Button label="Settings" />
};
export const tooltipPlacementTypeCheck: TooltipPlacement = "top";
export const tooltipRelationshipTypeCheck: TooltipRelationship = "description";
export const popoverPropsTypeCheck: PopoverProps = {
  content: "Popover content",
  children: <button type="button">Trigger</button>,
  placement: "bottom"
};
export const flyoutPropsTypeCheck: FlyoutProps = {
  content: "Flyout content",
  children: <button type="button">Trigger</button>
};
export const shadowNameTypeCheck: ShadowName = "shadow8";
export const shadowTokenTypeCheck: ShadowToken = Shadows.shadow8;
export const shadowStyleTypeCheck: CSSProperties = { boxShadow: Shadows.shadow8 };
export const menuBarAnchorRef = createRef<HTMLButtonElement>();
export const menuBarRef = createRef<MenuBarHandle>();
export const menuBarComponentTypeCheck: MenuBarComponent | undefined = undefined;
export const menuBarItemComponentTypeCheck: MenuBarItemComponent | undefined = undefined;
export const menuBarDividerTypeCheck: MenuBarDividerProps = {};
export const menuBarItemTypeCheck: MenuBarItemProps = { label: "File" };
export const menuBarSubMenuTypeCheck: MenuBarSubMenuProps = { label: "More" };
export const menuBarClickTypeCheck: MenuBarItemClickHandler = () => {};
export const contextMenuComponentTypeCheck: ContextMenuComponent | undefined = undefined;
export const contextMenuItemTypeCheck: ContextMenuItemProps = { children: "Copy" };
export const contextMenuDividerTypeCheck: ContextMenuDividerProps = {};
export const contextMenuSurfaceTypeCheck: ContextMenuSurfaceProps = {
  "aria-labelledby": "context-target"
};
export const contextMenuOpenChangeTypeCheck: ContextMenuOpenChangeHandler = () => {};
export const contextMenuSelectTypeCheck = (_event: ContextMenuSelectEvent) => {};
export const contextMenuDirectPropsTypeCheck: ContextMenuDirectProps = {
  content: <ContextMenuDirect.Item>Copy</ContextMenuDirect.Item>,
  children: <button type="button">Target</button>
};
export const numberBoxValueTypeCheck: NumberBoxValue = 4;
export const numberBoxValueChangeEventTypeCheck = (_event: NumberBoxValueChangeEvent) => {};
export const numberBoxValueChangeTypeCheck: NumberBoxValueChangeHandler = (_value, event) =>
  numberBoxValueChangeEventTypeCheck(event);
export const numberBoxDirectPropsTypeCheck: NumberBoxDirectProps = {
  defaultValue: numberBoxValueTypeCheck,
  onValueChange: numberBoxValueChangeTypeCheck
};
export const settingsCardClickEventTypeCheck = (_event: SettingsCardClickEvent) => {};
export const settingsCardClickTypeCheck: SettingsCardClickHandler = (event) =>
  settingsCardClickEventTypeCheck(event);
export const settingsCardPropsTypeCheck: SettingsCardProps = {
  description: "Allow desktop notifications",
  onClick: settingsCardClickTypeCheck,
  title: "Notifications"
};
export const settingsCardDirectPropsTypeCheck: SettingsCardDirectProps = {
  href: "/settings/display",
  title: "Display"
};
export const settingsExpanderExpandedChangeEventTypeCheck = (
  _event: SettingsExpanderExpandedChangeEvent
) => {};
export const settingsExpanderExpandedChangeTypeCheck: SettingsExpanderExpandedChangeHandler = (
  _expanded,
  event
) => settingsExpanderExpandedChangeEventTypeCheck(event);
export const settingsExpanderPropsTypeCheck: SettingsExpanderProps = {
  header: "Advanced settings",
  itemsHeader: "Related options",
  onExpandedChange: settingsExpanderExpandedChangeTypeCheck
};
export const settingsExpanderDirectPropsTypeCheck: SettingsExpanderDirectProps = {
  title: "Direct SettingsExpander"
};
export const infoBarSeverityTypeCheck: InfoBarSeverity = "warning";
export const infoBarOpenChangeEventTypeCheck = (_event: InfoBarOpenChangeEvent) => {};
export const infoBarOpenChangeTypeCheck: InfoBarOpenChangeHandler = (_open, event) =>
  infoBarOpenChangeEventTypeCheck(event);
export const infoBarDirectSeverityTypeCheck: InfoBarDirectSeverity = "success";
export const infoBarDirectPropsTypeCheck: InfoBarDirectProps = {
  open: true,
  message: "Direct InfoBar",
  severity: infoBarDirectSeverityTypeCheck
};
export const toasterRef = createRef<ToasterHandle>();
export const toastActionTypeCheck: ToastAction = { label: "Undo", onClick: () => {} };
export const toastContentTypeCheck: ToastContentProps = { message: "Saved", title: "Complete" };
export const toastDismissReasonTypeCheck: ToastDismissReason = "escape";
export const toastIdTypeCheck: ToastId = "consumer-toast";
export const toastIntentTypeCheck: ToastIntent = "success";
export const toastOpenChangeDataTypeCheck: ToastOpenChangeData = { reason: "close" };
export const toastOpenChangeTypeCheck: ToastOpenChangeHandler = () => {};
export const toastOptionsTypeCheck: ToastOptions = {
  id: toastIdTypeCheck,
  intent: toastIntentTypeCheck,
  persistent: true,
  title: "Consumer notification"
};
export const toastPolitenessTypeCheck: ToastPoliteness = "polite";
export const toastPositionTypeCheck: ToastPosition = "bottom-end";
export const toastDirectPropsTypeCheck: ToastDirectProps = { duration: 0, title: "Direct" };
export const toasterDirectPropsTypeCheck: ToasterDirectProps = { maxVisible: 2 };
export const navBarRef = createRef<HTMLElement>();
export const navBarComponentTypeCheck: NavBarComponent | undefined = undefined;
export const navBarLinkTypeCheck: NavBarLinkProps = { href: "/home", text: "Home" };
export const navBarSubMenuTypeCheck: NavBarSubMenuProps = { title: "Utilities" };
export const navBarThemeTypeCheck: NavBarTheme = "dark";
export const navBarThemeSwitchTypeCheck: NavBarThemeSwitchProps = { onChange: () => {} };
export const navPageContainerTypeCheck: NavPageContainerProps = {
  hasPadding: true,
  style: { padding: "8px" }
};
export const navigationViewValueTypeCheck: NavigationViewItemValue = "home";
export const navigationViewDisplayModeTypeCheck: NavigationViewPaneDisplayMode = "auto";
export const navigationViewResolvedModeTypeCheck: NavigationViewResolvedDisplayMode = "compact";
export const navigationViewInteractionEventTypeCheck = (_event: NavigationViewInteractionEvent) =>
  undefined;
export const navigationViewValueChangeTypeCheck: NavigationViewValueChangeHandler = (
  _value,
  event
) => navigationViewInteractionEventTypeCheck(event);
export const navigationViewPaneOpenChangeTypeCheck: NavigationViewPaneOpenChangeHandler = (
  _open,
  event
) => (event ? navigationViewInteractionEventTypeCheck(event) : undefined);
export const navigationViewExpandedChangeTypeCheck: NavigationViewExpandedChangeHandler = (
  _expandedItems,
  event
) => navigationViewInteractionEventTypeCheck(event);
export const navigationViewDisplayModeChangeTypeCheck: NavigationViewDisplayModeChangeHandler = (
  _mode
) => undefined;
export const navigationViewItemDataTypeCheck: NavigationViewItemData = {
  label: "Home",
  value: navigationViewValueTypeCheck
};
export const navigationViewItemPropsTypeCheck: NavigationViewItemProps = {
  label: "Documents",
  value: "documents"
};
export const navigationViewSeparatorPropsTypeCheck: NavigationViewSeparatorProps = {};
export const navigationViewPropsTypeCheck: NavigationViewProps = {
  items: [navigationViewItemDataTypeCheck],
  onDisplayModeChange: navigationViewDisplayModeChangeTypeCheck,
  onExpandedItemsChange: navigationViewExpandedChangeTypeCheck,
  onPaneOpenChange: navigationViewPaneOpenChangeTypeCheck,
  onValueChange: navigationViewValueChangeTypeCheck,
  paneDisplayMode: navigationViewDisplayModeTypeCheck
};
export const navigationViewComponentTypeCheck: NavigationViewComponent | undefined = undefined;
export const navigationViewDirectPropsTypeCheck: NavigationViewDirectProps = {
  paneDisplayMode: "minimal"
};
export const navigationViewDirectItemPropsTypeCheck: NavigationViewDirectItemProps = {
  label: "Direct item",
  value: "direct"
};
export const tableViewColumnTypeCheck: TableViewColumn = { title: "Name", sortable: true };
export const tableViewRowTypeCheck: TableViewRow = ["Apple", 1];
export const treeItemValueTypeCheck: TreeItemValue = "documents";
export const treeViewSelectionModeTypeCheck: TreeViewSelectionMode = "single";
export const treeViewExpandedChangeTypeCheck: TreeViewExpandedChangeHandler = (
  _expandedItems,
  event
) => event;
export const treeViewValueChangeTypeCheck: TreeViewValueChangeHandler = (_value, event) => event;
export const treeViewInteractionEventTypeCheck = (_event: TreeViewInteractionEvent) => {};
export const treeViewComponentTypeCheck: TreeViewComponent | undefined = undefined;
export const treeItemComponentTypeCheck: TreeItemComponent | undefined = undefined;
export const treeItemPropsTypeCheck: TreeItemProps = { label: "Documents", value: "documents" };
export const treeViewDirectPropsTypeCheck: TreeViewDirectProps = { "aria-label": "Direct tree" };
export const treeItemDirectPropsTypeCheck: TreeItemDirectProps = {
  label: "Direct item",
  value: "direct-item"
};
export const basicControls: ReactElement = (
  <>
    <Button>Children content</Button>
    <ButtonGroup aria-label="Actions">
      <Button>Action</Button>
    </ButtonGroup>
    <AppContainer>
      <span>Container</span>
    </AppContainer>
    <AppTheme scheme="system" />
    <Alert title="Notice" message="Please confirm" />
    <Dialog isVisible>
      <Dialog.Body>Body</Dialog.Body>
      <Dialog.Footer>Footer</Dialog.Footer>
    </Dialog>
    <Accordion headerTitle="General">
      <Accordion.Trigger>Options</Accordion.Trigger>
      <Accordion.Body>Content</Accordion.Body>
    </Accordion>
    <Expander
      defaultExpanded
      header="Advanced settings"
      onExpandedChange={expanderExpandedChangeTypeCheck}
    >
      Expander content
    </Expander>
    <ColorPickerItem color="#ff0000" name="accent" />
    <ColorPickerPalette color="#00ff00" />
    <ComboBox
      aria-label="Consumer ComboBox"
      defaultValue="one"
      options={[comboBoxOptionTypeCheck]}
      onOpenChange={comboBoxOpenChangeTypeCheck}
      onValueChange={comboBoxValueChangeTypeCheck}
    />
    <CommandBar
      aria-label="Document commands"
      onOverflowOpenChange={commandBarOpenChangeTypeCheck}
      secondaryCommands={<CommandBar.Button label="Rename" />}
    >
      <CommandBar.Button icon={<span>Save</span>} label="Save" />
      <CommandBar.Separator />
      <CommandBar.Button disabled label="Paste" />
    </CommandBar>
    <AutoSuggestBox
      aria-label="Consumer AutoSuggestBox"
      onOpenChange={autoSuggestBoxOpenChangeTypeCheck}
      onQuerySubmit={autoSuggestBoxQuerySubmitTypeCheck}
      onSuggestionChoose={autoSuggestBoxSuggestionChooseTypeCheck}
      onTextChange={autoSuggestBoxTextChangeTypeCheck}
      suggestions={[autoSuggestBoxSuggestionTypeCheck]}
    />
    <ImageView alt="Windows logo" src="/windows.png" />
    <InfoBar open closable={false} message="Root InfoBar" severity={infoBarSeverityTypeCheck} />
    <InputSearchBar placeholder="Search" />
    <InputSearchBox suggest={[{ text: "Windows" }]} />
    <InputText label="Name" onChange={(event) => event.currentTarget.value} />
    <Link to="/docs">Docs</Link>
    <LoaderBar setTheme="light" />
    <LoaderBusy aria-label="Loading" size="small" />
    <ProgressBar setProgress={50} />
    <Checkbox label="Remember me" onChange={(event) => event.currentTarget.checked} />
    <RadioButton label="Windows" name="platform" onChange={(event) => event.currentTarget.value} />
    <SliderBar defaultValue={50} onChange={(event) => event.currentTarget.value} />
    <Switch onChange={(event) => event.currentTarget.checked} />
    <SplashScreen title="Loading" isVisible />
    <Select data={[{ label: "One", value: "one" }]} />
    <SelectNative data={[{ label: "One", value: "one" }]} />
    <button ref={menuBarAnchorRef}>Anchor</button>
    <MenuBar anchorRef={menuBarAnchorRef} ref={menuBarRef}>
      <MenuBar.Item label="File" />
      <MenuBar.Item.Divider />
      <MenuBar.Item.SubMenu label="More">
        <MenuBar.Item label="Child" />
      </MenuBar.Item.SubMenu>
    </MenuBar>
    <ContextMenu content={<ContextMenu.Item>Copy</ContextMenu.Item>}>
      <button type="button">Context target</button>
    </ContextMenu>
    <NumberBox
      aria-label="Quantity"
      defaultValue={numberBoxValueTypeCheck}
      onValueChange={numberBoxValueChangeTypeCheck}
    />
    <SettingsCard {...settingsCardPropsTypeCheck}>
      <button type="button">Configure</button>
    </SettingsCard>
    <SettingsExpander
      {...settingsExpanderPropsTypeCheck}
      content={<button type="button">Header control</button>}
    >
      <SettingsCard title="Nested setting" />
    </SettingsExpander>
    <NavBar ref={navBarRef} shadowOnScroll title="Navigation">
      <NavBarLink href="/home" text="Home" />
      <NavBarSubMenu title="Utilities">
        <NavBarLink text="Settings" />
      </NavBarSubMenu>
      <NavBarThemeSwitch />
    </NavBar>
    <NavPageContainer hasPadding>
      <span>Page content</span>
    </NavPageContainer>
    <NavigationView
      {...navigationViewPropsTypeCheck}
      content={<span>Navigation content</span>}
      settingsItem={{ label: "Settings", value: "settings" }}
    >
      <NavigationView.Item {...navigationViewItemPropsTypeCheck}>
        <NavigationView.Item label="Reports" value="reports" />
      </NavigationView.Item>
      <NavigationView.Separator {...navigationViewSeparatorPropsTypeCheck} />
    </NavigationView>
    <TableView
      columns={[{ title: "Name" }, { title: "Count", sortable: true }]}
      rows={[["Apple", 1]]}
      TableFooterComponent={<span>Footer</span>}
      TableHeaderComponent={<span>Header</span>}
    />
    <TreeView
      aria-label="Files"
      defaultExpandedItems={["documents"]}
      onExpandedItemsChange={treeViewExpandedChangeTypeCheck}
      onValueChange={treeViewValueChangeTypeCheck}
    >
      <TreeItem icon={<span>Folder</span>} label="Documents" value="documents">
        <TreeItem label="Readme" value="readme" />
      </TreeItem>
    </TreeView>
    <TextArea placeholder="Notes" onChange={(event) => event.currentTarget.value} />
    <Tooltip content="More information">
      <Button value="Tooltip" />
    </Tooltip>
    <Toast duration={0} title="Root Toast" />
    <Toaster label="Consumer notifications" ref={toasterRef} />
    <Popover content="More details">
      <Button value="Popover" />
    </Popover>
    <Flyout content="More details">
      <Button value="Flyout" />
    </Flyout>
  </>
);

export const popoverSubpathImport: ReactElement = (
  <PopoverDirect content="Popover subpath">
    <button type="button">Popover trigger</button>
  </PopoverDirect>
);
export const flyoutSubpathImport: ReactElement = (
  <FlyoutDirect content="Flyout subpath">
    <button type="button">Flyout trigger</button>
  </FlyoutDirect>
);
export const expanderSubpathImport: ReactElement = (
  <ExpanderDirect {...expanderDirectPropsTypeCheck}>Direct content</ExpanderDirect>
);
export const comboBoxSubpathImport: ReactElement = (
  <ComboBoxDirect
    editable
    aria-label="ComboBox subpath"
    options={[comboBoxDirectOptionTypeCheck]}
  />
);
export const commandBarSubpathImport: ReactElement = (
  <CommandBarDirect {...commandBarDirectPropsTypeCheck}>
    <CommandBarDirect.Button {...commandBarDirectButtonTypeCheck} />
  </CommandBarDirect>
);
export const autoSuggestBoxSubpathImport: ReactElement = (
  <AutoSuggestBoxDirect
    aria-label="AutoSuggestBox subpath"
    suggestions={[autoSuggestBoxDirectSuggestionTypeCheck]}
  />
);
export const contextMenuSubpathImport: ReactElement = (
  <ContextMenuDirect content={<ContextMenuDirect.Item>Copy</ContextMenuDirect.Item>}>
    <button type="button">ContextMenu subpath target</button>
  </ContextMenuDirect>
);
export const toastSubpathImport: ReactElement = <ToastDirect duration={0} title="Toast subpath" />;
export const toasterSubpathImport: ReactElement = (
  <ToasterDirect label="Subpath notifications" maxVisible={2} />
);
export const infoBarSubpathImport: ReactElement = (
  <InfoBarDirect open closable={false} message="InfoBar subpath" severity="success" />
);
export const numberBoxSubpathImport: ReactElement = (
  <NumberBoxDirect aria-label="NumberBox subpath" {...numberBoxDirectPropsTypeCheck} />
);
export const settingsCardSubpathImport: ReactElement = (
  <SettingsCardDirect {...settingsCardDirectPropsTypeCheck} />
);
export const settingsExpanderSubpathImport: ReactElement = (
  <SettingsExpanderDirect {...settingsExpanderDirectPropsTypeCheck}>
    Direct expanded content
  </SettingsExpanderDirect>
);
export const navigationViewSubpathImport: ReactElement = (
  <NavigationViewDirect {...navigationViewDirectPropsTypeCheck}>
    <NavigationViewDirect.Item {...navigationViewDirectItemPropsTypeCheck} />
  </NavigationViewDirect>
);
export const treeViewSubpathImport: ReactElement = (
  <TreeViewDirect aria-label="Direct TreeView">
    <TreeItemDirect label="Direct item" value="direct-item" />
  </TreeViewDirect>
);
