if [ "$EVAL_HARMONY" = "true" ]; then
    printf %s "$1" | node --harmony -p
else
    printf %s "$1" | node -p
fi
