# hd-skill

An [agent skill](https://agentskills.io) that teaches a coding agent to
write [hd-lang](https://github.com/HerringtonDarkholme/hd-lang): a
statically typed, indentation-based language that compiles to WebAssembly.

Without it, an agent writes hd from its Python and Rust habits, and the
code does not check, or checks but ignores what hd is for. With it, the
agent knows which hd feature fits each situation (effects, derives,
contracts, property tests, capability grants), has the core language on
one page, the standard library by job, complete programs by scenario, the
edit-check loop for the `hd` command, and a lookup from each diagnostic to
its fix.

## Install

```sh
npx skills add HerringtonDarkholme/hd-skill
```

This copies `skills/hd-lang/` into your agent's skills folder (Claude Code,
Codex, Cursor, Copilot, Gemini CLI and others; see
[skills](https://github.com/vercel-labs/skills)). To install by hand, copy
`skills/hd-lang/` into your project's `.claude/skills/` or
`.agents/skills/`.

You also need the `hd` command. The skill tracks hd-lang's main branch,
which is ahead of the crates.io release:

```sh
cargo install --locked --git https://github.com/HerringtonDarkholme/hd-lang hd-lang
```

`hd test` also needs Node 26.13.1 or newer.

## What is inside

```text
skills/hd-lang/
  SKILL.md            what hd is, the hd way (which feature for which situation), the loop, where to look
  language.md         the core language on one page, and the rules that surprise
  std.md              the standard library by job
  cli.md              the `hd` command, its flags, and reading its output
  design/             one page per hd design move: when to use it, and how
    effects.md        rows after `$`, your own effects, providers
    capabilities.md   capability grants, sandboxing, plugins
    derive.md         built-in derives, and writing your own derive template
    contracts.md      require and ensure
    errors.md         optionals, Result, @error enums
    testing.md        tests, tables, properties, model-based tests, fakes, snapshots
    concurrency.md    `!`, join!, race!, std.task policies, threads
  scenarios/          one task as a complete, tested program
    cli-tool.md  stdin-filter.md  text-records.md  configuration.md
    files-and-directories.md  http-api.md  run-commands.md  concurrent-work.md
    shared-state.md  domain-model.md  parser.md  project-layout.md  porting.md  performance.md
  reference/
    traits.md  references.md  packages.md
    diagnostics.md    each diagnostic code, what was written, the fix
    limitations.md    what hd can't do yet, and what to do instead
    explore.md        where to look when the skill has no answer
    std/              every std item, one small file per module (scripts/gen-std-api.mjs)
```

The agent reads `SKILL.md` first, then `language.md`, and opens other
pages when the task needs them.

## Every example is checked

hd changes, and a skill that drifts teaches wrong code. So nothing here is
trusted by eye:

```sh
node scripts/check-examples.mjs                   # uses `hd` on PATH
HD=/path/to/hd node scripts/check-examples.mjs
node scripts/check-examples.mjs language/         # only paths that contain a word
node scripts/check-examples.mjs --links           # only check links and anchors
HD=/path/to/hd node scripts/gen-std-api.mjs       # regenerate reference/std/ after std changes
```

- Each `hd` block in the skill must pass `hd check`. With a `tests:` block
  it must pass `hd test`. When an `output` block follows, the program must
  print exactly that.
- Blocks marked `<!-- file: PACKAGE/path -->` form a package, which must
  pass `hd check --all` and `hd test`.
- Each row of `reference/diagnostics.md` that names a diagnostic code has
  a file under `checks/mistakes/` whose `# expect:` line states the code
  `hd` must report.
- Every relative link points at a file that exists, and every `#anchor`
  at a heading.

## Contributing

Found an example that no longer checks, or a mistake an agent keeps
making? Open an issue or a pull request. For a new diagnostics row, add the
fixture under `checks/mistakes/` first, run the script, and copy the code
it reports into the table.
