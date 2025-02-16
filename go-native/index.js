/** @typedef {import("example")} ExampleModule */

/** @type {ExampleModule} */
const native = require("./shared/example.node");

/**
 * Calls the native function `myHandler` from the Go addon.
 *
 * @returns {string} The string returned by the native function.
 */
function myHandler() {
  return native.myHandler.apply(this, arguments);
}

/**
 * Sum two numbers
 *
 * @param a {number} First Number
 * @param b {number} Second Number
 * @returns {number} The sum of two params
 **/
function sum(a, b) {
  return native.sum.apply(this, arguments);
}

/**
 * Map function for array
 *
 * @param arr {string[]|number[]} Array to map
 * @param cb {(number) => number} Array to map
 * @returns {string[]|number[]} The mapped array
 **/
function map(arr, cb) {
  return native.map.apply(this, arguments);
}

module.exports = {
  myHandler,
  sum,
  map,
};
