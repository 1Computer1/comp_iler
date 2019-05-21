mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > program.py
python program.py

cd .. && rm -rf "$CODEDIR"
