mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.pl
swipl --quiet program.pl

cd .. && rm -rf "$COUNT"
