mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.pl
swipl --quiet program.pl || true

cd .. && rm -rf "$CODEDIR"
