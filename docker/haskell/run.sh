if [ "$EVAL_EXPR" = "true" ]; then
    ghc -e "$1"
else
    mkdir "$COUNT" && cd "$COUNT"

    echo "$1" > program.hs
    ghc -e main program.hs

    cd .. && rm -rf "$COUNT"
fi
