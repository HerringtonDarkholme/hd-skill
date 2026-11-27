#!/usr/bin/env node
// Generates skills/hd-lang/references/std/api/: one compact page per public
// std module (each item's signature and its one-line summary), from
// `hd doc MODULE`, plus an index. Run it after std changes:
//
//   HD=/path/to/hd node scripts/gen-std-api.mjs [MODULE...]
//
// `hd doc` needs a package, so the script makes an empty one in a scratch
// directory. Cost: one `hd doc` process per module.

import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const hd = process.env.HD ?? "hd";
const out = join(root, "skills/hd-lang/references/std/api");

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

const wanted = process.argv.slice(2);
const modules = wanted.length > 0 ? wanted : MODULES;

const scratch = mkdtempSync(join(tmpdir(), "hd-std-api-"));
const pkg = join(scratch, "pkg");
mkdirSync(join(pkg, "src"), { recursive: true });
writeFileSync(join(pkg, "hd.toml"), '[package]\nname = "api"\n');
writeFileSync(join(pkg, "src/main.hd"), "pub fn main() -> void:\n    pass\n");

// One item: its heading name, signature lines, and the first summary line.
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
    if (!item.summary && text && !text.startsWith("<a ") && !text.startsWith("See [")) {
      item.summary = text;
    }
  }
  const body = [`# \`${module}\``, ""];
  body.push(`Generated from \`hd doc ${module}\`. Run \`hd doc ${module}.NAME\` in a package for one item's full text.`, "");
  for (const it of items) {
    // A type's header is its first line; its fields and methods follow as items.
    const sig = (it.level === 2 ? it.sig.slice(0, 1) : it.sig).join(" ").replace(/\s+/g, " ").replace(/:$/, "").trim();
    if (it.level === 2) {
      // A type or impl block heads the methods that follow it.
      if (/^impl\b/.test(sig) || sig === "") {
        body.push("", `## \`${it.name}\``, "");
        if (it.summary) body.push(it.summary, "");
        continue;
      }
      body.push("", `## \`${it.name}\``, "", "```text", sig, "```", "");
      if (it.summary) body.push(it.summary, "");
      continue;
    }
    const line = it.summary ? `- \`${sig}\`: ${it.summary}` : `- \`${sig}\``;
    body.push(line);
  }
  return body.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

mkdirSync(out, { recursive: true });
const index = [
  "# Standard Library API",
  "",
  "One page per module: each item's signature and one-line summary, generated from `hd doc`.",
  "For one item's full text, run `hd doc std.text.split` inside a package.",
  "",
  "| Module | Page |",
  "| --- | --- |",
];
const failed = [];
for (const module of modules) {
  const run = spawnSync(hd, ["doc", module], { cwd: pkg, encoding: "utf8", timeout: 120_000 });
  if (run.status !== 0 || !run.stdout.startsWith("#")) {
    failed.push(`${module}: ${(run.stderr || run.stdout || "").split("\n")[0]}`);
    continue;
  }
  const file = `${module.replace(/^std\./, "").replace(/\./g, "-")}.md`;
  writeFileSync(join(out, file), condense(module, run.stdout));
  index.push(`| \`${module}\` | [${file}](${file}) |`);
}
if (wanted.length === 0) writeFileSync(join(out, "README.md"), index.join("\n") + "\n");
rmSync(scratch, { recursive: true, force: true });
if (failed.length > 0) {
  console.error(`hd doc failed for ${failed.length} module(s):\n  ${failed.join("\n  ")}`);
  process.exit(1);
}
console.log(`wrote ${modules.length} module page(s) to ${out}`);
