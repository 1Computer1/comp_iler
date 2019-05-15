mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.rs
rustc -C opt-level=0 --color never program.rs && ./program

cd .. && rm -rf "$COUNT"
