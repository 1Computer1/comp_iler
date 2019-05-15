mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.sh
bash program.sh

cd .. && rm -rf "$COUNT"
