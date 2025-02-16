import { map, myHandler, sum } from "@abhisekp/go-native";

(function main() {
  console.log("Start");
  console.log("Output:", myHandler());
  console.log("Sum of 1 and 2:", sum(1, 2));

  const arr = [1, 2, 5, 3, 7, 8];
  const squared = (num) => num * num;
  const result = map(arr, squared);
  console.log("Squared nums:", result);

  console.log("End");
})();
