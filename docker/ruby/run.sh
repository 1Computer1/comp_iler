mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.rb
ruby program.rb

cd .. && rm -rf "$COUNT"
