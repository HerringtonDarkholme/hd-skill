Write an hd-lang package named `users`. Storage must be a requirement
(an effect) that callers provide, so tests and production can supply
different stores.

In `src/users.hd`:

```
pub struct User   # public fields: id: i64, name: string; supports == and debug printing
pub enum UserError   # variants: NotFound(id: i64), EmptyName; supports == and debug printing

pub trait UserStore:
    fn get!(&mut self, id: i64) -> User?
    fn put!(&mut self, user: User) -> void

pub fn rename!(id: i64, name: string) -> Result[User, UserError] $ UserStore
```

`rename!` trims `name`; an empty result is `EmptyName` and nothing is
stored. A missing user is `NotFound` and nothing is stored. Otherwise it
stores the renamed user once with `put!` and returns it.

`src/main.hd` runs with an in-memory store holding user 1 named "ada",
renames user 1 to "Ada Lovelace" and user 2 to "Grace", and prints:

```
renamed 1 to Ada Lovelace
error: no user 2
```
