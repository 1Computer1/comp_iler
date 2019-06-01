mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.sh
bash program.sh || true

cd .. && rm -rf "$CODEDIR"
