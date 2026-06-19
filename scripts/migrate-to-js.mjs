import fs from "fs";
import path from "path";
import ts from "typescript";

const projectRoot = path.resolve(import.meta.dirname, "..");
const srcRoot = path.join(projectRoot, "src");

const SKIP = new Set([
  path.join(srcRoot, "routeTree.gen.ts"),
  path.join(srcRoot, "server.ts"),
  path.join(srcRoot, "start.ts"),
  path.join(srcRoot, "routes", "sitemap[.]xml.ts"),
]);

const DELETE_ONLY = new Set([
  path.join(srcRoot, "server.ts"),
  path.join(srcRoot, "start.ts"),
  path.join(srcRoot, "routes", "sitemap[.]xml.ts"),
  path.join(srcRoot, "routeTree.gen.ts"),
  path.join(projectRoot, "vite.config.ts"),
]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (/\.tsx?$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function stripTypeScriptArtifacts(source) {
  return source
    .replace(/^\s*declare\s+module[\s\S]*?^}/gm, "")
    .replace(/^\s*declare\s+global[\s\S]*?^}/gm, "")
    .replace(/^\s*export\s+type\s+[\s\S]*?;?\s*$/gm, "")
    .replace(/^\s*export\s+interface\s+[\s\S]*?^}/gm, "")
    .replace(/^\s*interface\s+[\s\S]*?^}/gm, "")
    .replace(/^\s*type\s+[A-Z][\s\S]*?;?\s*$/gm, "")
    .replace(/\s+as\s+any\b/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd()
    .concat("\n");
}

function convertFile(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const isTsx = filePath.endsWith(".tsx");

  const output = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.Preserve,
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      importsNotUsedAsValues: ts.ImportsNotUsedAsValues.Remove,
    },
    fileName: filePath,
  }).outputText;

  const cleaned = stripTypeScriptArtifacts(output);
  const newPath = filePath.replace(/\.tsx$/, ".jsx").replace(/\.ts$/, ".js");
  fs.writeFileSync(newPath, cleaned, "utf8");
  fs.unlinkSync(filePath);
  console.log(`Converted: ${path.relative(projectRoot, filePath)} -> ${path.relative(projectRoot, newPath)}`);
}

for (const file of DELETE_ONLY) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Deleted: ${path.relative(projectRoot, file)}`);
  }
}

const files = walk(srcRoot).filter((file) => !SKIP.has(file) && !DELETE_ONLY.has(file));
for (const file of files) {
  convertFile(file);
}

console.log(`\nDone. Converted ${files.length} files.`);
