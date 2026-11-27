Write an hd-lang library package named `quotes`, in `src/quotes.hd`, that
prices an order through a quote service the caller provides.

```
pub enum QuoteError   # variants: Busy, Unknown(sku: string); supports == and debug printing

pub trait Quotes:
    fn quote!(&mut self, sku: string) -> Result[i64, QuoteError]

pub fn order_total!(skus: List[string]) -> Result[i64, QuoteError] $ Quotes + Clock
```

`order_total!` quotes every sku concurrently, at most 4 in flight at a
time, and returns the sum. Each sku gets up to 3 attempts, waiting about
10 ms between them, before its error counts. If any sku still fails, the
result is the error of the first failing sku in the list's order. An empty
order totals 0.
