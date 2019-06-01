if [ "$EVAL_EXPR" = "true" ]; then
    ghc -e "$1" || true
else
    mkdir "$CODEDIR" && cd "$CODEDIR"

    printf %s "$1" > program.hs
    ghc -e main program.hs || true

    cd .. && rm -rf "$CODEDIR"
fi
