# @abhisekp/go-native

Go-backed synchronous `myHandler`, `sum` and `map` functions for Node.js.

## Build requirements

Linux, Node.js 22+, Go 1.24+, clang and libc++ development files. Install from a source package with npm; the install script downloads matching Node.js headers and builds the native addon. Windows users can use WSL with Linux tooling. Windows and macOS native builds are not verified with the pinned `napi-go` dependency.

For offline headers, set `NODE_INCLUDE_DIR` to the parent directory containing `node/node_api.h`. Go and npm dependencies must already be cached.

```js
const { sum, map, myHandler } = require("@abhisekp/go-native");
myHandler(); // "MyHandler"
sum(1, 2); // 3
map(["a", "bb"], (value) => value.length); // [1, 2]
```

`sum` requires exactly two numbers without coercion. `map` requires exactly two arguments: a dense homogeneous array of numbers or strings, and a synchronous callback. The callback receives only the element and may return any type. Callback exceptions propagate unchanged. These functions do not print diagnostic output.

See the [repository README](https://github.com/abhisekp/go-node-native#readme) for full behavior and testing instructions.
