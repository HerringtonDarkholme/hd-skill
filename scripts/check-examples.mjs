#!/usr/bin/env node
// Checks every hd example in this repository against a real `hd`.
//
//   node scripts/check-examples.mjs            use `hd` on PATH
//   HD=/path/to/hd node scripts/check-examples.mjs
//   node scripts/check-examples.mjs --keep     keep the scratch directory
//   node scripts/check-examples.mjs language/  only the files whose path contains a word
//   node scripts/check-examples.mjs --links    only check links, which is fast
//
// What it checks:
//
// 1. Each ```hd block in skills/**/*.md is one single-file program. It must
//    pass `hd check`. With a `tests:` block it must also pass `hd test`.
//    When the next fenced block is ```output, `hd FILE` must print exactly
//    that text.
// 2. A block preceded by `<!-- file: PKG/path -->` is one file of the package
//    PKG instead (any language: hd, toml). Each package must pass
//    `hd check --all` and `hd test`.
// 3. Each file under checks/mistakes/ states what it expects in `# expect:`
//    lines at its top:
//      # expect: check CODE     `hd check` reports the diagnostic CODE
//      # expect: tests CODE     `hd check --tests` reports CODE
//      # expect: lint CODE      `hd lint` reports CODE
//      # expect: ok             `hd check` reports nothing
//      # expect: prints TEXT    `hd FILE` prints the line TEXT
//
// 4. Each relative link in skills/**/*.md points at a file that exists, and
//    a `#anchor` on a Markdown link names a heading of that file.
//
// Cost: one pass over each Markdown file, then at most three `hd` processes
// per example, run one at a time. Every process has a time limit.

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const hd = process.env.HD ?? "hd";
const keep = process.argv.includes("--keep");
const TIME_LIMIT_MS = 120_000;

const scratch = mkdtempSync(join(tmpdir(), "hd-skill-check-"));
const env = { ...process.env, HD_CACHE: join(scratch, "cache"), NO_COLOR: "1" };
const failures = [];
let checked = 0;

function run(args, cwd) {
    const result = spawnSync(hd, args, { cwd, env, encoding: "utf8", timeout: TIME_LIMIT_MS });
    if (result.error) {
        const reason = result.error.code === "ETIMEDOUT" ? "timed out" : result.error.message;
        return { status: -1, stdout: result.stdout ?? "", stderr: `${reason}\n${result.stderr ?? ""}` };
    }
    return { status: result.status, stdout: result.stdout, stderr: result.stderr };
}

function fail(where, what, detail) {
    failures.push(`${where}: ${what}\n${indent(detail.trim())}`);
}

function indent(text) {
    return text.split("\n").map((line) => `    ${line}`).join("\n");
}

// Every file under `dir` whose name ends in `suffix`, in a stable order.
function filesUnder(dir, suffix) {
    const found = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) found.push(...filesUnder(path, suffix));
        else if (entry.name.endsWith(suffix)) found.push(path);
    }
    return found.sort();
}

// One fenced block: its language, its text, its first line number, and the
// `<!-- file: ... -->` path written on the line before it, if any.
function fencedBlocks(text) {
    const lines = text.split("\n");
    const blocks = [];
    let open = null;
    let pendingFile = null;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (open === null) {
            const marker = line.match(/^<!--\s*file:\s*(\S+)\s*-->$/);
            if (marker) {
                pendingFile = marker[1];
                continue;
            }
            const fence = line.match(/^(`{3,})\s*([A-Za-z0-9_-]*)\s*$/);
            if (fence) open = { fence: fence[1], lang: fence[2], line: i + 2, body: [], file: pendingFile };
            if (line.trim() !== "") pendingFile = null;
        } else if (line.startsWith(open.fence) && line.trim() === open.fence) {
            blocks.push({ lang: open.lang, line: open.line, text: open.body.join("\n") + "\n", file: open.file });
            open = null;
        } else {
            open.body.push(line);
        }
    }
    return blocks;
}

function diagnostics(stdout) {
    const found = [];
    for (const line of stdout.split("\n")) {
        if (!line.startsWith("{")) continue;
        try {
            const record = JSON.parse(line);
            if (record.kind === "diagnostic") found.push(record);
        } catch {
            // Not a JSON line; the program's own output.
        }
    }
    return found;
}

function checkSingleFile(where, source, expectedOutput) {
    const dir = join(scratch, `single-${checked}`);
    mkdirSync(dir, { recursive: true });
    const file = join(dir, "example.hd");
    writeFileSync(file, source);
    const hasTests = /^tests:/m.test(source);

    const check = run(["check", ...(hasTests ? ["--tests"] : []), file], dir);
    if (check.status !== 0) return fail(where, "`hd check` failed", check.stderr + check.stdout);
    if (hasTests) {
        const test = run(["test", file], dir);
        if (test.status !== 0) return fail(where, "`hd test` failed", test.stdout + test.stderr);
    }
    if (expectedOutput !== null) {
        const ran = run([file], dir);
        if (ran.status !== 0) return fail(where, "`hd FILE` failed", ran.stderr + ran.stdout);
        if (ran.stdout !== expectedOutput) {
            fail(where, "the program's output differs from its ```output block", `expected:\n${expectedOutput}\nactual:\n${ran.stdout}`);
        }
    }
}

function checkMarkdown(path) {
    const name = relative(root, path);
    const blocks = fencedBlocks(readFileSync(path, "utf8"));
    const packages = new Map();
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        if (block.file !== null) {
            const [pkg] = block.file.split("/");
            if (!packages.has(pkg)) packages.set(pkg, []);
            packages.get(pkg).push(block);
            continue;
        }
        if (block.lang !== "hd") continue;
        const next = blocks[i + 1];
        const output = next && next.lang === "output" && next.file === null ? next.text : null;
        checked += 1;
        checkSingleFile(`${name}:${block.line}`, block.text, output);
    }
    if (packages.size === 0) return;

    // Packages of one Markdown file share a directory, so a path dependency
    // such as `../money` finds its sibling.
    const base = join(scratch, `packages-${checked}`);
    for (const files of packages.values()) {
        for (const block of files) {
            const target = join(base, block.file);
            mkdirSync(dirname(target), { recursive: true });
            writeFileSync(target, block.text);
        }
    }
    for (const [pkg, files] of packages) {
        checked += 1;
        const where = `${name}:${files[0].line} (package ${pkg})`;
        const dir = join(base, pkg);
        const check = run(["check", "--all"], dir);
        if (check.status !== 0) {
            fail(where, "`hd check --all` failed", check.stderr + check.stdout);
            continue;
        }
        const test = run(["test"], dir);
        if (test.status !== 0) fail(where, "`hd test` failed", test.stdout + test.stderr);
    }
}

function checkMistake(path) {
    const name = relative(root, path);
    const source = readFileSync(path, "utf8");
    const expects = [...source.matchAll(/^# expect: (\S+)(?: (.*))?$/gm)].map((m) => [m[1], m[2] ?? ""]);
    if (expects.length === 0) return fail(name, "no `# expect:` line", "");
    checked += 1;
    const dir = join(scratch, `mistake-${checked}`);
    mkdirSync(dir, { recursive: true });
    const file = join(dir, "example.hd");
    writeFileSync(file, source);

    for (const [kind, value] of expects) {
        if (kind === "prints") {
            const ran = run([file], dir);
            if (!ran.stdout.split("\n").includes(value)) {
                fail(name, `expected the output line \`${value}\``, ran.stdout + ran.stderr);
            }
            continue;
        }
        const command = { check: ["check"], tests: ["check", "--tests"], lint: ["lint"], ok: ["check"] }[kind];
        if (!command) {
            fail(name, `unknown expectation \`${kind}\``, "");
            continue;
        }
        const result = run([...command, "--format", "json", file], dir);
        const codes = diagnostics(result.stdout).map((record) => record.code);
        if (kind === "ok") {
            if (result.status !== 0 || codes.length > 0) fail(name, "expected no diagnostic", result.stdout + result.stderr);
        } else if (!codes.includes(value)) {
            fail(name, `expected \`${value}\` from \`hd ${command.join(" ")}\`, found ${codes.length ? codes.join(", ") : "nothing"}`, result.stdout + result.stderr);
        }
    }
}

// A heading's anchor, as GitHub writes it: lower case, punctuation dropped,
// spaces turned into hyphens.
function slug(heading) {
    return heading.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, "").replace(/\s/g, "-");
}

function anchorsOf(path) {
    const text = readFileSync(path, "utf8").replace(/^```[\s\S]*?^```/gm, "");
    return new Set([...text.matchAll(/^#{1,6}\s+(.+)$/gm)].map((m) => slug(m[1])));
}

function checkLinks(path) {
    // Code is not prose: drop fenced blocks and inline code before looking for links.
    const text = readFileSync(path, "utf8").replace(/^```[\s\S]*?^```/gm, "").replace(/`[^`\n]*`/g, "");
    for (const match of text.matchAll(/\]\(([^)\s]+)\)/g)) {
        const target = match[1];
        if (/^[a-z]+:/.test(target)) continue;
        const [file, anchor] = target.split("#");
        const resolved = file === "" ? path : resolve(dirname(path), file);
        const where = relative(root, path);
        if (!existsSync(resolved)) {
            fail(where, `broken link \`${target}\``, "no such file");
            continue;
        }
        if (anchor && resolved.endsWith(".md") && !anchorsOf(resolved).has(anchor)) {
            fail(where, `broken anchor \`${target}\``, `no heading with the anchor #${anchor}`);
        }
    }
}

const version = run(["help"], root);
if (version.status !== 0) {
    console.error(`cannot run \`${hd}\`: ${version.stderr.trim()}\nInstall it with \`cargo install hd-lang\`, or set HD=/path/to/hd.`);
    process.exit(2);
}

const only = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const selected = (path) => only.length === 0 || only.some((part) => relative(root, path).includes(part));

for (const path of filesUnder(join(root, "skills"), ".md").filter(selected)) checkLinks(path);
if (process.argv.includes("--links")) {
    for (const failure of failures) console.error(`FAIL ${failure}\n`);
    console.log(`links checked, ${failures.length} failed`);
    process.exit(failures.length ? 1 : 0);
}
for (const path of filesUnder(join(root, "skills"), ".md").filter(selected)) checkMarkdown(path);
for (const path of filesUnder(join(root, "checks", "mistakes"), ".hd").filter(selected)) checkMistake(path);

for (const failure of failures) console.error(`FAIL ${failure}\n`);
console.log(`${checked} examples checked, ${failures.length} failed`);

if (keep) {
    console.log(`scratch directory kept: ${scratch}`);
} else {
    // `hd` may still be writing its cache from a detached process, so the
    // removal retries, and a leftover directory is not a failed check.
    try {
        rmSync(scratch, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    } catch (error) {
        console.error(`could not remove ${scratch}: ${error.message}`);
    }
}
process.exit(failures.length === 0 ? 0 : 1);
