mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.rb
ruby program.rb || true

cd .. && rm -rf "$CODEDIR"
