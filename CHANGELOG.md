# Changelog

## 1.7.0

- Added the Brainfuck language.

## 1.6.0

- Added `>cleanup` command.
- Changed JS to always use `-p` to evaluate expressions.

## 1.5.0

- Added retry functionality and `retries` config option.
- Changed the strange kill message to just "Something went wrong".
- Fixed default values not being used.
- Fixed concurrency doing one more than set.
- Fixed multiple containers for one compiler being set up.

## 1.4.0

- Added more configuration options.
    - `parallel` to build and setup in parallel.
    - `cleanup` to periodically kill containers.
    - `cpus`, `memory`, `timeout`, `concurrent` can be per-compiler.
- Added more info to the `>about` command.
- Added logging about images and containers.
- Changed folder names to use the current time.
- Fixed `concurrent` option being ignored.
- Fixed languages with more than one compiler erroring on startup.
- Fixed timing out on setup.
- Fixed some containers exiting immediately.
- Fixed `go` erroring about cache directory.

## 1.3.0

- Added `concurrent` config option.
- Changed Haskell image.

## 1.2.0

- Added `prefix` and `codePrefix` config options.
- Enhanced help command to show enabled languages.
- Sped up Haskell module evaluation.
- Disabled memory swap.
- Fixed folder conflicts when multiple evals done in sucession.
- Fixed reload command.

## 1.1.0

- Added `prepare` config option.
- Made containers stay up for the whole time instead of per eval.

## 1.0.0

- Initial release.
