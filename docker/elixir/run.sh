printf %s "$1" > program.exs
elixir program.exs || true
