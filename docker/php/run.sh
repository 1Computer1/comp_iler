mkdir "$CODEDIR" && cd "$CODEDIR"

printf %s "$1" > program.php
php program.php || true

cd .. && rm -rf "$CODEDIR"
