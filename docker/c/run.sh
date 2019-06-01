mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.c
gcc program.c -o program && ./program || true

cd .. && rm -rf "$CODEDIR"
