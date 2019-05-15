if [ "$EVAL_EXPR" = "true" ]; then
    ghc -e "$1"
else
    mkdir "$COUNT" && cd "$COUNT"

    echo "$1" > program.hs
    ghc -O0 -j +RTS -A128m -n2m -RTS \
        -no-keep-o-files -no-keep-hi-files \
        program.hs >/dev/null \
        && ./program
    
    cd .. && rm -rf "$COUNT"
fi
