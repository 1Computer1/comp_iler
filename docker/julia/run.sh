if [ "$EVAL_EXPR" = "true" ]; then
    printf %s "$1" | julia -E
else
    printf %s "$1" | julia -e
fi
