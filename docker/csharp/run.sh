if [ "$EVAL_EXPR" = "true" ]; then
    printf %s "$1" | csharp -e
else
    mkdir "$CODEDIR" && cd "$CODEDIR"

    printf %s "$1" > program.cs
    csc program.cs >/dev/null && mono program.exe || true

    cd .. && rm -rf "$CODEDIR"
fi
