printf %s "$1" > program.c
gcc program.c -o program && ./program || true
