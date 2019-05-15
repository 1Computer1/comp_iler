mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.lua
lua5.3 program.lua

cd .. && rm -rf "$COUNT"
