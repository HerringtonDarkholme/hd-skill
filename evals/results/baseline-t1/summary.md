# Evaluation: baseline-t1

- Skill: hd-skill 5ccaa45; model: `haiku`; date: 2026-11-27
- Passed: **10 / 12**
- Mean idiom score: **80%**
- Skill opened: 12 / 12
- Total cost: $0.30; turns: 316

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 67% | 14/14 | yes | 9 | 4 (1) | 30 | $0.03 |
| 02-todos | ✅ | ok | 5/5 | – | 75% | 15/15 | yes | 4 | 3 (1) | 22 | $0.02 |
| 03-config | ❌ | ok | 0/11 | – | 100% | 13/13 | yes | 4 | 4 (1) | 21 | $0.03 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 6/6 | yes | 11 | 4 (0) | 24 | $0.02 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 80% | 4/4 | yes | 6 | 2 (0) | 21 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 80% | 6/6 | yes | 0 | 2 (0) | 18 | $0.02 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 8/8 | yes | 5 | 4 (1) | 30 | $0.03 |
| 08-derive-template | ❌ | ok | 0/2 | – | 33% | 2/2 | yes | 5 | 11 (4) | 44 | $0.03 |
| 09-contracts | ✅ | ok | 6/6 | – | 75% | 7/7 | yes | 1 | 2 (0) | 35 | $0.03 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 16/16 | yes | 0 | 5 (1) | 17 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 50% | 15/15 | yes | 7 | 3 (0) | 26 | $0.04 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 12/12 | yes | 0 | 6 (1) | 28 | $0.02 |

## Idiom checks missed

- **01-colsum**: SumError declared with @error
- **02-todos**: round trip checked with a property test
- **05-users**: UserError declared with @error
- **06-quotes**: retries through std.task retry/Backoff
- **08-derive-template**: a derive template: impl[T] FieldNames for T by Structure; walks members with a Walker
- **09-contracts**: postconditions with ensure
- **11-calc**: CalcError declared with @error; table tests with it_each

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `unsatisfied-trait-bound` | 18 |
| `underivable-trait` | 8 |
| `missing-capability` | 6 |
| `unknown-field` | 4 |
| `private-member` | 4 |
| `type-mismatch` | 4 |
| `unknown-name` | 3 |
| `type-used-as-value` | 3 |
| `unknown-trait` | 1 |
| `non-reassignable-binding` | 1 |
| `not-writable` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| references/cli/packages.md | 8 |
| references/testing/unit-tests.md | 7 |
| references/language/modules.md | 6 |
| references/std/host.md | 4 |
| references/language/traits.md | 3 |
| references/how-to/cli-tool.md | 2 |
| references/language/errors.md | 2 |
| references/std/text.md | 2 |
| references/std/collections.md | 2 |
| references/testing/fakes.md | 2 |
| references/language/requirements.md | 2 |
| references/language/data.md | 2 |
| references/how-to/stdin-filter.md | 1 |
| references/how-to/configuration.md | 1 |
| references/std/api/README.md | 1 |
| references/std/api/time.md | 1 |
| references/std/api/collections-deque.md | 1 |
| references/std/api/collections-map.md | 1 |
| references/how-to/files-and-directories.md | 1 |
| references/std/api/meta.md | 1 |
| references/language/collections.md | 1 |
| references/language/basics.md | 1 |

## Failures

- **03-config**
  - hidden tests did not compile: tests/zz_hidden_eval.hd:19: private-member: `Config` has the private field `host`, so only its module can construct or copy it / tests/zz_hidden_eval.hd:22: private-member: `Config` has the private field `host`, so only its module can construct or copy it
- **08-derive-template**
  - hidden tests did not compile: tests/zz_hidden_eval.hd:3: underivable-trait: `FieldNames` has no template and cannot be derived / tests/zz_hidden_eval.hd:10: underivable-trait: `FieldNames` has no template and cannot be derived
