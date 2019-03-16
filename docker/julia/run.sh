if [ "$EVAL_EXPR" = "true" ]; then
    julia -E "$1"
else
    julia -e "$1"
fi
