mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.py
python program.py || true

cd .. && rm -rf "$CODEDIR"
