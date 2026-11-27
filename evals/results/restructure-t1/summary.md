# Evaluation: restructure-t1

- Skill: hd-skill 9bf6e76; model: `haiku`; date: 2026-11-27
- Passed: **12 / 12**
- Mean idiom score: **98%**
- Skill opened: 12 / 12
- Total cost: $0.31; turns: 280

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 100% | 10/10 | yes | 0 | 2 (0) | 19 | $0.02 |
| 02-todos | ✅ | ok | 5/5 | – | 100% | 18/18 | yes | 4 | 5 (3) | 26 | $0.02 |
| 03-config | ✅ | ok | 11/11 | – | 100% | 23/23 | yes | 2 | 5 (2) | 24 | $0.03 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 6/6 | yes | 4 | 3 (0) | 22 | $0.02 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 6/6 | yes | 2 | 2 (0) | 18 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 7/7 | yes | 0 | 4 (2) | 24 | $0.04 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 13/13 | yes | 6 | 4 (1) | 34 | $0.03 |
| 08-derive-template | ✅ | ok | 2/2 | – | 100% | 5/5 | yes | 3 | 3 (0) | 16 | $0.01 |
| 09-contracts | ✅ | ok | 6/6 | – | 75% | 19/19 | yes | 4 | 3 (1) | 28 | $0.03 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 17/17 | yes | 0 | 3 (0) | 20 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 100% | 30/30 | yes | 4 | 3 (0) | 21 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 11/11 | yes | 3 | 7 (3) | 28 | $0.03 |

## Idiom checks missed

- **09-contracts**: postconditions with ensure

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `syntax-error` | 8 |
| `unknown-trait` | 8 |
| `unsatisfied-trait-bound` | 6 |
| `unknown-name` | 3 |
| `missing-let` | 3 |
| `type-mismatch` | 2 |
| `missing-capability` | 2 |
| `unknown-type` | 2 |
| `local-reference-escapes` | 1 |
| `unknown-import` | 1 |
| `misplaced-tests-block` | 1 |
| `missing-requirement` | 1 |
| `invalid-test-statement` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| language.md | 9 |
| reference/packages.md | 7 |
| design/testing.md | 5 |
| scenarios/configuration.md | 2 |
| design/effects.md | 2 |
| scenarios/files-and-directories.md | 1 |
| scenarios/cli-tool.md | 1 |
| design/capabilities.md | 1 |
| design/derive.md | 1 |
| design/contracts.md | 1 |
| scenarios/parser.md | 1 |
| packages.md | 1 |

## Failures

