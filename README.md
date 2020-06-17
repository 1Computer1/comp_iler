# Comp_iler

Sandboxed code execution discord bot.  

[**Invite the bot!**](https://discordapp.com/oauth2/authorize?client_id=555066722969714728&scope=bot)  
*Not all languages are enabled on the public bot.*  

## Usage

````cpp
$>```cpp
#include <iostream>

int main()
{
    std::cout << "Hello World!" << std::endl;
}
```
````

```py
$>`py print('hello world')`
```

## Supported Languages and Options

A supported language code is set in `lang`.  
You can see all the possible codes using the `languages` command in the bot.  

## How it Works

For every language there is a docker image which spins up a docker container.  
The container is used for all evaluations of code, restarting if something goes wrong.  
The container is locked down, so there is no networking, limited memory and CPU usage, and a time limit.  

## Setup

1. Install [Docker 18+](https://www.docker.com/)
2. Install [Node 14+](https://nodejs.org/)
3. Install [Myriad 0.4.0.0](https://github.com/1Computer1/myriad/)
4. Fill out `config.json`
    - `owner` The owner(s) of the bot. Use an array for multiple owners.
    - `token` The bot token.
    - `prefix` The prefix for commands.
    - `codePrefix` The prefix for code evaluation.
    - `myriad` The port that Myriad is running on.
5. Run `npm i`

## Running

1. Run `myriad --config /path/to/config.dhall --languages /path/to/languages/`
2. Run `node .`
