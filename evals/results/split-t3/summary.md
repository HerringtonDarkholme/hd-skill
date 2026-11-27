# Evaluation: split-t3

- Skill: hd-skill 37c130a; model: `haiku`; date: 2026-11-27
- Passed: **11 / 12**
- Mean idiom score: **97%**
- Skill opened: 12 / 12
- Total cost: $0.30; turns: 272

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 67% | 16/16 | yes | 4 | 8 (1) | 37 | $0.04 |
| 02-todos | ✅ | ok | 5/5 | – | 100% | 12/12 | yes | 4 | 3 (1) | 20 | $0.02 |
| 03-config | ✅ | ok | 11/11 | – | 100% | 12/12 | yes | 4 | 3 (0) | 17 | $0.02 |
| 04-ratelimit | ❌ | ok | 0/4 | – | 100% | 8/8 | yes | 5 | 3 (1) | 26 | $0.03 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 9/9 | yes | 0 | 4 (2) | 20 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 7/7 | yes | 0 | 4 (2) | 21 | $0.02 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 11/11 | yes | 6 | 2 (0) | 24 | $0.03 |
| 08-derive-template | ✅ | ok | 2/2 | – | 100% | 4/4 | yes | 2 | 7 (3) | 25 | $0.02 |
| 09-contracts | ✅ | ok | 6/6 | – | 100% | 15/15 | yes | 4 | 2 (0) | 17 | $0.02 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 16/16 | yes | 0 | 4 (1) | 17 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 100% | 31/31 | yes | 4 | 3 (0) | 17 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 12/12 | yes | 2 | 5 (1) | 31 | $0.03 |

## Idiom checks missed

- **01-colsum**: options parsed with @derive(Cli)

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `missing-contextual-enum-type` | 12 |
| `unknown-trait` | 10 |
| `unsatisfied-trait-bound` | 10 |
| `syntax-error` | 5 |
| `missing-requirement` | 4 |
| `not-writable` | 3 |
| `decorator-not-top-level` | 3 |
| `unknown-method` | 3 |
| `missing-capability` | 2 |
| `type-mismatch` | 2 |
| `missing-let` | 2 |
| `unknown-name` | 2 |
| `local-reference-escapes` | 1 |
| `unknown-type` | 1 |
| `trait-used-as-type` | 1 |
| `marker-template` | 1 |
| `misplaced-tests-block` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| language.md | 8 |
| reference/packages.md | 8 |
| design/testing.md | 6 |
| scenarios/cli-tool.md | 2 |
| design/capabilities.md | 2 |
| scenarios/text-records.md | 1 |
| reference/std/README.md | 1 |
| scenarios/configuration.md | 1 |
| design/effects.md | 1 |
| scenarios/project-layout.md | 1 |
| scenarios/files-and-directories.md | 1 |
| design/derive.md | 1 |
| design/contracts.md | 1 |
| scenarios/parser.md | 1 |

## Failures

- **04-ratelimit**
  - hidden tests did not compile: tests/zz_hidden_eval.hd:1: unknown-module: no module named `ratelimit.limiter`
