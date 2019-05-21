mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > program.rkt
racket program.rkt

cd .. && rm -rf "$CODEDIR"
