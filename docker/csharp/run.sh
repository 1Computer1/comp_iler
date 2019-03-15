if [ "$EVAL_EXPR" = "true" ]; then
    csharp -e "$1"
else
    echo "$1" > program.cs
    csc program.cs >/dev/null && mono program.exe
fi
