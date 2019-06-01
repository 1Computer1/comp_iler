mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.apl
apl --OFF -s -f program.apl

cd .. && rm -rf "$CODEDIR"
