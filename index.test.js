import { describe, it } from "node:test";
import assert from "node:assert";
import { myHandler, sum } from "@abhisekp/go-native";

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
});
