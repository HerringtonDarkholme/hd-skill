# Evaluation: hd-way-t2

- Skill: hd-skill fc82f0c + uncommitted skill changes; model: `haiku`; date: 2026-11-27
- Passed: **12 / 12**
- Mean idiom score: **94%**
- Skill opened: 12 / 12
- Total cost: $0.26; turns: 302

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 100% | 13/13 | yes | 11 | 0 (0) | 20 | $0.02 |
| 02-todos | ✅ | ok | 5/5 | – | 75% | 12/12 | yes | 0 | 4 (1) | 23 | $0.02 |
| 03-config | ✅ | ok | 11/11 | – | 100% | 15/15 | yes | 4 | 3 (1) | 22 | $0.02 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 6/6 | yes | 7 | 5 (2) | 31 | $0.02 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 5/5 | yes | 8 | 3 (0) | 22 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 10/10 | yes | 0 | 4 (1) | 30 | $0.03 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 10/10 | yes | 2 | 6 (1) | 25 | $0.02 |
| 08-derive-template | ✅ | ok | 2/2 | – | 100% | 5/5 | yes | 3 | 4 (1) | 21 | $0.01 |
| 09-contracts | ✅ | ok | 6/6 | – | 75% | 10/10 | yes | 5 | 2 (0) | 20 | $0.02 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 11/11 | yes | 0 | 6 (2) | 28 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 75% | 13/13 | yes | 0 | 6 (1) | 31 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 11/11 | yes | 0 | 7 (1) | 29 | $0.02 |

## Idiom checks missed

- **02-todos**: round trip checked with a property test
- **09-contracts**: postconditions with ensure
- **11-calc**: CalcError declared with @error

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `not-writable` | 20 |
| `unknown-method` | 7 |
| `type-mismatch` | 7 |
| `missing-capability` | 4 |
| `unknown-trait` | 4 |
| `trailing-block-position` | 3 |
| `unknown-import` | 3 |
| `unknown-name` | 3 |
| `syntax-error` | 2 |
| `missing-let` | 2 |
| `misplaced-tests-block` | 1 |
| `unsatisfied-trait-bound` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| references/cli/packages.md | 6 |
| references/language/modules.md | 5 |
| references/testing/unit-tests.md | 5 |
| references/language/errors.md | 2 |
| references/std/host.md | 2 |
| references/std/api/README.md | 2 |
| references/testing/fakes.md | 2 |
| references/how-to/cli-tool.md | 1 |
| references/how-to/stdin-filter.md | 1 |
| references/how-to/text-records.md | 1 |
| references/how-to/common-operations.md | 1 |
| references/std/api/console.md | 1 |
| references/std/validate.md | 1 |
| references/std/api/time.md | 1 |
| references/std/api/collections-map.md | 1 |
| references/std/api/collections-list.md | 1 |
| references/language/requirements.md | 1 |
| references/language/traits.md | 1 |
| references/how-to/project-layout.md | 1 |
| references/cli/commands.md | 1 |
| design/derive.md | 1 |
| design/contracts.md | 1 |
| references/language/data.md | 1 |

## Failures

