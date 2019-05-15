mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.c
gcc program.c -o program && ./program

cd .. && rm -rf "$COUNT"
