# Evaluation: restructure-t2

- Skill: hd-skill 9bf6e76; model: `haiku`; date: 2026-11-27
- Passed: **12 / 12**
- Mean idiom score: **97%**
- Skill opened: 12 / 12
- Total cost: $0.30; turns: 275

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 100% | 15/15 | yes | 8 | 3 (0) | 35 | $0.03 |
| 02-todos | ✅ | ok | 5/5 | – | 100% | 14/14 | yes | 1 | 5 (1) | 22 | $0.02 |
| 03-config | ✅ | ok | 11/11 | – | 60% | 24/24 | yes | 3 | 4 (2) | 31 | $0.03 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 7/7 | yes | 3 | 3 (1) | 20 | $0.02 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 7/7 | yes | 4 | 6 (3) | 21 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 10/10 | yes | 5 | 3 (0) | 19 | $0.03 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 9/9 | yes | 6 | 3 (1) | 20 | $0.02 |
| 08-derive-template | ✅ | ok | 2/2 | – | 100% | 5/5 | yes | 4 | 2 (0) | 17 | $0.01 |
| 09-contracts | ✅ | ok | 6/6 | – | 100% | 19/19 | yes | 4 | 3 (0) | 21 | $0.02 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 25/25 | yes | 1 | 4 (1) | 26 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 100% | 33/33 | yes | 3 | 3 (0) | 18 | $0.02 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 15/15 | yes | 0 | 5 (2) | 25 | $0.04 |

## Idiom checks missed

- **03-config**: rules written as @derive(Validate) field facts; uses @range / @length facts

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `syntax-error` | 11 |
| `unknown-trait` | 6 |
| `type-mismatch` | 3 |
| `unknown-method` | 1 |
| `not-callable` | 1 |
| `unknown-name` | 1 |
| `unsatisfied-trait-bound` | 1 |
| `invalid-test-statement` | 1 |
| `missing-requirement` | 1 |
| `missing-let` | 1 |
| `not-writable` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| language.md | 11 |
| reference/packages.md | 7 |
| design/testing.md | 6 |
| design/effects.md | 3 |
| scenarios/cli-tool.md | 2 |
| design/errors.md | 2 |
| design/capabilities.md | 2 |
| design/contracts.md | 2 |
| scenarios/stdin-filter.md | 1 |
| packages.md | 1 |
| scenarios/configuration.md | 1 |
| design/concurrency.md | 1 |
| scenarios/files-and-directories.md | 1 |
| design/derive.md | 1 |
| scenarios/parser.md | 1 |

## Failures

