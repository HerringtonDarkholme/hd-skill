# Evaluation: split-t2

- Skill: hd-skill 37c130a; model: `haiku`; date: 2026-11-27
- Passed: **11 / 12**
- Mean idiom score: **92%**
- Skill opened: 12 / 12
- Total cost: $0.31; turns: 303

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 100% | 14/14 | yes | 5 | 4 (1) | 30 | $0.03 |
| 02-todos | ❌ | ok | 0/5 | – | 25% | 10/10 | yes | 0 | 4 (1) | 23 | $0.02 |
| 03-config | ✅ | ok | 11/11 | – | 100% | 14/14 | yes | 4 | 4 (1) | 21 | $0.03 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 8/8 | yes | 7 | 4 (1) | 36 | $0.03 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 5/5 | yes | 1 | 4 (2) | 25 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 6/6 | yes | 6 | 2 (0) | 19 | $0.03 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 6/6 | yes | 5 | 2 (0) | 23 | $0.03 |
| 08-derive-template | ✅ | ok | 2/2 | – | 100% | 7/7 | yes | 4 | 3 (1) | 23 | $0.02 |
| 09-contracts | ✅ | ok | 6/6 | – | 75% | 15/15 | yes | 6 | 3 (1) | 25 | $0.02 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 20/20 | yes | 1 | 4 (0) | 25 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 100% | 30/30 | yes | 3 | 5 (1) | 25 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 12/12 | yes | 2 | 3 (1) | 28 | $0.03 |

## Idiom checks missed

- **02-todos**: JSON through @derive(Serialize, Deserialize); done defaults with a field default; round trip checked with a property test
- **09-contracts**: postconditions with ensure

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `unknown-trait` | 14 |
| `unknown-name` | 10 |
| `missing-requirement` | 6 |
| `type-mismatch` | 4 |
| `missing-capability` | 3 |
| `invalid-test-statement` | 2 |
| `local-reference-escapes` | 1 |
| `unknown-variant` | 1 |
| `syntax-error` | 1 |
| `decorator-not-top-level` | 1 |
| `not-writable` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| language.md | 11 |
| reference/packages.md | 6 |
| design/testing.md | 5 |
| scenarios/cli-tool.md | 2 |
| design/effects.md | 2 |
| cli.md | 2 |
| scenarios/stdin-filter.md | 1 |
| scenarios/text-records.md | 1 |
| scenarios/configuration.md | 1 |
| scenarios/project-layout.md | 1 |
| reference/std/time.md | 1 |
| reference/std/README.md | 1 |
| design/concurrency.md | 1 |
| design/errors.md | 1 |
| scenarios/concurrent-work.md | 1 |
| scenarios/files-and-directories.md | 1 |
| design/capabilities.md | 1 |
| design/derive.md | 1 |
| design/contracts.md | 1 |
| reference/std/contract.md | 1 |
| scenarios/performance.md | 1 |
| scenarios/parser.md | 1 |

## Failures

- **02-todos**
  - hidden tests did not compile: tests/zz_hidden_eval.hd:6: missing-required-field: `done` is required in `Todo` / tests/zz_hidden_eval.hd:17: missing-required-field: `done` is required in `Todo` / tests/zz_hidden_eval.hd:17: missing-required-field: `done` is required in `Todo`
