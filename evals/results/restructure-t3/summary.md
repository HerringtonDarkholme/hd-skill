# Evaluation: restructure-t3

- Skill: hd-skill 9bf6e76; model: `haiku`; date: 2026-11-27
- Passed: **11 / 12**
- Mean idiom score: **100%**
- Skill opened: 12 / 12
- Total cost: $0.45; turns: 295

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 100% | 16/16 | yes | 7 | 5 (2) | 25 | $0.02 |
| 02-todos | ✅ | ok | 5/5 | – | 100% | 22/22 | yes | 1 | 6 (2) | 23 | $0.02 |
| 03-config | ✅ | ok | 11/11 | – | 100% | 13/13 | yes | 3 | 5 (1) | 21 | $0.02 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 7/7 | yes | 0 | 3 (1) | 23 | $0.02 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 6/6 | yes | 4 | 3 (1) | 17 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 9/9 | yes | 3 | 3 (1) | 34 | $0.17 |
| 07-sandbox | ❌ | ok | – | 2/3 | 100% | 7/7 | yes | 6 | 5 (1) | 26 | $0.03 |
| 08-derive-template | ✅ | ok | 2/2 | – | 100% | 4/4 | yes | 3 | 15 (6) | 42 | $0.04 |
| 09-contracts | ✅ | ok | 6/6 | – | 100% | 16/16 | yes | 4 | 3 (0) | 20 | $0.02 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 18/18 | yes | 2 | 4 (1) | 26 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 100% | 27/27 | yes | 1 | 5 (0) | 20 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 10/10 | yes | 1 | 2 (0) | 18 | $0.03 |

## Idiom checks missed


## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `unknown-trait` | 20 |
| `unsatisfied-trait-bound` | 7 |
| `unknown-method` | 6 |
| `syntax-error` | 4 |
| `type-mismatch` | 3 |
| `unknown-type` | 3 |
| `unknown-name` | 2 |
| `missing-capability` | 2 |
| `not-callable` | 2 |
| `missing-requirement` | 2 |
| `unknown-import` | 1 |
| `local-reference-escapes` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| language.md | 9 |
| reference/packages.md | 6 |
| design/testing.md | 5 |
| scenarios/cli-tool.md | 2 |
| design/contracts.md | 2 |
| design/effects.md | 2 |
| cli.md | 1 |
| scenarios/text-records.md | 1 |
| scenarios/stdin-filter.md | 1 |
| scenarios/configuration.md | 1 |
| scenarios/project-layout.md | 1 |
| design/capabilities.md | 1 |
| scenarios/files-and-directories.md | 1 |
| design/derive.md | 1 |
| scenarios/parser.md | 1 |

## Failures

- **07-sandbox**
  - run `data/a.txt data/b.txt`: status 0, stdout "3 data/a.txt\n0 data/b.txt\n3 total\n", stderr ""
