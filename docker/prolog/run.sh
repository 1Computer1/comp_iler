mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.pl
swipl --quiet program.pl

cd .. && rm -rf "$CODEDIR"
