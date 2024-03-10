import {vi, it, expect, describe} from 'vitest';
import {getPriceInCurrency} from '../src/mocking';
import {getExchangeRate} from '../src/libs/currency';

// to mock a module (fist step to replace a real function with a mock function)
vi.mock('../src/libs/currency');

describe('working with mock function', () => {
    it('working with mock function test', () => {
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

        expect(greet).toHaveBeenCalled();
        // expect(greet).toHaveBeenCalledWith('Mohammad');
        // expect(greet).toHaveBeenCalledOnce();
    });
});

describe('exercise working with a mock function', () => {
    it('send text', () => {
        // creating a mock funtion
        const sendText = vi.fn();
        sendText.mockReturnValue('ok');

        // call them mock function
        const result = sendText('message');

        // Assert that the mock function is called
        expect(sendText).toHaveBeenCalledWith('message');

        // Assert taht the result is 'ok
        expect(result).toBe('ok');
    });
});

describe('getPriceInCurrency', () => {
    it('should return price in targer currency', () => {
        vi.mocked(getExchangeRate).mockReturnValue(1.5);

        const price = getPriceInCurrency(10, 'AUS');

        expect(price).toBe(15);
    });
});