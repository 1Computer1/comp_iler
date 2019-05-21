mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > program.pl
swipl --quiet program.pl

cd .. && rm -rf "$CODEDIR"
