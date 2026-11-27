# Evaluation: restructure

12 tasks × 3 trials = 36 runs (restructure-t1, restructure-t2, restructure-t3).

- Runs passed: **35 / 36** (97%)
- Tasks passed in every trial: **11 / 12**; in at least one: 12 / 12
- Hidden cases passed: 210 / 210
- Mean idiom score: **98%**
- Package checks clean: 36 / 36; `hd fmt` clean: 36 / 36
- Skill opened: 36 / 36; reference pages opened per run: 3.0
- `hd check` calls per run: 4.1, of which failing: 1.1; `hd doc` invocations: 23 in all
- Turns per run: 23.6; time per run: 71 s; total cost: $1.05

## By task

| Task | Scenario | Passed | Hidden | Runs | Idiom | Failing / all checks | Pages | Turns |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | CLI over standard input | 3/3 | 15/15 | 12/12 | 100% | 2/10 | 5.0 | 26 |
| 02-todos | JSON in and out | 3/3 | 15/15 | – | 100% | 6/16 | 2.0 | 24 |
| 03-config | configuration from file and environment | 3/3 | 33/33 | – | 87% | 5/14 | 2.7 | 25 |
| 04-ratelimit | time-dependent logic | 3/3 | 12/12 | – | 100% | 2/9 | 2.3 | 22 |
| 05-users | service with a user-defined effect | 3/3 | 9/9 | 3/3 | 100% | 4/11 | 3.3 | 19 |
| 06-quotes | concurrent calls with retries | 3/3 | 12/12 | – | 100% | 3/10 | 2.7 | 26 |
| 07-sandbox | sandboxed program | 2/3 | – | 8/9 | 100% | 3/12 | 6.0 | 27 |
| 08-derive-template | custom derive | 3/3 | 6/6 | – | 100% | 6/20 | 3.3 | 25 |
| 09-contracts | invariants | 3/3 | 18/18 | – | 92% | 1/9 | 4.0 | 23 |
| 10-rle | algorithm with properties | 3/3 | 15/15 | – | 100% | 2/11 | 1.0 | 24 |
| 11-calc | parser and interpreter | 3/3 | 60/60 | – | 100% | 0/11 | 2.7 | 20 |
| 12-lru | stateful data structure | 3/3 | 15/15 | – | 100% | 5/14 | 1.3 | 24 |

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
| 09-contracts | postconditions with ensure | 2/3 |
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
| `unknown-trait` | 34 | 8 |
| `syntax-error` | 23 | 11 |
| `unsatisfied-trait-bound` | 14 | 5 |
| `type-mismatch` | 8 | 4 |
| `unknown-method` | 7 | 2 |
| `unknown-name` | 6 | 5 |
| `unknown-type` | 5 | 2 |
| `missing-capability` | 4 | 2 |
| `missing-let` | 4 | 3 |
| `missing-requirement` | 4 | 3 |
| `not-callable` | 3 | 2 |
| `local-reference-escapes` | 2 | 2 |
| `unknown-import` | 2 | 2 |
| `invalid-test-statement` | 2 | 2 |
| `misplaced-tests-block` | 1 | 1 |
| `not-writable` | 1 | 1 |

## Reference pages opened

| Page | Runs |
| --- | --- |
| language.md | 29 |
| reference/packages.md | 20 |
| design/testing.md | 16 |
| design/effects.md | 7 |
| scenarios/cli-tool.md | 5 |
| design/contracts.md | 5 |
| design/capabilities.md | 4 |
| scenarios/configuration.md | 4 |
| scenarios/files-and-directories.md | 3 |
| design/derive.md | 3 |
| scenarios/parser.md | 3 |
| scenarios/stdin-filter.md | 2 |
| packages.md | 2 |
| design/errors.md | 2 |
| cli.md | 1 |
| scenarios/text-records.md | 1 |
| scenarios/project-layout.md | 1 |
| design/concurrency.md | 1 |

## Denied tool calls

| Call | Times |
| --- | --- |
| `Bash: hd` | 12 |
| `Bash: cd` | 5 |
| `Bash: ls` | 3 |
| `Bash: set` | 3 |
| `Bash: S=.claude/skills/hd-lang;` | 2 |
| `Bash: rm` | 2 |
| `Bash: mkdir` | 2 |
| `Bash: python3` | 2 |
| `Bash: printf` | 1 |
| `Bash: grep` | 1 |
| `Bash: find` | 1 |
| `Read: /tmp/hd-scaffold/quotes/src/lib.hd` | 1 |
| `Read: /tmp/hd-scaffold/quotes/hd.toml` | 1 |
| `Bash: cat` | 1 |
| `Bash: d=$(mktemp` | 1 |
| `Bash: for` | 1 |
| `Bash: sed` | 1 |
| `Bash: D=.claude/skills/hd-lang/reference/std-index.txt;` | 1 |
| `Bash: cp` | 1 |

## Failures

- **07-sandbox**
  - trial 3: run `data/a.txt data/b.txt`: status 0, stdout "3 data/a.txt\n0 data/b.txt\n3 total\n", stderr ""
