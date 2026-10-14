/** @typedef {typeof import("./example")} ExampleModule */

/** @type {ExampleModule} */
const native = require("./shared/example.node");

/**
 * Calls the native function `myHandler` from the Go addon.
 *
 * @returns {string} The string returned by the native function.
 */
function myHandler(...args) {
  return native.myHandler.apply(this, args);
}

/**
 * Sum two numbers
 *
 * @param {[a: number, b: number]} args The two numbers to add
 * @returns {number} The sum of two params
 **/
function sum(...args) {
  return native.sum.apply(this, args);
}

/**
 * Map function for array
 *
 * @template {number|string} T
 * @template R
 * @param {[arr: T[], cb: (item: T) => R]} args Array and callback invoked with each element
 * @returns {R[]} The mapped array
 **/
function map(...args) {
  return native.map.apply(this, args);
}

// Preserve public function lengths while forwarding every argument to native validation.
Object.defineProperty(sum, "length", { value: 2 });
Object.defineProperty(map, "length", { value: 2 });

module.exports = {
  myHandler,
  sum,
  map,
};
