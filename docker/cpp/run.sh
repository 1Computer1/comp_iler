printf %s "$1" > program.cpp
g++ program.cpp -o program && ./program || true
