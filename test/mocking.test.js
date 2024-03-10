import {vi, it, expect, describe} from 'vitest';

describe('test suite', () => {
    it('test case', () => {
        const greet = vi.fn();
        // programm a mock function to return a value
        greet.mockReturnValue('Hello');
        const result = greet();
        // console.log(result);

        // program a mock function to return a promise that resolves to a value
        // greet.mockResolvedValue('promised Hello');
        // greet().then((result) => console.log(result));

        // add loginc to a mock function
        // greet.mockImplementation(name => 'Hello ' + name);
        // const res = greet('Mohammad');
        // console.log(res);
        
        // expect(greet).toHaveBeenCalled();
        // expect(greet).toHaveBeenCalledWith('Mohammad');
        expect(greet).toHaveBeenCalledOnce();
    });
});