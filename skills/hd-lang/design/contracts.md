# Contracts: `require` And `ensure`

A contract states, in the code, what must hold around a call.
`std.contract` has two:

- **`require`**: a precondition, the caller's side. Checked in debug
  and test builds, skipped in release builds.
- **`ensure`**: a postcondition, the function's side. Checked when the
  enclosing scope exits normally, in every build.

A broken contract panics with `explicit-panic` and its message. It is a
bug in the program, not an outcome to handle.

## When

| The problem | Use |
| --- | --- |
| bad input from outside: a file, a request, a user | `Result` with an `@error` enum ([errors](../references/language/errors.md)) |
| a caller broke the rules of the call: a negative amount, an empty list | `require` |
| what the function promises afterwards: a total kept, a list sorted | `ensure` |
| a check inside a test | `assert` / `assert_equal` from `std.testing`; they are test-only |

Don't write `if bad: panic("...")` for a precondition: `require` says the
same, names the rule, and costs nothing in a release build.

## Both, on one type

```hd
use std.contract.{ensure, require}

struct Stock:
    on_hand: i32
    reserved: i32

impl Stock:
    fn available(self) -> i32:
        self.on_hand - self.reserved

    fn reserve(&mut self, count: i32) -> void:
        require("a reservation is positive"):
            count > 0
        require("cannot reserve more than is available"):
            count <= self.available()
        before := self.on_hand
        self.reserved += count
        ensure("reserving never changes what is on hand"):
            self.on_hand == before
        ensure("reserved stays within on hand"):
            self.reserved <= self.on_hand

let mut stock = Stock { on_hand: +10, reserved: +0 }
stock.reserve(+4)
println("available: ${stock.available()}")
```

```output
available: 6
```

`stock.reserve(+7)` here stops the program:

```text
panic: explicit-panic: cannot reserve more than is available
```

## The forms

- **`require("message"):` then the condition, indented.** The
  condition is a closure: it may read parameters and `self`, and may not
  change anything. Without a message, the panic says
  `requirement failed`.
- **`ensure("message"):` then the condition, as a statement.** It runs
  at each normal exit of the enclosing scope, after the rest of the body,
  in reverse order of registration. To check the result, put it in a
  local first and let the condition read it (below).
- **`ensure` is a statement, never a value.** `_ := ensure(...)` or
  `guard := ensure(...)` is `unregistered-auto-closing`. Write the call
  on its own line.

```hd
use std.contract.ensure

fn clamp(value: i32, low: i32, high: i32) -> i32:
    result := if value < low: low else if value > high: high else: value
    ensure("the result is within bounds"):
        low <= result && result <= high
    result

println("${clamp(+15, +0, +10)}")
```

```output
10
```

## Testing code with contracts

A test cannot catch a panic, so a test can't assert that a contract
fires. Test the behavior when the rules are kept; the contracts check
every call those tests make. To see a contract fire, run the program
once with an argument that breaks it and read the panic.
