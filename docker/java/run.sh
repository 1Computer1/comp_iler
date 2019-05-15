mkdir "$COUNT" && cd "$COUNT"

echo "$1" > Main.java
javac Main.java && java Main

cd .. && rm -rf "$COUNT"
