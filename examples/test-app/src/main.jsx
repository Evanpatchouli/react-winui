import { createRoot } from "react-dom/client";
import { Button } from "react-windows-ui";
import ButtonDirect from "react-windows-ui/button";
import "react-windows-ui/config/app-config.css";
import "react-windows-ui/styles.css";
import "react-windows-ui/icons/winui-icons.slim.css";

createRoot(document.getElementById("root")).render(
  <main style={{ display: "flex", gap: "8px", padding: "24px" }}>
    <Button type="primary" value="Root export" />
    <ButtonDirect type="subtle" value="Button subpath" />
  </main>
);
