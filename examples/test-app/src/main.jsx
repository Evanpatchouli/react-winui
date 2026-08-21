import { createRoot } from "react-dom/client";
import { Button } from "@evanpatchouli/react-winui";
import ButtonDirect from "@evanpatchouli/react-winui/button";
import { Shadows } from "@evanpatchouli/react-winui/theme";
import "@evanpatchouli/react-winui/config/app-config.css";
import "@evanpatchouli/react-winui/styles.css";
import "@evanpatchouli/react-winui/icons/winui-icons.slim.css";

createRoot(document.getElementById("root")).render(
  <main style={{ display: "flex", gap: "8px", padding: "24px", boxShadow: Shadows.shadow8 }}>
    <Button type="primary" value="Root export" />
    <ButtonDirect type="subtle" value="Button subpath" />
  </main>
);
