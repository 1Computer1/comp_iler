mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.clj
clojure program.clj

cd .. && rm -rf "$CODEDIR"
