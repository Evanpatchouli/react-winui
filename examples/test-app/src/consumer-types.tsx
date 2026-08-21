import { createRef, type CSSProperties, type ReactElement } from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  AppContainer,
  AppTheme,
  Alert,
  Dialog,
  Accordion,
  ColorPickerItem,
  ColorPickerPalette,
  ImageView,
  InputSearchBar,
  InputSearchBox,
  InputText,
  Link,
  LoaderBar,
  LoaderBusy,
  MenuBar,
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
  TextArea,
  Tooltip,
  Popover,
  Flyout
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
  DialogProps,
  DialogHandle,
  AccordionProps,
  AccordionSlotProps,
  ColorPickerItemProps,
  ColorPickerPaletteProps,
  ImageViewProps,
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
  TextAreaProps,
  TooltipPlacement,
  TooltipProps,
  TooltipRelationship,
  PopoverProps,
  FlyoutProps
} from "@evanpatchouli/react-winui";
import ButtonDirect from "@evanpatchouli/react-winui/button";
import { Shadows } from "@evanpatchouli/react-winui/theme";
import type { ShadowName, ShadowToken } from "@evanpatchouli/react-winui/theme";
import TooltipDirect from "@evanpatchouli/react-winui/tooltip";
import PopoverDirect from "@evanpatchouli/react-winui/popover";
import FlyoutDirect from "@evanpatchouli/react-winui/flyout";

const typedProps: [
  ButtonProps,
  ButtonGroupProps,
  CheckboxProps,
  AppContainerProps,
  AppThemeProps,
  AlertProps,
  DialogProps,
  AccordionProps,
  ColorPickerItemProps,
  ColorPickerPaletteProps,
  ImageViewProps,
  InputSearchBarProps,
  InputSearchBoxProps,
  InputTextProps,
  LinkProps,
  LoaderBarProps,
  LoaderBusyProps,
  MenuBarProps,
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
  TextAreaProps,
  TooltipProps
] = [
  { value: "Button" },
  { "aria-label": "Actions" },
  { label: "Checkbox" },
  { style: { gap: "8px" } },
  { color: "#123456", colorDarkMode: "#abcdef", scheme: "dark" },
  { message: "Please confirm", title: "Notice" },
  { backdropBlur: true, isVisible: true, style: { width: "320px" } },
  { headerTitle: "General", style: { gap: "8px" } },
  { color: "#ff0000", name: "accent" },
  { color: "#00ff00" },
  { alt: "Windows logo", src: "/windows.png", width: 128 },
  { placeholder: "Search", width: 240 },
  { suggest: [{ text: "Windows" }], width: 240 },
  { label: "Input" },
  { to: "/docs" },
  { setTheme: "light" },
  { isLoading: true, size: "small" },
  { backdropBlur: true, menuDirection: "leftJustify" },
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
  { placeholder: "Text" },
  { content: "More information", children: <button type="button">Action</button> }
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
export const searchSuggestionTypeCheck: InputSearchSuggestion = { text: "Windows" };
export const selectOptionTypeCheck: SelectOption = { label: "One", value: "one" };
export const selectOptionValueTypeCheck: SelectOptionValue = 1;
export const selectChangeTypeCheck: SelectChangeHandler = () => {};
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
export const tableViewColumnTypeCheck: TableViewColumn = { title: "Name", sortable: true };
export const tableViewRowTypeCheck: TableViewRow = ["Apple", 1];
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
    <ColorPickerItem color="#ff0000" name="accent" />
    <ColorPickerPalette color="#00ff00" />
    <ImageView alt="Windows logo" src="/windows.png" />
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
    <TableView
      columns={[{ title: "Name" }, { title: "Count", sortable: true }]}
      rows={[["Apple", 1]]}
      TableFooterComponent={<span>Footer</span>}
      TableHeaderComponent={<span>Header</span>}
    />
    <TextArea placeholder="Notes" onChange={(event) => event.currentTarget.value} />
    <Tooltip content="More information">
      <Button value="Tooltip" />
    </Tooltip>
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
