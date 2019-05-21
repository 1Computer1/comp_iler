mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > program.fs
fsharpc --optimize- program.fs >/dev/null && mono program.exe

cd .. && rm -rf "$CODEDIR"
