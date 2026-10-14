# Contributing

Start with the requirements and setup in [README.md](README.md). Use Linux (or WSL with Linux tooling) for native build/runtime checks.

## Structure

- `index.js`: example Node.js application.
- `index.test.js`: integration tests against the compiled addon.
- `go-native/main.go`: registers native exports through the pinned `napi-go` dependency.
- `go-native/handlers/`: Node-API validation and JavaScript callbacks.
- `go-native/lib/`: pure Go helpers and unit tests.
- `go-native/scripts/build.cjs`: packaged Node-API headers and Go shared-library build.
- `go-native/index.js` and `example.d.ts`: CommonJS wrapper and TypeScript API.
- `test/`: TypeScript contract and packed-consumer verification.

## Workflow

```sh
npm ci
npm run build
npm test
npm run test:types
npm run test:go
npm run test:package
npm run format:check
```

Use `npm run build:debug --prefix go-native` for an unoptimized Go build. `make` and `make dev` in `go-native/` are optional wrappers around the same build commands. Format JavaScript/JSON/Markdown with `npx prettier --write .` and Go with `gofmt`.

Keep both npm lockfiles synchronized after dependency changes. Do not commit generated `.node` binaries, headers, caches or package archives. The package includes Go source and builds during installation; verify the packed consumer whenever build scripts or package metadata change. Respect the current arity, numeric behavior, callback arguments and error propagation when modifying the public API.
