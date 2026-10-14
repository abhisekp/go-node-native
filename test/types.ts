import { map, sum, myHandler } from "@abhisekp/go-native";
const total: number = sum(1, 2);
const explicitTotal: number = sum<number>(1, 2);
const explicitMap: number[] = map<number>([1, 2], (value) => value + 1);
// @ts-expect-error A sum is not one of its literal input values.
const literal: 1 | 2 = sum(1, 2);
const strings: string[] = map([1, 2], (value) => String(value));
const lengths: number[] = map(["a", "bb"], (value) => value.length);
const objects: { value: number }[] = map([1], (value) => ({ value }));
const greeting: string = myHandler();
// @ts-expect-error Only string or number inputs are supported.
map([true], (value) => value);
// @ts-expect-error sum requires numbers.
sum("1", 2);
export { total, explicitTotal, explicitMap, literal, strings, lengths, objects, greeting };
