mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > program.c
gcc program.c -o program && ./program

cd .. && rm -rf "$CODEDIR"
