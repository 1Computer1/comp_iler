mkdir "$COUNT" && cd "$COUNT"

export GOCACHE=/tmp/"$COUNT"/cache
echo "$1" > program.go
go run program.go

cd .. && rm -rf "$COUNT"
