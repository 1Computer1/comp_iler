if [ "$EVAL_EXPR" = "true" ]; then
    flag="-p"
else
    flag="-e"
fi

if [ "$EVAL_HARMONY" = "true" ]; then
    node --harmony "$flag" "$1"
else
    node "$flag" "$1"
fi
