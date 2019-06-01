mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.clj
clojure program.clj || true

cd .. && rm -rf "$CODEDIR"
