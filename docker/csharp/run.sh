if [ "$EVAL_EXPR" = "true" ]; then
    csharp -e "$1"
else
    mkdir "$COUNT" && cd "$COUNT"

    echo "$1" > program.cs
    csc program.cs >/dev/null && mono program.exe

    cd .. && rm -rf "$COUNT"
fi
