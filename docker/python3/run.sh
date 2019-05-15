mkdir "$COUNT" && cd "$COUNT"

echo "$1" > program.py
python program.py

cd .. && rm -rf "$COUNT"
