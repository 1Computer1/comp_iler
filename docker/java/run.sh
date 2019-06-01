mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > Main.java
javac Main.java && java Main || true

cd .. && rm -rf "$CODEDIR"
