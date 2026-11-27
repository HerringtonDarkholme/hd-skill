# Evaluation: text

12 tasks × 3 trials = 36 runs (text-t1, text-t2, text-t3).

- Runs passed: **35 / 36** (97%)
- Tasks passed in every trial: **11 / 12**; in at least one: 12 / 12
- Hidden cases passed: 199 / 210
- Mean idiom score: **98%**
- Package checks clean: 35 / 36; `hd fmt` clean: 34 / 36
- Skill opened: 36 / 36; reference pages opened per run: 3.5
- `hd check` calls per run: 3.5, of which failing: 0.8; `hd doc` invocations: 16 in all
- Turns per run: 21.8; time per run: 70 s; total cost: $1.23

## By task

| Task | Scenario | Passed | Hidden | Runs | Idiom | Failing / all checks | Pages | Turns |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | CLI over standard input | 3/3 | 15/15 | 12/12 | 100% | 2/10 | 5.3 | 24 |
| 02-todos | JSON in and out | 3/3 | 15/15 | – | 100% | 4/9 | 3.0 | 18 |
| 03-config | configuration from file and environment | 2/3 | 22/33 | – | 87% | 5/10 | 3.0 | 21 |
| 04-ratelimit | time-dependent logic | 3/3 | 12/12 | – | 100% | 2/8 | 4.7 | 25 |
| 05-users | service with a user-defined effect | 3/3 | 9/9 | 3/3 | 100% | 0/8 | 3.7 | 16 |
| 06-quotes | concurrent calls with retries | 3/3 | 12/12 | – | 100% | 1/7 | 4.7 | 21 |
| 07-sandbox | sandboxed program | 3/3 | – | 9/9 | 100% | 2/13 | 4.3 | 26 |
| 08-derive-template | custom derive | 3/3 | 6/6 | – | 100% | 4/12 | 2.7 | 20 |
| 09-contracts | invariants | 3/3 | 18/18 | – | 83% | 1/8 | 3.0 | 21 |
| 10-rle | algorithm with properties | 3/3 | 15/15 | – | 100% | 3/12 | 2.0 | 21 |
| 11-calc | parser and interpreter | 3/3 | 60/60 | – | 100% | 1/14 | 2.7 | 21 |
| 12-lru | stateful data structure | 3/3 | 15/15 | – | 100% | 3/14 | 3.0 | 27 |

## Idiom checks

How often each design move appeared, across trials.

| Task | Check | Hit |
| --- | --- | --- |
| 01-colsum | options parsed with @derive(Cli) | 3/3 |
| 01-colsum | SumError declared with @error | 3/3 |
| 01-colsum | writes at least 2 test cases of its own | 3/3 |
| 02-todos | JSON through @derive(Serialize, Deserialize) | 3/3 |
| 02-todos | done defaults with a field default | 3/3 |
| 02-todos | round trip checked with a property test | 3/3 |
| 02-todos | writes at least 2 test cases of its own | 3/3 |
| 03-config | rules written as @derive(Validate) field facts | 2/3 |
| 03-config | uses @range / @length facts | 2/3 |
| 03-config | error variants convert with @from | 3/3 |
| 03-config | tests use MemoryFs and ScriptedEnv | 3/3 |
| 03-config | writes at least 2 test cases of its own | 3/3 |
| 04-ratelimit | tests control time with ManualClock | 3/3 |
| 04-ratelimit | writes at least 2 test cases of its own | 3/3 |
| 05-users | logic reaches the store with $.use(UserStore) | 3/3 |
| 05-users | main provides a store with $.with | 3/3 |
| 05-users | tests define their own UserStore fake | 3/3 |
| 05-users | UserError declared with @error | 3/3 |
| 05-users | writes at least 2 test cases of its own | 3/3 |
| 06-quotes | concurrency through map_join (limit 4) | 3/3 |
| 06-quotes | retries through std.task retry/Backoff | 3/3 |
| 06-quotes | tests define their own Quotes fake | 3/3 |
| 06-quotes | tests use ManualClock | 3/3 |
| 06-quotes | writes at least 2 test cases of its own | 3/3 |
| 07-sandbox | [capabilities] grants only Console, Args and FsRead | 3/3 |
| 07-sandbox | FsRead scoped to data/ | 3/3 |
| 08-derive-template | a derive template: impl[T] FieldNames for T by Structure | 3/3 |
| 08-derive-template | walks members with a Walker | 3/3 |
| 08-derive-template | writes at least 2 test cases of its own | 3/3 |
| 09-contracts | preconditions with require | 3/3 |
| 09-contracts | postconditions with ensure | 1/3 |
| 09-contracts | no hand-written panic( for checks | 3/3 |
| 09-contracts | writes at least 2 test cases of its own | 3/3 |
| 10-rle | a property test (it_prop) | 3/3 |
| 10-rle | writes at least 2 test cases of its own | 3/3 |
| 11-calc | a recursive enum for the syntax tree (boxed children) | 3/3 |
| 11-calc | CalcError declared with @error | 3/3 |
| 11-calc | table tests with it_each | 3/3 |
| 11-calc | writes at least 2 test cases of its own | 3/3 |
| 12-lru | a generated-operations test (it_prop / it_prop_with / commands) | 3/3 |
| 12-lru | writes at least 2 test cases of its own | 3/3 |

## Diagnostics the agents hit

From `hd` output in the transcripts, while the agents worked.

| Code | Times | Runs |
| --- | --- | --- |
| `unknown-name` | 19 | 3 |
| `unsatisfied-trait-bound` | 15 | 3 |
| `unknown-trait` | 15 | 5 |
| `type-mismatch` | 11 | 3 |
| `syntax-error` | 8 | 5 |
| `unknown-type` | 6 | 2 |
| `doc-comment-without-target` | 5 | 1 |
| `missing-capability` | 4 | 4 |
| `invalid-test-statement` | 4 | 2 |
| `unknown-import` | 3 | 2 |
| `missing-requirement` | 3 | 3 |
| `missing-contextual-enum-type` | 2 | 1 |
| `local-reference-escapes` | 2 | 1 |
| `misplaced-tests-block` | 1 | 1 |
| `private-module` | 1 | 1 |
| `mixed-signedness` | 1 | 1 |
| `unknown-method` | 1 | 1 |
| `private-member` | 1 | 1 |
| `trait-used-as-type` | 1 | 1 |
| `missing-let` | 1 | 1 |
| `not-writable` | 1 | 1 |

## Reference pages opened

| Page | Runs |
| --- | --- |
| language.md | 31 |
| reference/packages.md | 26 |
| design/testing.md | 18 |
| design/effects.md | 8 |
| scenarios/cli-tool.md | 5 |
| design/derive.md | 4 |
| scenarios/configuration.md | 4 |
| scenarios/project-layout.md | 4 |
| scenarios/text-records.md | 3 |
| scenarios/stdin-filter.md | 3 |
| cli.md | 3 |
| design/concurrency.md | 3 |
| scenarios/parser.md | 3 |
| design/errors.md | 2 |
| scenarios/files-and-directories.md | 2 |
| design/capabilities.md | 2 |
| design/contracts.md | 2 |
| packages.md | 1 |
| std.md | 1 |
| scenarios/shared-state.md | 1 |

## Denied tool calls

| Call | Times |
| --- | --- |
| `Bash: hd` | 8 |
| `Bash: ls` | 8 |
| `Bash: cd` | 5 |
| `Bash: rm` | 2 |
| `Bash: printf` | 2 |
| `Bash: H=.claude/skills/hd-lang;` | 1 |
| `Bash: SK=.claude/skills/hd-lang;` | 1 |
| `Bash: python3` | 1 |
| `Bash: sed` | 1 |
| `Bash: d=$(mktemp` | 1 |
| `Bash: D=$(mktemp` | 1 |
| `Bash: find` | 1 |
| `Read: /tmp/rl-scratch/ratelimit/src/lib.hd` | 1 |
| `Read: /tmp/rl-scratch/ratelimit/hd.toml` | 1 |
| `Read: /tmp/rl-scratch/ratelimit/tests/ratelimit.hd` | 1 |
| `Bash: S=.claude/skills/hd-lang;` | 1 |
| `Bash: mkdir` | 1 |
| `Bash: cat` | 1 |
| `Bash: for` | 1 |
| `Bash: cp` | 1 |
| `Bash: IDX=.claude/skills/hd-lang/reference/std-index.txt;` | 1 |

## Failures

- **03-config**
  - trial 3: check fails: unknown-trait, type-mismatch
  - trial 3: hidden tests don't compile: src/config.hd:43: unknown-trait: no trait named `FsWrite`; add `use std.fs.FsWrite`
