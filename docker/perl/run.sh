mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > program.pl
perl program.pl

cd .. && rm -rf "$CODEDIR"
