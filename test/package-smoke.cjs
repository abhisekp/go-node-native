const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const { mkdtempSync, writeFileSync, rmSync } = require("node:fs");
const { tmpdir } = require("node:os");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const temp = mkdtempSync(path.join(tmpdir(), "go-native-consumer-"));
function run(command, args, cwd = temp) {
  const result = spawnSync(command, args, { cwd, encoding: "utf8" });
  assert.equal(result.status, 0, result.error?.message || result.stderr || result.stdout);
  return result.stdout;
}
try {
  const packed = JSON.parse(run("npm", ["pack", "./go-native", "--json", "--pack-destination", temp], root))[0];
  assert.ok(packed.files.some(({ path: filePath }) => filePath === "main.go"));
  assert.ok(packed.files.some(({ path: filePath }) => filePath === "scripts/build.cjs"));
  assert.ok(!packed.files.some(({ path: filePath }) => filePath.endsWith(".node")));
  writeFileSync(path.join(temp, "package.json"), JSON.stringify({ private: true }));
  run("npm", ["install", "--no-audit", "--no-fund", path.join(temp, packed.filename)]);
  const checks = `const assert = require('node:assert/strict');
    const { sum, map, myHandler } = require('@abhisekp/go-native');
    assert.equal(sum(1, 2), 3);
    assert.equal(myHandler(), 'MyHandler');
    assert.deepEqual(map(['a', 'bb'], value => value.length), [1, 2]);`;
  run(process.execPath, ["-e", checks]);
  run(process.execPath, [
    "--input-type=module",
    "-e",
    "import { sum } from '@abhisekp/go-native'; if (sum(1, 2) !== 3) throw new Error('ESM import failed');",
  ]);
  writeFileSync(path.join(temp, "types.ts"), require("node:fs").readFileSync(path.join(root, "test", "types.ts")));
  run(process.execPath, [
    path.join(root, "node_modules", "typescript", "bin", "tsc"),
    "--noEmit",
    "--strict",
    "--module",
    "node16",
    "--moduleResolution",
    "node16",
    "types.ts",
  ]);
  console.log("Packed package: source install, CJS, ESM and TypeScript passed.");
} finally {
  rmSync(temp, { recursive: true, force: true });
}
