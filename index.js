/** @typedef {import("example")} ExampleModule */

/** @type {ExampleModule} */
const example = require('./shared/example.node');

(function main() {
    console.log(example.myHandler());
})();