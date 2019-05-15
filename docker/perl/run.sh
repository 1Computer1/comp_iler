mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.pl
perl program.pl

cd .. && rm -rf "$COUNT"
