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
