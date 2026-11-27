# Evaluation: baseline-t3

- Skill: hd-skill 5ccaa45; model: `haiku`; date: 2026-11-27
- Passed: **10 / 12**
- Mean idiom score: **81%**
- Skill opened: 12 / 12
- Total cost: $0.31; turns: 300

| Task | Pass | Check | Hidden | Runs | Idiom | Own tests | Skill | Pages | hd check (failing) | Turns | Cost |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01-colsum | ✅ | ok | 5/5 | 4/4 | 67% | 17/17 | yes | 0 | 3 (0) | 19 | $0.02 |
| 02-todos | ✅ | ok | 5/5 | – | 75% | 11/11 | yes | 0 | 6 (1) | 20 | $0.02 |
| 03-config | ❌ | ok | 0/11 | – | 100% | 15/15 | yes | 2 | 2 (0) | 15 | $0.02 |
| 04-ratelimit | ✅ | ok | 4/4 | – | 100% | 9/9 | yes | 4 | 5 (2) | 36 | $0.03 |
| 05-users | ✅ | ok | 3/3 | 1/1 | 100% | 4/4 | yes | 0 | 4 (1) | 16 | $0.02 |
| 06-quotes | ✅ | ok | 4/4 | – | 100% | 8/8 | yes | 9 | 11 (3) | 38 | $0.04 |
| 07-sandbox | ✅ | ok | – | 3/3 | 100% | 7/7 | yes | 0 | 4 (1) | 21 | $0.02 |
| 08-derive-template | ❌ | ok | 0/2 | – | 0% | 0/0 | yes | 0 | 5 (3) | 27 | $0.03 |
| 09-contracts | ✅ | ok | 6/6 | – | 75% | 14/14 | yes | 0 | 10 (4) | 45 | $0.04 |
| 10-rle | ✅ | ok | 5/5 | – | 100% | 17/17 | yes | 4 | 2 (0) | 21 | $0.02 |
| 11-calc | ✅ | ok | 20/20 | – | 50% | 16/16 | yes | 9 | 4 (0) | 26 | $0.03 |
| 12-lru | ✅ | ok | 5/5 | – | 100% | 9/9 | yes | 0 | 4 (0) | 16 | $0.02 |

## Idiom checks missed

- **01-colsum**: SumError declared with @error
- **02-todos**: round trip checked with a property test
- **08-derive-template**: a derive template: impl[T] FieldNames for T by Structure; walks members with a Walker; writes at least 2 test cases of its own
- **09-contracts**: postconditions with ensure
- **11-calc**: CalcError declared with @error; table tests with it_each

## Diagnostics the agents hit

| Code | Count |
| --- | --- |
| `not-writable` | 53 |
| `missing-capability` | 8 |
| `unknown-import` | 7 |
| `underivable-trait` | 6 |
| `unknown-trait` | 5 |
| `local-reference-escapes` | 5 |
| `syntax-error` | 4 |
| `missing-requirement` | 4 |
| `cannot-infer-type` | 4 |
| `unregistered-auto-closing` | 3 |
| `unknown-type` | 2 |
| `missing-let` | 2 |
| `refutable-let-pattern` | 2 |
| `type-used-as-value` | 2 |
| `type-mismatch` | 1 |
| `unknown-name` | 1 |
| `trait-used-as-type` | 1 |

## Skill pages opened (tasks that opened each)

| Page | Tasks |
| --- | --- |
| references/cli/packages.md | 5 |
| references/testing/unit-tests.md | 4 |
| references/language/modules.md | 3 |
| references/language/requirements.md | 2 |
| references/testing/fakes.md | 2 |
| references/language/traits.md | 2 |
| references/language/errors.md | 2 |
| references/std/host.md | 1 |
| references/language/suspension.md | 1 |
| references/how-to/concurrent-work.md | 1 |
| references/language/data.md | 1 |
| references/language/basics.md | 1 |
| references/language/collections.md | 1 |
| references/how-to/common-operations.md | 1 |
| references/language/references.md | 1 |

## Failures

- **03-config**
  - hidden tests did not compile: tests/zz_hidden_eval.hd:19: private-member: `Config` has the private field `host`, so only its module can construct or copy it / tests/zz_hidden_eval.hd:22: private-member: `Config` has the private field `host`, so only its module can construct or copy it
- **08-derive-template**
  - hidden tests did not compile: tests/zz_hidden_eval.hd:3: underivable-trait: `FieldNames` has no template and cannot be derived / tests/zz_hidden_eval.hd:10: underivable-trait: `FieldNames` has no template and cannot be derived
