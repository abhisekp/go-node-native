/** @typedef {import("handlers")} ExampleModule */

/** @type {ExampleModule} */
const native = require('./shared/example.node');


/**
 * Calls the native function `myHandler` from the Go addon.
 *
 * @returns {string} The string returned by the native function.
 */
function myHandler() {
    return native.myHandler();
}

module.exports = {
    myHandler,
}