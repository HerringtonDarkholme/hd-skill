Write an hd-lang library package named `bank`, in `src/account.hd`.

```
pub struct Account
pub fn open(cents: i64) -> Account
pub fn transfer(from: &mut Account, to: &mut Account, cents: i64) -> void

impl Account:
    pub fn balance(self) -> i64
    pub fn deposit(&mut self, cents: i64) -> void
    pub fn withdraw(&mut self, cents: i64) -> void
```

Calling these wrongly is a programming error, not a recoverable one: a
negative opening balance, a deposit or withdrawal that is not positive, or
a withdrawal (or transfer) larger than the balance must stop the program
in debug and test builds. These checks should cost nothing in release
builds. State the invariants that always hold after a call (the balance is
never negative; a transfer keeps the total) in the code as well.
