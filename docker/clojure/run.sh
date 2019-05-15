mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.clj
clojure program.clj

cd .. && rm -rf "$COUNT"
