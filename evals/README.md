# Skill evaluation

Measures whether a fresh agent with only this skill installed writes hd
that works, and whether it writes hd the way hd is meant to be written.

Each task in `tasks/` is given to a headless Claude Code session in an empty
directory, with `skills/hd-lang/` installed as a project skill. The session
gets no user settings or MCP servers, no web access, and can run only `hd`
and a few harmless shell commands. Reads outside its directory are denied.

## A task

```text
tasks/NN-name/
  prompt.md        what the agent is asked: a package name and an exact public API
  task.json        package name, scenario, end-to-end runs, idiom checks
  hidden/hidden.hd tests the agent never sees, dropped into tests/ after it finishes
  reference/       a solution that passes everything; calibrates the grader
```

## Grading

| Measure | How |
| --- | --- |
| **Pass** | `hd check --all` is clean, every hidden case passes, every end-to-end run matches |
| **Hidden** | `tests/zz_hidden_eval.hd`, run with `hd test --filter hidden`. A `hidden-panics:` case passes when it panics |
| **Runs** | `hd run -- ARGS` with the given stdin and files; stdout, exit status and a stderr fragment must match |
| **Idiom** | per-task checks on the agent's source: did it use the hd feature the task calls for (`$.use` on its own effect, a derive template, `require`, a property test, minimal capabilities, ...) |
| **Process** | from the transcript: whether the skill was opened, pages read, `hd check` calls and how many failed, diagnostic codes, turns, cost |

## Running

```sh
node evals/run.mjs --reference --write-expected      # grade the references; record hidden case counts
node evals/run.mjs --label baseline-t1 --model haiku # one trial of every task
node evals/run.mjs --label x --tasks 05,07           # only some tasks
node evals/run.mjs --label baseline-t1 --regrade     # grade the saved workspaces again
node evals/aggregate.mjs baseline baseline-t1 baseline-t2 baseline-t3
```

Workspaces live under `$TMPDIR/hd-skill-evals/LABEL/`. Each run writes
`results/LABEL/TASK/{result.json,transcript.jsonl.gz,solution/}` and
`results/LABEL/summary.{md,json}`. `aggregate.mjs` writes `results/NAME.md`.

Run the references after changing a task: every reference must pass with a
100% idiom score, or the task is wrong.
