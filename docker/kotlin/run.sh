echo "$1" > program.kt
kotlinc program.kt -include-runtime -d program.jar
java -jar program.jar
