mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.ml
ocamlopt -cclib --static -o program program.ml && ./program

cd .. && rm -rf "$COUNT"
