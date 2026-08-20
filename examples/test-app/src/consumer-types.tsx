import type { ReactElement } from "react";
import { Button } from "react-windows-ui";
import ButtonDirect from "react-windows-ui/button";

export const rootImport: ReactElement = <Button value="Root export" />;
export const subpathImport: ReactElement = <ButtonDirect value="Button subpath" />;
