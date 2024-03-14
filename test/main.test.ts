import { it, expect, describe } from 'vitest'
import { calculateDiscount } from '../src/main';

describe('calculateDiscount', () => {
    // positive testing
    it('should return discount price if given valid code', () => {
        expect(calculateDiscount(10, 'SAVE10')).toBe(9);
        expect(calculateDiscount(10, 'SAVE20')).toBe(8);
    });

    // some negative testings
    it('should handle negative price', () => {
        expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
    });

    it('should handle invalid discount code', () => {
        expect(calculateDiscount(10, 'Invalid')).toBe(10);
    });
});