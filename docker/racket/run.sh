mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.rkt
racket program.rkt

cd .. && rm -rf "$COUNT"
