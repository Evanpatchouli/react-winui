import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Accordion from "../../src/lib/src/components/Accordion/index.tsx";
import Alert from "../../src/lib/src/components/Alert/index.tsx";
import AppContainer from "../../src/lib/src/components/AppContainer/index.tsx";
import AppTheme from "../../src/lib/src/components/AppTheme/index.tsx";
import Button from "../../src/lib/src/components/Button/index.tsx";
import ButtonGroup from "../../src/lib/src/components/ButtonGroup/index.tsx";
import Checkbox from "../../src/lib/src/components/Checkbox/index.tsx";
import ColorPickerItem from "../../src/lib/src/components/ColorPicker/ColorPickerItem/index.tsx";
import ColorPickerPalette from "../../src/lib/src/components/ColorPicker/ColorPickerPalette/index.tsx";
import Dialog from "../../src/lib/src/components/Dialog/index.tsx";
import ImageView from "../../src/lib/src/components/ImageView/index.tsx";
import InputSearchBar from "../../src/lib/src/components/InputSearch/InputSearchBar/index.tsx";
import InputSearchBox from "../../src/lib/src/components/InputSearch/InputSearchBox/index.tsx";
import InputText from "../../src/lib/src/components/InputText/index.tsx";
import Link from "../../src/lib/src/components/Link/index.tsx";
import LoaderBar from "../../src/lib/src/components/Loaders/LoaderBar/index.tsx";
import LoaderBusy from "../../src/lib/src/components/Loaders/LoaderBusy/index.tsx";
import MenuBar from "../../src/lib/src/components/MenuBar/index.tsx";
import NavBar from "../../src/lib/src/components/NavBar/NavBar/index.tsx";
import NavBarLink from "../../src/lib/src/components/NavBar/NavBarLink/index.tsx";
import NavBarSubMenu from "../../src/lib/src/components/NavBar/NavBarSubMenu/index.tsx";
import NavBarThemeSwitch from "../../src/lib/src/components/NavBar/NavBarThemeSwitch/index.tsx";
import NavPageContainer from "../../src/lib/src/components/NavBar/NavPageContainer/index.tsx";
import ProgressBar from "../../src/lib/src/components/ProgressBar/index.tsx";
import RadioButton from "../../src/lib/src/components/RadioButton/index.tsx";
import Select from "../../src/lib/src/components/SelectMenus/Select/index.tsx";
import SelectNative from "../../src/lib/src/components/SelectMenus/SelectNative/index.tsx";
import SliderBar from "../../src/lib/src/components/SliderBar/index.tsx";
import SplashScreen from "../../src/lib/src/components/SplashScreen/index.tsx";
import Switch from "../../src/lib/src/components/Switch/index.tsx";
import TableView from "../../src/lib/src/components/TableView/index.tsx";
import TextArea from "../../src/lib/src/components/TextArea/index.tsx";
import "../../src/lib/config/app-config.css";
import "../../src/lib/scss/main.scss";
import "./fixture.css";

const selectData = [
  { label: "Windows", value: "windows" },
  { label: "Linux", value: "linux" },
  { label: "macOS", value: "macos" }
];

const searchSuggestions = [{ text: "Windows 11" }, { text: "Windows UI" }, { text: "Linux" }];

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

function VisualFixture() {
  const [scheme, setScheme] = useState("light");
  const [activation, setActivation] = useState("none");
  const [selection, setSelection] = useState("windows");
  const [searchBarValue, setSearchBarValue] = useState("Windows");
  const [searchResult, setSearchResult] = useState("none");
  const [imageState, setImageState] = useState("loading");
  const [showSplash, setShowSplash] = useState(false);
  const alertRef = useRef(null);
  const dialogRef = useRef(null);
  const menuAnchorRef = useRef(null);
  const menuRef = useRef(null);

  return (
    <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <AppTheme scheme={scheme} />
      <main className="visual-fixture">
        <header className="visual-fixture-header">
          <div>
            <p className="visual-fixture-eyebrow">react-windows-ui</p>
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
            <InputText label="Loading" setStatus="loading" width="150px" />
            <Checkbox defaultChecked label="Remember me" />
            <Checkbox disabled label="Disabled" />
            <RadioButton defaultChecked label="Windows" name="gallery-platform" />
            <RadioButton label="Linux" name="gallery-platform" />
            <Switch defaultChecked labelOff="Off" labelOn="On" />
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
              <MenuBar.Item label="Settings" />
            </MenuBar.Item.SubMenu>
          </MenuBar>
          <p className="visual-fixture-status">
            Menu action: <output data-testid="menu-result">{activation}</output>
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
      </main>
    </MemoryRouter>
  );
}

createRoot(document.getElementById("root")).render(<VisualFixture />);
