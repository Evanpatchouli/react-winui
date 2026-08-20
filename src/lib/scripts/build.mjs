import { copyFile, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";
import { build as viteBuild } from "vite";

const packageRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourceRoot = path.join(packageRoot, "src");
const outputRoot = path.join(packageRoot, "dist");
const stylesOnly = process.argv.includes("--styles-only");

async function compileStyles() {
  const result = sass.compile(path.join(packageRoot, "scss", "main.scss"), {
    style: "compressed",
    sourceMap: false,
    charset: false
  });

  await mkdir(outputRoot, { recursive: true });
  await writeFile(path.join(outputRoot, "react-windows-ui.min.css"), result.css, "utf8");
}

async function copyDeclarationFiles(currentDirectory = sourceRoot) {
  const entries = await readdir(currentDirectory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const sourcePath = path.join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        await copyDeclarationFiles(sourcePath);
        return;
      }

      if (!entry.name.endsWith(".d.ts")) {
        return;
      }

      const relativePath = path.relative(sourceRoot, sourcePath);
      const outputPath = path.join(outputRoot, relativePath);
      await mkdir(path.dirname(outputPath), { recursive: true });
      await copyFile(sourcePath, outputPath);
    })
  );
}

if (!stylesOnly) {
  await rm(outputRoot, { recursive: true, force: true });
  await viteBuild({
    configFile: path.join(packageRoot, "vite.config.js")
  });
  await copyDeclarationFiles();
}

await compileStyles();
