if [ "$EVAL_HARMONY" = "true" ]; then
    printf %s "$1" | node --harmony -p || true
else
    printf %s "$1" | node -p || true
fi
