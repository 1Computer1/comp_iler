mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.cpp
g++ program.cpp -o program && ./program

cd .. && rm -rf "$COUNT"
