if [ "$EVAL_EXPR" = "true" ]; then
    printf %s "$1" | csharp -e
else
    printf %s "$1" > program.cs
    csc program.cs >/dev/null && mono program.exe || true
fi
