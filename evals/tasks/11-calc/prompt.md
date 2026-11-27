Write an hd-lang library package named `calc`, in `src/calc.hd`: an
integer expression evaluator.

```
pub enum CalcError   # variants: DivideByZero, Unexpected(at: usize); supports == and debug printing
pub fn eval(src: string) -> Result[i64, CalcError]
```

Expressions have decimal integers, `+ - * /`, parentheses, unary minus,
and spaces anywhere between tokens. `*` and `/` bind tighter than `+` and
`-`; all are left-associative. Division truncates toward zero; dividing by
zero is `DivideByZero`.

`Unexpected(at)` gives the byte offset where parsing failed: the start of
the first token (or invalid character) the grammar cannot accept there, or
`src.len()` if the input ends too early. Examples: `"1 +"` → `Unexpected(3)`,
`"1 2"` → `Unexpected(2)`, `""` → `Unexpected(0)`, `"1 $ 2"` → `Unexpected(2)`.

Parse into a syntax tree, then evaluate the tree.
