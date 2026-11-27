# Evaluation: baseline-t2

- Skill: hd-skill fc82f0c + uncommitted skill changes; model: `haiku`; date: 2026-11-27
- Passed: **10 / 12**
- Mean idiom score: **79%**
- Skill opened: 12 / 12
- Total cost: $0.30; turns: 315

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 100% | 13/13 | yes | 5 | 3 (1) | 22 | $0.02 |
| 02-todos | ✅ | ok | 5/5 | – | 75% | 14/14 | yes | 0 | 5 (0) | 18 | $0.02 |
| 03-config | ❌ | ok | 0/11 | – | 60% | 15/15 | yes | 0 | 5 (2) | 19 | $0.02 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 6/6 | yes | 8 | 5 (2) | 38 | $0.03 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 80% | 4/4 | yes | 0 | 4 (1) | 16 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 80% | 6/6 | yes | 9 | 4 (1) | 27 | $0.03 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 13/13 | yes | 3 | 3 (0) | 28 | $0.03 |
| 08-derive-template | ❌ | ok | 0/2 | – | 33% | 2/2 | yes | 2 | 12 (7) | 42 | $0.03 |
| 09-contracts | ✅ | ok | 6/6 | – | 75% | 6/6 | yes | 0 | 5 (1) | 33 | $0.02 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 17/17 | yes | 0 | 5 (1) | 25 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 50% | 10/10 | yes | 3 | 4 (1) | 25 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 11/11 | yes | 3 | 4 (1) | 22 | $0.03 |

## Idiom checks missed

- **02-todos**: round trip checked with a property test
- **03-config**: rules written as @derive(Validate) field facts; uses @range / @length facts
- **05-users**: UserError declared with @error
- **06-quotes**: retries through std.task retry/Backoff
- **08-derive-template**: a derive template: impl[T] FieldNames for T by Structure; walks members with a Walker
- **09-contracts**: postconditions with ensure
- **11-calc**: CalcError declared with @error; table tests with it_each

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `underivable-trait` | 12 |
| `missing-capability` | 8 |
| `unknown-name` | 8 |
| `missing-requirement` | 6 |
| `non-reassignable-binding` | 4 |
| `unknown-type` | 4 |
| `unknown-trait` | 3 |
| `type-mismatch` | 3 |
| `unknown-import` | 2 |
| `syntax-error` | 2 |
| `not-writable` | 2 |
| `member-not-derivable` | 2 |
| `prelude-name-shadow` | 1 |
| `missing-let` | 1 |
| `unknown-method` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| references/cli/packages.md | 7 |
| references/testing/unit-tests.md | 3 |
| references/language/modules.md | 3 |
| references/how-to/cli-tool.md | 2 |
| references/testing/fakes.md | 2 |
| references/language/requirements.md | 2 |
| references/language/traits.md | 2 |
| references/how-to/stdin-filter.md | 1 |
| references/how-to/text-records.md | 1 |
| references/std/api/collections-map.md | 1 |
| references/std/api/time.md | 1 |
| references/language/collections.md | 1 |
| references/how-to/shared-state.md | 1 |
| references/language/suspension.md | 1 |
| references/how-to/concurrent-work.md | 1 |
| references/language/errors.md | 1 |
| references/how-to/files-and-directories.md | 1 |
| references/how-to/project-layout.md | 1 |
| references/language/data.md | 1 |

## Failures

- **03-config**
  - hidden tests did not compile: tests/zz_hidden_eval.hd:19: private-member: `Config` has the private field `host`, so only its module can construct or copy it / tests/zz_hidden_eval.hd:22: private-member: `Config` has the private field `host`, so only its module can construct or copy it
- **08-derive-template**
  - hidden tests did not compile: tests/zz_hidden_eval.hd:3: underivable-trait: `FieldNames` has no template and cannot be derived / tests/zz_hidden_eval.hd:10: underivable-trait: `FieldNames` has no template and cannot be derived
