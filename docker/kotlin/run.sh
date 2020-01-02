echo "$1" > Main.kt
kotlinc Main.kt -include-runtime -d Main.jar && java -Xmx256m -Xms256m -jar Main.jar || true
