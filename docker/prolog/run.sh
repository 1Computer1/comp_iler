printf %s "$1" > program.pl
swipl --quiet program.pl || true
