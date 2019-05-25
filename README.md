# Comp_iler

Sandboxed code execution discord bot.  
[Invite the bot!](https://discordapp.com/oauth2/authorize?client_id=555066722969714728&scope=bot)  

## Usage

### Code Blocks

````
>```lang
code
```
````

````
>options```lang
code
```
````

### Inline Code

```
>`lang code`
```

```
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
````

````
>harmony```js
class Foo {
    bar = 1;
}

console.log(new Foo().bar);
```
````

```
>`py print('hello world')`
```

```
>e`hs (+) <$> Just 1 <*> Just 2`
```

## Supported Languages and Options

One of the following language codes is set in `lang`.  
Options are optionally set in `options`, which is a semicolon-delimited list of `flag` or `flag=value`. 

- `apl` APL
- `bash` Bash
- `bf` Brainfuck
- `c` C (GCC)
- `clj` Clojure
- `cpp` C++ (G++)
- `cs` C# (Mono)
    - `e` evaluates a single expression instead of a module
- `elixir` Elixir
- `fs` F# (Mono)
- `go` Go
- `hs` Haskell (GHC)
    - `e` evaluates a single expression instead of a module
- `java` Java (OpenJDK)
- `js` JavaScript (Node)
    - `harmony` enables harmony features (`--harmony` on node)
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
0. Fill out `config.json` as described in the configuration section below
0. Run `node .`

## Configuration

### Bot

- `owner` - The owner(s) of the bot.  
    Use an array for multiple owners.
- `token` - The bot token.  
- `prefix` - The prefix for commands.  
- `codePrefix` - The prefix for code evaluation.  

### Setup

- `languages` Languages to use.  
    The language names here are different from the user-facing ones.  
    Check the filenames in `src/languages/` for the language names.  
    Change to `null` to enable all languages.  
- `prepare` Whether to start containers on setup.  
    Setting to true will speed up the first eval, but that language might not be used.  
- `parallel` Whether to build images in parallel.  
    Will also setup containers in parallel if `prepare` is set.  
    Faster, but will take more resources.  
- `cleanup` Interval in minutes to occasionally kill all containers.  
    Set to `0` to disable.  

### Compilers

For each of these options, you can use either the expected value to set it for all compilers or an object with compiler names to the expected values.  
If using an object, you can set the default with the `default` key.  
The compiler names are the folder names under `docker/`.  

- `memory` Max memory usage of a container.  
- `cpu` Max CPU usage of a container.  
- `timeout` Time limit for code in milliseconds.  
- `concurrent` Number of code evaluations than can run at a time per container.  
    The more that can run, the more resources a container would need.   
- `retries` Maximum number of retries for an evaluation.
    Evaluations are retried when all concurrent evaluations fail because one failed.
