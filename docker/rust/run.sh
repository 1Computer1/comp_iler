printf %s "$1" > program.rs
rustc -C opt-level=0 --color never program.rs && ./program || true
