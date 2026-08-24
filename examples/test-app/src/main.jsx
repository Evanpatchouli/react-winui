import { useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Button,
  ComboBox,
  ContextMenu,
  Flyout,
  InfoBar,
  Popover,
  Toast,
  Toaster
} from "@evanpatchouli/react-winui";
import ButtonDirect from "@evanpatchouli/react-winui/button";
import ComboBoxDirect from "@evanpatchouli/react-winui/combo-box";
import ContextMenuDirect from "@evanpatchouli/react-winui/context-menu";
import FlyoutDirect from "@evanpatchouli/react-winui/flyout";
import InfoBarDirect from "@evanpatchouli/react-winui/info-bar";
import PopoverDirect from "@evanpatchouli/react-winui/popover";
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
      <ContextMenu content={<ContextMenu.Item>Root command</ContextMenu.Item>}>
        <button type="button">Root ContextMenu</button>
      </ContextMenu>
      <ContextMenuDirect content={<ContextMenuDirect.Item>Direct command</ContextMenuDirect.Item>}>
        <button type="button">ContextMenu subpath</button>
      </ContextMenuDirect>
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
