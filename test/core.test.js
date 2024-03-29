import {
    it,
    expect,
    describe,
    beforeEach,
    beforeAll,
    afterEach,
    afterAll
} from 'vitest';
import {
    calculateDiscount,
    getCoupons,
    validateUserInput,
    isPriceInRange,
    isValidUsername,
    canDrive,
    fetchData,
    Stack
} from '../src/core';

describe('test suite', () => {
    it('test case', () => {
        const result = { name: 'Mohammad' };
        expect(result).toEqual({ name: 'Mohammad' });
    });
});

describe('writing Good Assertion for strings', () => {
    it('error test', () => {
        const result = 'The requested file was not found.';

        // Loose(too general)
        expect(result).toBeDefined();

        // Tight (too specific)
        expect(result).toBe('The requested file was not found.');

        // check for the presence of specific keywords or phrases in this sring
        expect(result).toMatch(/not found/i);
    });
});

describe('writing Good Assertion for arrays', () => {
    it('arrays test', () => {
        const result = [1, 2, 3];

        // Loose(too general)
        expect(result).toBeDefined();

        // Tight (too specific)
        expect(result).toEqual([1, 2, 3]);
        expect(result).toEqual(expect.arrayContaining([1, 2, 3])); // our assertion is not dependent on the order of elements in this array
        expect(result).toHaveLength(3);

        // Better assertion
        expect(result.length).toBeGreaterThan(0);
    });
});

describe('writing Good Assertion for object', () => {
    it('object test', () => {
        const result = { name: 'Mohammad' };

        // Loose(too general)
        expect(result).toMatchObject({ name: 'Mohammad' });

        // Tight (too specific)
        expect(result).toEqual({ name: 'Mohammad' });

        // Better assertion
        expect(result).toHaveProperty('name');
        expect(typeof result.name).toBe('string');
    });
});

describe('getCoupons', () => {
    it('should return an array of coupons', () => {
        const coupons = getCoupons();
        expect(Array.isArray(coupons)).toBe(true);
        expect(coupons.length).toBeGreaterThan(0);
    });

    it('should return an array with valid coupon codes', () => {
        const coupons = getCoupons();
        coupons.forEach((coupon) => {
            expect(coupon).toHaveProperty('code');
            expect(typeof coupon.code).toBe('string');
            expect(coupon.code.length).toBeTruthy();
        });
    });

    it('should return an array with valid discounts', () => {
        const coupons = getCoupons();
        coupons.forEach((coupon) => {
            expect(coupon).toHaveProperty('discount');
            expect(typeof coupon.discount).toBe('number');
            expect(coupon.code).toBeTruthy();
            expect(coupon.discount).toBeGreaterThan(0);
            expect(coupon.discount).toBeLessThan(1);
        });
    });
});

describe('calculateDiscount', () => {
    // positive testing
    it('should return discount price if given valid code', () => {
        expect(calculateDiscount(10, 'SAVE10')).toBe(9);
        expect(calculateDiscount(10, 'SAVE20')).toBe(8);
    });

    // some negative testings
    it('should handle non-numeric price', () => {
        expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
    });

    it('should handle negative price', () => {
        expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
    });

    it('should handle non-string discount code', () => {
        expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
    });

    it('should handle invalid discount code', () => {
        expect(calculateDiscount(10, 'Invalid')).toBe(10);
    });
});

describe('validateUserInput', () => {
    // positive testing
    it('should return success if given valid input', () => {
        expect(validateUserInput('Mohammad', 27)).toMatch(/success/i);
    });

    // some negative testings
    it('should return an error if username is not a string', () => {
        expect(validateUserInput(1, 27)).toMatch(/invalid/i);
    });

    it('should return an error if username is less than 3 characters', () => {
        expect(validateUserInput('mo', 27)).toMatch(/invalid/i);
    });

    it('should return an error if username is longer than 255 characters', () => {
        expect(validateUserInput('A'.repeat(256), 27)).toMatch(/invalid/i);
    });

    it('should return an error if age is not a number', () => {
        expect(validateUserInput('Mohammad', '27')).toMatch(/invalid/i);
    });

    it('should return an error if age is less than 18', () => {
        expect(validateUserInput('Mohammad', 15)).toMatch(/invalid/i);
    });

    it('should return an error if age is greater than 100', () => {
        expect(validateUserInput('Mohammad', 101)).toMatch(/invalid/i);
    });

    it('should return an error if both username and age are invalid', () => {
        expect(validateUserInput('', 0)).toMatch(/invalid username/i);
        expect(validateUserInput('', 0)).toMatch(/invalid age/i);
    });
});

describe('isPriceInRange', () => {
    it('should return false when the price is outside the range', () => {
        expect(isPriceInRange(-10, 0, 100)).toBe(false);
        expect(isPriceInRange(200, 0, 100)).toBe(false);
    });

    it('should return true when the price is equal to the min and to the max', () => {
        expect(isPriceInRange(0, 0, 100)).toBe(true);
        expect(isPriceInRange(100, 0, 100)).toBe(true);
    });

    it('should return true when the price is within the range', () => {
        expect(isPriceInRange(50, 0, 100)).toBe(true);
    });
});

describe('isPriceInRange Parameterized', () => {
    it.each([
        { scenario: 'price < min', price: -10, result: false },
        { scenario: 'price = min', price: 0, result: true },
        { scenario: 'max > price > min', price: 50, result: true },
        { scenario: 'price = max', price: 100, result: true },
        { scenario: 'price > max', price: 200, result: false }
    ])('should return $result when $scenario', ({ price, result }) => {
        expect(isPriceInRange(price, 0, 100)).toBe(result);
    });
});

describe('isValidUsername', () => {
    const minLength = 5;
    const maxLength = 15;

    it('should return false when the username is too short', () => {
        expect(isValidUsername('M'.repeat(minLength - 1))).toBe(false);
    });

    it('should return false when the username is too long', () => {
        expect(isValidUsername('M'.repeat(maxLength + 1))).toBe(false);
    });

    it('should return true when the username is at the main or max length', () => {
        expect(isValidUsername('M'.repeat(minLength))).toBe(true);
        expect(isValidUsername('M'.repeat(maxLength))).toBe(true);
    });

    it('should return true when the username is within the length contraint', () => {
        expect(isValidUsername('M'.repeat(minLength + 1))).toBe(true);
        expect(isValidUsername('M'.repeat(maxLength - 1))).toBe(true);
    });

    it('should return false for invalid input types', () => {
        expect(isValidUsername(null)).toBe(false);
        expect(isValidUsername(undefined)).toBe(false);
        expect(isValidUsername(11111111)).toBe(false);
    });
});

describe('canDrive', () => {
    it('should return error for invalid country code', () => {
        expect(canDrive(20, 'IR')).toMatch(/invalid/i);
    });

    it('should return false for underage in the US', () => {
        expect(canDrive(15, 'US')).toBe(false);
    });

    it('should return true for min in the US', () => {
        expect(canDrive(16, 'US')).toBe(true);
    });

    it('should return true for eligible in the US', () => {
        expect(canDrive(17, 'US')).toBe(true);
    });

    it('should return false for underage in the UK', () => {
        expect(canDrive(16, 'UK')).toBe(false);
    });

    it('should return true for min in the UK', () => {
        expect(canDrive(17, 'UK')).toBe(true);
    });

    it('should return true for eligible in the UK', () => {
        expect(canDrive(18, 'UK')).toBe(true);
    });
});

describe('canDrive Parameterized', () => {
    it.each([
        { age: 15, country: 'US', result: false },
        { age: 16, country: 'US', result: true },
        { age: 17, country: 'US', result: true },
        { age: 16, country: 'UK', result: false },
        { age: 17, country: 'UK', result: true },
        { age: 18, country: 'UK', result: true }
    ])(
        'should return $result for $age in the $country',
        ({ age, country, result }) => {
            expect(canDrive(age, country)).toBe(result);
        }
    );
});

describe('fetchData', () => {
    it('should return a promise that will resolve to an array of numbers', async () => {
        try {
            const result = await fetchData();
            // these two lines are optional
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBeGreaterThan(0);
        } catch (error) {
            expect(error).toHaveProperty('reason');
            expect(error.reason).toMatch(/failed/i);
        }
    });
});

describe('setup and teardown', () => {
    beforeAll(() => console.log('beforeAll called'));

    beforeEach(() => console.log('beforeEach called'));

    afterAll(() => console.log('afterAll called'));

    afterEach(() => console.log('afterEach called'));

    it('test case 1', () => {});

    it('test case 2', () => {});
});

describe('Stack', () => {
    let stack;
    beforeEach(() => {
        stack = new Stack();
    });

    it('push should add an item to the stack', () => {
        stack.push(1);

        expect(stack.size()).toBe(1);
    });

    it('pop should remove and return the top item from the stack', () => {
        stack.push(1);
        stack.push(2);

        const popedItem = stack.pop();

        expect(popedItem).toBe(2);
        expect(stack.size()).toBe(1);
    });

    it('pop should throw an error if stack is empty', () => {
        expect(() => stack.pop()).toThrow(/empty/i);
    });

    it('peek should return the top item from the stack without removing it', () => {
        stack.push(1);
        stack.push(2);

        const peekedItem = stack.peek();

        expect(peekedItem).toBe(2);
        expect(stack.size()).toBe(2);
    });

    it('peek should throw an error if stack is empty', () => {
        expect(() => stack.peek()).toThrow(/empty/i);
    });

    it('isEmpty should return true if stack is empty', () => {
        expect(stack.isEmpty()).toBe(true);
    });

    it('isEmpty should return false if stack is not empty', () => {
        stack.push(1);
        expect(stack.isEmpty()).toBe(false);
    });

    it('size should return the number of items in the stack', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.size()).toBe(2);
    });

    it('size should return the number of items in the stack', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.size()).toBe(2);
    });

    it('clear should remove all items from the stack', () => {
        stack.push(1);
        stack.push(2);

        stack.clear();
        expect(stack.size()).toBe(0);
    });
});
