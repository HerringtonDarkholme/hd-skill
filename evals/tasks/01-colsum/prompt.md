Write a command-line tool in hd-lang: an hd package named `colsum`.

It reads CSV from standard input (comma-separated, no quoting), sums one
column grouped by another, and prints one `key,total` line per key, sorted
by key.

Options:
- `--key N`: the 1-based column to group by (default 1)
- `--value N`: the 1-based column to sum, as a signed integer (default 2)
- `--skip-header`: ignore the first line

Blank lines are ignored. Keys and values are trimmed of spaces.

Put the logic in `src/sum.hd`:

```
pub fn summarize(text: string, key: usize, value: usize, skip_header: bool) -> Result[List[(string, i64)], SumError]
```

with `SumError` a public error enum with exactly these variants:
`MissingColumn(line: usize)` (a line has fewer columns than needed) and
`NotANumber(line: usize, text: string)` (the value column is not an
integer; `text` is the trimmed value). Lines are numbered from 1, counting
the header and blank lines. It must support `==` and debug printing.

On an error the program prints `colsum: line N: ...` to standard error,
nothing to standard output, and exits with status 1.
