mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.exs
elixir program.exs

cd .. && rm -rf "$COUNT"
