mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > program.clj
clojure program.clj

cd .. && rm -rf "$CODEDIR"
