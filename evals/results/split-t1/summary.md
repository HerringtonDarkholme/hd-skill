# Evaluation: split-t1

- Skill: hd-skill 37c130a; model: `haiku`; date: 2026-11-27
- Passed: **12 / 12**
- Mean idiom score: **100%**
- Skill opened: 12 / 12
- Total cost: $0.30; turns: 283

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 100% | 17/17 | yes | 4 | 8 (1) | 35 | $0.04 |
| 02-todos | ✅ | ok | 5/5 | – | 100% | 13/13 | yes | 2 | 3 (0) | 21 | $0.02 |
| 03-config | ✅ | ok | 11/11 | – | 100% | 16/16 | yes | 3 | 3 (1) | 22 | $0.03 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 5/5 | yes | 0 | 6 (1) | 24 | $0.03 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 3/3 | yes | 0 | 3 (1) | 14 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 6/6 | yes | 0 | 5 (3) | 29 | $0.03 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 11/11 | yes | 5 | 4 (1) | 29 | $0.03 |
| 08-derive-template | ✅ | ok | 2/2 | – | 100% | 6/6 | yes | 4 | 3 (0) | 19 | $0.02 |
| 09-contracts | ✅ | ok | 6/6 | – | 100% | 16/16 | yes | 4 | 2 (0) | 18 | $0.02 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 13/13 | yes | 1 | 4 (1) | 19 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 100% | 32/32 | yes | 3 | 4 (0) | 20 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 11/11 | yes | 3 | 5 (2) | 33 | $0.04 |

## Idiom checks missed


## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `not-writable` | 16 |
| `unknown-trait` | 10 |
| `missing-requirement` | 8 |
| `type-mismatch` | 8 |
| `unknown-method` | 5 |
| `unknown-type` | 4 |
| `syntax-error` | 3 |
| `missing-capability` | 2 |
| `missing-let` | 2 |
| `unknown-name` | 2 |
| `invalid-test-statement` | 1 |
| `discarded-must-use-value` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| language.md | 9 |
| reference/packages.md | 7 |
| design/testing.md | 4 |
| scenarios/cli-tool.md | 2 |
| scenarios/stdin-filter.md | 1 |
| scenarios/configuration.md | 1 |
| scenarios/files-and-directories.md | 1 |
| design/capabilities.md | 1 |
| design/derive.md | 1 |
| design/contracts.md | 1 |
| scenarios/parser.md | 1 |

## Failures

