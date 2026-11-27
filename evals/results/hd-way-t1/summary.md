# Evaluation: hd-way-t1

- Skill: hd-skill fc82f0c + uncommitted skill changes; model: `haiku`; date: 2026-11-27
- Passed: **12 / 12**
- Mean idiom score: **88%**
- Skill opened: 12 / 12
- Total cost: $0.28; turns: 311

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 100% | 16/16 | yes | 2 | 5 (2) | 26 | $0.03 |
| 02-todos | ✅ | ok | 5/5 | – | 75% | 14/14 | yes | 0 | 7 (2) | 18 | $0.02 |
| 03-config | ✅ | ok | 11/11 | – | 60% | 13/13 | yes | 4 | 2 (0) | 27 | $0.02 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 7/7 | yes | 5 | 5 (2) | 28 | $0.02 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 6/6 | yes | 7 | 6 (2) | 30 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 9/9 | yes | 0 | 4 (1) | 27 | $0.03 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 6/6 | yes | 9 | 5 (0) | 32 | $0.03 |
| 08-derive-template | ✅ | ok | 2/2 | – | 100% | 4/4 | yes | 0 | 4 (1) | 21 | $0.02 |
| 09-contracts | ✅ | ok | 6/6 | – | 75% | 8/8 | yes | 3 | 4 (0) | 27 | $0.02 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 17/17 | yes | 1 | 8 (0) | 25 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 50% | 15/15 | yes | 0 | 5 (1) | 26 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 9/9 | yes | 3 | 2 (0) | 24 | $0.02 |

## Idiom checks missed

- **02-todos**: round trip checked with a property test
- **03-config**: rules written as @derive(Validate) field facts; uses @range / @length facts
- **09-contracts**: postconditions with ensure
- **11-calc**: CalcError declared with @error; table tests with it_each

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `not-writable` | 22 |
| `type-mismatch` | 9 |
| `missing-capability` | 8 |
| `unknown-name` | 5 |
| `syntax-error` | 3 |
| `unknown-method` | 3 |
| `unknown-trait` | 3 |
| `missing-let` | 3 |
| `argument-count` | 2 |
| `unknown-import` | 1 |
| `unsatisfied-trait-bound` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| references/testing/unit-tests.md | 5 |
| references/cli/packages.md | 4 |
| references/std/collections.md | 2 |
| references/testing/integration.md | 2 |
| references/std/host.md | 2 |
| references/language/requirements.md | 2 |
| references/testing/fakes.md | 2 |
| references/language/collections.md | 2 |
| references/std/text.md | 1 |
| references/std/api/collections-map.md | 1 |
| references/std/api/time.md | 1 |
| references/language/traits.md | 1 |
| references/language/suspension.md | 1 |
| references/language/modules.md | 1 |
| references/how-to/files-and-directories.md | 1 |
| references/how-to/cli-tool.md | 1 |
| references/language/errors.md | 1 |
| design/contracts.md | 1 |
| references/language/data.md | 1 |

## Failures

