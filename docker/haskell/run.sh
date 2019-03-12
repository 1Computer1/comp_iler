echo "$1" > program.hs
ghc -O0 -j +RTS -A128m -n2m -RTS program.hs >/dev/null && ./program
