if [ "$EVAL_HARMONY" = "true" ]; then
    node --harmony -e "$1"
else
    node -e "$1"
fi
