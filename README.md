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
>options```lang
code
```
````

### Inline Code

```
>`lang code`
```

With options:

````
>options`lang code`
````

### Examples

````
>```hs
main :: IO ()
main = print 1
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

## Supported Languages

One of the following languages is set in `lang`.

- `js` JavaScript (Node 11.11.0)
- `py` Python (CPython 3.7.2, CPython 2.7.16)
- `hs` Haskell (GHC 8.6.3)
- `pas` Pascal (FPC 3.0.4)
- `go` Go (Go 1.12)
- `fs` F# (FSharp 4.5)

## Options

Options are optionally set in `options`, which is a semicolon-delimited list of `flag` or `flag=value`. 

For JavaScript:
- `harmony` enables harmony features (`--harmony` on node)
- `e` prints the result of evaluating the code

For Python:
- `2` runs Python 2 instead of Python 3

For Haskell:
- `e` evaluates a single expression instead of a module

For Pascal:
- None

For Go:
- None

For F#:
- None
