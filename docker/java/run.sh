mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > Main.java
javac Main.java && java Main

cd .. && rm -rf "$CODEDIR"
