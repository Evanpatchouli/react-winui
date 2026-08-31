import { createRef, type CSSProperties, type ReactElement } from "react";
import {
  Button,
  ButtonGroup,
  Breadcrumb,
  Checkbox,
  AppContainer,
  AppTheme,
  Alert,
  AutoSuggestBox,
  Dialog,
  DatePicker,
  Calendar,
  DataGrid,
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
  Tag,
  TreeItem,
  TreeView,
  TextArea,
  Tooltip,
  Popover,
  Flyout,
  Toast,
  Toaster,
  TeachingTip
} from "@evanpatchouli/react-winui";
import type {
  ButtonProps,
  ButtonGroupProps,
  BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbItemActivateHandler,
  BreadcrumbItemClickEvent,
  BreadcrumbItemClickHandler,
  BreadcrumbProps,
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
  DatePickerOpenChangeEvent,
  DatePickerOpenChangeHandler,
  DatePickerProps,
  DatePickerValidationError,
  DatePickerValue,
  DatePickerValueChangeEvent,
  DatePickerValueChangeHandler,
  CalendarFirstDayOfWeek,
  CalendarInteractionEvent,
  CalendarPickerDateChangeHandler,
  CalendarProps,
  CalendarValue,
  CalendarValueChangeHandler,
  DataGridColumn,
  DataGridInteractionEvent,
  DataGridProps,
  DataGridRowId,
  DataGridSelectionChangeHandler,
  DataGridSelectionMode,
  DataGridSortChangeHandler,
  DataGridSortState,
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
  TagAppearance,
  TagComponent,
  TagDismissEvent,
  TagDismissHandler,
  TagProps,
  TagShape,
  TagSize,
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
  ToastProps,
  TeachingTipAction,
  TeachingTipHeroContentPlacement,
  TeachingTipOpenChangeEvent,
  TeachingTipOpenChangeHandler,
  TeachingTipPlacement,
  TeachingTipProps
} from "@evanpatchouli/react-winui";
import ButtonDirect from "@evanpatchouli/react-winui/button";
import BreadcrumbDirect, {
  type BreadcrumbItem as BreadcrumbDirectItem,
  type BreadcrumbProps as BreadcrumbDirectProps
} from "@evanpatchouli/react-winui/breadcrumb";
import TagDirect, { type TagProps as TagDirectProps } from "@evanpatchouli/react-winui/tag";
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
import DatePickerDirect, {
  type DatePickerProps as DatePickerDirectProps,
  type DatePickerValue as DatePickerDirectValue
} from "@evanpatchouli/react-winui/date-picker";
import CalendarDirect, {
  type CalendarProps as CalendarDirectProps,
  type CalendarValue as CalendarDirectValue
} from "@evanpatchouli/react-winui/calendar";
import DataGridDirect, {
  type DataGridProps as DataGridDirectProps
} from "@evanpatchouli/react-winui/data-grid";
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
import TeachingTipDirect, {
  type TeachingTipProps as TeachingTipDirectProps
} from "@evanpatchouli/react-winui/teaching-tip";
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

interface ConsumerDataGridRow {
  count: number;
  id: string;
  name: string;
  status: "Ready" | "Paused";
}

const consumerDataGridRows: ConsumerDataGridRow[] = [
  { count: 12, id: "alpha", name: "Alpha", status: "Ready" },
  { count: 4, id: "beta", name: "Beta", status: "Paused" }
];

const consumerDataGridColumns: DataGridColumn<ConsumerDataGridRow>[] = [
  { accessor: "name", header: "Name", id: "name", sortable: true },
  { accessor: "status", header: "Status", id: "status" },
  {
    accessor: "count",
    header: "Count",
    id: "count",
    sortValue: (item) => item.count,
    sortable: true
  }
];

const consumerBreadcrumbItems: BreadcrumbItem[] = [
  { href: "/", id: "home", label: "Home" },
  { href: "/projects", id: "projects", label: "Projects" },
  { id: "current", label: "Current" }
];

export const breadcrumbItemTypeCheck: BreadcrumbItem = consumerBreadcrumbItems[0];
export const breadcrumbDirectItemTypeCheck: BreadcrumbDirectItem = {
  href: "/direct",
  label: "Direct"
};
export const breadcrumbItemClickEventTypeCheck = (_event: BreadcrumbItemClickEvent) => {};
export const breadcrumbItemClickHandlerTypeCheck: BreadcrumbItemClickHandler = (event) => {
  event.preventDefault();
};
export const breadcrumbItemActivateHandlerTypeCheck: BreadcrumbItemActivateHandler = (
  item,
  index,
  event
) => {
  String(item.label);
  String(index);
  breadcrumbItemClickEventTypeCheck(event);
};
export const breadcrumbPropsTypeCheck: BreadcrumbProps = {
  items: consumerBreadcrumbItems,
  maxVisibleItems: 4,
  onItemClick: breadcrumbItemActivateHandlerTypeCheck
};
export const breadcrumbDirectPropsTypeCheck: BreadcrumbDirectProps = {
  "aria-label": "Direct Breadcrumb",
  items: [breadcrumbDirectItemTypeCheck]
};

export const tagAppearanceTypeCheck: TagAppearance = "outline";
export const tagShapeTypeCheck: TagShape = "circular";
export const tagSizeTypeCheck: TagSize = "small";
export const tagDismissEventTypeCheck = (_event: TagDismissEvent) => {};
export const tagDismissHandlerTypeCheck: TagDismissHandler = (event) => {
  tagDismissEventTypeCheck(event);
};
export const tagPropsTypeCheck: TagProps = {
  appearance: tagAppearanceTypeCheck,
  children: "Design",
  dismissible: true,
  onDismiss: tagDismissHandlerTypeCheck,
  shape: tagShapeTypeCheck,
  size: tagSizeTypeCheck
};
export const tagComponentTypeCheck: TagComponent = Tag;
export const tagDirectPropsTypeCheck: TagDirectProps = {
  appearance: "brand",
  children: "Direct Tag",
  dismissible: true
};

export const dataGridInteractionEventTypeCheck = (_event: DataGridInteractionEvent) => {};
export const dataGridSortStateTypeCheck: DataGridSortState = {
  columnId: "name",
  direction: "ascending"
};
export const dataGridSelectionModeTypeCheck: DataGridSelectionMode = "multiple";
export const dataGridRowIdTypeCheck: DataGridRowId = "alpha";
export const dataGridSortChangeTypeCheck: DataGridSortChangeHandler = (nextState, event) => {
  if (nextState) {
    dataGridInteractionEventTypeCheck(event);
  }
};
export const dataGridSelectionChangeTypeCheck: DataGridSelectionChangeHandler = (
  selectedRowIds,
  event
) => {
  selectedRowIds.forEach((rowId) => String(rowId));
  dataGridInteractionEventTypeCheck(event);
};
export const dataGridPropsTypeCheck: DataGridProps<ConsumerDataGridRow> = {
  columns: consumerDataGridColumns,
  defaultSelectedRowIds: [dataGridRowIdTypeCheck],
  defaultSortState: dataGridSortStateTypeCheck,
  getRowId: (item) => item.id,
  gridAriaLabel: "Consumer data grid",
  items: consumerDataGridRows,
  onSelectionChange: dataGridSelectionChangeTypeCheck,
  onSortChange: dataGridSortChangeTypeCheck,
  selectionMode: dataGridSelectionModeTypeCheck
};
export const dataGridDirectPropsTypeCheck: DataGridDirectProps<ConsumerDataGridRow> = {
  columns: consumerDataGridColumns,
  getRowId: (item) => item.id,
  items: consumerDataGridRows,
  label: "Direct DataGrid",
  selectionMode: "single"
};

const typedProps: [
  ButtonProps,
  ButtonGroupProps,
  BreadcrumbProps,
  CheckboxProps,
  AppContainerProps,
  AppThemeProps,
  AlertProps,
  AutoSuggestBoxProps,
  DialogProps,
  DatePickerProps,
  CalendarProps,
  DataGridProps<ConsumerDataGridRow>,
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
  TagProps,
  TreeViewProps,
  TextAreaProps,
  TooltipProps,
  ToastProps,
  ToasterProps
] = [
  { value: "Button" },
  { "aria-label": "Actions" },
  breadcrumbPropsTypeCheck,
  { label: "Checkbox" },
  { style: { gap: "8px" } },
  { color: "#123456", colorDarkMode: "#abcdef", scheme: "dark" },
  { message: "Please confirm", title: "Notice" },
  { suggestions: [{ value: "Windows" }] },
  { backdropBlur: true, isVisible: true, style: { width: "320px" } },
  { defaultValue: new Date(2024, 0, 15), label: "Release date", locale: "en-US" },
  { defaultPickerDate: new Date(2024, 0, 15), label: "Release calendar", locale: "en-US" },
  dataGridPropsTypeCheck,
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
  tagPropsTypeCheck,
  { "aria-label": "Files", defaultExpandedItems: ["documents"] },
  { placeholder: "Text" },
  { content: "More information", children: <button type="button">Action</button> },
  { duration: 0, title: "Saved" },
  { label: "Notifications", maxVisible: 3 }
];

export const rootImport: ReactElement = <Button value="Root export" />;
export const subpathImport: ReactElement = <ButtonDirect value="Button subpath" />;
export const breadcrumbComponentTypeCheck: BreadcrumbComponent | undefined = undefined;
export const tooltipSubpathImport: ReactElement = (
  <TooltipDirect content="Tooltip subpath" showDelay={0}>
    <button type="button">Tooltip trigger</button>
  </TooltipDirect>
);
export const propsTypeCheck = typedProps;
export const schemeTypeCheck: AppThemeScheme = "system";
export const alertHandleTypeCheck: AlertHandle | undefined = undefined;
export const dialogHandleTypeCheck: DialogHandle | undefined = undefined;
export const datePickerValueTypeCheck: DatePickerValue = new Date(2024, 0, 15);
export const datePickerValidationErrorTypeCheck: DatePickerValidationError = "invalid-input";
export const datePickerOpenChangeEventTypeCheck = (_event: DatePickerOpenChangeEvent) => {};
export const datePickerOpenChangeTypeCheck: DatePickerOpenChangeHandler = (_open, event) => {
  if (event) {
    datePickerOpenChangeEventTypeCheck(event);
  }
};
export const datePickerValueChangeEventTypeCheck = (_event: DatePickerValueChangeEvent) => {};
export const datePickerValueChangeTypeCheck: DatePickerValueChangeHandler = (_value, event) =>
  datePickerValueChangeEventTypeCheck(event);
export const datePickerPropsTypeCheck: DatePickerProps = {
  defaultValue: datePickerValueTypeCheck,
  label: "Release date",
  locale: "en-US",
  onOpenChange: datePickerOpenChangeTypeCheck,
  onValueChange: datePickerValueChangeTypeCheck
};
export const datePickerDirectValueTypeCheck: DatePickerDirectValue = null;
export const datePickerDirectPropsTypeCheck: DatePickerDirectProps = {
  defaultValue: datePickerDirectValueTypeCheck,
  label: "Direct DatePicker",
  locale: "en-US"
};
export const calendarValueTypeCheck: CalendarValue = new Date(2024, 4, 15);
export const calendarDirectValueTypeCheck: CalendarDirectValue = null;
export const calendarFirstDayOfWeekTypeCheck: CalendarFirstDayOfWeek = 1;
export const calendarInteractionEventTypeCheck = (_event: CalendarInteractionEvent) => {};
export const calendarValueChangeTypeCheck: CalendarValueChangeHandler = (_value, event) =>
  calendarInteractionEventTypeCheck(event);
export const calendarPickerDateChangeTypeCheck: CalendarPickerDateChangeHandler = (_value, event) =>
  calendarInteractionEventTypeCheck(event);
export const calendarPropsTypeCheck: CalendarProps = {
  defaultPickerDate: calendarValueTypeCheck,
  defaultValue: calendarValueTypeCheck,
  firstDayOfWeek: calendarFirstDayOfWeekTypeCheck,
  label: "Release calendar",
  locale: "en-US",
  onPickerDateChange: calendarPickerDateChangeTypeCheck,
  onValueChange: calendarValueChangeTypeCheck
};
export const calendarDirectPropsTypeCheck: CalendarDirectProps = {
  defaultValue: calendarDirectValueTypeCheck,
  label: "Direct Calendar",
  locale: "en-US"
};
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
export const teachingTipActionTypeCheck: TeachingTipAction = { label: "Got it" };
export const teachingTipHeroPlacementTypeCheck: TeachingTipHeroContentPlacement = "bottom";
export const teachingTipOpenChangeEventTypeCheck = (_event: TeachingTipOpenChangeEvent) => {};
export const teachingTipOpenChangeTypeCheck: TeachingTipOpenChangeHandler = (_open, event) => {
  if (event) {
    teachingTipOpenChangeEventTypeCheck(event);
  }
};
export const teachingTipPlacementTypeCheck: TeachingTipPlacement = "top";
export const teachingTipPropsTypeCheck: TeachingTipProps = {
  action: teachingTipActionTypeCheck,
  content: "Tip content",
  onOpenChange: teachingTipOpenChangeTypeCheck,
  placement: teachingTipPlacementTypeCheck,
  title: "Tip title",
  children: <button type="button">Target</button>
};
export const teachingTipDirectPropsTypeCheck: TeachingTipDirectProps = {
  content: "Direct tip content",
  title: "Direct tip",
  children: <button type="button">Direct target</button>
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
    <Breadcrumb {...breadcrumbPropsTypeCheck} />
    <AppContainer>
      <span>Container</span>
    </AppContainer>
    <AppTheme scheme="system" />
    <Alert title="Notice" message="Please confirm" />
    <Dialog isVisible>
      <Dialog.Body>Body</Dialog.Body>
      <Dialog.Footer>Footer</Dialog.Footer>
    </Dialog>
    <DatePicker {...datePickerPropsTypeCheck} />
    <Calendar {...calendarPropsTypeCheck} />
    <DataGrid {...dataGridPropsTypeCheck} />
    <Tag {...tagPropsTypeCheck} />
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
    <TeachingTip {...teachingTipPropsTypeCheck} />
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
export const datePickerSubpathImport: ReactElement = (
  <DatePickerDirect {...datePickerDirectPropsTypeCheck} />
);
export const calendarSubpathImport: ReactElement = (
  <CalendarDirect {...calendarDirectPropsTypeCheck} />
);
export const dataGridSubpathImport: ReactElement = (
  <DataGridDirect {...dataGridDirectPropsTypeCheck} />
);
export const breadcrumbSubpathImport: ReactElement = (
  <BreadcrumbDirect {...breadcrumbDirectPropsTypeCheck} />
);
export const tagSubpathImport: ReactElement = <TagDirect {...tagDirectPropsTypeCheck} />;
export const teachingTipSubpathImport: ReactElement = (
  <TeachingTipDirect {...teachingTipDirectPropsTypeCheck} />
);
