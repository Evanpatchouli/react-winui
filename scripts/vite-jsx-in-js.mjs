import { readFile } from "node:fs/promises";

export function jsxInJavaScript(sourceRoot, name = "jsx-in-js") {
  const normalizedSourceRoot = sourceRoot.replaceAll("\\", "/");
  const isSourceJavaScript = (id) => {
    if (typeof id !== "string") {
      return false;
    }

    const normalizedId = id.split("?")[0].replaceAll("\\", "/");
    return (
      normalizedId.startsWith(`${normalizedSourceRoot}/`) &&
      normalizedId.endsWith(".js")
    );
  };

  return {
    name: `react-windows-ui-${name}`,
    enforce: "pre",
    async resolveId(source, importer) {
      const resolved = await this.resolve(source, importer, { skipSelf: true });

      if (!resolved || !isSourceJavaScript(resolved.id)) {
        return resolved;
      }

      return {
        ...resolved,
        id: `${resolved.id.slice(0, -3)}.jsx`
      };
    },
    async load(id) {
      const normalizedId = id.split("?")[0].replaceAll("\\", "/");

      if (
        !normalizedId.startsWith(`${normalizedSourceRoot}/`) ||
        !normalizedId.endsWith(".jsx")
      ) {
        return undefined;
      }

      return readFile(`${normalizedId.slice(0, -4)}.js`, "utf8");
    }
  };
}
