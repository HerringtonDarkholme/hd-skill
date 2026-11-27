# Evaluation: text-t2

- Skill: hd-skill 1a52669; model: `haiku`; date: 2026-11-27
- Passed: **12 / 12**
- Mean idiom score: **97%**
- Skill opened: 12 / 12
- Total cost: $0.33; turns: 265

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 100% | 14/14 | yes | 5 | 4 (1) | 30 | $0.03 |
| 02-todos | ✅ | ok | 5/5 | – | 100% | 15/15 | yes | 5 | 0 (0) | 12 | $0.02 |
| 03-config | ✅ | ok | 11/11 | – | 60% | 12/12 | yes | 3 | 5 (2) | 26 | $0.03 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 6/6 | yes | 4 | 2 (0) | 29 | $0.04 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 7/7 | yes | 0 | 4 (0) | 17 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 8/8 | yes | 5 | 3 (1) | 21 | $0.03 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 10/10 | yes | 6 | 3 (0) | 24 | $0.03 |
| 08-derive-template | ✅ | ok | 2/2 | – | 100% | 6/6 | yes | 2 | 4 (2) | 22 | $0.02 |
| 09-contracts | ✅ | ok | 6/6 | – | 100% | 18/18 | yes | 0 | 3 (0) | 18 | $0.02 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 20/20 | yes | 0 | 6 (1) | 24 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 100% | 34/34 | yes | 2 | 2 (0) | 16 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 12/12 | yes | 3 | 5 (0) | 26 | $0.03 |

## Idiom checks missed

- **03-config**: rules written as @derive(Validate) field facts; uses @range / @length facts

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `doc-comment-without-target` | 5 |
| `unknown-trait` | 3 |
| `missing-contextual-enum-type` | 2 |
| `syntax-error` | 2 |
| `missing-capability` | 2 |
| `missing-requirement` | 1 |
| `mixed-signedness` | 1 |
| `unsatisfied-trait-bound` | 1 |
| `unknown-method` | 1 |
| `trait-used-as-type` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| language.md | 8 |
| reference/packages.md | 7 |
| design/testing.md | 6 |
| scenarios/cli-tool.md | 2 |
| design/effects.md | 2 |
| scenarios/stdin-filter.md | 1 |
| scenarios/text-records.md | 1 |
| design/derive.md | 1 |
| std.md | 1 |
| scenarios/configuration.md | 1 |
| design/concurrency.md | 1 |
| scenarios/files-and-directories.md | 1 |
| design/capabilities.md | 1 |
| scenarios/parser.md | 1 |
| scenarios/project-layout.md | 1 |

## Failures

