import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Accordion from "../../src/lib/src/components/Accordion/index.tsx";
import Alert from "../../src/lib/src/components/Alert/index.tsx";
import AutoSuggestBox from "../../src/lib/src/components/AutoSuggestBox/index.tsx";
import AppContainer from "../../src/lib/src/components/AppContainer/index.tsx";
import AppTheme from "../../src/lib/src/components/AppTheme/index.tsx";
import Badge from "../../src/lib/src/components/Badge/index.tsx";
import Pagination from "../../src/lib/src/components/Pagination/index.tsx";
import Rating from "../../src/lib/src/components/Rating/index.tsx";
import Button from "../../src/lib/src/components/Button/index.tsx";
import ButtonGroup from "../../src/lib/src/components/ButtonGroup/index.tsx";
import Breadcrumb from "../../src/lib/src/components/Breadcrumb/index.tsx";
import Checkbox from "../../src/lib/src/components/Checkbox/index.tsx";
import ColorPickerItem from "../../src/lib/src/components/ColorPicker/ColorPickerItem/index.tsx";
import ColorPicker from "../../src/lib/src/components/ColorPicker/index.tsx";
import ColorPickerPalette from "../../src/lib/src/components/ColorPicker/ColorPickerPalette/index.tsx";
import ComboBox from "../../src/lib/src/components/ComboBox/index.tsx";
import CommandBar from "../../src/lib/src/components/CommandBar/index.tsx";
import Calendar from "../../src/lib/src/components/Calendar/index.tsx";
import DataGrid from "../../src/lib/src/components/DataGrid/index.tsx";
import DatePicker from "../../src/lib/src/components/DatePicker/index.tsx";
import Dialog from "../../src/lib/src/components/Dialog/index.tsx";
import Expander from "../../src/lib/src/components/Expander/index.tsx";
import ImageView from "../../src/lib/src/components/ImageView/index.tsx";
import InfoBar from "../../src/lib/src/components/InfoBar/index.tsx";
import InputSearchBar from "../../src/lib/src/components/InputSearch/InputSearchBar/index.tsx";
import InputSearchBox from "../../src/lib/src/components/InputSearch/InputSearchBox/index.tsx";
import InputText from "../../src/lib/src/components/InputText/index.tsx";
import Link from "../../src/lib/src/components/Link/index.tsx";
import LoaderBar from "../../src/lib/src/components/Loaders/LoaderBar/index.tsx";
import LoaderBusy from "../../src/lib/src/components/Loaders/LoaderBusy/index.tsx";
import MenuBar from "../../src/lib/src/components/MenuBar/index.tsx";
import ContextMenu from "../../src/lib/src/components/ContextMenu/index.tsx";
import NumberBox from "../../src/lib/src/components/NumberBox/index.tsx";
import NavBar from "../../src/lib/src/components/NavBar/NavBar/index.tsx";
import NavBarLink from "../../src/lib/src/components/NavBar/NavBarLink/index.tsx";
import NavBarSubMenu from "../../src/lib/src/components/NavBar/NavBarSubMenu/index.tsx";
import NavBarThemeSwitch from "../../src/lib/src/components/NavBar/NavBarThemeSwitch/index.tsx";
import NavPageContainer from "../../src/lib/src/components/NavBar/NavPageContainer/index.tsx";
import NavigationView from "../../src/lib/src/components/NavigationView/index.tsx";
import ProgressBar from "../../src/lib/src/components/ProgressBar/index.tsx";
import Flyout from "../../src/lib/src/components/Flyout/index.tsx";
import Popover from "../../src/lib/src/components/Popover/index.tsx";
import RadioButton from "../../src/lib/src/components/RadioButton/index.tsx";
import Select from "../../src/lib/src/components/SelectMenus/Select/index.tsx";
import SelectNative from "../../src/lib/src/components/SelectMenus/SelectNative/index.tsx";
import SettingsCard from "../../src/lib/src/components/SettingsCard/index.tsx";
import SettingsExpander from "../../src/lib/src/components/SettingsExpander/index.tsx";
import SliderBar from "../../src/lib/src/components/SliderBar/index.tsx";
import SplashScreen from "../../src/lib/src/components/SplashScreen/index.tsx";
import Switch from "../../src/lib/src/components/Switch/index.tsx";
import Tag from "../../src/lib/src/components/Tag/index.tsx";
import TableView from "../../src/lib/src/components/TableView/index.tsx";
import TextArea from "../../src/lib/src/components/TextArea/index.tsx";
import Tooltip from "../../src/lib/src/components/Tooltip/index.tsx";
import Toast, { Toaster } from "../../src/lib/src/components/Toast/index.tsx";
import TeachingTip from "../../src/lib/src/components/TeachingTip/index.tsx";
import TreeView, { TreeItem } from "../../src/lib/src/components/TreeView/index.tsx";
import "../../src/lib/config/app-config.css";
import "../../src/lib/icons/winui-icons.slim.css";
import "../../src/lib/scss/main.scss";
import "./fixture.css";

const selectData = [
  { label: "Windows", value: "windows" },
  { label: "Linux", value: "linux" },
  { label: "macOS", value: "macos" }
];

const comboBoxOptions = [
  { label: "Windows", value: "windows" },
  { disabled: true, label: "Linux unavailable", value: "linux" },
  { label: "macOS", value: "macos" },
  { label: "Blue", value: "blue" }
];

const autoSuggestBoxSuggestions = [
  { value: "Windows 11" },
  { disabled: true, label: "Windows Server unavailable", value: "Windows Server" },
  { value: "WinUI Gallery" },
  { value: "Seattle" }
];

const searchSuggestions = [{ text: "Windows 11" }, { text: "Windows UI" }, { text: "Linux" }];

const datePickerDefaultDate = new Date(2024, 4, 15);
const datePickerToday = new Date(2024, 4, 20);
const datePickerMinDate = new Date(2024, 4, 10);
const datePickerMaxDate = new Date(2024, 4, 30);
const formatDatePickerFixtureDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

const dataGridRows = [
  { id: "alpha", name: "Alpha", owner: "Design", status: "Ready", updated: 12 },
  { id: "beta", name: "Beta", owner: "Platform", status: "Paused", updated: 8 },
  { id: "gamma", name: "Gamma", owner: "Research", status: "Ready", updated: 4 },
  { id: "delta", name: "Delta", owner: "Support", status: "Review", updated: 2 }
];

const dataGridColumns = [
  { accessor: "name", header: "Name", id: "name", sortable: true },
  { accessor: "owner", header: "Owner", id: "owner" },
  {
    accessor: "status",
    header: "Status",
    id: "status",
    renderCell: (item) => <strong>{item.status}</strong>
  },
  { accessor: "updated", header: "Updated", id: "updated", sortable: true }
];

const imageSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='96' viewBox='0 0 160 96'%3E%3Crect width='160' height='96' fill='%230078D7'/%3E%3Ccircle cx='80' cy='48' r='24' fill='%2360CDFF'/%3E%3C/svg%3E";

const Section = ({ testId, eyebrow, title, caption, children, className = "" }) => (
  <section className={`visual-fixture-panel ${className}`} data-testid={testId}>
    <div className="visual-fixture-panel-heading">
      <div>
        <p className="visual-fixture-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {caption && <span className="visual-fixture-caption">{caption}</span>}
    </div>
    {children}
  </section>
);

const SettingsGlyph = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
    <circle cx="10" cy="10" fill="none" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10 2.5v2m0 11v2m7.5-7.5h-2m-11 0h-2m12.8-5.3-1.4 1.4M6.1 13.9l-1.4 1.4m10.6 0-1.4-1.4M6.1 6.1 4.7 4.7"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
    <circle cx="8" cy="8" fill="none" r="2.5" stroke="currentColor" />
    <path
      d="M8 1.5v2m0 9v2M1.5 8h2m9 0h2M3.4 3.4l1.4 1.4m6.4 6.4 1.4 1.4m0-9.2-1.4 1.4m-6.4 6.4-1.4 1.4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

function VisualFixture() {
  const [scheme, setScheme] = useState("light");
  const [activation, setActivation] = useState("none");
  const [contextMenuAction, setContextMenuAction] = useState("none");
  const [comboBoxResult, setComboBoxResult] = useState("windows");
  const [commandBarOpen, setCommandBarOpen] = useState(false);
  const [commandBarResult, setCommandBarResult] = useState("none");
  const [autoSuggestBoxResult, setAutoSuggestBoxResult] = useState("none");
  const [autoSuggestBoxText, setAutoSuggestBoxText] = useState("Win");
  const [editableComboBoxResult, setEditableComboBoxResult] = useState("none");
  const [expanderControlled, setExpanderControlled] = useState(false);
  const [expanderDetails, setExpanderDetails] = useState(["Network discovery"]);
  const [expanderResult, setExpanderResult] = useState("none");
  const [selection, setSelection] = useState("windows");
  const [calendarResult, setCalendarResult] = useState("none");
  const [dataGridSortState, setDataGridSortState] = useState(null);
  const [dataGridSelectedRowIds, setDataGridSelectedRowIds] = useState(["alpha"]);
  const [breadcrumbResult, setBreadcrumbResult] = useState("none");
  const [tagResult, setTagResult] = useState("none");
  const [teachingTipOpen, setTeachingTipOpen] = useState(false);
  const [teachingTipLightDismissOpen, setTeachingTipLightDismissOpen] = useState(false);
  const [teachingTipResult, setTeachingTipResult] = useState("none");
  const [datePickerResult, setDatePickerResult] = useState(
    formatDatePickerFixtureDate(datePickerDefaultDate)
  );
  const [searchBarValue, setSearchBarValue] = useState("Windows");
  const [searchResult, setSearchResult] = useState("none");
  const [infoBarInstance, setInfoBarInstance] = useState(0);
  const [infoBarResult, setInfoBarResult] = useState("none");
  const [numberBoxResult, setNumberBoxResult] = useState(4);
  const [navigationViewSelection, setNavigationViewSelection] = useState("reports");
  const [compactNavigationOpen, setCompactNavigationOpen] = useState(false);
  const [settingsCardResult, setSettingsCardResult] = useState("none");
  const [settingsExpanderControlled, setSettingsExpanderControlled] = useState(false);
  const [settingsExpanderResult, setSettingsExpanderResult] = useState("none");
  const [toastResult, setToastResult] = useState("none");
  const [treeExpandedItems, setTreeExpandedItems] = useState(["workspace", "src"]);
  const [treeSelection, setTreeSelection] = useState("readme");
  const [imageState, setImageState] = useState("loading");
  const [showSplash, setShowSplash] = useState(false);
  const alertRef = useRef(null);
  const dialogRef = useRef(null);
  const menuAnchorRef = useRef(null);
  const menuRef = useRef(null);
  const toasterRef = useRef(null);

  const showToastStack = () => {
    toasterRef.current?.dismissAll();
    toasterRef.current?.show({
      id: "toast-one",
      message: "Your document is available on this device.",
      persistent: true,
      title: "Saved"
    });
    toasterRef.current?.show({
      id: "toast-two",
      intent: "success",
      message: "4 files are now up to date.",
      persistent: true,
      title: "Sync complete"
    });
    toasterRef.current?.show({
      id: "toast-three",
      intent: "warning",
      message: "Changes will upload when the connection returns.",
      persistent: true,
      title: "Working offline"
    });
    toasterRef.current?.show({
      id: "toast-four",
      intent: "error",
      persistent: true,
      title: "Queued notification"
    });
    setToastResult("stack shown");
  };

  const showPausableToast = () => {
    toasterRef.current?.dismissAll();
    toasterRef.current?.show({
      duration: 500,
      id: "toast-pause",
      message: "The timer stops while the pointer is here.",
      onOpenChange: (_open, data) => setToastResult(data.reason),
      title: "Hover to pause"
    });
    setToastResult("timer running");
  };

  return (
    <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <AppTheme scheme={scheme} />
      <main className="visual-fixture">
        <header className="visual-fixture-header">
          <div>
            <p className="visual-fixture-eyebrow">react-winui</p>
            <h1>Component visual regression gallery</h1>
            <p className="visual-fixture-intro">
              Every public visual component is mounted here so browser baselines protect the library
              surface.
            </p>
          </div>
          <div className="visual-fixture-theme-controls" aria-label="Theme controls">
            <button type="button" data-testid="theme-light" onClick={() => setScheme("light")}>
              Light
            </button>
            <button type="button" data-testid="theme-dark" onClick={() => setScheme("dark")}>
              Dark
            </button>
          </div>
        </header>

        <span className="visual-fixture-ready" data-testid="gallery-ready">
          ready
        </span>

        <Section
          caption="AppContainer · NavPageContainer · Link · ButtonGroup"
          eyebrow="layout"
          testId="layout-panel"
          title="Layout and navigation primitives"
        >
          <AppContainer className="visual-fixture-app-container" style={{ gap: "12px" }}>
            <span className="visual-fixture-chip">Application content</span>
            <Link to="/docs">Docs link</Link>
            <ButtonGroup aria-label="Layout actions">
              <Button value="Open" />
              <Button type="subtle" value="More" />
            </ButtonGroup>
          </AppContainer>
          <NavPageContainer
            animateTransition
            backgroundColor="var(--rwu-color-surface-canvas)"
            hasPadding
          >
            <div className="visual-fixture-page-content">
              <strong>Page content</strong>
              <span>Reusable content surface with the current theme.</span>
            </div>
          </NavPageContainer>
        </Section>

        <Section
          caption="default · primary · semantic · loading · disabled"
          eyebrow="actions"
          testId="button-panel"
          title="Button states"
        >
          <div className="visual-fixture-row">
            <div data-testid="button-default">
              <Button onClick={() => setActivation("default button activated")} value="Default" />
            </div>
            <div data-testid="button-primary">
              <Button type="primary" value="Primary" />
            </div>
            <Button type="success" value="Success" />
            <Button type="danger" value="Danger" />
            <Button type="primary-outline" value="Outline" />
            <Button type="subtle" value="Subtle" />
            <Button isLoading value="Loading" />
            <div data-testid="button-disabled">
              <Button disabled value="Disabled" />
            </div>
          </div>
          <p className="visual-fixture-status">
            Keyboard activation: <output data-testid="interaction-result">{activation}</output>
          </p>
        </Section>

        <Section
          caption="hover · focus · delay · viewport placement · arrow"
          eyebrow="feedback"
          testId="tooltip-panel"
          title="Tooltip"
        >
          <div className="visual-fixture-row">
            <Tooltip content="Create a new document" defaultOpen placement="top" withArrow>
              <Button value="Tooltip preview" />
            </Tooltip>
            <Tooltip content="Supplemental information" placement="bottom" showDelay={0}>
              <Button value="Hover me" />
            </Tooltip>
          </div>
          <p className="visual-fixture-status">
            Tooltip content is supplemental and connected to the trigger with ARIA.
          </p>
        </Section>

        <Section
          caption="click · light dismiss · focusable content · arrow"
          eyebrow="overlay"
          testId="popover-panel"
          title="Popover and Flyout"
        >
          <div className="visual-fixture-row">
            <Popover
              content={
                <div className="visual-fixture-popover-content">
                  <strong>Quick actions</strong>
                  <span>Structured content can include controls.</span>
                  <button type="button">Continue</button>
                </div>
              }
              contentProps={{ "aria-label": "Quick actions" }}
              placement="bottom"
              withArrow
            >
              <Button value="Popover preview" />
            </Popover>
            <Flyout content="Flyout closes on outside click or Escape" placement="right">
              <Button value="Flyout preview" />
            </Flyout>
          </div>
          <p className="visual-fixture-status">
            Popover and Flyout share light-dismiss behavior while preserving structured content.
          </p>
        </Section>

        <Section
          caption="text · checkbox · radio · switch · textarea · native select"
          eyebrow="controls"
          testId="controls-panel"
          title="Form controls"
        >
          <div className="visual-fixture-row visual-fixture-row-start">
            <InputText
              clearButton
              defaultValue="Ada Lovelace"
              label="Name"
              setStatus="success"
              width="190px"
            />
            <InputText
              defaultValue="Invalid value"
              label="Status"
              setStatus="danger"
              width="170px"
            />
            <InputText
              data-testid="input-text-loading"
              label="Loading"
              setStatus="loading"
              width="150px"
            />
            <Checkbox defaultChecked label="Remember me" />
            <Checkbox disabled label="Disabled" />
            <RadioButton defaultChecked label="Windows" name="gallery-platform" />
            <RadioButton label="Linux" name="gallery-platform" />
            <Switch defaultChecked labelOff="Off" labelOn="On" />
            <Switch data-testid="switch-disabled" disabled labelOff="Disabled" />
            <TextArea defaultValue="A multiline value" resizer={false} rows={2} />
            <SelectNative data={selectData} defaultValue="windows" tooltip="Native select" />
          </div>
        </Section>

        <Section
          caption="swatches · native color · custom select · range"
          eyebrow="selection"
          testId="selection-panel"
          title="Selection controls"
        >
          <div className="visual-fixture-row visual-fixture-row-start">
            <div className="visual-fixture-color-group" aria-label="Color picker items">
              <ColorPickerItem color="#0078D7" defaultChecked name="gallery-color" />
              <ColorPickerItem color="#60CDFF" name="gallery-color" />
              <ColorPickerItem color="#FFB900" name="gallery-color" />
              <ColorPickerPalette color="#107C10" height={40} width={40} />
            </div>
            <div className="visual-fixture-select-wrap" data-testid="select-control">
              <Select
                backdropBlur
                data={selectData}
                defaultValue="windows"
                onChange={(value) => setSelection(String(value))}
                tooltip="Choose a platform"
              />
              <span className="visual-fixture-inline-status">
                Selected: <output data-testid="selection-result">{selection}</output>
              </span>
            </div>
            <SliderBar aria-label="Volume" defaultValue={45} ticks={[0, 50, 100]} width="220px" />
          </div>
        </Section>

        <Section
          caption="collapsed baseline · expanded interaction · open overlays"
          eyebrow="feedback"
          testId="feedback-panel"
          title="Accordion, alert, and dialog"
        >
          <Accordion headerTitle="Advanced settings">
            <Accordion.Body>
              <div className="visual-fixture-accordion-content">
                <span>Expanded content keeps its measured height.</span>
                <Checkbox label="Enable notifications" />
              </div>
            </Accordion.Body>
          </Accordion>
          <div className="visual-fixture-row">
            <Button
              data-testid="open-alert"
              onClick={() => alertRef.current?.open()}
              value="Open alert"
            />
            <Button
              data-testid="open-dialog"
              onClick={() => dialogRef.current?.open()}
              value="Open dialog"
            />
          </div>
          <Alert
            backdropBlur
            message="The selected action needs confirmation."
            ref={alertRef}
            title="Confirm action"
          >
            <Alert.Header>Alert header slot</Alert.Header>
            <Alert.Footer>
              <Button onClick={() => alertRef.current?.close()} value="Cancel" />
              <Button type="primary" onClick={() => alertRef.current?.close()} value="Confirm" />
            </Alert.Footer>
          </Alert>
          <Dialog backdropBlur ref={dialogRef}>
            <Dialog.Body>
              <strong>Dialog body</strong>
              <p>Content can scroll independently from the page.</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={() => dialogRef.current?.close()} value="Close dialog" />
            </Dialog.Footer>
          </Dialog>
        </Section>

        <Section
          caption="search bar · filtered suggestion list"
          eyebrow="search"
          testId="search-panel"
          title="Search inputs"
        >
          <div className="visual-fixture-row visual-fixture-row-start">
            <InputSearchBar
              onChange={(event) => setSearchBarValue(event.target.value)}
              onSubmit={(value) => setSearchResult(String(value))}
              tooltip="Search the library"
              value={searchBarValue}
              width="220px"
            />
            <InputSearchBox
              onChange={(event) => setSearchResult(event.target.value)}
              suggest={searchSuggestions}
              tooltip="Search suggestions"
              width="220px"
            />
          </div>
          <p className="visual-fixture-status">
            Search value: <output data-testid="search-result">{searchResult}</output>
          </p>
        </Section>

        <Section
          caption="bar loader · busy loader · progress · image · splash"
          eyebrow="loading"
          testId="loading-panel"
          title="Loading and media"
        >
          <div className="visual-fixture-loading-grid">
            <div className="visual-fixture-loader-surface">
              <span className="visual-fixture-label">LoaderBar</span>
              <LoaderBar isLoading={false} setTheme="light" />
            </div>
            <div className="visual-fixture-loader-surface">
              <span className="visual-fixture-label">LoaderBusy</span>
              <LoaderBusy data-testid="busy-loader" isLoading setTheme="light" size="large" />
            </div>
            <div className="visual-fixture-progress-stack">
              <span className="visual-fixture-label">ProgressBar</span>
              <ProgressBar setProgress={65} width="220px" />
              <ProgressBar setProgress="indeterminate" width="220px" />
            </div>
            <div className="visual-fixture-image-wrap">
              <span className="visual-fixture-label">ImageView</span>
              <ImageView
                alt="Blue circle artwork"
                data-testid="gallery-image"
                height={72}
                onLoad={() => setImageState("loaded")}
                src={imageSrc}
                width={120}
              />
              <output data-testid="image-state">{imageState}</output>
            </div>
            <div className="visual-fixture-splash-trigger">
              <span className="visual-fixture-label">SplashScreen</span>
              <Button
                data-testid="open-splash"
                onClick={() => setShowSplash(true)}
                value="Preview splash"
              />
              {showSplash && (
                <SplashScreen
                  backgroundColor="#202020"
                  duration={60000}
                  isVisible
                  logo={<span className="visual-fixture-splash-logo">RWU</span>}
                  subtitle="Preparing the workspace"
                  title="Loading"
                />
              )}
            </div>
          </div>
        </Section>

        <Section
          caption="anchor menu · divider · nested submenu"
          eyebrow="menus"
          testId="menu-panel"
          title="MenuBar"
        >
          <button
            ref={menuAnchorRef}
            type="button"
            data-testid="menu-anchor"
            onClick={() => menuRef.current?.openDialog()}
          >
            Open menu
          </button>
          <MenuBar anchorRef={menuAnchorRef} backdropBlur ref={menuRef}>
            <MenuBar.Item label="File" onClick={() => setActivation("File selected")} />
            <MenuBar.Item.Divider />
            <MenuBar.Item.SubMenu label="More">
              <MenuBar.Item label="Settings" onClick={() => setActivation("Settings selected")} />
            </MenuBar.Item.SubMenu>
          </MenuBar>
          <p className="visual-fixture-status">
            Menu action: <output data-testid="menu-result">{activation}</output>
          </p>
        </Section>

        <Section
          caption="right click · Shift+F10 · light dismiss · disabled"
          eyebrow="menus"
          testId="context-menu-panel"
          title="ContextMenu"
        >
          <div className="visual-fixture-row">
            <ContextMenu
              content={
                <>
                  <ContextMenu.Item
                    secondaryContent="Ctrl+C"
                    onSelect={() => setContextMenuAction("Copy selected")}
                  >
                    Copy
                  </ContextMenu.Item>
                  <ContextMenu.Item onSelect={() => setContextMenuAction("Rename selected")}>
                    Rename
                  </ContextMenu.Item>
                  <ContextMenu.Divider />
                  <ContextMenu.Item disabled>Paste unavailable</ContextMenu.Item>
                </>
              }
            >
              <button className="ui-btn" data-testid="context-menu-trigger" type="button">
                Project plan.txt
              </button>
            </ContextMenu>
            <button className="ui-btn" data-testid="context-menu-after" type="button">
              Next focus target
            </button>
          </div>
          <p className="visual-fixture-status">
            Context command: <output data-testid="context-menu-result">{contextMenuAction}</output>
          </p>
        </Section>

        <Section
          caption="expanded desktop shell · active link · submenu · theme switch"
          eyebrow="navigation"
          testId="navbar-panel"
          title="NavBar family"
          className="visual-fixture-navbar-panel"
        >
          <div className="visual-fixture-navbar-host">
            <NavBar
              shadowOnScroll
              title="Workspace"
              titleBarMobile={<span className="visual-fixture-mobile-title">Workspace</span>}
            >
              <NavBarLink
                active
                badgeBackgroundColor="#0078D7"
                href="/home"
                icon={<span aria-hidden="true">⌂</span>}
                showBadge={3}
                text="Home"
              />
              <NavBarLink
                href="/settings"
                icon={<span aria-hidden="true">⚙</span>}
                text="Settings"
              />
              <NavBarSubMenu title="Utilities">
                <NavBarLink href="/logs" text="Logs" />
              </NavBarSubMenu>
              <NavBarThemeSwitch />
            </NavBar>
          </div>
        </Section>

        <Section
          caption="sortable header · typed rows · slots"
          eyebrow="data"
          testId="table-panel"
          title="TableView"
        >
          <TableView
            columns={[
              { showSortIcon: true, title: "Name" },
              { showSortIcon: false, title: "Value" },
              { sortable: false, title: "State" }
            ]}
            rows={[
              ["Banana", 2, "Ready"],
              ["Apple", 1, "Draft"]
            ]}
            TableFooterComponent={<div className="visual-fixture-table-footer">2 items</div>}
            TableHeaderComponent={<div className="visual-fixture-table-header">Recent items</div>}
          />
        </Section>

        <Section
          caption="FIFO queue · stack limit · action · timeout pause · Escape"
          eyebrow="feedback"
          testId="toast-panel"
          title="Toast and Toaster"
        >
          <div className="visual-fixture-row">
            <Button onClick={showToastStack} value="Show toast stack" />
            <Button onClick={showPausableToast} value="Show pausable toast" />
            <Button onClick={() => toasterRef.current?.dismissAll()} value="Dismiss all toasts" />
          </div>
          <p className="visual-fixture-status">
            Toast lifecycle: <output data-testid="toast-result">{toastResult}</output>
          </p>
          <Toast
            className="visual-fixture-inline-toast"
            closable={false}
            duration={0}
            message="Standalone Toasts can also be controlled directly."
            title="Inline example"
          />
          <Toaster label="Visual fixture notifications" maxVisible={3} ref={toasterRef} />
        </Section>

        <Section
          caption="four severities · inline layout · controlled and uncontrolled close"
          eyebrow="feedback"
          testId="info-bar-panel"
          title="InfoBar"
        >
          <div className="visual-fixture-info-bars">
            <InfoBar
              open
              closable={false}
              data-testid="info-bar-informational"
              message="Restart the app to install it."
              severity="informational"
              title="Update available"
            />
            <InfoBar
              open
              closable={false}
              data-testid="info-bar-success"
              message="All documents were uploaded."
              severity="success"
              title="Backup complete"
            />
            <InfoBar
              open
              action={<Button value="Network settings" />}
              closable={false}
              data-testid="info-bar-warning"
              message="Changes will sync when the network returns."
              severity="warning"
              title="Connection interrupted"
            />
            <InfoBar
              open
              closable={false}
              content={<span>Check the file permissions before retrying.</span>}
              data-testid="info-bar-error"
              message="The document could not be saved."
              severity="error"
              title="Saving failed"
            />
            <InfoBar
              key={infoBarInstance}
              defaultOpen
              closeButtonAriaLabel="Dismiss uncontrolled info bar"
              data-testid="info-bar-uncontrolled"
              message="This instance manages its own visibility."
              onOpenChange={() => setInfoBarResult("uncontrolled closed")}
              title="Uncontrolled example"
            />
            <InfoBar
              open
              closeButtonAriaLabel="Request controlled close"
              data-testid="info-bar-controlled"
              message="The parent intentionally keeps this message open."
              onOpenChange={(nextOpen) => setInfoBarResult(`controlled request: ${nextOpen}`)}
              severity="warning"
              title="Controlled example"
            />
          </div>
          <div className="visual-fixture-row">
            <Button
              onClick={() => {
                setInfoBarInstance((instance) => instance + 1);
                setInfoBarResult("uncontrolled reset");
              }}
              value="Reset uncontrolled InfoBar"
            />
          </div>
          <p className="visual-fixture-status">
            InfoBar lifecycle: <output data-testid="info-bar-result">{infoBarResult}</output>
          </p>
        </Section>

        <Section
          caption="select-only · editable · disabled option · portal viewport fallback"
          eyebrow="selection"
          testId="combo-box-panel"
          title="ComboBox"
        >
          <div className="visual-fixture-combo-boxes">
            <div>
              <span className="visual-fixture-label">Select-only</span>
              <ComboBox
                aria-label="Platform ComboBox"
                data-testid="combo-box-select-only"
                defaultValue="windows"
                listboxAriaLabel="Platform options"
                options={comboBoxOptions}
                onValueChange={(value) => setComboBoxResult(String(value))}
              />
            </div>
            <div>
              <span className="visual-fixture-label">Editable</span>
              <ComboBox
                editable
                aria-label="Editable color ComboBox"
                data-testid="combo-box-editable"
                listboxAriaLabel="Editable color options"
                options={comboBoxOptions}
                onValueChange={(value, option) =>
                  setEditableComboBoxResult(`${option ? "option" : "custom"}: ${String(value)}`)
                }
              />
            </div>
            <div>
              <span className="visual-fixture-label">Viewport fallback</span>
              <ComboBox
                aria-label="Viewport ComboBox"
                data-testid="combo-box-viewport"
                listboxAriaLabel="Viewport options"
                options={comboBoxOptions}
              />
            </div>
            <button className="ui-btn" data-testid="combo-box-outside" type="button">
              Outside target
            </button>
          </div>
          <p className="visual-fixture-status">
            Select-only result: <output data-testid="combo-box-result">{comboBoxResult}</output>
            {" · "}
            Editable result:{" "}
            <output data-testid="combo-box-editable-result">{editableComboBoxResult}</output>
          </p>
        </Section>

        <Section
          caption="direct input · inline stepping · bounded values · light/dark"
          eyebrow="numeric input"
          testId="number-box-panel"
          title="NumberBox"
        >
          <div className="visual-fixture-number-boxes">
            <NumberBox
              data-testid="number-box-default"
              defaultValue={4}
              label="Quantity"
              max={10}
              min={0}
              onValueChange={(value) => setNumberBoxResult(value)}
            />
            <NumberBox
              data-testid="number-box-decimal"
              defaultValue={0.5}
              label="Opacity"
              max={1}
              min={0}
              precision={1}
              step={0.1}
            />
            <NumberBox readOnly defaultValue={8} label="Read only" />
            <NumberBox disabled defaultValue={12} label="Disabled" />
          </div>
          <p className="visual-fixture-status">
            Committed quantity: <output data-testid="number-box-result">{numberBoxResult}</output>
          </p>
        </Section>

        <Section
          caption="nested · controlled state · disabled · roving focus · typeahead"
          eyebrow="navigation"
          testId="tree-view-panel"
          title="TreeView"
        >
          <div className="visual-fixture-tree-view">
            <TreeView
              aria-label="Workspace files"
              expandedItems={treeExpandedItems}
              onExpandedItemsChange={setTreeExpandedItems}
              onValueChange={(value) => setTreeSelection(String(value))}
              value={treeSelection}
            >
              <TreeItem
                data-testid="tree-workspace"
                icon={<i aria-hidden="true" className="icons10-database" />}
                label="Workspace"
                value="workspace"
              >
                <TreeItem
                  data-testid="tree-src"
                  icon={<i aria-hidden="true" className="icons10-hdd" />}
                  label="src"
                  value="src"
                >
                  <TreeItem label="TreeView.tsx" value="tree-view" />
                  <TreeItem label="tokens.scss" value="tokens" />
                </TreeItem>
                <TreeItem data-testid="tree-readme" label="README.md" value="readme" />
                <TreeItem disabled label="System files" value="system" />
              </TreeItem>
              <TreeItem label="Archive" value="archive" />
            </TreeView>
          </div>
          <p className="visual-fixture-status">
            Selected item: <output data-testid="tree-view-result">{treeSelection}</output>
          </p>
        </Section>

        <Section
          caption="static controls · sibling trigger · link · disabled · responsive"
          eyebrow="settings"
          testId="settings-card-panel"
          title="SettingsCard"
        >
          <div className="visual-fixture-settings-cards">
            <SettingsCard
              data-testid="settings-card-static"
              description="Allow apps to show desktop notifications"
              icon={<SettingsGlyph />}
              title="Notifications"
            >
              <Switch
                aria-label="Desktop notifications"
                defaultChecked
                label={false}
                onChange={() => setSettingsCardResult("content: notifications")}
              />
            </SettingsCard>
            <SettingsCard
              data-testid="settings-card-interactive"
              description="Brightness, night light, and display profile"
              icon={<SettingsGlyph />}
              onClick={() => setSettingsCardResult("card: display")}
              title="Display"
            />
            <SettingsCard
              action={
                <button
                  className="ui-btn"
                  data-testid="settings-card-action"
                  onClick={() => setSettingsCardResult("action: update")}
                  type="button"
                >
                  Check now
                </button>
              }
              description="Last checked a few minutes ago"
              onClick={() => setSettingsCardResult("card: update")}
              title="Windows Update"
            />
            <SettingsCard
              data-testid="settings-card-link"
              description="Camera, microphone, and account permissions"
              href="#privacy"
              onClick={(event) => {
                event.preventDefault();
                setSettingsCardResult("link: privacy");
              }}
              title="Privacy & security"
            />
            <SettingsCard
              disabled
              action={
                <button disabled className="ui-btn" type="button">
                  Manage
                </button>
              }
              data-testid="settings-card-disabled"
              description="Managed by your organization"
              onClick={() => setSettingsCardResult("unexpected")}
              title="Optional diagnostics"
            />
          </div>
          <p className="visual-fixture-status">
            Settings action:{" "}
            <output data-testid="settings-card-result">{settingsCardResult}</output>
          </p>
        </Section>

        <Section
          caption="dynamic suggestions · query submit · clear · disabled · viewport fallback"
          eyebrow="query"
          testId="auto-suggest-box-panel"
          title="AutoSuggestBox"
        >
          <div className="visual-fixture-auto-suggest-boxes">
            <AutoSuggestBox
              data-testid="auto-suggest-box-interactive"
              label="Search topics"
              listboxAriaLabel="Topic suggestions"
              noSuggestionsMessage="No matching topics"
              onQuerySubmit={(query, suggestion) =>
                setAutoSuggestBoxResult(`${suggestion ? "suggestion" : "text"}: ${query}`)
              }
              onTextChange={(nextText) => setAutoSuggestBoxText(nextText)}
              placeholder="Type a Windows topic"
              queryButton
              suggestions={autoSuggestBoxSuggestions.filter((suggestion) =>
                suggestion.value.toLowerCase().includes(autoSuggestBoxText.toLowerCase())
              )}
              text={autoSuggestBoxText}
            />
            <AutoSuggestBox
              data-testid="auto-suggest-box-viewport"
              defaultText="Win"
              label="Viewport fallback"
              listboxAriaLabel="Viewport topic suggestions"
              suggestions={autoSuggestBoxSuggestions}
            />
            <AutoSuggestBox
              disabled
              data-testid="auto-suggest-box-disabled"
              defaultText="Disabled query"
              label="Disabled"
              queryButton
              suggestions={autoSuggestBoxSuggestions}
            />
            <button className="ui-btn" data-testid="auto-suggest-box-outside" type="button">
              Outside target
            </button>
          </div>
          <p className="visual-fixture-status">
            Query result:{" "}
            <output data-testid="auto-suggest-box-result">{autoSuggestBoxResult}</output>
          </p>
        </Section>

        <Section
          caption="controlled and uncontrolled · up and down · disabled · dynamic content"
          eyebrow="layout"
          testId="expander-panel"
          title="Expander"
        >
          <div className="visual-fixture-expander-grid">
            <Expander
              data-testid="expander-keyboard"
              header="Advanced network settings"
              icon={<SettingsIcon />}
              onExpandedChange={(nextExpanded) => setExpanderResult(`keyboard: ${nextExpanded}`)}
            >
              <div className="visual-fixture-expander-content">
                {expanderDetails.map((detail) => (
                  <span key={detail}>{detail}</span>
                ))}
                <Button
                  onClick={() =>
                    setExpanderDetails((details) =>
                      details.includes("Metered connection")
                        ? details
                        : [...details, "Metered connection"]
                    )
                  }
                  value="Add dynamic detail"
                />
              </div>
            </Expander>
            <Expander
              data-testid="expander-controlled"
              expanded={expanderControlled}
              header="Controlled details"
              onExpandedChange={(nextExpanded) => {
                setExpanderControlled(nextExpanded);
                setExpanderResult(`controlled: ${nextExpanded}`);
              }}
            >
              <div className="visual-fixture-expander-content">
                Parent state accepted the request.
              </div>
            </Expander>
            <Expander
              defaultExpanded
              data-testid="expander-up"
              direction="up"
              header="Recent activity"
            >
              <div className="visual-fixture-expander-content">
                Content expands above the header.
              </div>
            </Expander>
            <Expander
              disabled
              data-testid="expander-disabled"
              header="Managed by your organization"
              onExpandedChange={() => setExpanderResult("disabled activated")}
            >
              Unavailable content
            </Expander>
          </div>
          <p className="visual-fixture-status">
            Expander lifecycle: <output data-testid="expander-result">{expanderResult}</output>
          </p>
        </Section>

        <Section
          caption="primary · secondary · disabled · controlled overflow · responsive"
          eyebrow="actions"
          testId="command-bar-panel"
          title="CommandBar"
        >
          <div className="visual-fixture-command-bars">
            <CommandBar
              aria-label="Editor commands"
              onOverflowOpenChange={setCommandBarOpen}
              overflowOpen={commandBarOpen}
              secondaryCommands={
                <>
                  <CommandBar.Button
                    icon={<i aria-hidden="true" className="icons10-pencil" />}
                    label="Rename"
                    onClick={() => setCommandBarResult("Rename selected")}
                  />
                  <CommandBar.Separator />
                  <CommandBar.Button
                    icon={<i aria-hidden="true" className="icons10-settings" />}
                    label="Properties"
                    onClick={() => setCommandBarResult("Properties selected")}
                  />
                </>
              }
            >
              <CommandBar.Button
                icon={<i aria-hidden="true" className="icons10-save" />}
                label="Save"
                onClick={() => setCommandBarResult("Save selected")}
              />
              <CommandBar.Button
                icon={<i aria-hidden="true" className="icons10-copy" />}
                label="Copy"
              />
              <CommandBar.Separator />
              <CommandBar.Button
                disabled
                icon={<i aria-hidden="true" className="icons10-paste" />}
                label="Paste"
              />
              <CommandBar.Button
                icon={<i aria-hidden="true" className="icons10-upload" />}
                label="Share"
              />
            </CommandBar>

            <div className="visual-fixture-command-bar-narrow">
              <CommandBar
                aria-label="Responsive commands"
                minimumPrimaryCommands={1}
                overflowLabel="More responsive commands"
              >
                <CommandBar.Button
                  icon={<i aria-hidden="true" className="icons10-save" />}
                  label="Save"
                />
                <CommandBar.Button
                  icon={<i aria-hidden="true" className="icons10-copy" />}
                  label="Copy"
                />
                <CommandBar.Button
                  icon={<i aria-hidden="true" className="icons10-upload" />}
                  label="Share"
                />
                <CommandBar.Button
                  icon={<i aria-hidden="true" className="icons10-refresh" />}
                  label="Refresh"
                />
              </CommandBar>
            </div>
          </div>
          <p className="visual-fixture-status">
            Command action: <output data-testid="command-bar-result">{commandBarResult}</output>
          </p>
        </Section>

        <Section
          caption="header controls · grouped cards · controlled · disabled · responsive"
          eyebrow="settings"
          testId="settings-expander-panel"
          title="SettingsExpander"
        >
          <div className="visual-fixture-settings-expanders">
            <SettingsExpander
              action={
                <button
                  className="ui-btn"
                  data-testid="settings-expander-action"
                  onClick={() => setSettingsExpanderResult("action: reset")}
                  type="button"
                >
                  Reset
                </button>
              }
              content={
                <Switch
                  aria-label="Advanced network features"
                  defaultChecked
                  label={false}
                  onChange={() => setSettingsExpanderResult("content: network")}
                />
              }
              data-testid="settings-expander-uncontrolled"
              defaultExpanded
              description="Manage discovery and sharing for this network"
              header="Advanced network settings"
              icon={<SettingsGlyph />}
              itemsFooter="Changes apply to the current network profile."
              itemsHeader="Related options"
              onExpandedChange={(nextExpanded) =>
                setSettingsExpanderResult(`uncontrolled: ${nextExpanded}`)
              }
            >
              <SettingsCard description="Let this PC find other devices" title="Discovery">
                <Switch aria-label="Network discovery" label={false} />
              </SettingsCard>
              <SettingsCard description="Share files with nearby devices" title="File sharing">
                <Switch aria-label="File sharing" label={false} />
              </SettingsCard>
            </SettingsExpander>

            <SettingsExpander
              data-testid="settings-expander-controlled"
              expanded={settingsExpanderControlled}
              header="Optional features"
              onExpandedChange={(nextExpanded) => {
                setSettingsExpanderControlled(nextExpanded);
                setSettingsExpanderResult(`controlled: ${nextExpanded}`);
              }}
            >
              <SettingsCard title="Developer mode">
                <button
                  className="ui-btn"
                  data-testid="settings-expander-nested-action"
                  onClick={() => setSettingsExpanderResult("nested: developer")}
                  type="button"
                >
                  Configure
                </button>
              </SettingsCard>
            </SettingsExpander>

            <SettingsExpander
              action={
                <button
                  className="ui-btn"
                  data-testid="settings-expander-disabled-action"
                  onClick={() => setSettingsExpanderResult("unexpected")}
                  type="button"
                >
                  Manage
                </button>
              }
              data-testid="settings-expander-disabled"
              defaultExpanded
              disabled
              description="Managed by your organization"
              header="Optional diagnostics"
            >
              <button
                className="ui-btn"
                data-testid="settings-expander-disabled-item"
                onClick={() => setSettingsExpanderResult("unexpected")}
                type="button"
              >
                Unavailable action
              </button>
            </SettingsExpander>
          </div>
          <p className="visual-fixture-status">
            SettingsExpander action:{" "}
            <output data-testid="settings-expander-result">{settingsExpanderResult}</output>
          </p>
        </Section>

        <Section
          caption="auto breakpoints · compact rail · overlay · nested selection · footer · settings"
          eyebrow="navigation"
          testId="navigation-view-panel"
          title="NavigationView"
        >
          <div className="visual-fixture-navigation-views">
            <div
              className="visual-fixture-navigation-view-host"
              data-testid="navigation-view-auto-host"
            >
              <NavigationView
                data-testid="navigation-view-auto"
                defaultExpandedItems={[]}
                footerItems={[
                  {
                    icon: <i aria-hidden="true" className="icons10-question-mark" />,
                    label: "Help",
                    value: "help"
                  }
                ]}
                header="Workspace"
                onValueChange={(value) => setNavigationViewSelection(String(value))}
                paneAriaLabel="Workspace navigation"
                paneHeader="Contoso"
                settingsItem={{
                  icon: <i aria-hidden="true" className="icons10-settings" />,
                  label: "Settings",
                  value: "settings"
                }}
                value={navigationViewSelection}
                content={
                  <div className="visual-fixture-navigation-content">
                    <strong>Workspace overview</strong>
                    <span>Selected: {navigationViewSelection}</span>
                  </div>
                }
              >
                <NavigationView.Item
                  icon={<i aria-hidden="true" className="icons10-home" />}
                  label="Home"
                  value="home"
                />
                <NavigationView.Item
                  icon={<i aria-hidden="true" className="icons10-database" />}
                  label="Library"
                  value="library"
                >
                  <NavigationView.Item label="Reports" value="reports" />
                  <NavigationView.Item label="Downloads" value="downloads" />
                </NavigationView.Item>
                <NavigationView.Item
                  disabled
                  icon={<i aria-hidden="true" className="icons10-security-issue" />}
                  label="Managed"
                  value="managed"
                />
              </NavigationView>
            </div>

            <div
              className="visual-fixture-navigation-view-host compact"
              data-testid="navigation-view-compact-host"
            >
              <NavigationView
                data-testid="navigation-view-compact"
                onPaneOpenChange={setCompactNavigationOpen}
                paneAriaLabel="Compact navigation"
                paneDisplayMode="compact"
                paneHeader="Compact"
                paneOpen={compactNavigationOpen}
                content={<span>Compact pane content</span>}
              >
                <NavigationView.Item
                  icon={<i aria-hidden="true" className="icons10-home" />}
                  label="Home"
                  value="compact-home"
                />
                <NavigationView.Item
                  icon={<i aria-hidden="true" className="icons10-database" />}
                  label="Files"
                  value="compact-files"
                />
              </NavigationView>
            </div>
          </div>
          <p className="visual-fixture-status">
            Navigation selection:{" "}
            <output data-testid="navigation-view-result">{navigationViewSelection}</output>
          </p>
        </Section>

        <Section
          caption="calendar overlay · keyboard · range · light/dark"
          eyebrow="date input"
          testId="date-picker-panel"
          title="DatePicker"
        >
          <div className="visual-fixture-date-pickers">
            <div>
              <DatePicker
                data-testid="date-picker-default"
                defaultValue={datePickerDefaultDate}
                formatDate={formatDatePickerFixtureDate}
                initialPickerDate={datePickerDefaultDate}
                label="Release date"
                locale="en-US"
                onValueChange={(value) =>
                  setDatePickerResult(value ? formatDatePickerFixtureDate(value) : "empty")
                }
                today={datePickerToday}
              />
            </div>
            <div>
              <DatePicker
                data-testid="date-picker-bounded"
                firstDayOfWeek={1}
                initialPickerDate={datePickerDefaultDate}
                label="Maintenance window"
                locale="en-US"
                maxDate={datePickerMaxDate}
                minDate={datePickerMinDate}
                showTodayButton
                today={datePickerToday}
              />
            </div>
            <div>
              <DatePicker
                data-testid="date-picker-disabled"
                defaultValue={datePickerDefaultDate}
                disabled
                label="Disabled"
                locale="en-US"
              />
            </div>
          </div>
          <p className="visual-fixture-status">
            Selected date: <output data-testid="date-picker-result">{datePickerResult}</output>
          </p>
        </Section>

        <Section
          caption="standalone grid · keyboard · range · light/dark"
          eyebrow="date surface"
          testId="calendar-panel"
          title="Calendar"
        >
          <div className="visual-fixture-calendars">
            <div>
              <Calendar
                data-testid="calendar-default"
                defaultPickerDate={datePickerDefaultDate}
                defaultValue={datePickerDefaultDate}
                label="Release calendar"
                locale="en-US"
                onValueChange={(value) =>
                  setCalendarResult(value ? formatDatePickerFixtureDate(value) : "empty")
                }
                today={datePickerToday}
              />
            </div>
            <div>
              <Calendar
                data-testid="calendar-bounded"
                defaultPickerDate={datePickerDefaultDate}
                firstDayOfWeek={1}
                label="Maintenance window"
                locale="en-US"
                maxDate={datePickerMaxDate}
                minDate={datePickerMinDate}
                restrictedDates={[new Date(2024, 4, 12)]}
                showTodayButton
                today={datePickerToday}
              />
            </div>
            <div>
              <Calendar
                data-testid="calendar-disabled"
                defaultPickerDate={datePickerDefaultDate}
                defaultValue={datePickerDefaultDate}
                disabled
                label="Disabled calendar"
                locale="en-US"
                today={datePickerToday}
              />
            </div>
          </div>
          <p className="visual-fixture-status">
            Selected calendar date: <output data-testid="calendar-result">{calendarResult}</output>
          </p>
        </Section>

        <Section
          caption="sortable · multi-select · disabled rows · keyboard grid · light/dark"
          eyebrow="data surface"
          testId="data-grid-panel"
          title="DataGrid"
        >
          <div className="visual-fixture-data-grids">
            <DataGrid
              columns={dataGridColumns}
              data-testid="data-grid-default"
              getRowDisabled={(item) => item.id === "beta"}
              getRowId={(item) => item.id}
              gridAriaLabel="Project data"
              items={dataGridRows}
              onSelectionChange={setDataGridSelectedRowIds}
              onSortChange={setDataGridSortState}
              selectedRowIds={dataGridSelectedRowIds}
              selectionMode="multiple"
              sortState={dataGridSortState}
            />
            <DataGrid
              columns={dataGridColumns.slice(0, 2)}
              data-testid="data-grid-disabled"
              disabled
              getRowId={(item) => item.id}
              gridAriaLabel="Disabled project data"
              items={dataGridRows.slice(0, 2)}
              label="Disabled grid"
              selectionMode="single"
            />
            <DataGrid
              columns={dataGridColumns.slice(0, 2)}
              data-testid="data-grid-empty"
              gridAriaLabel="Empty project data"
              items={[]}
              noRowsMessage="No projects match this view"
            />
          </div>
          <p className="visual-fixture-status">
            Selected rows:{" "}
            <output data-testid="data-grid-result">
              {dataGridSelectedRowIds.join(", ") || "none"}
            </output>
          </p>
        </Section>

        <Section
          caption="targeted · explicit/light dismiss · focus trap · action · light/dark"
          eyebrow="guidance"
          testId="teaching-tip-panel"
          title="TeachingTip"
        >
          <div className="visual-fixture-teaching-tips">
            <TeachingTip
              action={{
                label: "Got it",
                onClick: () => setTeachingTipResult("action selected")
              }}
              content="We will keep your changes synchronized on this device."
              heroContent={
                <div className="visual-fixture-teaching-tip-hero">
                  <span aria-hidden="true">SYNC</span>
                </div>
              }
              icon={<i aria-hidden="true" className="icons10-idea" />}
              id="visual-teaching-tip"
              onOpenChange={(open) => {
                setTeachingTipOpen(open);
                setTeachingTipResult(open ? "opened" : "closed");
              }}
              open={teachingTipOpen}
              subtitle="No extra setup is required."
              title="Sync is ready"
            >
              <Button data-testid="teaching-tip-trigger" value="Show teaching tip" />
            </TeachingTip>
            <TeachingTip
              content="This tip closes when you interact with another control."
              id="visual-teaching-tip-light"
              isLightDismiss
              onOpenChange={(open) => {
                setTeachingTipLightDismissOpen(open);
                setTeachingTipResult(open ? "light opened" : "light dismissed");
              }}
              open={teachingTipLightDismissOpen}
              title="A quick reminder"
            >
              <Button data-testid="teaching-tip-light-trigger" value="Show light tip" />
            </TeachingTip>
            <Button
              data-testid="teaching-tip-outside"
              onClick={() => setTeachingTipResult("outside selected")}
              value="Outside target"
            />
          </div>
          <p className="visual-fixture-status">
            TeachingTip lifecycle:{" "}
            <output data-testid="teaching-tip-result">{teachingTipResult}</output>
          </p>
        </Section>

        <Section
          caption="hierarchy · overflow · ARIA · light/dark"
          eyebrow="navigation"
          testId="breadcrumb-panel"
          title="Breadcrumb"
        >
          <div className="visual-fixture-breadcrumb-stack">
            <div className="visual-fixture-breadcrumb-example">
              <span className="visual-fixture-label">Project path</span>
              <Breadcrumb
                aria-label="Project path"
                data-testid="breadcrumb-default"
                items={[
                  { href: "/", label: "Home" },
                  { href: "/projects", label: "Projects" },
                  { href: "/projects/winui", label: "WinUI" },
                  { label: "Breadcrumb" }
                ]}
                onItemClick={(item, index, event) => {
                  event.preventDefault();
                  setBreadcrumbResult(`${index}: ${item.label}`);
                }}
              />
            </div>
            <div className="visual-fixture-breadcrumb-example">
              <span className="visual-fixture-label">Workspace path with overflow</span>
              <Breadcrumb
                aria-label="Workspace path"
                data-testid="breadcrumb-overflow"
                items={[
                  { href: "/", label: "Home" },
                  { href: "/workspace", label: "Workspace" },
                  { href: "/workspace/design", label: "Design" },
                  { href: "/workspace/design/components", label: "Components" },
                  { href: "/workspace/design/components/navigation", label: "Navigation" },
                  { label: "Breadcrumb" }
                ]}
                maxVisibleItems={4}
                onItemClick={(item, index, event) => {
                  event.preventDefault();
                  setBreadcrumbResult(`${index}: ${item.label}`);
                }}
              />
            </div>
          </div>
          <p className="visual-fixture-status">
            Breadcrumb selection:{" "}
            <output data-testid="breadcrumb-result">{breadcrumbResult}</output>
          </p>
        </Section>

        <Section
          caption="static · dismissible · keyboard · light/dark"
          eyebrow="value surface"
          testId="tag-panel"
          title="Tag"
        >
          <div className="visual-fixture-tag-grid">
            <div className="visual-fixture-tag-group">
              <span className="visual-fixture-label">Static appearances</span>
              <div className="visual-fixture-tag-row">
                <Tag data-testid="tag-filled">Filled</Tag>
                <Tag appearance="outline" data-testid="tag-outline">
                  Outline
                </Tag>
                <Tag appearance="brand" data-testid="tag-brand">
                  Brand
                </Tag>
                <Tag
                  appearance="outline"
                  data-testid="tag-icon"
                  icon={
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
                      <path
                        d="M2.5 3.5h6l5 5-4 4-5-5v-4Z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                      />
                      <circle cx="5.25" cy="6.75" fill="currentColor" r=".8" />
                    </svg>
                  }
                >
                  With icon
                </Tag>
                <Tag data-testid="tag-circular" shape="circular" size="extra-small">
                  Compact
                </Tag>
                <Tag data-testid="tag-disabled" disabled>
                  Disabled
                </Tag>
              </div>
            </div>
            <div className="visual-fixture-tag-group">
              <span className="visual-fixture-label">Dismissible values</span>
              <div className="visual-fixture-tag-row">
                <Tag
                  appearance="outline"
                  data-testid="tag-dismissible"
                  dismissible
                  onDismiss={() => setTagResult("Design dismissed")}
                >
                  Design
                </Tag>
                <Tag
                  appearance="brand"
                  data-testid="tag-dismissible-brand"
                  dismissible
                  onDismiss={() => setTagResult("Windows dismissed")}
                >
                  Windows
                </Tag>
                <Tag data-testid="tag-dismissible-disabled" disabled dismissible>
                  Unavailable
                </Tag>
              </div>
            </div>
          </div>
          <p className="visual-fixture-status">
            Tag dismissal: <output data-testid="tag-result">{tagResult}</output>
          </p>
        </Section>

        <Section
          caption="dot · icon · text · appearance · light/dark"
          eyebrow="status surface"
          testId="badge-panel"
          title="Badge"
        >
          <div className="visual-fixture-badge-grid">
            <div className="visual-fixture-badge-group">
              <span className="visual-fixture-label">Status and content</span>
              <div className="visual-fixture-badge-row">
                <Badge data-testid="badge-brand">Ready</Badge>
                <Badge color="success" data-testid="badge-success">
                  Synced
                </Badge>
                <Badge color="warning" data-testid="badge-warning">
                  Review
                </Badge>
                <Badge aria-label="Three unread messages" color="danger" data-testid="badge-count">
                  3
                </Badge>
                <Badge aria-label="New notifications" color="danger" data-testid="badge-dot" />
                <Badge
                  aria-label="Sync status"
                  data-testid="badge-icon"
                  icon={
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
                      <path
                        d="M3 8a5 5 0 0 1 8.4-3.7L13 6m0-3v3h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 8a5 5 0 0 1-8.4 3.7L3 10m0 3v-3h3"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
            <div className="visual-fixture-badge-group">
              <span className="visual-fixture-label">Appearance and shape</span>
              <div className="visual-fixture-badge-row">
                <Badge appearance="filled">Filled</Badge>
                <Badge appearance="outline" color="informative">
                  Outline
                </Badge>
                <Badge appearance="ghost" color="success">
                  Ghost
                </Badge>
                <Badge appearance="tint" color="warning">
                  Tint
                </Badge>
                <Badge shape="rounded" color="subtle">
                  Rounded
                </Badge>
                <Badge size="small" color="danger">
                  Small
                </Badge>
                <Badge size="large" color="brand">
                  Large
                </Badge>
              </div>
            </div>
          </div>
        </Section>
        <Section testId="color-picker-panel" title="ColorPicker" eyebrow="color selection">
          <ColorPicker
            aria-label="Accent color"
            defaultValue="#0078d7"
            presets={[
              { value: "#0078d7", label: "Blue" },
              { value: "#107c10", label: "Green" }
            ]}
          />
        </Section>
        <Section testId="rating-panel" title="Rating" eyebrow="feedback">
          <div>
            <span className="visual-fixture-label">Your rating</span>{" "}
            <Rating aria-label="Your rating" defaultValue={2} />
          </div>
          <div>
            <span className="visual-fixture-label">Average</span>{" "}
            <Rating aria-label="Average rating" readOnly value={3.5} />
          </div>
          <div>
            <span className="visual-fixture-label">Disabled</span>{" "}
            <Rating aria-label="Unavailable rating" disabled defaultValue={4} />
          </div>
        </Section>
        <Section testId="pagination-panel" title="Pagination" eyebrow="navigation">
          <Pagination aria-label="Gallery pages" pageCount={100} defaultPage={50} />
        </Section>
      </main>
    </MemoryRouter>
  );
}

createRoot(document.getElementById("root")).render(<VisualFixture />);
