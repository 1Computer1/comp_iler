mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > program.cpp
g++ program.cpp -o program && ./program

cd .. && rm -rf "$CODEDIR"
