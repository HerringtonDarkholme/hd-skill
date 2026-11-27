# Evaluation: text-t1

- Skill: hd-skill 1a52669; model: `haiku`; date: 2026-11-27
- Passed: **12 / 12**
- Mean idiom score: **98%**
- Skill opened: 12 / 12
- Total cost: $0.43; turns: 274

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 100% | 12/12 | yes | 6 | 3 (0) | 22 | $0.03 |
| 02-todos | ✅ | ok | 5/5 | – | 100% | 11/11 | yes | 1 | 4 (2) | 21 | $0.02 |
| 03-config | ✅ | ok | 11/11 | – | 100% | 13/13 | yes | 3 | 5 (3) | 25 | $0.03 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 7/7 | yes | 4 | 3 (1) | 19 | $0.14 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 3/3 | yes | 6 | 2 (0) | 16 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 8/8 | yes | 6 | 2 (0) | 22 | $0.02 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 14/14 | yes | 7 | 5 (1) | 31 | $0.03 |
| 08-derive-template | ✅ | ok | 2/2 | – | 100% | 7/7 | yes | 3 | 4 (1) | 19 | $0.02 |
| 09-contracts | ✅ | ok | 6/6 | – | 75% | 15/15 | yes | 5 | 2 (0) | 22 | $0.03 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 17/17 | yes | 3 | 3 (1) | 18 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 100% | 36/36 | yes | 3 | 8 (1) | 28 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 14/14 | yes | 3 | 4 (1) | 31 | $0.04 |

## Idiom checks missed

- **09-contracts**: postconditions with ensure

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `type-mismatch` | 8 |
| `unknown-trait` | 8 |
| `invalid-test-statement` | 4 |
| `syntax-error` | 3 |
| `unknown-import` | 3 |
| `unknown-name` | 3 |
| `local-reference-escapes` | 2 |
| `unsatisfied-trait-bound` | 2 |
| `unknown-type` | 2 |
| `misplaced-tests-block` | 1 |
| `private-module` | 1 |
| `missing-requirement` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| language.md | 12 |
| reference/packages.md | 11 |
| design/testing.md | 7 |
| design/effects.md | 3 |
| scenarios/cli-tool.md | 2 |
| design/derive.md | 2 |
| design/errors.md | 2 |
| scenarios/text-records.md | 1 |
| scenarios/stdin-filter.md | 1 |
| packages.md | 1 |
| scenarios/configuration.md | 1 |
| scenarios/project-layout.md | 1 |
| design/concurrency.md | 1 |
| scenarios/files-and-directories.md | 1 |
| design/capabilities.md | 1 |
| cli.md | 1 |
| design/contracts.md | 1 |
| scenarios/parser.md | 1 |

## Failures

