import {it, expect, describe} from 'vitest';
import {calculateDiscount, getCoupons} from '../src/core';

describe('test suite', () => {
    it('test case', () => {
        const result = {name: 'Mohammad'};
        expect(result).toEqual({name: 'Mohammad'});
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
        const result = {name: 'Mohammad'};

        // Loose(too general)
        expect(result).toMatchObject({name: 'Mohammad'});

        // Tight (too specific)
        expect(result).toEqual({name: 'Mohammad'});

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
        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('code');
            expect(typeof coupon.code).toBe('string');
            expect(coupon.code.length).toBeTruthy();
        });
    });

    it('should return an array with valid discounts', () => {
        const coupons = getCoupons();
        coupons.forEach(coupon => {
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
        expect(calculateDiscount(10, 'Invlaid')).toBe(10);
    });
});