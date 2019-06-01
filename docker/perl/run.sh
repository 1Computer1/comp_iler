mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.pl
perl program.pl

cd .. && rm -rf "$CODEDIR"
