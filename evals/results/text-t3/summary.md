# Evaluation: text-t3

- Skill: hd-skill 1a52669; model: `haiku`; date: 2026-11-27
- Passed: **11 / 12**
- Mean idiom score: **98%**
- Skill opened: 12 / 12
- Total cost: $0.47; turns: 244

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 100% | 15/15 | yes | 5 | 3 (1) | 20 | $0.02 |
| 02-todos | ✅ | ok | 5/5 | – | 100% | 21/21 | yes | 3 | 5 (2) | 20 | $0.02 |
| 03-config | ❌ | 2 err | 0/11 | – | 100% | 0/0 | yes | 3 | 0 (0) | 12 | $0.02 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 8/8 | yes | 6 | 3 (1) | 28 | $0.22 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 4/4 | yes | 5 | 2 (0) | 16 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 8/8 | yes | 3 | 2 (0) | 19 | $0.02 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 9/9 | yes | 0 | 5 (1) | 22 | $0.03 |
| 08-derive-template | ✅ | ok | 2/2 | – | 100% | 7/7 | yes | 3 | 4 (1) | 20 | $0.01 |
| 09-contracts | ✅ | ok | 6/6 | – | 75% | 18/18 | yes | 4 | 3 (1) | 22 | $0.02 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 20/20 | yes | 3 | 3 (1) | 21 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 100% | 35/35 | yes | 3 | 4 (0) | 20 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 10/10 | yes | 3 | 5 (2) | 24 | $0.03 |

## Idiom checks missed

- **09-contracts**: postconditions with ensure

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `unknown-name` | 16 |
| `unsatisfied-trait-bound` | 12 |
| `unknown-trait` | 4 |
| `unknown-type` | 4 |
| `syntax-error` | 3 |
| `type-mismatch` | 3 |
| `missing-capability` | 2 |
| `missing-requirement` | 1 |
| `private-member` | 1 |
| `missing-let` | 1 |
| `not-writable` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| language.md | 11 |
| reference/packages.md | 8 |
| design/testing.md | 5 |
| design/effects.md | 3 |
| scenarios/configuration.md | 2 |
| scenarios/project-layout.md | 2 |
| cli.md | 2 |
| scenarios/stdin-filter.md | 1 |
| scenarios/text-records.md | 1 |
| scenarios/cli-tool.md | 1 |
| design/concurrency.md | 1 |
| design/derive.md | 1 |
| design/contracts.md | 1 |
| scenarios/parser.md | 1 |
| scenarios/shared-state.md | 1 |

## Failures

- **03-config**
  - check: unknown-trait, type-mismatch
  - hidden tests did not compile: src/config.hd:43: unknown-trait: no trait named `FsWrite`; add `use std.fs.FsWrite` / src/config.hd:45: type-mismatch: in result: expected MemoryFs, found *mut MemoryFs
