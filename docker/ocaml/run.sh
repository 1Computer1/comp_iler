mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > program.ml
ocamlopt -cclib --static -o program program.ml && ./program

cd .. && rm -rf "$CODEDIR"
