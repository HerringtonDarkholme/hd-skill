Write an hd-lang library package named `config`, in `src/config.hd`, that
loads a service's configuration.

```
pub struct Config   # public fields: host: string, port: i32, workers: i32 (default 4)
pub enum ConfigError   # variants: Read(...), Parse(...), Environment(...), Invalid(...)

pub fn load_config!(path: string) -> Result[Config, ConfigError] $ FsRead + Env
```

`load_config!` reads the JSON file at `path`. If the environment variable
`APP_PORT` is set, it replaces the port. Then the rules are checked:
- `host` is 1 to 253 characters
- `port` is 1024 to 65535
- `workers` is 1 to 64

Errors: the file cannot be read → `Read`; it is not valid JSON for a
`Config` → `Parse`; `APP_PORT` is not an integer → `Environment`; a rule
fails, including for an overridden port → `Invalid`. Each variant carries
whatever detail you choose. `Config` must support `==` and debug printing.
