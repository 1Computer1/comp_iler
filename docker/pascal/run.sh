mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.pas

# fpc does not use stderr, ld however does, capture both
res="$(fpc program.pas 2>&1)"

if [ $? -eq 0 ]; then
  ./program
else
  printf %s "$res"
  exit 1
fi

cd .. && rm -rf "$CODEDIR"
