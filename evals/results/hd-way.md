# Evaluation: hd-way

12 tasks × 3 trials = 36 runs (hd-way-t1, hd-way-t2, hd-way-t3).

- Runs passed: **36 / 36** (100%)
- Tasks passed in every trial: **12 / 12**; in at least one: 12 / 12
- Hidden cases passed: 210 / 210
- Mean idiom score: **92%**
- Package checks clean: 36 / 36; `hd fmt` clean: 35 / 36
- Skill opened: 36 / 36; reference pages opened per run: 2.9
- `hd check` calls per run: 4.5, of which failing: 0.9; `hd doc` invocations: 38 in all
- Turns per run: 25.3; time per run: 65 s; total cost: $0.81

## By task

| Task | Scenario | Passed | Hidden | Runs | Idiom | Failing / all checks | Pages | Turns |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | CLI over standard input | 3/3 | 15/15 | 12/12 | 100% | 5/12 | 7.3 | 29 |
| 02-todos | JSON in and out | 3/3 | 15/15 | – | 75% | 3/12 | 0.7 | 18 |
| 03-config | configuration from file and environment | 3/3 | 33/33 | – | 73% | 2/10 | 2.7 | 24 |
| 04-ratelimit | time-dependent logic | 3/3 | 12/12 | – | 100% | 5/16 | 6.3 | 29 |
| 05-users | service with a user-defined effect | 3/3 | 9/9 | 3/3 | 100% | 3/13 | 5.0 | 24 |
| 06-quotes | concurrent calls with retries | 3/3 | 12/12 | – | 100% | 3/13 | 1.0 | 25 |
| 07-sandbox | sandboxed program | 3/3 | – | 9/9 | 100% | 1/15 | 5.7 | 30 |
| 08-derive-template | custom derive | 3/3 | 6/6 | – | 100% | 3/12 | 1.3 | 23 |
| 09-contracts | invariants | 3/3 | 18/18 | – | 83% | 1/14 | 2.7 | 23 |
| 10-rle | algorithm with properties | 3/3 | 15/15 | – | 100% | 2/18 | 0.3 | 24 |
| 11-calc | parser and interpreter | 3/3 | 60/60 | – | 75% | 3/16 | 0.0 | 28 |
| 12-lru | stateful data structure | 3/3 | 15/15 | – | 100% | 1/12 | 2.3 | 26 |

## Idiom checks

How often each design move appeared, across trials.

| Task | Check | Hit |
| --- | --- | --- |
| 01-colsum | options parsed with @derive(Cli) | 3/3 |
| 01-colsum | SumError declared with @error | 3/3 |
| 01-colsum | writes at least 2 test cases of its own | 3/3 |
| 02-todos | JSON through @derive(Serialize, Deserialize) | 3/3 |
| 02-todos | done defaults with a field default | 3/3 |
| 02-todos | round trip checked with a property test | 0/3 |
| 02-todos | writes at least 2 test cases of its own | 3/3 |
| 03-config | rules written as @derive(Validate) field facts | 1/3 |
| 03-config | uses @range / @length facts | 1/3 |
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
| 11-calc | CalcError declared with @error | 1/3 |
| 11-calc | table tests with it_each | 2/3 |
| 11-calc | writes at least 2 test cases of its own | 3/3 |
| 12-lru | a generated-operations test (it_prop / it_prop_with / commands) | 3/3 |
| 12-lru | writes at least 2 test cases of its own | 3/3 |

## Diagnostics the agents hit

From `hd` output in the transcripts, while the agents worked.

| Code | Times | Runs |
| --- | --- | --- |
| `not-writable` | 67 | 4 |
| `syntax-error` | 26 | 9 |
| `unknown-trait` | 23 | 6 |
| `type-mismatch` | 22 | 4 |
| `missing-capability` | 18 | 16 |
| `unknown-method` | 10 | 4 |
| `unknown-name` | 8 | 3 |
| `unknown-import` | 6 | 5 |
| `missing-let` | 5 | 3 |
| `trailing-block-position` | 3 | 1 |
| `unsatisfied-trait-bound` | 2 | 2 |
| `unknown-type` | 2 | 2 |
| `discarded-must-use-value` | 2 | 1 |
| `argument-count` | 2 | 1 |
| `missing-requirement` | 1 | 1 |
| `misplaced-tests-block` | 1 | 1 |

## Reference pages opened

| Page | Runs |
| --- | --- |
| references/cli/packages.md | 14 |
| references/testing/unit-tests.md | 13 |
| references/language/modules.md | 7 |
| references/testing/fakes.md | 7 |
| references/std/host.md | 6 |
| references/language/requirements.md | 5 |
| references/testing/integration.md | 4 |
| references/how-to/cli-tool.md | 4 |
| references/language/errors.md | 4 |
| references/std/api/README.md | 3 |
| references/std/api/time.md | 3 |
| references/language/data.md | 3 |
| references/language/collections.md | 3 |
| references/std/collections.md | 2 |
| references/how-to/stdin-filter.md | 2 |
| references/how-to/common-operations.md | 2 |
| references/std/api/collections-map.md | 2 |
| references/language/traits.md | 2 |
| references/cli/commands.md | 2 |
| design/derive.md | 2 |
| design/contracts.md | 2 |
| references/how-to/text-records.md | 1 |
| references/std/api/console.md | 1 |
| references/std/text.md | 1 |
| references/std/validate.md | 1 |
| references/std/api/collections-list.md | 1 |
| references/language/suspension.md | 1 |
| references/how-to/project-layout.md | 1 |
| references/how-to/concurrent-work.md | 1 |
| references/how-to/files-and-directories.md | 1 |
| references/how-to/configuration.md | 1 |
| references/mistakes/requirements.md | 1 |
| references/std/api/testing.md | 1 |

## Denied tool calls

| Call | Times |
| --- | --- |
| `Bash: cd` | 12 |
| `Bash: hd` | 10 |
| `Bash: sed` | 7 |
| `Bash: S=.claude/skills/hd-lang/references;` | 6 |
| `Bash: cat` | 4 |
| `Bash: mkdir` | 4 |
| `Bash: ls` | 3 |
| `Bash: rm` | 2 |
| `Bash: ln` | 2 |
| `Bash: S=/private/var/folders/qt/_jh_5zt97cd748zcbynvz1v40000gn/T/hd-skill-evals/hd-way-t2/01-colsum/colsum/.claude/skills/hd-lang/references;` | 1 |
| `Bash: printf` | 1 |
| `Bash: S=.claude/skill` | 1 |
| `Read: /tmp/hd-scratch-config/cfgprobe/hd.toml` | 1 |
| `Read: /tmp/hd-scratch-config/cfgprobe/src/lib.hd` | 1 |
| `Read: /tmp/hd-scratch-config/cfgprobe/tests/cfgprobe.hd` | 1 |
| `Bash: mv` | 1 |
| `Bash: grep` | 1 |
| `Bash: python3` | 1 |
| `Write: /private/var/folders/qt/_jh_5zt97cd748zcbynvz1v40000gn/T/hd-probe/probe.hd` | 1 |
| `Write: /tmp/hd-scratch-bank/overdraft.hd` | 1 |
| `Bash: perl` | 1 |
| `Bash: P=$(mktemp` | 1 |
| `Bash: R=.claude/skills/hd-lang/references;` | 1 |

## Failures

