Write an hd-lang library package named `todos`, in `src/todos.hd`, for a
todo list stored as JSON.

```
pub struct Todo   # public fields: id: i32, title: string, done: bool = false (also false when absent from the JSON)
pub enum TodoError   # variants: BadJson(message: string), UnknownId(id: i32)

pub fn load(json: string) -> Result[List[Todo], TodoError]   # a JSON array of objects {"id", "title", "done"}
pub fn dump(todos: List[Todo]) -> string                      # JSON that `load` reads back unchanged
pub fn complete(todos: List[Todo], id: i32) -> Result[List[Todo], TodoError]   # marks that todo done
pub fn pending(todos: List[Todo]) -> List[string]             # titles not done, in order
```

`Todo` and `TodoError` must support `==` and debug printing. Any input
that is not a valid todo array is `BadJson`.
