# Comp_iler

Sandboxed code execution discord bot.

## Usage

### Code Blocks

````
>```lang
code
```

>options```lang
code
```
````

### Inline Code

```
>`lang code`

>options`lang code`
```

### Examples

````
>```cpp
#include <iostream>

int main()
{
    std::cout << "Hello World!" << std::endl;
}
```

>harmony```js
class Foo {
    bar = 1;
}

console.log(new Foo().bar);
```

>`py print('hello world')`

>e`hs (+) <$> Just 1 <*> Just 2`
````

## Supported Languages and Options

One of the following language codes is set in `lang`.  
Options are optionally set in `options`, which is a semicolon-delimited list of `flag` or `flag=value`. 

- `bash` Bash
- `c` C (GCC)
- `clj` Clojure
- `cpp` C++ (G++)
- `cs` C# (Mono)
    - `e` evaluates a single expression instead of a module
- `elixir` Elixir
- `fs` F#
- `go` Go
- `hs` Haskell (GHC)
    - `e` evaluates a single expression instead of a module
- `java` Java (OpenJDK)
- `js` JavaScript (Node)
    - `harmony` enables harmony features (`--harmony` on node)
    - `e` prints the result of evaluating the code
- `julia` Julia
    - `e` prints the result of evaluating the code
- `lisp` Racket
- `lua` Lua
- `ocaml` OCaml
- `pas` Pascal (FPC)
- `php` PHP
- `pl` Perl5
- `prolog` Prolog (SWI-Prolog)
- `py` Python (CPython)
    - `2` runs Python 2 instead of Python 3
- `rb` Ruby
- `rs` Rust

## How it Works

Read the source code, specifically `src/struct/LanguageHandler.js`.  
In summary, for every language there is a docker image which spins up a docker container.  
The container is used for all evaluations of code, restarting if something goes wrong.  
The container is locked down, so there is no networking, limited memory and CPU usage, and a time limit.  

## Setup

0. Install Docker 18+
0. Install Node 10+
0. Run `npm i`
0. Fill out `config.json`
    - `owner` - The owner(s) of the bot.  
        Use an array for multiple owners.
    - `token` - The bot token.  
    - `languages` Languages to use.  
        The language names here are different from the user-facing ones.  
        Check the folders in ./docker/ for the language names.  
        Change to null to enable all languages.  
    - `memory` Max memory usage of a container.  
    - `cpu` Max CPU usage of a container.  
    - `timeout` Time limit for code in milliseconds.  
    - `prepare` Whether to run containers on setup.  
        Setting to true will speed up the first eval, but that language might not be used.
0. Run `node .`
