declare module "@abhisekp/go-native" {
  export type Ordered = number | string;

  /**
   * myHandler calls the native function and returns a string.
   */
  export function myHandler(): string;

  /**
   * sum calls the native sum function taking two numbers and providing a summation.
   **/
  export function sum(a: number, b: number): number;

  /**
   * map applies a native map function to each element of an array and returns a new array.
   */
  export function map<T extends Ordered, R>(arr: T[], cb: (item: T) => R): R[];
}
