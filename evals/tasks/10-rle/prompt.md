Write an hd-lang library package named `rle`, in `src/rle.hd`: run-length
encoding of integer lists.

```
pub struct Run   # public fields: value: i32, count: usize; supports == and debug printing
pub fn encode(xs: List[i32]) -> List[Run]   # maximal runs: no empty run, neighbours differ
pub fn decode(runs: List[Run]) -> List[i32]
```

Test it thoroughly: example cases are not enough; check that decoding
undoes encoding for any list.
