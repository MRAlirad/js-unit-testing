import {it, expect, describe} from 'vitest';

describe('test suite', () => {
    it('test case', () => {
        const result = {name: 'Mohammad'};
        expect(result).toEqual({name: 'Mohammad'});
    });
});

describe('writing Good Assertion for strings', () => {
    it('error test', ()=> {
        const result = 'The requested file was not found.';

        // Loose(too general)
        expect(result).toBeDefined();

        // Tight (too specific)
        expect(result).toBe('The requested file was not found.');
        
        // check for the presence of specific keywords or phrases in this sring
        expect(result).toMatch(/not found/i);
    })
    
});

describe('writing Good Assertion for arrays', () => {
    it('error test', ()=> {
        const result = [1, 2, 3];

        // Loose(too general)
        expect(result).toBeDefined();

        // Tight (too specific)
        expect(result).toEqual([1, 2, 3]);
        expect(result).toEqual(expect.arrayContaining([1, 2, 3])); // our assertion is not dependent on the order of elements in this array
        expect(result).toHaveLength(3);

        // Better assertion
        expect(result.length).toBeGreaterThan(0);
    })
});

describe('writing Good Assertion for object', () => {
    it('error test', ()=> {
        const result = {name: 'Mohammad'};

        // Loose(too general)
        expect(result).toMatchObject({name: 'Mohammad'});

        // Tight (too specific)
        expect(result).toEqual({name: 'Mohammad'});

        // Better assertion
        expect(result).toHaveProperty('name');
        expect(typeof result.name).toBe('string');
    })
});