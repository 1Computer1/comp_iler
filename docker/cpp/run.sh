mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.cpp
g++ program.cpp -o program && ./program

cd .. && rm -rf "$CODEDIR"
