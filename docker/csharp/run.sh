if [ "$EVAL_EXPR" = "true" ]; then
    csharp -e "$1"
else
    mkdir "$CODEDIR" && cd "$CODEDIR"

    echo "$1" > program.cs
    csc program.cs >/dev/null && mono program.exe

    cd .. && rm -rf "$CODEDIR"
fi
