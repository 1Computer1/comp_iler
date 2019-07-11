# Comp_iler

Sandboxed code execution discord bot.  
[Invite the bot!](https://discordapp.com/oauth2/authorize?client_id=555066722969714728&scope=bot)  

## Usage

````
>```cpp
#include <iostream>

int main()
{
    std::cout << "Hello World!" << std::endl;
}
```
````

```
>`py print('hello world')`
```

## Supported Languages and Options

One of the following language codes is set in `lang`.  
Options are optionally set in `options`, which is a semicolon-delimited list of `flag` or `flag=value`. 

- `apl` APL
- `bash` Bash
- `bf` Brainfuck
- `c` C
- `clj` Clojure
- `cpp` C++
- `cs` C#
- `elixir` Elixir
- `fs` F#
- `go` Go
- `hs` Haskell
- `java` Java
- `js` JavaScript
- `julia` Julia
- `lisp` Racket
- `lua` Lua
- `ocaml` OCaml
- `pas` Pascal
- `php` PHP
- `pl` Perl5
- `prolog` Prolog
- `py` Python
- `rb` Ruby
- `rs` Rust

## How it Works

For every language there is a docker image which spins up a docker container.  
The container is used for all evaluations of code, restarting if something goes wrong.  
The container is locked down, so there is no networking, limited memory and CPU usage, and a time limit.  

## Setup

0. Install [Docker 18+](https://www.docker.com/)
0. Install [Node 10+](https://nodejs.org/)
0. Install [Myriad](https://github.com/1Computer1/myriad)
    - This will require [Stack 2+](https://docs.haskellstack.org/en/stable/README/).
    - You will also have to configure Myriad, see its repository.
0. Fill out `config.json`
    - `owner` The owner(s) of the bot. Use an array for multiple owners.
    - `token` The bot token.
    - `prefix` The prefix for commands.
    - `codePrefix` The prefix for code evaluation.
    - `myriad` The port that Myriad is running on.
0. Run `npm i`

## Running

0. Run `myriad --config path/to/config.dhall`
0. Run `node .`
