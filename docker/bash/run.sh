mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > program.sh
bash program.sh

cd .. && rm -rf "$CODEDIR"
