declare module "@abhisekp/go-native" {
  export type Ordered = number | string;

  /**
   * myHandler calls the native function and returns a string.
   */
  export function myHandler(): string;

  /**
   * sum calls the native sum function taking two numbers and providing a summation.
   **/
  export function sum<T extends number>(a: T, b: T): T;

  /**
   * map applies a native map function to each element of an array and returns a new array.
   */
  export function map<T extends Ordered>(arr: T[], cb: (item: T) => T): T[];
}
