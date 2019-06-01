mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.cpp
g++ program.cpp -o program && ./program || true

cd .. && rm -rf "$CODEDIR"
