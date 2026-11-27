# Evaluation: baseline

12 tasks × 3 trials = 36 runs (baseline-t1, baseline-t2, baseline-t3).

- Runs passed: **31 / 36** (86%)
- Tasks passed in every trial: **10 / 12**; in at least one: 11 / 12
- Hidden cases passed: 182 / 210
- Mean idiom score: **81%**
- Package checks clean: 36 / 36; `hd fmt` clean: 33 / 36
- Skill opened: 36 / 36; reference pages opened per run: 3.3
- `hd check` calls per run: 4.6, of which failing: 1.2; `hd doc` invocations: 90 in all
- Turns per run: 26.1; time per run: 74 s; total cost: $0.91

## By task

| Task | Scenario | Passed | Hidden | Runs | Idiom | Failing / all checks | Pages | Turns |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | CLI over standard input | 3/3 | 15/15 | 12/12 | 78% | 2/10 | 4.7 | 24 |
| 02-todos | JSON in and out | 3/3 | 15/15 | – | 75% | 2/14 | 1.3 | 20 |
| 03-config | configuration from file and environment | 1/3 | 11/33 | – | 100% | 2/9 | 4.0 | 22 |
| 04-ratelimit | time-dependent logic | 3/3 | 12/12 | – | 100% | 4/14 | 7.7 | 33 |
| 05-users | service with a user-defined effect | 3/3 | 9/9 | 3/3 | 87% | 2/10 | 2.0 | 18 |
| 06-quotes | concurrent calls with retries | 3/3 | 12/12 | – | 87% | 4/17 | 6.0 | 28 |
| 07-sandbox | sandboxed program | 3/3 | – | 9/9 | 100% | 2/11 | 2.7 | 26 |
| 08-derive-template | custom derive | 0/3 | 0/6 | – | 22% | 14/28 | 2.3 | 38 |
| 09-contracts | invariants | 3/3 | 18/18 | – | 75% | 5/17 | 0.3 | 38 |
| 10-rle | algorithm with properties | 3/3 | 15/15 | – | 100% | 2/12 | 1.3 | 21 |
| 11-calc | parser and interpreter | 3/3 | 60/60 | – | 50% | 1/11 | 6.3 | 26 |
| 12-lru | stateful data structure | 3/3 | 15/15 | – | 100% | 2/14 | 1.0 | 22 |

## Idiom checks

How often each design move appeared, across trials.

| Task | Check | Hit |
| --- | --- | --- |
| 01-colsum | options parsed with @derive(Cli) | 3/3 |
| 01-colsum | SumError declared with @error | 1/3 |
| 01-colsum | writes at least 2 test cases of its own | 3/3 |
| 02-todos | JSON through @derive(Serialize, Deserialize) | 3/3 |
| 02-todos | done defaults with a field default | 3/3 |
| 02-todos | round trip checked with a property test | 0/3 |
| 02-todos | writes at least 2 test cases of its own | 3/3 |
| 03-config | rules written as @derive(Validate) field facts | 3/3 |
| 03-config | uses @range / @length facts | 3/3 |
| 03-config | error variants convert with @from | 3/3 |
| 03-config | tests use MemoryFs and ScriptedEnv | 3/3 |
| 03-config | writes at least 2 test cases of its own | 3/3 |
| 04-ratelimit | tests control time with ManualClock | 3/3 |
| 04-ratelimit | tests advance virtual time with sleep! | 3/3 |
| 04-ratelimit | writes at least 2 test cases of its own | 3/3 |
| 05-users | logic reaches the store with $.use(UserStore) | 3/3 |
| 05-users | main provides a store with $.with | 3/3 |
| 05-users | tests define their own UserStore fake | 3/3 |
| 05-users | UserError declared with @error | 1/3 |
| 05-users | writes at least 2 test cases of its own | 3/3 |
| 06-quotes | concurrency through map_join (limit 4) | 3/3 |
| 06-quotes | retries through std.task retry/Backoff | 1/3 |
| 06-quotes | tests define their own Quotes fake | 3/3 |
| 06-quotes | tests use ManualClock | 3/3 |
| 06-quotes | writes at least 2 test cases of its own | 3/3 |
| 07-sandbox | [capabilities] grants only Console, Args and FsRead | 3/3 |
| 07-sandbox | FsRead scoped to data/ | 3/3 |
| 08-derive-template | a derive template: impl[T] FieldNames for T by Structure | 0/3 |
| 08-derive-template | walks members with a Walker | 0/3 |
| 08-derive-template | writes at least 2 test cases of its own | 2/3 |
| 09-contracts | preconditions with require | 3/3 |
| 09-contracts | postconditions with ensure | 0/3 |
| 09-contracts | no hand-written panic( for checks | 3/3 |
| 09-contracts | writes at least 2 test cases of its own | 3/3 |
| 10-rle | a property test (it_prop) | 3/3 |
| 10-rle | writes at least 2 test cases of its own | 3/3 |
| 11-calc | a recursive enum for the syntax tree (boxed children) | 3/3 |
| 11-calc | CalcError declared with @error | 0/3 |
| 11-calc | table tests with it_each | 0/3 |
| 11-calc | writes at least 2 test cases of its own | 3/3 |
| 12-lru | a generated-operations test (it_prop / it_prop_with / commands) | 3/3 |
| 12-lru | writes at least 2 test cases of its own | 3/3 |

## Diagnostics the agents hit

From `hd` output in the transcripts, while the agents worked.

| Code | Times | Runs |
| --- | --- | --- |
| `not-writable` | 56 | 3 |
| `missing-requirement` | 30 | 5 |
| `underivable-trait` | 26 | 3 |
| `missing-capability` | 21 | 15 |
| `unsatisfied-trait-bound` | 18 | 2 |
| `unknown-name` | 15 | 5 |
| `unknown-import` | 9 | 4 |
| `unknown-trait` | 8 | 5 |
| `syntax-error` | 7 | 5 |
| `type-mismatch` | 7 | 4 |
| `unknown-type` | 6 | 2 |
| `type-used-as-value` | 5 | 2 |
| `non-reassignable-binding` | 5 | 2 |
| `local-reference-escapes` | 5 | 1 |
| `unknown-field` | 4 | 1 |
| `private-member` | 4 | 1 |
| `cannot-infer-type` | 4 | 1 |
| `missing-let` | 3 | 2 |
| `unregistered-auto-closing` | 3 | 1 |
| `refutable-let-pattern` | 2 | 1 |
| `member-not-derivable` | 2 | 1 |
| `prelude-name-shadow` | 1 | 1 |
| `trait-used-as-type` | 1 | 1 |
| `unknown-method` | 1 | 1 |

## Reference pages opened

| Page | Runs |
| --- | --- |
| references/cli/packages.md | 21 |
| references/testing/unit-tests.md | 14 |
| references/language/modules.md | 13 |
| references/language/traits.md | 7 |
| references/testing/fakes.md | 7 |
| references/std/host.md | 6 |
| references/language/requirements.md | 6 |
| references/language/errors.md | 5 |
| references/how-to/cli-tool.md | 4 |
| references/language/data.md | 4 |
| references/language/collections.md | 3 |
| references/how-to/stdin-filter.md | 2 |
| references/std/text.md | 2 |
| references/std/collections.md | 2 |
| references/std/api/README.md | 2 |
| references/std/api/time.md | 2 |
| references/std/api/collections-map.md | 2 |
| references/language/suspension.md | 2 |
| references/how-to/concurrent-work.md | 2 |
| references/how-to/files-and-directories.md | 2 |
| references/language/basics.md | 2 |
| references/how-to/text-records.md | 1 |
| references/how-to/configuration.md | 1 |
| references/std/api/validate.md | 1 |
| references/std/api/collections-deque.md | 1 |
| references/how-to/shared-state.md | 1 |
| references/std/api/meta.md | 1 |
| references/how-to/project-layout.md | 1 |
| references/how-to/common-operations.md | 1 |
| references/language/references.md | 1 |

## Denied tool calls

| Call | Times |
| --- | --- |
| `Bash: cd` | 16 |
| `Bash: mkdir` | 8 |
| `Bash: hd` | 7 |
| `Bash: rm` | 6 |
| `Bash: sed` | 4 |
| `Bash: S=.claude/skills/hd-lang/references;` | 3 |
| `Bash: cat` | 3 |
| `Bash: H=.claude/skills/hd-lang/references;` | 2 |
| `Bash: ln` | 2 |
| `Bash: S=$(mktemp` | 1 |
| `Bash: R="/private/var/folders/qt/_jh_5zt97cd748zcbynvz1v40000gn/T/hd-skill-evals/baseline-t2/04-ratelimit/ratelimit/.claude/skills/hd-lang/references";` | 1 |
| `Bash: S=.claude/skills/hd-lang/references` | 1 |
| `Write: /private/var/folders/qt/_jh_5zt97cd748zcbynvz1v40000gn/T/hd-skill-evals/scratch-fields/probe.hd` | 1 |
| `Write: /tmp/hdprobe/probe.hd` | 1 |
| `Bash: mv` | 1 |
| `Bash: R=/private/var/folders/qt/_jh_5zt97cd748zcbynvz1v40000gn/T/hd-skill-evals/baseline-t1/09-contracts/bank/.claude/skills/hd-lang/references;` | 1 |
| `Bash: ls` | 1 |
| `Write: /tmp/hd-scratch/probe.hd` | 1 |
| `Bash: python3` | 1 |

## Failures

- **03-config**
  - trial 1: hidden tests don't compile: tests/zz_hidden_eval.hd:19: private-member: `Config` has the private field `host`, so only its module can construct or copy it
  - trial 3: hidden tests don't compile: tests/zz_hidden_eval.hd:19: private-member: `Config` has the private field `host`, so only its module can construct or copy it
- **08-derive-template**
  - trial 1: hidden tests don't compile: tests/zz_hidden_eval.hd:3: underivable-trait: `FieldNames` has no template and cannot be derived
  - trial 2: hidden tests don't compile: tests/zz_hidden_eval.hd:3: underivable-trait: `FieldNames` has no template and cannot be derived
  - trial 3: hidden tests don't compile: tests/zz_hidden_eval.hd:3: underivable-trait: `FieldNames` has no template and cannot be derived
