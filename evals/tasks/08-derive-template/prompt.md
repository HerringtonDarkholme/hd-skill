Write an hd-lang library package named `fields`, in `src/fields.hd`.

```
pub trait FieldNames:
    fn field_names(self) -> List[string]
```

Users must be able to write `@derive(FieldNames)` on any struct, in any
module of the package (including test modules), and get its field names in
declaration order. Don't make users write an implementation per struct.
