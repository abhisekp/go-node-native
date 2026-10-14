# go-node-native

A small integration example that calls Go from Node.js through Node-API. The example exports three synchronous functions: `myHandler`, `sum` and `map`.

## Requirements and platform support

- Linux with Node.js 22 or newer, Go 1.24 or newer, clang and libc++ development files.
- On Ubuntu/Debian: `sudo apt-get install clang libc++-dev`.
- Internet access for npm dependencies, the pinned Go module and Node.js headers during the first build.

The pinned `napi-go` dependency has platform-specific compiler/linker flags. Linux is the supported build target in this repository; Windows and macOS builds are not verified. On Windows, use WSL and install **Linux** Node.js and Go inside that environment. Do not load a Linux `.node` file into Windows Node.js.

## Getting started

```sh
git clone https://github.com/abhisekp/go-node-native.git
cd go-node-native
npm ci
npm run build
npm start
```

The build downloads headers matching the running Node.js version using node-gyp and compiles `go-native/shared/example.node`. It no longer depends on a developer-specific Node.js path or requires Make. For offline headers, set `NODE_INCLUDE_DIR` to the directory containing `node/node_api.h`; Go and npm dependencies must already be cached. `CC`, `CXX` and `CGO_CFLAGS` can be overridden for a compatible toolchain.

## API

```js
import { myHandler, sum, map } from "@abhisekp/go-native";

myHandler(); // "MyHandler"
sum(1, 2); // 3
map([1, 2, 3], (value) => value * value); // [1, 4, 9]
map(["a", "bb"], (value) => value.length); // [1, 2]
```

CommonJS `require` is also supported. TypeScript declarations are included.

- `myHandler()` returns `"MyHandler"`.
- `sum(a, b)` requires exactly two JavaScript numbers. It uses double precision, including JavaScript's `NaN` and infinity behavior; it does not coerce strings or support BigInt.
- `map(array, callback)` requires exactly two arguments and a dense, homogeneous array of numbers or strings. It calls the callback synchronously with **only the element**, and returns a new array. Callback results can have any type. Empty arrays return an empty array. Sparse arrays, mixed input types and unsupported input values throw. Callback/getter exceptions propagate unchanged. Validation occurs as each element is visited, so earlier callbacks may have run when a later invalid element is encountered.

These helpers demonstrate an integration boundary; calling Go for trivial sums or JavaScript callbacks is not a performance optimization. The functions do not print arguments or diagnostic output.

## Verification

```sh
npm run format:check
npm test
npm run test:types
npm run test:go
npm run test:package
```

The package smoke test packs the addon, installs it into a fresh consumer (building from source), then checks CommonJS, ESM and TypeScript imports. CI runs these checks plus the example on Linux with Node.js 22, 24 and 26. The Go tests exercise pure domain helpers; Node.js tests exercise the native boundary, invalid input and recovery after exceptions.

## Packaging

`npm pack ./go-native` produces a source package with an install-time build. This avoids shipping a binary for the packer's operating system/architecture to every consumer. Consumers need the build prerequisites above. Package or release publication is a separate step; local packing does not publish anything.

See [CONTRIBUTING.md](CONTRIBUTING.md) for development instructions and [LICENSE](LICENSE) for the MIT license.
