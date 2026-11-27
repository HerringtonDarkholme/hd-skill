#!/usr/bin/env node
// Generates skills/hd-lang/reference/std/: one small file per public std
// module, one line per item (its full name, signature and one-line summary),
// from `hd doc MODULE`, plus a README listing the modules. An agent reads
// the one module it needs, or greps the folder. Run it after std changes:
//
//   HD=/path/to/hd node scripts/gen-std-api.mjs
//
// `hd doc` needs a package, so the script makes an empty one in a scratch
// directory. Cost: one `hd doc` process per module.

import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const hd = process.env.HD ?? "hd";
const out = join(root, "skills/hd-lang/reference/std");

// Public modules, in the order the index lists them. std.rt, std.core and
// std.prelude are the language's runtime, not an API to call.
const MODULES = [
  "std.text", "std.num", "std.convert", "std.cmp", "std.ops", "std.option", "std.result",
  "std.collections", "std.collections.list", "std.collections.map", "std.collections.set",
  "std.collections.deque", "std.collections.heap", "std.iter",
  "std.console", "std.fs", "std.path", "std.cli", "std.host", "std.process", "std.time",
  "std.random", "std.error", "std.format", "std.regex",
  "std.encoding", "std.encoding.json", "std.encoding.base64", "std.encoding.hex",
  "std.validate", "std.task", "std.sync", "std.thread", "std.http", "std.net",
  "std.crypto", "std.crypto.sha256", "std.crypto.sha512", "std.crypto.aes", "std.crypto.cipher",
  "std.crypto.rand", "std.hash", "std.meta", "std.contract", "std.arena", "std.testing",
];

const modules = MODULES;

const scratch = mkdtempSync(join(tmpdir(), "hd-std-api-"));
const pkg = join(scratch, "pkg");
mkdirSync(join(pkg, "src"), { recursive: true });
writeFileSync(join(pkg, "hd.toml"), '[package]\nname = "api"\n');
writeFileSync(join(pkg, "src/main.hd"), "pub fn main() -> void:\n    pass\n");

// One line per item: `NAME  SIGNATURE  -- SUMMARY`. A method's name is
// qualified by its type, as `std.text.string.split`.
function condense(module, markdown) {
  const lines = markdown.split("\n");
  const items = [];
  let item = null;
  let inCode = false;
  for (const line of lines) {
    const head = /^(##|###) `([^`]+)`/.exec(line);
    if (head && !inCode) {
      item = { level: head[1].length, name: head[2], sig: [], summary: "" };
      items.push(item);
      continue;
    }
    if (!item) continue;
    if (line.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      item.sig.push(line);
      continue;
    }
    const text = line.trim();
    if (!item.summary && text && !text.startsWith("<a ") && !text.startsWith("See [") && !text.startsWith("Reference:")) {
      item.summary = text;
    }
  }
  const out = [];
  for (const it of items) {
    // A type's header is its first signature line; its members follow as `###` items.
    const sig = (it.level === 2 ? it.sig.slice(0, 1) : it.sig).join(" ").replace(/\s+/g, " ").replace(/:$/, "").trim();
    if (!sig || /^impl\b/.test(sig)) continue;
    const name = it.name.startsWith(`${module}.`) ? it.name : `${module}.${it.name}`;
    out.push(`${name}  ${sig}${it.summary ? `  -- ${it.summary}` : ""}`);
  }
  return out;
}

const files = [];
const failed = [];
for (const module of modules) {
  const run = spawnSync(hd, ["doc", module], { cwd: pkg, encoding: "utf8", timeout: 120_000 });
  if (run.status !== 0 || !run.stdout.startsWith("#")) {
    failed.push(`${module}: ${(run.stderr || run.stdout || "").split("\n")[0]}`);
    continue;
  }
  const lines = condense(module, run.stdout);
  // A module whose page lists no items of its own gets no file.
  if (lines.length === 0) continue;
  // The README describes a module by its first few top-level names.
  const names = [...new Set(lines.map((l) => l.split("  ")[0].slice(module.length + 1).split(".")[0]))];
  const summary = names.slice(0, 8).map((n) => `\`${n}\``).join(", ") + (names.length > 8 ? ", ..." : "");
  files.push({ module, file: `${module.replace(/^std\./, "")}.txt`, lines, summary });
}
rmSync(scratch, { recursive: true, force: true });
if (failed.length > 0) {
  console.error(`hd doc failed for ${failed.length} module(s):\n  ${failed.join("\n  ")}`);
  process.exit(1);
}
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const f of files) {
  const header = [
    `# ${f.module}: one line per public item, NAME  SIGNATURE  -- SUMMARY`,
    `# Generated from \`hd doc ${f.module}\` by scripts/gen-std-api.mjs. For one item's full`,
    `# text and examples, run \`hd doc ${f.module}.NAME\` inside any package.`,
  ];
  writeFileSync(join(out, f.file), [...header, ...f.lines].join("\n") + "\n");
}
const readme = [
  "# The Standard Library, One File Per Module",
  "",
  "Each file lists one module's public items, one per line: full name,",
  "signature, and a one-line summary. Generated from `hd doc` by",
  "`scripts/gen-std-api.mjs`; don't edit by hand.",
  "",
  "Open the one module you need, or search them all:",
  "",
  "```sh",
  "grep -rh 'split' reference/std/          # a name in any module",
  "grep -h 'pub fn' reference/std/time.txt  # the functions of one module",
  "```",
  "",
  "For what to use for a job, read [std.md](../../std.md) first. For one",
  "item's full text and examples, run `hd doc std.time.sleep` inside any package.",
  "",
  "| Module | File | Items | First names |",
  "| --- | --- | ---: | --- |",
  ...files.map((f) => `| \`${f.module}\` | [${f.file}](${f.file}) | ${f.lines.length} | ${f.summary} |`),
];
writeFileSync(join(out, "README.md"), readme.join("\n") + "\n");
const total = files.reduce((n, f) => n + f.lines.length, 0);
console.log(`wrote ${total} items in ${files.length} module files to ${out}`);
