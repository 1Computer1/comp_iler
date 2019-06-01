mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.rkt
racket program.rkt

cd .. && rm -rf "$CODEDIR"
