mkdir "$CODEDIR" && cd "$CODEDIR"

echo "$1" > Main.java
javac Main.java && java Main

cd .. && rm -rf "$CODEDIR"
