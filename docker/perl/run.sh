mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.pl
perl program.pl || true

cd .. && rm -rf "$CODEDIR"
