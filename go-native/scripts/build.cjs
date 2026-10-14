const { spawnSync } = require("node:child_process");
const { cpSync, existsSync, mkdirSync } = require("node:fs");
const path = require("node:path");
const { endianness } = require("node:os");

const root = path.resolve(__dirname, "..");

function run(command, args, env = process.env) {
  const result = spawnSync(command, args, { cwd: root, env, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} failed (${result.status ?? result.signal})`);
  }
}

try {
  if (process.platform !== "linux") {
    throw new Error(
      "The pinned napi-go dependency currently supports this build on Linux. On Windows, use WSL with Linux Node.js, Go, clang and libc++ development files.",
    );
  }
  const target = spawnSync("go", ["env", "GOOS", "GOARCH"], { cwd: root, encoding: "utf8" });
  if (target.error) throw target.error;
  if (target.status !== 0) throw new Error("Go is required to build the native addon.");
  const goArch =
    { x64: "amd64", ia32: "386", ppc64: endianness() === "LE" ? "ppc64le" : "ppc64", mipsel: "mipsle" }[process.arch] ||
    process.arch;
  if (target.stdout.trim() !== `linux\n${goArch}`) {
    throw new Error("Go must target the platform and architecture of the running Node.js process.");
  }

  let includeDir = process.env.NODE_INCLUDE_DIR;
  if (!includeDir) {
    includeDir = path.join(root, ".cache", "headers");
    mkdirSync(includeDir, { recursive: true });
    // napi-go includes node/node_api.h; arrange the packaged headers under that prefix.
    cpSync(require("node-api-headers").include_dir, path.join(includeDir, "node"), { recursive: true });
  }
  includeDir = path.resolve(includeDir);
  if (!existsSync(path.join(includeDir, "node", "node_api.h"))) {
    throw new Error("NODE_INCLUDE_DIR must contain node/node_api.h (the parent of the Node.js header directory).");
  }
  mkdirSync(path.join(root, "shared"), { recursive: true });
  run(
    "go",
    [
      "build",
      ...(process.argv.includes("--debug") ? ["-gcflags=all=-N -l"] : []),
      "-buildmode=c-shared",
      "-o",
      "shared/example.node",
      ".",
    ],
    {
      ...process.env,
      CGO_ENABLED: "1",
      CC: process.env.CC || "clang",
      CXX: process.env.CXX || "clang++",
      CGO_CFLAGS: `${process.env.CGO_CFLAGS || ""} -I${JSON.stringify(includeDir)}`.trim(),
    },
  );
} catch (error) {
  console.error(`Native addon build failed: ${error.message}`);
  process.exitCode = 1;
}
