# hd-skill

An [agent skill](https://agentskills.io) that teaches a coding agent to
write [hd-lang](https://github.com/HerringtonDarkholme/hd-lang): a
statically typed, indentation-based language that compiles to WebAssembly.

Without it, an agent writes hd from its Python and Rust habits, and the
code does not check. With it, the agent has how-to pages for common
scenarios, the syntax by example, the edit-check loop for the `hd`
command, and a lookup from each common diagnostic to its fix.

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
  SKILL.md                  when to use it, the edit-check loop, the rules that surprise, the index
  references/
    how-to/                 one page per scenario: a complete, tested program and its pieces
      cli-tool.md           options, --help, exit status
      stdin-filter.md       read standard input and transform it
      text-records.md       parse a text or CSV file into typed records
      configuration.md      JSON file, environment variables, defaults
      files-and-directories.md  list, read, write, move
      http-api.md           call an API, decode JSON, test without a network
      run-commands.md       run another program
      concurrent-work.md    several waits at once, timeouts, retries, Ctrl-C
      shared-state.md       &mut, box, or a provider
      domain-model.md       states, transitions, rules
      project-layout.md     start a project and split it into modules
      from-other-languages.md  Python, TypeScript, Rust and Go habits in hd
    language/               one page per topic
      basics.md             scripts and main, bindings, numbers, strings
      collections.md        lists, maps, tuples, loops, comprehensions, iterators
      functions.md          functions, closures, pipes, control flow, defer
      data.md               structs, methods, enums, match, let-else
      errors.md             optionals, Result, ?, @error, exit codes
      traits.md             traits, generics, dyn, @derive, operators
      references.md         values, &T, &mut T, box, stored closures
      requirements.md       rows after `$`, providers, capabilities
      suspension.md         `!` functions, join!, race!, timeouts
      modules.md            files as modules, pub, use
    std/
      imports.md            the prelude, and the import line for everything else
      text.md               string methods, parsing, building text, regex
      collections.md        list, map, iterator, optional and result methods
      host.md               console, arguments, files, time, JSON, random
    testing/
      unit-tests.md         tests: blocks, assertions, tables, properties
      fakes.md              replacing the console, files, clock and your own traits
      integration.md        tests/NAME.hd, snapshots, doc tests
    cli/
      commands.md           the commands and flags
      output.md             JSON diagnostics, exit statuses, panics
      packages.md           hd.toml, capabilities, dependencies, workspaces
    mistakes/               what was written, the code hd reports, the fix
      syntax.md  types.md  references.md  requirements.md  std.md
```

The agent reads `SKILL.md` first and opens a reference page only when the
task needs it.

## Every example is checked

hd changes, and a skill that drifts teaches wrong code. So nothing here is
trusted by eye:

```sh
node scripts/check-examples.mjs                   # uses `hd` on PATH
HD=/path/to/hd node scripts/check-examples.mjs
node scripts/check-examples.mjs language/         # only paths that contain a word
```

- Each `hd` block in the skill must pass `hd check`. With a `tests:` block
  it must pass `hd test`. When an `output` block follows, the program must
  print exactly that.
- Blocks marked `<!-- file: PACKAGE/path -->` form a package, which must
  pass `hd check --all` and `hd test`.
- Each row of the mistakes tables that names a diagnostic code has a file
  under `checks/mistakes/` whose `# expect:` line states the code `hd`
  must report.

## Contributing

Found an example that no longer checks, or a mistake an agent keeps
making? Open an issue or a pull request. For a new mistakes row, add the
fixture under `checks/mistakes/` first, run the script, and copy the code
it reports into the table.
