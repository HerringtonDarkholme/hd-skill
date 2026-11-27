Write an hd-lang library package named `lru`, in `src/lru.hd`: a
least-recently-used cache from string keys to i64 values.

```
pub struct Lru
pub fn new_lru(capacity: usize) -> Lru

impl Lru:
    pub fn get(&mut self, key: string) -> i64?          # a hit makes the key most recently used
    pub fn put(&mut self, key: string, value: i64) -> void   # inserts or updates, makes it most recent,
                                                         # then evicts the least recent if over capacity
    pub fn len(self) -> usize
```

A missed `get` changes nothing. Besides example tests, test it against a
simple model with generated sequences of operations.
