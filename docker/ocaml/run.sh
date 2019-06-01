mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.ml
ocamlopt -cclib --static -o program program.ml && ./program || true

cd .. && rm -rf "$CODEDIR"
