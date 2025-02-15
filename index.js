import { myHandler, sum } from "@abhisekp/go-native";

(function main() {
  console.log("Start");
  console.log("Output:", myHandler());
  console.log("Sum of 1 and 2:", sum(1, 2));
  console.log("End");
})();
