import { describe, it, expect } from 'vitest';
// describe => for creating a test suite of a group of related test
// test => creating a test case
// it => creating a test case
// expect
import { max, fizzBuzz, calculateAverage, factorial } from '../src/intro';

// 'describe method' => create a test suite or a group of related tests
// 'max' => the name of test suite, could be the name of the function or the unit under test.
// '()=> {}' => a function that will be called by our test runner
describe('max', () => {
    // define one or more test cases

    // first argument => represents out test name
    // second argument => function that will executed by our test runner, vitest
    it('should return the first argument if it is greater', () => {
    // structure using AAA method
    // Arrange => set up test environment, including any necessary data or configrations
    // Act => we perform the action we want to test
    // Assert => we check the outcome to ensure that it matches out expectations.

        // Arrage
        const a = 2;
        const b = 1;

        // Act
        const result = max(a, b);

        // Assert
        expect(result).toBe(2); // expect method returns expectation object of matchers => it usese to verify expectations

    // combine the steps into one line
    // expect(max(2, 1)).toBe(2)
    });

    it('should return the second argument if it is greater', () => {
        expect(max(1, 2)).toBe(2);
    });

    it('should return the first argument if arguments are equal', () => {
        expect(max(1, 1)).toBe(1);
    });
});

describe('fizzBuzz', () => {
    it('should return FizzBuzz if number is divisible by 3 and 5', () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz');
    });
    it('should return Fizz if number is divisible by 3', () => {
        expect(fizzBuzz(9)).toBe('Fizz');
    });
    it('should return Buzz if number is divisible by 5', () => {
        expect(fizzBuzz(5)).toBe('Buzz');
    });
    it('should return the string type of number if number is not divisible by 5 nor 3', () => {
        expect(fizzBuzz(2)).toBe('2');
    });
});

describe('calculateAverage', () => {
    it('should return NaN if given an empty array', () => {
        expect(calculateAverage([])).toBe(NaN);
    });

    it('should calculate the average of an array with a single element', () => {
        expect(calculateAverage([1])).toBe(1);
    });

    it('should calculate the average of an array with a tow elements', () => {
        expect(calculateAverage([1, 2])).toBe(1.5);
    });

    it('should calculate the average of an array with a three elements', () => {
        expect(calculateAverage([1, 2, 3])).toBe(2);
    });
});

describe('factorial', () => {
    it('should return 1 if given 0', () => {
        expect(factorial(0)).toBe(1);
    });

    it('should return 1 if given 1', () => {
        expect(factorial(1)).toBe(1);
    });

    it('should return 2 if given 2', () => {
        expect(factorial(2)).toBe(2);
    });

    it('should return 6 if given 3', () => {
        expect(factorial(3)).toBe(6);
    });

    it('should return 24 if given 4', () => {
        expect(factorial(4)).toBe(24);
    });

    it('should return undefined if given negative number', () => {
        expect(factorial(-1)).toBeUndefined();
    });
});
