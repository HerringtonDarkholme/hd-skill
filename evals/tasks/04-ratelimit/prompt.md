Write an hd-lang library package named `ratelimit`, in `src/limiter.hd`: a
sliding-window rate limiter.

```
pub struct Limiter
pub fn new_limiter(max: usize, window: Duration) -> Limiter   # Duration from std.time

impl Limiter:
    pub fn allow(&mut self, key: string) -> bool $ Clock
```

`allow` records an event for `key` at the current time and returns true
if, counting it, at most `max` allowed events for that key happened within
the last `window` (an event at time t counts while now - t < window). A
refused event is not recorded. Keys are independent. It must read the time
from the `Clock` requirement so tests can control it.
