if [ "$EVAL_HARMONY" = "true" ]; then
    node --harmony -p "$1"
else
    node -p "$1"
fi
