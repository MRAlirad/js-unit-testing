import {vi, it, expect, describe} from 'vitest';
import {getPriceInCurrency, getShippingInfo, renderPage} from '../src/mocking';
import {getExchangeRate} from '../src/libs/currency';
import {getShippingQuote} from '../src/libs/shipping';
import {trackPageView} from '../src/libs/analytics';

// to mock a module (fist step to replace a real function with a mock function)
vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');

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

describe('getShippingInfo', () => {
    it('should return shipping unavailable if quote can not be fetched', () => {
        // we need tto program our mock funciton to return null as a quote
        vi.mocked(getShippingQuote).mockReturnValue(null);

        const result = getShippingInfo('London');

        expect(result).toMatch(/unavailable/i);
    });

    it('should return shipping info if quote can be fetched', () => {
        vi.mocked(getShippingQuote).mockReturnValue({cost: 10, estimatedDays: 2});

        const result = getShippingInfo('London');

        expect(result).toMatch('$10');
        expect(result).toMatch(/2 days/i);

        // combine these two assertion
        expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
    });
});

describe('renderPage', () => {
    it('should should return correct content', async () => {
        const result = await renderPage();

        expect(result).toMatch(/content/i);
    });

    it('should call analytics', async () => {
        await renderPage();

        expect(trackPageView).toHaveBeenCalledWith('/home');
    });
});