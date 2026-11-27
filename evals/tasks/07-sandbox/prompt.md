Write an hd-lang program: an hd package named `linecount`.

`hd run -- FILE...` prints `<lines> <file>` for each file argument, in
order, then `<total> total`. A file that cannot be read prints
`linecount: <file>: <reason>` to standard error, is skipped, and makes the
exit status 1 (after all files are processed); otherwise the status is 0.

This program will run on untrusted file names. Configure the package so
that it can only read files under `data/` (relative to the package) and
has no other access to the outside world beyond what it needs.
