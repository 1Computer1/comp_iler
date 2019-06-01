if [ "$EVAL_EXPR" = "true" ]; then
    printf %s "$1" | julia -E || true
else
    printf %s "$1" | julia -e || true
fi
