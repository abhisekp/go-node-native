declare module "@abhisekp/go-native" {
    /**
     * myHandler calls the native function and returns a string.
     */
    export function myHandler(): string;

    /**
     * sum calls the native sum function taking two numbers and providing a summation.
     **/
    export function sum(a: number, b: number): number;
}
