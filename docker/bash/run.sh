mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.sh
bash program.sh

cd .. && rm -rf "$CODEDIR"
