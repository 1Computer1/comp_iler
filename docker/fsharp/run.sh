mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.fs
fsharpc --optimize- program.fs >/dev/null && mono program.exe

cd .. && rm -rf "$CODEDIR"
