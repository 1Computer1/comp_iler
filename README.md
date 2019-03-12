# Comp_iler

Sandboxed code execution discord bot.

## Usage

### Code Blocks

````
>```lang
code
```
````

With options:

````
>[options]```lang
code
```
````

### Inline Code

```
>`lang code`
```

With options:

````
>[options]`lang code`
````

### Examples

````
>```hs
main :: IO ()
main = print 1
```
````

````
>[harmony]```js
class Foo {
    bar = 1;
}

console.log(new Foo().bar);
```
````

```
>`py print('hello world')`
```

## Supported Languages

One of the following languages is set in `lang`.

- `js` JavaScript (Node 10.14.2)
- `py` Python (CPython 3.6.8)
- `hs` Haskell (GHC 8.4.3)

## Options

Options are optionally set in `options`, which is a semicolon-delimited list of `flag` or `flag=value`. 

For JavaScript:
- `harmony` enables harmony features (`--harmony` on node)

For Python:
- None

For Haskell:
- None

## Packages

Apart from the standard libraries, some other libraries come pre-installed.

For JavaScript:
- Node libraries
- lodash
- moment
- cheerio

For Python:
- numpy

For Haskell:
- GHC libraries
- aeson
- async
- attoparsec
- integer-logarithms
- megaparsec
- random
- scientific
- split
- vector
