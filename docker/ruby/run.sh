mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.rb
ruby program.rb

cd .. && rm -rf "$CODEDIR"
