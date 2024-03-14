import { vi, it, expect, describe, beforeEach } from 'vitest';
import {
    getPriceInCurrency,
    getShippingInfo,
    renderPage,
    submitOrder,
    signUp,
    login,
    isOnline,
    getDiscount
} from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';
import { sendEmail } from '../src/libs/email';
import security from '../src/libs/security';

// to mock a module (fist step to replace a real function with a mock function)
vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');

// partial mocking
vi.mock('../src/libs/email', async (importOriginal) => {
    // as part of executing our tests, vitest is going to pass a function here, whick we can call import original
    // using this funcion we can import the original module, whick return a promise

    const originalEmailModule = await importOriginal();

    // we should return a module.
    // in this module, we want to have all the functions of the original module, but we want to replace one of them. whick is sendEmail
    return {
        ...originalEmailModule,
        sendEmail: vi.fn() // to create a mock funtion
    };

    // if we do not provide a factory function here, vitest will replace every function, every exported function from this module with vi.fn().
    // but now we're changing that behavior using partial mocking
});

describe('working with mock function', () => {
    it('working with mock function test', () => {
        const greet = vi.fn();
        // programm a mock function to return a value
        greet.mockReturnValue('Hello');
        // const result = greet();
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
        vi.mocked(getShippingQuote).mockReturnValue({
            cost: 10,
            estimatedDays: 2
        });

        const result = getShippingInfo('London');

        expect(result).toMatch('$10');
        expect(result).toMatch(/2 days/i);

        // combine these two assertion
        expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
    });
});

describe('renderPage', () => {
    it('should return correct content', async () => {
        const result = await renderPage();

        expect(result).toMatch(/content/i);
    });

    it('should call analytics', async () => {
        await renderPage();

        expect(trackPageView).toHaveBeenCalledWith('/home');
    });
});

describe('submitOrder', () => {
    const order = { totalAmount: 10 };
    const creditCard = { creditCardNumber: '1234567890' };

    it('should charge the customer', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'success' });

        await submitOrder(order, creditCard);

        expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
    });

    it('should return success when payment is successful', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'success' });

        const result = await submitOrder(order, creditCard);

        expect(result).toEqual({ success: true });
    });

    it('should return failed when payment is not successful', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'failed' });

        const result = await submitOrder(order, creditCard);

        expect(result).toEqual({ success: false, error: 'payment_error' });
    });
});

describe('signUp', () => {
    const email = 'example@gmail.com';

    beforeEach(() => {
        vi.mocked(sendEmail).mockClear();

        // or

        vi.clearAllMocks();
    });

    it('should return false if email is invalid', async () => {
        const result = await signUp('a');
        expect(result).toBe(false);
    });

    it('should return true if email is valid', async () => {
        const result = await signUp(email);
        expect(result).toBe(true);
    });

    it('should send welcome email if email is valid', async () => {
        // const result = await signUp(email);
        expect(sendEmail).toHaveBeenCalled();

        // to validate the arguments we have to take a different approach
        // the mock property gives us access to certain information about this mock function
        const args = vi.mocked(sendEmail).mock.calls[0];

        expect(args[0]).toBe(email);
        expect(args[1]).toMatch(/welcome/i);
    });
});

describe('login', () => {
    it('should email ehe one-time login code', async () => {
        const email = 'example@gmail.com';
        // we need to pass to arguments to spyOn method. and object, and a method in that object. that object is the object that contains generateCode function
        // on the second argument we pass a string that represent a method
        const spy = vi.spyOn(security, 'generateCode');

        await login(email);

        const scurityCode = spy.mock.results[0].value.toString();
        expect(sendEmail).toHaveBeenCalledWith(email, scurityCode);
    });
});

describe('isOnline', () => {
    it('should return false if current hour is outside opening hours', () => {
        vi.setSystemTime('2024-01-01 07:59');
        expect(isOnline()).toBe(false);

        vi.setSystemTime('2024-01-01 20:01');
        expect(isOnline()).toBe(false);
    });

    it('should return true if current hour is within opening hours', () => {
        vi.setSystemTime('2024-01-01 08:00');
        expect(isOnline()).toBe(true);

        vi.setSystemTime('2024-01-01 19:59');
        expect(isOnline()).toBe(true);
    });
});

describe('getDiscount', () => {
    it('should return 0.2 on christmas day', () => {
        vi.setSystemTime('2024-12-25 00:01');
        expect(getDiscount()).toBe(0.2);

        vi.setSystemTime('2024-12-25 23:59');
        expect(getDiscount()).toBe(0.2);
    });

    it('should return 0 on any other day', () => {
        vi.setSystemTime('2024-12-24 00:01');
        expect(getDiscount()).toBe(0);

        vi.setSystemTime('2024-12-26 00:01');
        expect(getDiscount()).toBe(0);
    });
});
