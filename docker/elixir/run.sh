mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > program.exs
elixir program.exs

cd .. && rm -rf "$CODEDIR"
