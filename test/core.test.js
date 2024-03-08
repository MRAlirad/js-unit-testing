import {it, expect, describe} from 'vitest';

describe('test suite', () => {
    it('test case', () => {
        const result = {name: 'Mohammad'};
        expect(result).toEqual({name: 'Mohammad'});
    });
});