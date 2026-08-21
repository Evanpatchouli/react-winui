import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import Button from "../src/lib/src/components/Button/index";
import ButtonGroup from "../src/lib/src/components/ButtonGroup/index";
import Checkbox from "../src/lib/src/components/Checkbox/index";
import AppContainer from "../src/lib/src/components/AppContainer/index";
import AppTheme from "../src/lib/src/components/AppTheme/index";
import Alert from "../src/lib/src/components/Alert/index";
import Dialog from "../src/lib/src/components/Dialog/index";
import Accordion from "../src/lib/src/components/Accordion/index";
import ColorPickerItem from "../src/lib/src/components/ColorPicker/ColorPickerItem/index";
import ColorPickerPalette from "../src/lib/src/components/ColorPicker/ColorPickerPalette/index";
import InputText from "../src/lib/src/components/InputText/index";
import InputSearchBar from "../src/lib/src/components/InputSearch/InputSearchBar/index";
import InputSearchBox from "../src/lib/src/components/InputSearch/InputSearchBox/index";
import ImageView from "../src/lib/src/components/ImageView/index";
import Link from "../src/lib/src/components/Link/index";
import LoaderBar from "../src/lib/src/components/Loaders/LoaderBar/index";
import LoaderBusy from "../src/lib/src/components/Loaders/LoaderBusy/index";
import MenuBar from "../src/lib/src/components/MenuBar/index";
import NavBar from "../src/lib/src/components/NavBar/NavBar/index";
import NavBarLink from "../src/lib/src/components/NavBar/NavBarLink/index";
import NavBarSubMenu from "../src/lib/src/components/NavBar/NavBarSubMenu/index";
import NavBarThemeSwitch from "../src/lib/src/components/NavBar/NavBarThemeSwitch/index";
import NavPageContainer from "../src/lib/src/components/NavBar/NavPageContainer/index";
import ProgressBar from "../src/lib/src/components/ProgressBar/index";
import RadioButton from "../src/lib/src/components/RadioButton/index";
import SliderBar from "../src/lib/src/components/SliderBar/index";
import SplashScreen from "../src/lib/src/components/SplashScreen/index";
import Switch from "../src/lib/src/components/Switch/index";
import Select from "../src/lib/src/components/SelectMenus/Select/index";
import SelectNative from "../src/lib/src/components/SelectMenus/SelectNative/index";
import TableView from "../src/lib/src/components/TableView/index";
import TextArea from "../src/lib/src/components/TextArea/index";

describe("InputText", () => {
  it("renders its label and forwards change events", () => {
    const onChange = vi.fn();

    render(<InputText label="Name" onChange={onChange} />);

    const input = screen.getByPlaceholderText("Input Text");
    fireEvent.change(input, { target: { value: "Ada" } });

    expect(input).toHaveValue("Ada");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("keeps the input disabled", () => {
    render(<InputText aria-label="Name" disabled />);

    expect(screen.getByRole("textbox", { name: "Name" })).toBeDisabled();
  });
});

describe("Checkbox", () => {
  it("renders its label and handles changes", () => {
    const onChange = vi.fn();

    render(<Checkbox label="Remember me" onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox", { name: "Remember me" });
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders the disabled state", () => {
    render(<Checkbox label="Remember me" disabled />);

    expect(screen.getByRole("checkbox", { name: "Remember me" })).toBeDisabled();
  });
});

describe("RadioButton", () => {
  it("handles selection changes", () => {
    const onChange = vi.fn();

    render(<RadioButton label="Windows" name="platform" onChange={onChange} />);

    const radio = screen.getByRole("radio", { name: "Windows" });
    fireEvent.click(radio);

    expect(radio).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders the disabled state", () => {
    render(<RadioButton label="Windows" name="platform" disabled />);

    expect(screen.getByRole("radio", { name: "Windows" })).toBeDisabled();
  });
});

describe("Switch", () => {
  it("renders the default label and handles changes", () => {
    const onChange = vi.fn();

    const { container } = render(<Switch onChange={onChange} />);

    const switchInput = screen.getByRole("checkbox");
    fireEvent.click(switchInput);

    expect(container.querySelector(".ui-switch-label")).toHaveAttribute("data-on", "On");
    expect(switchInput).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders the disabled state", () => {
    render(<Switch disabled />);

    expect(screen.getByRole("checkbox")).toBeDisabled();
  });
});

describe("Button", () => {
  it("supports children while preserving the legacy value prop", () => {
    render(
      <>
        <Button value="Save" />
        <Button>Continue</Button>
      </>
    );

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
  });

  it("renders loading and disabled states", () => {
    render(<Button value="Save" isLoading disabled />);

    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    expect(document.querySelector(".ui-btn.btn-is-loading")).toBeInTheDocument();
  });
});

describe("AppContainer", () => {
  it("renders children, style, and the stored light theme", () => {
    window.localStorage.setItem("lc_storage_theme_key", "light");

    render(
      <AppContainer style={{ gap: "8px" }}>
        <span>Application content</span>
      </AppContainer>
    );

    const container = screen.getByText("Application content").parentElement;

    expect(container).toHaveClass("ui-container-flex-row");
    expect(container).toHaveStyle({ gap: "8px" });
    expect(document.documentElement).toHaveAttribute("data-theme", "light");

    window.localStorage.removeItem("lc_storage_theme_key");
  });
});

describe("AppTheme", () => {
  it("applies scheme and color changes while preserving optional callbacks", () => {
    const onColorChange = vi.fn();
    const onSchemeChange = vi.fn();

    window.localStorage.clear();

    const { rerender } = render(<AppTheme scheme="light" />);

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(document.body).not.toHaveClass("dark-theme");

    rerender(
      <AppTheme
        color="#123456"
        colorDarkMode="#abcdef"
        onColorChange={onColorChange}
        onSchemeChange={onSchemeChange}
        scheme="dark"
      />
    );

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.body).toHaveClass("dark-theme");
    expect(document.documentElement.style.getPropertyValue("--PrimaryColor")).toBe("#123456");
    expect(document.documentElement.style.getPropertyValue("--PrimaryColorLight")).toBe("#abcdef");
    expect(onColorChange).toHaveBeenCalledTimes(1);
    expect(onSchemeChange).toHaveBeenCalledTimes(1);

    window.localStorage.clear();
  });
});

describe("Alert", () => {
  it("renders content, compound slots, and imperative visibility controls", () => {
    const ref = createRef<{ open: () => void; close: () => void }>();
    const onBackdropPress = vi.fn();

    const { container } = render(
      <Alert
        backdropBlur
        message="Please confirm"
        onBackdropPress={onBackdropPress}
        ref={ref}
        title="Notice"
      >
        <Alert.Header>Header content</Alert.Header>
        <Alert.Footer>Footer content</Alert.Footer>
      </Alert>
    );
    const alert = container.firstElementChild as HTMLElement;
    const modal = alert.querySelector('[role="dialog"]') as HTMLElement;

    expect(alert).toHaveClass("ui-alert");
    expect(modal).toHaveClass("ui-alert-modal", "ui-backdrop-blur");
    expect(screen.getByRole("heading", { name: "Notice" })).toBeInTheDocument();
    expect(screen.getByText("Please confirm")).toBeInTheDocument();
    expect(alert.querySelector(".ui-alert-haeder")).toHaveTextContent("Header content");
    expect(alert.querySelector(".ui-alert-footer")).toHaveTextContent("Footer content");

    act(() => {
      ref.current?.open();
    });

    expect(alert).toHaveClass("ui-alert", "show");
    expect(document.body).toHaveClass("modal-open");

    fireEvent.click(alert);
    expect(onBackdropPress).toHaveBeenCalledTimes(1);

    fireEvent.click(modal);
    expect(onBackdropPress).toHaveBeenCalledTimes(1);

    act(() => {
      ref.current?.close();
    });

    expect(alert).not.toHaveClass("show");
    expect(document.body).not.toHaveClass("modal-open");
  });

  it("shows from the controlled visibility prop", () => {
    const { container, rerender } = render(<Alert isVisible />);

    expect(container.firstElementChild).toHaveClass("ui-alert", "show");
    expect(document.body).toHaveClass("modal-open");

    rerender(<Alert />);

    expect(document.body).not.toHaveClass("modal-open");
  });
});

describe("Dialog", () => {
  it("renders slots, styles, and imperative visibility controls", () => {
    const ref = createRef<{ open: () => void; close: () => void }>();
    const onBackdropPress = vi.fn();

    const { container } = render(
      <Dialog backdropBlur onBackdropPress={onBackdropPress} ref={ref} style={{ width: "320px" }}>
        <Dialog.Body style={{ padding: "12px" }}>Body content</Dialog.Body>
        <Dialog.Footer>Footer content</Dialog.Footer>
      </Dialog>
    );
    const dialog = container.firstElementChild as HTMLElement;
    const modal = dialog.querySelector(".ui-dialog-modal") as HTMLElement;

    expect(dialog).toHaveClass("ui-dialog");
    expect(modal).toHaveClass("ui-dialog-modal", "ui-backdrop-blur");
    expect(modal).toHaveStyle({ width: "320px" });
    expect(dialog.querySelector(".ui-dialog-body")).toHaveStyle({ padding: "12px" });
    expect(screen.getByText("Body content")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();

    act(() => {
      ref.current?.open();
    });

    expect(dialog).toHaveClass("ui-dialog", "show");
    expect(document.body).toHaveClass("modal-open");

    fireEvent.click(dialog);
    expect(onBackdropPress).toHaveBeenCalledTimes(1);

    fireEvent.click(modal);
    expect(onBackdropPress).toHaveBeenCalledTimes(1);

    act(() => {
      ref.current?.close();
    });

    expect(dialog).not.toHaveClass("show");
    expect(document.body).not.toHaveClass("modal-open");
  });

  it("shows from the controlled visibility prop and can be hidden again", () => {
    const { container, rerender } = render(<Dialog isVisible />);

    expect(container.firstElementChild).toHaveClass("ui-dialog", "show");
    expect(document.body).toHaveClass("modal-open");

    rerender(<Dialog />);

    expect(document.body).not.toHaveClass("modal-open");
  });
});

describe("Accordion", () => {
  it("renders compound slots and toggles expanded state with callbacks", () => {
    const onExpand = vi.fn();
    const onCollapse = vi.fn();

    const { container } = render(
      <Accordion
        headerStyle={{ color: "red" }}
        onCollapse={onCollapse}
        onExpand={onExpand}
        style={{ gap: "8px" }}
      >
        <Accordion.Trigger>
          <span>Options</span>
        </Accordion.Trigger>
        <Accordion.Body>
          <div>Details</div>
        </Accordion.Body>
      </Accordion>
    );
    const root = container.firstElementChild as HTMLElement;
    const header = root.querySelector(".ui-accordion-header") as HTMLElement;
    const body = root.querySelector(".ui-accordion-body") as HTMLElement;

    expect(root).toHaveClass("ui-accordion");
    expect(root).toHaveStyle({ gap: "8px" });
    expect(header).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(header).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Options")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(body).not.toHaveClass("show");

    fireEvent.click(header);

    expect(header).toHaveAttribute("aria-expanded", "true");
    expect(body).toHaveClass("ui-accordion-body", "show");
    expect(onExpand).toHaveBeenCalledTimes(1);

    fireEvent.click(header);

    expect(header).toHaveAttribute("aria-expanded", "false");
    expect(body).not.toHaveClass("show");
    expect(onCollapse).toHaveBeenCalledTimes(1);
  });

  it("uses headerTitle when no trigger slot is provided", () => {
    render(
      <Accordion headerTitle="General">
        <Accordion.Body>Content</Accordion.Body>
      </Accordion>
    );

    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});

describe("ButtonGroup", () => {
  it("forwards div events and refs while preserving its class", () => {
    const onClick = vi.fn();
    const ref = createRef<HTMLDivElement>();

    render(
      <ButtonGroup ref={ref} onClick={onClick}>
        <span>Actions</span>
      </ButtonGroup>
    );

    const group = screen.getByText("Actions").parentElement as HTMLDivElement;

    expect(group).toHaveClass("ui-btn-group");
    expect(ref.current).toBe(group);

    fireEvent.click(group);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("ColorPickerItem", () => {
  it("renders its color, checked state, and change event", () => {
    const onChange = vi.fn();

    render(<ColorPickerItem color="#ff0000" name="accent" onChange={onChange} />);

    const item = screen.getByRole("radio");

    expect(item).not.toBeChecked();
    expect(item).toHaveAttribute("value", "#ff0000");
    expect(item.parentElement?.querySelector("div")).toHaveStyle({
      backgroundColor: "#ff0000"
    });

    fireEvent.click(item);

    expect(item).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

describe("ColorPickerPalette", () => {
  it("updates its color value and forwards changes", () => {
    const onChange = vi.fn();

    const { container } = render(
      <ColorPickerPalette color="#123456" disabled={false} onChange={onChange} />
    );
    const palette = container.querySelector('input[type="color"]') as HTMLInputElement;

    expect(palette).toHaveValue("#123456");
    expect(palette).not.toBeDisabled();

    fireEvent.change(palette, { target: { value: "#abcdef" } });

    expect(palette).toHaveValue("#abcdef");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(palette.parentElement?.querySelector("div")).toHaveStyle({
      backgroundColor: "#abcdef"
    });
  });
});

describe("ImageView", () => {
  it("renders its image and hides the loader after load", () => {
    const onLoad = vi.fn();

    const { container } = render(
      <ImageView
        alt="Windows logo"
        data-testid="image-view"
        onLoad={onLoad}
        src="/windows.png"
        tooltip="Windows logo"
      />
    );
    const image = screen.getByRole("img", { name: "Windows logo" });

    expect(image).toHaveAttribute("src", "/windows.png");
    expect(container.firstElementChild).toHaveAttribute("title", "Windows logo");
    expect(container.querySelectorAll(".ui-img-view-loader")).toHaveLength(1);

    fireEvent.load(image);

    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(container.querySelectorAll(".ui-img-view-loader")).toHaveLength(0);
  });

  it("keeps the loader visible while explicitly loading and handles errors", () => {
    const onError = vi.fn();

    const { container } = render(<ImageView isLoading onError={onError} />);
    const image = screen.getByRole("img", { name: "image" });

    expect(container.querySelectorAll(".ui-img-view-loader")).toHaveLength(2);

    fireEvent.error(image);

    expect(onError).toHaveBeenCalledTimes(1);
    expect(container.querySelectorAll(".ui-img-view-loader")).toHaveLength(1);
  });
});

describe("SelectNative", () => {
  it("renders options and forwards selection changes", () => {
    const onChange = vi.fn();

    render(
      <SelectNative
        data={[
          { label: "One", value: "one" },
          { label: "Two", value: "two" }
        ]}
        onChange={onChange}
      />
    );

    const select = screen.getByRole("combobox");

    expect(screen.getByRole("option", { name: "One" })).toHaveValue("one");
    expect(screen.getByRole("option", { name: "Two" })).toHaveValue("two");

    fireEvent.change(select, { target: { value: "two" } });

    expect(select).toHaveValue("two");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders the disabled state", () => {
    render(<SelectNative data={[]} disabled />);

    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});

describe("Select", () => {
  it("renders the default selection, toggles the menu, and handles selection", () => {
    const onChange = vi.fn();
    const data = [
      { icon: <span>W</span>, label: "Windows", value: "windows" },
      { label: "Linux", value: "linux" }
    ];

    const { container } = render(
      <Select
        backdropBlur
        data={data}
        defaultValue="linux"
        onChange={onChange}
        tooltip="Choose a platform"
      />
    );
    const title = container.querySelector(".ui-menu-title") as HTMLElement;
    const list = container.querySelector(".ui-menu-list") as HTMLUListElement;

    expect(title).toHaveAttribute("title", "Choose a platform");
    expect(title).toHaveTextContent("Linux");
    expect(list).toHaveClass("ui-backdrop-blur");
    expect(list).not.toHaveClass("show");
    expect(container.querySelector(".ui-menu-list-item.selected")).toHaveTextContent("Linux");

    fireEvent.click(title);

    expect(list).toHaveClass("show");
    expect(document.body).toHaveClass("modal-open");

    const windowsItem = Array.from(container.querySelectorAll(".ui-menu-list-item")).find((item) =>
      item.textContent?.includes("Windows")
    ) as HTMLElement;

    fireEvent.click(windowsItem);

    expect(title).toHaveTextContent("Windows");
    expect(onChange).toHaveBeenCalledWith("windows");
    expect(container.querySelector(".ui-menu-list-item.selected")).toHaveTextContent("Windows");
    expect(list).not.toHaveClass("show");
    expect(document.body).not.toHaveClass("modal-open");
  });

  it("supports a custom trigger and closes on outside clicks", () => {
    const { container } = render(
      <Select
        data={[{ label: "One", value: "one" }]}
        trigger={<button type="button">Pick an option</button>}
      />
    );
    const trigger = screen.getByRole("button", { name: "Pick an option" });
    const list = container.querySelector(".ui-menu-list") as HTMLUListElement;

    expect(container.querySelector(".ui-menu-title")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(list).toHaveClass("show");

    fireEvent.mouseDown(document.body);
    expect(list).not.toHaveClass("show");
    expect(document.body).not.toHaveClass("modal-open");
  });
});

describe("MenuBar", () => {
  it("opens through its ref, preserves menu classes, and handles item clicks", () => {
    const anchorRef = createRef<HTMLButtonElement>();
    const menuRef = createRef<{
      openDialog: () => void;
      closeDialog: () => void;
    }>();
    const onItemClick = vi.fn();

    const { container } = render(
      <>
        <button ref={anchorRef}>Anchor</button>
        <MenuBar anchorRef={anchorRef} backdropBlur menuDirection="leftJustify" ref={menuRef}>
          <MenuBar.Item label="File" onClick={onItemClick} />
          <MenuBar.Item.Divider />
          <MenuBar.Item label="Edit" />
        </MenuBar>
      </>
    );
    const list = container.querySelector(".ui-menu-list-dialog") as HTMLUListElement;

    expect(list).toHaveClass("ui-backdrop-blur", "leftJustify");
    expect(list).not.toHaveClass("show");

    act(() => {
      menuRef.current?.openDialog();
    });

    expect(list).toHaveClass("show");
    expect(list).toHaveStyle({ top: "0px", left: "0px" });
    expect(container.querySelector(".ui-menu-list-item-hr")).toBeInTheDocument();

    fireEvent.click(screen.getByText("File"));

    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(list).not.toHaveClass("show");

    act(() => {
      menuRef.current?.closeDialog();
    });

    expect(list).not.toHaveClass("show");
  });

  it("toggles a submenu and closes the menu from an outside click", () => {
    const anchorRef = createRef<HTMLButtonElement>();
    const menuRef = createRef<{
      openDialog: () => void;
      closeDialog: () => void;
    }>();

    const { container } = render(
      <>
        <button ref={anchorRef}>Anchor</button>
        <MenuBar anchorRef={anchorRef} ref={menuRef}>
          <MenuBar.Item.SubMenu label="More">
            <MenuBar.Item label="Child" />
          </MenuBar.Item.SubMenu>
        </MenuBar>
      </>
    );
    const lists = container.querySelectorAll(".ui-menu-list-dialog");
    const outerList = lists[0] as HTMLUListElement;
    const nestedList = lists[1] as HTMLUListElement;

    act(() => {
      menuRef.current?.openDialog();
    });
    fireEvent.click(screen.getByText("More"));

    expect(nestedList).toHaveClass("show");

    fireEvent.mouseDown(document.body);

    expect(outerList).not.toHaveClass("show");
    expect(nestedList).not.toHaveClass("show");
  });
});

describe("InputSearchBar", () => {
  it("forwards input changes, submit values, and refs", () => {
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    const ref = createRef<HTMLInputElement>();

    render(
      <InputSearchBar
        onChange={onChange}
        onSubmit={onSubmit}
        ref={ref}
        value="Windows"
        width="240px"
      />
    );

    const input = screen.getByRole("searchbox");

    expect(input).toHaveAttribute("placeholder", "Search here..");
    expect(input).toHaveStyle({ width: "240px" });
    expect(ref.current).toBe(input);

    fireEvent.change(input, { target: { value: "Win" } });
    fireEvent.click(screen.getByRole("button"));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith("Windows");
  });

  it("renders the disabled state", () => {
    render(<InputSearchBar aria-label="Search" disabled />);

    expect(screen.getByRole("searchbox", { name: "Search" })).toBeDisabled();
  });
});

describe("InputSearchBox", () => {
  it("filters suggestions, toggles the list, and forwards events/ref", () => {
    const onChange = vi.fn();
    const onSuggestionClick = vi.fn();
    const ref = createRef<HTMLInputElement>();
    const suggestions = [
      { icon: <span>W</span>, onClick: onSuggestionClick, text: "Windows" },
      { text: "Linux" }
    ];

    const { container } = render(
      <InputSearchBox onChange={onChange} ref={ref} suggest={suggestions} width="240px" />
    );
    const input = screen.getByRole("searchbox");
    const list = container.querySelector("ul") as HTMLUListElement;

    expect(input).toHaveAttribute("placeholder", "Search here..");
    expect(input).toHaveStyle({ width: "240px" });
    expect(ref.current).toBe(input);
    expect(screen.getByText("Windows")).toBeInTheDocument();
    expect(screen.getByText("Linux")).toBeInTheDocument();
    expect(list).not.toHaveClass("show");

    fireEvent.change(input, { target: { value: "win" } });

    expect(input).toHaveValue("win");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(list).toHaveClass("show");
    expect(screen.getByText("Windows")).toBeInTheDocument();
    expect(screen.queryByText("Linux")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Windows"));
    expect(onSuggestionClick).toHaveBeenCalledTimes(1);

    fireEvent.change(input, { target: { value: "" } });
    expect(list).not.toHaveClass("show");
  });

  it("renders the disabled state", () => {
    render(<InputSearchBox aria-label="Search" disabled />);

    expect(screen.getByRole("searchbox", { name: "Search" })).toBeDisabled();
  });
});

describe("SplashScreen", () => {
  it("renders content and follows delayed visibility changes", () => {
    vi.useFakeTimers();

    try {
      const { container, rerender } = render(
        <SplashScreen
          backgroundColor="rgb(1, 2, 3)"
          duration={100}
          isVisible={false}
          logo={<span>Logo</span>}
          subtitle="Please wait"
          title="Loading"
        />
      );
      const splash = () => container.firstElementChild as HTMLElement;

      expect(screen.getByRole("heading", { name: "Loading" })).toBeInTheDocument();
      expect(screen.getByText("Logo")).toBeInTheDocument();
      expect(splash()).toHaveStyle({ display: "flex", backgroundColor: "rgb(1, 2, 3)" });

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(splash()).toHaveStyle({ display: "none" });

      rerender(<SplashScreen duration={100} isVisible title="Visible" />);

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(splash()).toHaveStyle({ display: "flex" });
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("Link", () => {
  it("renders a router link and forwards click events", () => {
    const onClick = vi.fn();

    render(
      <MemoryRouter>
        <Link to="/docs" className="ui-link-subtle" onClick={onClick}>
          Docs
        </Link>
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "Docs" });

    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveClass("ui-link-subtle");
    expect(link).not.toHaveClass("ui-link");

    fireEvent.click(link);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("LoaderBar", () => {
  it("renders its animated and light variants", () => {
    const { container, rerender } = render(<LoaderBar />);
    const loader = () => container.firstElementChild as HTMLElement;

    expect(loader()).toHaveClass("ui-loader-bar", "animate");
    expect(container.querySelectorAll(".ui-ldr-bar")).toHaveLength(4);

    rerender(<LoaderBar isLoading={false} setTheme="light" />);

    expect(loader()).toHaveClass("ui-loader-bar", "light");
    expect(loader()).not.toHaveClass("animate");
  });
});

describe("LoaderBusy", () => {
  it("renders size, theme, loading, and native div props", () => {
    const { rerender } = render(
      <LoaderBusy
        aria-label="Loading"
        data-testid="busy-loader"
        isLoading={false}
        setTheme="light"
        size="large"
      />
    );
    const loader = screen.getByTestId("busy-loader");

    expect(loader).toHaveClass("ui-loader-busy", "light", "loader-lg");
    expect(loader).not.toHaveClass("animate");
    expect(loader.querySelector("svg circle")).toBeInTheDocument();

    rerender(<LoaderBusy data-testid="busy-loader" isLoading />);

    expect(screen.getByTestId("busy-loader")).toHaveClass("animate");
  });
});

describe("ProgressBar", () => {
  it("renders determinate progress", () => {
    render(<ProgressBar setProgress={45} />);

    expect(screen.getByRole("progressbar")).toHaveStyle({ width: "45%" });
  });

  it("renders hidden and indeterminate states", () => {
    const { container, rerender } = render(<ProgressBar setProgress="hidden" />);

    expect(container.firstElementChild).toHaveClass("ui-progress-barhide");

    rerender(<ProgressBar setProgress="indeterminate" />);

    expect(screen.getByRole("progressbar")).toHaveClass("indeterminate");
  });
});

describe("TextArea", () => {
  it("renders and forwards change events", () => {
    const onChange = vi.fn();

    render(<TextArea placeholder="Message" resizer={false} onChange={onChange} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Hello" } });

    expect(textarea).toHaveValue("Hello");
    expect(textarea).toHaveClass("ui-textarea", "resizer-none");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders the disabled state", () => {
    render(<TextArea aria-label="Message" disabled />);

    expect(screen.getByRole("textbox", { name: "Message" })).toBeDisabled();
  });
});

describe("SliderBar", () => {
  it("renders ticks and forwards range changes", () => {
    const onChange = vi.fn();
    const { container } = render(
      <SliderBar defaultValue={20} ticks={[0, 50, 100]} onChange={onChange} />
    );

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "50" } });

    expect(container.querySelectorAll(".ui-datalist p")).toHaveLength(3);
    expect(slider).toHaveValue("50");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(container.querySelector(".ui-range-slider-popup")).toHaveStyle({
      visibility: "visible",
      opacity: "1"
    });
  });

  it("renders the disabled state", () => {
    render(<SliderBar aria-label="Volume" disabled />);

    expect(screen.getByRole("slider", { name: "Volume" })).toBeDisabled();
  });
});

describe("NavBar", () => {
  it("renders navigation content, toggles collapse, and updates its scroll shadow", () => {
    const { container } = render(
      <NavBar collapsed shadowOnScroll title="Navigation" titleBarMobile={<span>Mobile</span>}>
        <NavBarLink href="/home" text="Home" />
      </NavBar>
    );
    const navbar = container.querySelector("#ui-navbar-wrap") as HTMLElement;
    const list = container.querySelector("#ui-navbar-list") as HTMLUListElement;
    const header = container.querySelector(".ui-navbar-header") as HTMLElement;
    const largeToggler = container.querySelector(
      ".ui-navbar-header .ui-navbar-toggler"
    ) as HTMLElement;

    expect(navbar).toHaveClass("ui-navbar-wrap", "collapsed");
    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("Mobile")).toBeInTheDocument();

    fireEvent.click(largeToggler);

    expect(navbar).not.toHaveClass("collapsed");

    fireEvent.scroll(list, { target: { scrollTop: 100 } });
    expect(header).toHaveStyle({ boxShadow: "0 4px 8px -8px #77777777" });

    fireEvent.scroll(list, { target: { scrollTop: 0 } });
    expect(header).toHaveStyle({ boxShadow: "" });
  });

  it("supports mobile float collapse and restores body scrolling", () => {
    const originalWidth = window.innerWidth;

    Object.defineProperty(window, "innerWidth", { configurable: true, value: 500 });

    try {
      const { container } = render(
        <NavBar>
          <span>Content</span>
        </NavBar>
      );
      const navbar = container.querySelector("#ui-navbar-wrap") as HTMLElement;
      const mobileToggler = container.querySelector(
        ".ui-navbar-header-mobile .ui-navbar-toggler"
      ) as HTMLElement;
      const overlay = container.querySelector(".ui-navbar-overlay") as HTMLElement;

      fireEvent.click(mobileToggler);

      expect(navbar).toHaveClass("collapsed-float");
      expect(overlay).toHaveClass("show");
      expect(document.body).toHaveClass("modal-open");

      fireEvent.click(overlay);

      expect(navbar).not.toHaveClass("collapsed-float");
      expect(document.body).not.toHaveClass("modal-open");
    } finally {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        value: originalWidth
      });
    }
  });
});

describe("NavBarLink", () => {
  it("renders active state, icon, image, and badge content", () => {
    const { container } = render(
      <NavBarLink
        active
        badgeBackgroundColor="#123456"
        href="/settings"
        icon={<span>⚙</span>}
        imgAlt="Settings"
        imgBorderRadius="50%"
        imgSrc="/settings.png"
        showBadge={3}
        text="Settings"
      />
    );
    const link = screen.getByRole("link", { name: /Settings/ });

    expect(link).toHaveAttribute("href", "/settings");
    expect(link).toHaveAttribute("aria-current", "page");
    expect(link).toHaveAttribute("aria-selected", "true");
    expect(link).toHaveClass("active");
    expect(container.querySelector("img")).toHaveAttribute("src", "/settings.png");
    expect(container.querySelector("img")).toHaveStyle({ borderRadius: "50%" });
    expect(container.querySelector(".ui-badge")).toHaveTextContent("3");
    expect(container.querySelector(".ui-badge")).toHaveStyle({
      backgroundColor: "rgb(18, 52, 86)"
    });
  });

  it("blocks javascript URLs when explicitly disabled", () => {
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});

    try {
      const { container } = render(
        <NavBarLink allowJavaScriptUrls={false} href="javascript:alert(1)" />
      );

      expect(container).toBeEmptyDOMElement();
      expect(warning).toHaveBeenCalledTimes(1);
    } finally {
      warning.mockRestore();
    }
  });
});

describe("NavBarSubMenu", () => {
  it("toggles its expanded state and preserves child links", () => {
    vi.useFakeTimers();

    try {
      const { container } = render(
        <NavBarSubMenu title="Utilities">
          <NavBarLink text="Settings" />
        </NavBarSubMenu>
      );
      const title = container.querySelector(".ui-navbar-submenu-title") as HTMLElement;
      const content = container.querySelector(".ui-navbar-submenu-content") as HTMLElement;

      expect(title).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(content).not.toHaveClass("show");

      fireEvent.click(title);

      expect(title).toHaveAttribute("aria-expanded", "true");
      expect(content).toHaveClass("show");
      expect(content).toHaveStyle({ height: "100px" });

      fireEvent.click(title);

      expect(title).toHaveAttribute("aria-expanded", "false");
      expect(content).not.toHaveClass("show");
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("NavBarThemeSwitch", () => {
  it("changes the appearance scheme and reports the selected theme", () => {
    const onChange = vi.fn();

    window.localStorage.clear();
    render(<NavBarThemeSwitch onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.body).toHaveClass("dark-theme");
    expect(onChange).toHaveBeenCalledWith("dark");

    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(document.body).not.toHaveClass("dark-theme");
    expect(onChange).toHaveBeenLastCalledWith("light");

    window.localStorage.clear();
  });
});

describe("NavPageContainer", () => {
  it("renders padding, transition, background, and mount scroll behavior", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    try {
      render(
        <NavPageContainer
          animateTransition
          backgroundColor="rgb(1, 2, 3)"
          hasPadding
          scrollTopOnMount
          style={{ color: "red" }}
        >
          Page content
        </NavPageContainer>
      );

      const page = screen.getByRole("main");

      expect(page).toHaveClass("ui-page-container", "has-padding", "transition");
      expect(page).toHaveClass("transition-left");
      expect(page.style.backgroundColor).toBe("rgb(1, 2, 3)");
      expect(page.style.color).toBe("red");
      expect(page).toHaveTextContent("Page content");
      expect(scrollTo).toHaveBeenCalledWith(0, 0);
    } finally {
      scrollTo.mockRestore();
    }
  });
});

describe("TableView", () => {
  it("renders safely with its default empty data", () => {
    const { container } = render(<TableView />);

    expect(container.querySelector(".ui-table-view-container")).toBeInTheDocument();
    expect(container.querySelectorAll("tbody tr")).toHaveLength(0);
  });

  it("renders typed rows, header/footer slots, and column states", () => {
    const { container } = render(
      <TableView
        columns={[
          { title: "Name", showSortIcon: true },
          { title: "Value", showSortIcon: false },
          { sortable: false, title: "Color" }
        ]}
        headerFontSize={20}
        rowFontSize="14px"
        rows={[
          ["Banana", 2, "Yellow"],
          ["Apple", 1, "Red"]
        ]}
        TableFooterComponent={<div data-testid="table-footer">Footer</div>}
        TableHeaderComponent={<div data-testid="table-header">Header</div>}
      />
    );
    const table = container.querySelector(".ui-table-view") as HTMLTableElement;
    const headerCells = container.querySelectorAll("thead th");

    expect(screen.getByTestId("table-header")).toHaveTextContent("Header");
    expect(screen.getByTestId("table-footer")).toHaveTextContent("Footer");
    expect(table).toHaveClass("ui-table-view");
    expect(container.querySelector("thead")).toHaveStyle({ fontSize: "20px" });
    expect(container.querySelector("tbody")).toHaveStyle({ fontSize: "14px" });
    expect(headerCells[0]).toHaveClass("sortable");
    expect(headerCells[0].querySelector(".icons10-arrow-down")).toBeInTheDocument();
    expect(headerCells[1].querySelector("i")).not.toBeInTheDocument();
    expect(headerCells[2]).toHaveClass("no-sortable");
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("sorts a column and restores the original row order on the second click", () => {
    const { container } = render(
      <TableView columns={[{ title: "Name" }]} rows={[["Banana"], ["Apple"]]} />
    );
    const header = container.querySelector("thead th") as HTMLElement;
    const firstBodyRow = () =>
      (container.querySelector("tbody tr") as HTMLTableRowElement).textContent;

    expect(firstBodyRow()).toContain("Banana");

    fireEvent.click(header);

    expect(firstBodyRow()).toContain("Apple");
    expect(header.querySelector(".icons10-arrow-up")).toBeInTheDocument();

    fireEvent.click(header);

    expect(firstBodyRow()).toContain("Banana");
    expect(header.querySelector(".icons10-arrow-down")).toBeInTheDocument();
  });
});
