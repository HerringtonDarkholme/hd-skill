# Evaluation: hd-way-t3

- Skill: hd-skill fc82f0c + uncommitted skill changes; model: `haiku`; date: 2026-11-27
- Passed: **12 / 12**
- Mean idiom score: **95%**
- Skill opened: 12 / 12
- Total cost: $0.27; turns: 297

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 100% | 18/18 | yes | 9 | 7 (3) | 40 | $0.04 |
| 02-todos | ✅ | ok | 5/5 | – | 75% | 7/7 | yes | 2 | 1 (0) | 13 | $0.01 |
| 03-config | ✅ | ok | 11/11 | – | 60% | 14/14 | yes | 0 | 5 (1) | 23 | $0.02 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 7/7 | yes | 7 | 6 (1) | 27 | $0.02 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 5/5 | yes | 0 | 4 (1) | 21 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 8/8 | yes | 3 | 5 (1) | 19 | $0.02 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 4/4 | yes | 6 | 4 (0) | 33 | $0.03 |
| 08-derive-template | ✅ | ok | 2/2 | – | 100% | 5/5 | yes | 1 | 4 (1) | 26 | $0.02 |
| 09-contracts | ✅ | ok | 6/6 | – | 100% | 8/8 | yes | 0 | 8 (1) | 22 | $0.02 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 18/18 | yes | 0 | 4 (0) | 20 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 100% | 35/35 | yes | 0 | 5 (1) | 27 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 12/12 | yes | 4 | 3 (0) | 26 | $0.03 |

## Idiom checks missed

- **02-todos**: round trip checked with a property test
- **03-config**: rules written as @derive(Validate) field facts; uses @range / @length facts

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `not-writable` | 25 |
| `syntax-error` | 21 |
| `unknown-trait` | 16 |
| `type-mismatch` | 6 |
| `missing-capability` | 6 |
| `unknown-type` | 2 |
| `unknown-import` | 2 |
| `discarded-must-use-value` | 2 |
| `missing-requirement` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| references/cli/packages.md | 4 |
| references/testing/unit-tests.md | 3 |
| references/testing/fakes.md | 3 |
| references/how-to/cli-tool.md | 2 |
| references/testing/integration.md | 2 |
| references/std/host.md | 2 |
| references/language/requirements.md | 2 |
| references/how-to/stdin-filter.md | 1 |
| references/language/errors.md | 1 |
| references/how-to/common-operations.md | 1 |
| references/language/modules.md | 1 |
| references/std/api/README.md | 1 |
| references/std/api/time.md | 1 |
| references/language/data.md | 1 |
| references/how-to/concurrent-work.md | 1 |
| references/cli/commands.md | 1 |
| references/how-to/configuration.md | 1 |
| references/mistakes/requirements.md | 1 |
| design/derive.md | 1 |
| references/language/collections.md | 1 |
| references/std/api/testing.md | 1 |

## Failures

