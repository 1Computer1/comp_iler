if [ "$EVAL_EXPR" = "true" ]; then
    ghc -e "$1" || true
else
    printf %s "$1" > program.hs
    ghc -e main program.hs || true
fi
