# Evaluation: split

12 tasks × 3 trials = 36 runs (split-t1, split-t2, split-t3).

- Runs passed: **34 / 36** (94%)
- Tasks passed in every trial: **10 / 12**; in at least one: 12 / 12
- Hidden cases passed: 201 / 210
- Mean idiom score: **96%**
- Package checks clean: 36 / 36; `hd fmt` clean: 36 / 36
- Skill opened: 36 / 36; reference pages opened per run: 3.0
- `hd check` calls per run: 3.9, of which failing: 0.9; `hd doc` invocations: 29 in all
- Turns per run: 23.8; time per run: 71 s; total cost: $0.90

## By task

| Task | Scenario | Passed | Hidden | Runs | Idiom | Failing / all checks | Pages | Turns |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | CLI over standard input | 3/3 | 15/15 | 12/12 | 89% | 3/20 | 4.3 | 34 |
| 02-todos | JSON in and out | 2/3 | 10/15 | – | 75% | 2/10 | 2.0 | 21 |
| 03-config | configuration from file and environment | 3/3 | 33/33 | – | 100% | 2/10 | 3.7 | 20 |
| 04-ratelimit | time-dependent logic | 2/3 | 8/12 | – | 100% | 3/13 | 4.0 | 29 |
| 05-users | service with a user-defined effect | 3/3 | 9/9 | 3/3 | 100% | 5/11 | 0.3 | 20 |
| 06-quotes | concurrent calls with retries | 3/3 | 12/12 | – | 100% | 5/11 | 2.0 | 23 |
| 07-sandbox | sandboxed program | 3/3 | – | 9/9 | 100% | 1/8 | 5.3 | 25 |
| 08-derive-template | custom derive | 3/3 | 6/6 | – | 100% | 4/13 | 3.3 | 22 |
| 09-contracts | invariants | 3/3 | 18/18 | – | 92% | 1/7 | 4.7 | 20 |
| 10-rle | algorithm with properties | 3/3 | 15/15 | – | 100% | 2/12 | 0.7 | 20 |
| 11-calc | parser and interpreter | 3/3 | 60/60 | – | 100% | 1/12 | 3.3 | 21 |
| 12-lru | stateful data structure | 3/3 | 15/15 | – | 100% | 4/13 | 2.3 | 31 |

## Idiom checks

How often each design move appeared, across trials.

| Task | Check | Hit |
| --- | --- | --- |
| 01-colsum | options parsed with @derive(Cli) | 2/3 |
| 01-colsum | SumError declared with @error | 3/3 |
| 01-colsum | writes at least 2 test cases of its own | 3/3 |
| 02-todos | JSON through @derive(Serialize, Deserialize) | 2/3 |
| 02-todos | done defaults with a field default | 2/3 |
| 02-todos | round trip checked with a property test | 2/3 |
| 02-todos | writes at least 2 test cases of its own | 3/3 |
| 03-config | rules written as @derive(Validate) field facts | 3/3 |
| 03-config | uses @range / @length facts | 3/3 |
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
| `not-writable` | 20 | 5 |
| `missing-requirement` | 18 | 7 |
| `type-mismatch` | 14 | 3 |
| `unknown-name` | 14 | 3 |
| `missing-contextual-enum-type` | 12 | 1 |
| `unsatisfied-trait-bound` | 10 | 2 |
| `syntax-error` | 9 | 6 |
| `unknown-method` | 8 | 2 |
| `missing-capability` | 7 | 5 |
| `unknown-type` | 5 | 3 |
| `missing-let` | 4 | 2 |
| `decorator-not-top-level` | 4 | 2 |
| `invalid-test-statement` | 3 | 2 |
| `local-reference-escapes` | 2 | 2 |
| `unknown-variant` | 1 | 1 |
| `trait-used-as-type` | 1 | 1 |
| `marker-template` | 1 | 1 |
| `misplaced-tests-block` | 1 | 1 |
| `discarded-must-use-value` | 1 | 1 |

## Reference pages opened

| Page | Runs |
| --- | --- |
| language.md | 28 |
| reference/packages.md | 21 |
| design/testing.md | 15 |
| scenarios/cli-tool.md | 6 |
| design/capabilities.md | 4 |
| scenarios/configuration.md | 3 |
| design/effects.md | 3 |
| scenarios/files-and-directories.md | 3 |
| design/derive.md | 3 |
| design/contracts.md | 3 |
| scenarios/parser.md | 3 |
| scenarios/stdin-filter.md | 2 |
| scenarios/text-records.md | 2 |
| reference/std/README.md | 2 |
| scenarios/project-layout.md | 2 |
| cli.md | 2 |
| reference/std/time.md | 1 |
| design/concurrency.md | 1 |
| design/errors.md | 1 |
| scenarios/concurrent-work.md | 1 |
| reference/std/contract.md | 1 |
| scenarios/performance.md | 1 |

## Denied tool calls

| Call | Times |
| --- | --- |
| `Bash: cd` | 13 |
| `Bash: hd` | 6 |
| `Bash: ls` | 5 |
| `Bash: cat` | 3 |
| `Bash: printf` | 3 |
| `Bash: mkdir` | 2 |
| `Bash: rm` | 2 |
| `Bash: sed` | 1 |
| `Bash: grep` | 1 |
| `Bash: S=/private/var/folders/qt/_jh_5zt97cd748zcbynvz1v40000gn/T/hd-skill-evals/split-t1/07-sandbox/linecount/.claude/skills/hd-lang/reference/std;` | 1 |
| `Write: /private/var/folders/qt/_jh_5zt97cd748zcbynvz1v40000gn/T/hd-scratch-probe/probe.hd` | 1 |
| `Bash: d=$(mktemp` | 1 |
| `Bash: wc` | 1 |
| `Bash: n=$(grep` | 1 |
| `Bash: S=.claude/skills/hd-lang;` | 1 |

## Failures

- **02-todos**
  - trial 2: hidden tests don't compile: tests/zz_hidden_eval.hd:6: missing-required-field: `done` is required in `Todo`
- **04-ratelimit**
  - trial 3: hidden tests don't compile: tests/zz_hidden_eval.hd:1: unknown-module: no module named `ratelimit.limiter`
