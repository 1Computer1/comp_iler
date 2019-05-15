mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.go
go run program.go

cd .. && rm -rf "$COUNT"
