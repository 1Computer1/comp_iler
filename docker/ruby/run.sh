mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > program.rb
ruby program.rb

cd .. && rm -rf "$CODEDIR"
