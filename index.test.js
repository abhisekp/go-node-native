import { describe, it } from "node:test";
import assert from "node:assert";
import { map, myHandler, sum } from "@abhisekp/go-native";

describe("Test", () => {
  describe("Test Handler Output", () => {
    it("should give an output", () => {
      const actual = myHandler();
      const expected = "MyHandler";
      assert.strictEqual(actual, expected, 'Output should be "MyHandler"');
    });
  });

  describe("Test sum Output", () => {
    it("should sum two numbers", () => {
      const actual = sum(1, 2);
      const expected = 3;
      assert.strictEqual(actual, expected, "Sum should be 3");
    });

    it("should throw an error when non-numeric inputs are provided", () => {
      assert.throws(() => sum("a", 2), Error, "Non-numeric inputs should throw an error");
    });

    it("should throw an error with less than two arguments", () => {
      assert.throws(() => sum(1), Error, "Less than two arguments should throw an error");
    });
    it("should throw an error with more than two arguments", () => {
      assert.throws(() => sum(1, 2, 3), Error, "More than two arguments should throw an error");
    });
  });

  describe("Test map Output", () => {
    it("should double an array of numbers", () => {
      const double = (num) => num * 2;
      const actual = map([1, 2, 3], double);
      const expected = [2, 4, 6];
      assert.deepEqual(actual, expected, "Map should return [2, 4, 6]");
    });

    it("should throw an error when non-function input is provided", () => {
      assert.throws(() => map([1, 2, 3], "a"), Error, "Non-function input should throw an error");
    });

    it("should throw an error when input is not an array", () => {
      assert.throws(() => map("abc", (num) => num * 2), Error, "Input should be an array");
    });

    it("should throw an error when array contains mixed type values", () => {
      assert.throws(() => map([1, "a", 3], (num) => num * 2), Error, "Array should not contain mixed datatype values");
    });
  });
});
import { spawnSync } from "node:child_process";

// Execute in a separate process so an addon crash or leaked output fails this test.
describe("Native error recovery and output", () => {
  it("preserves wrapper lengths and native argument-count errors", () => {
    assert.equal(myHandler.length, 0);
    assert.equal(sum.length, 2);
    assert.equal(map.length, 2);
    for (const args of [[], [1], [1, 2, 3]]) {
      assert.throws(() => sum(...args), { code: "EArgumentLength" });
    }
    assert.throws(() => sum(undefined, undefined), { code: "EInvalidValue" });
  });
  it("does not print arguments or debug messages", () => {
    const result = spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `
      import { sum, map, myHandler } from '@abhisekp/go-native';
      myHandler(); sum(123, 456); map(['private input'], value => value);
    `,
      ],
      { encoding: "utf8", timeout: 10000 },
    );
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout, "");
    assert.equal(result.stderr, "");
  });
  it("preserves callback exceptions and remains usable", () => {
    const error = new Error("callback failed");
    assert.throws(
      () =>
        map([1], () => {
          throw error;
        }),
      (thrown) => thrown === error,
    );
    assert.equal(sum(2, 3), 5);
    assert.deepStrictEqual(
      map([1], (value) => value + 1),
      [2],
    );
  });
  it("handles string input, empty arrays and arbitrary callback results", () => {
    assert.deepStrictEqual(
      map(["a", "bb"], (value) => value.length),
      [1, 2],
    );
    assert.deepStrictEqual(
      map([1, 2], (value) => ({ value })),
      [{ value: 1 }, { value: 2 }],
    );
    assert.deepStrictEqual(
      map([1], () => undefined),
      [undefined],
    );
    assert.deepStrictEqual(
      map([], () => {
        throw new Error("must not run");
      }),
      [],
    );
  });
  it("rejects wrong arity, holes and unsupported elements", () => {
    for (const args of [[], [[1]], [[1], (value) => value, 3]]) {
      assert.throws(() => map(...args), Error);
    }
    for (const input of [new Array(2), [true], [null], [{}], [1n], [1, "a"]]) {
      assert.throws(() => map(input, (value) => value), Error);
    }
    assert.deepStrictEqual(
      map([3], (value) => value),
      [3],
    );
  });
  it("propagates throwing array accessors without crashing", () => {
    const error = new Error("getter failed");
    const input = [1];
    Object.defineProperty(input, 0, {
      get() {
        throw error;
      },
    });
    assert.throws(
      () => map(input, (value) => value),
      (thrown) => thrown === error,
    );
    assert.equal(myHandler(), "MyHandler");
  });
  it("uses JavaScript number precision and rejects coercion", () => {
    assert.equal(sum(1.25, -0.5), 0.75);
    assert.ok(Number.isNaN(sum(NaN, 1)));
    assert.equal(sum(Infinity, 1), Infinity);
    for (const value of [null, undefined, true, 1n, {}, "2"]) assert.throws(() => sum(value, 1), Error);
  });
});
