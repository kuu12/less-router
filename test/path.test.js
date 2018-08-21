import { join, pathname } from '../src/path/path';
import { regexFromPath, paramsFromPath } from '../src/path/regex';
import state from '../src/state';

test('regexFromPath', () => {
    expect(
        regexFromPath('/order').test('/order')
    ).toBeTruthy();
    expect(
        regexFromPath('/order').test('/order/')
    ).toBeTruthy();
    expect(
        regexFromPath('/order').test('/order/1')
    ).toBeFalsy();

    expect(
        regexFromPath('/order/').test('/order')
    ).toBeTruthy();
    expect(
        regexFromPath('/order/').test('/order/')
    ).toBeTruthy();
    expect(
        regexFromPath('/order/').test('/order/1')
    ).toBeTruthy();
});

test('paramsFromPath', () => {
    expect(
        paramsFromPath(
            '/order/',
            '/:orderId/:itemId',
            '/order/112233abc/222555',
        )
    ).toMatchObject({
        orderId: '112233abc',
        itemId: '222555',
    });

    expect(
        paramsFromPath(
            '/order/',
            '/:orderId/:orderId',
            '/order/112233abc/222555',
        )
    ).toMatchObject({
        orderId: '222555',
    });
});

test('join', () => {
    expect(
        join('/order', '/:orderId')
    ).toEqual('/order/:orderId');
    expect(
        join('order', ':orderId')
    ).toEqual('/order/:orderId');
    expect(
        join('/order', ':orderId')
    ).toEqual('/order/:orderId');
    expect(
        join('order/', ':orderId')
    ).toEqual('/order/:orderId');
    expect(
        join('/order/', ':orderId')
    ).toEqual('/order/:orderId');
    expect(
        join('/order', ':orderId')
    ).toEqual('/order/:orderId');
    expect(
        join('/order', ':orderId/')
    ).toEqual('/order/:orderId/');
    expect(
        join('/order', '/:orderId/')
    ).toEqual('/order/:orderId/');

    expect(
        join('/', '/order')
    ).toEqual('/order');
    expect(
        join(undefined, '/order')
    ).toEqual('/order');
    expect(
        join('', '/order')
    ).toEqual('/order');
});

describe('pathname', () => {
    beforeAll(() => {
        state.basename = '/my-project';
    });

    describe('/', () => {
        beforeEach(() => {
            window.history.pushState({}, null, '/my-project');
        });

        test('0', () => {
            expect(
                pathname()
            ).toEqual('/');
        });
    });

    describe('/order/191919', () => {
        beforeEach(() => {
            window.history.pushState({}, null, '/my-project/order/191919');
        });

        test('1', () => {
            expect(
                pathname()
            ).toEqual('/order/191919');
        });
    });

    describe('/home', () => {
        beforeEach(() => {
            window.history.replaceState({}, null, '/my-project/home');
        });

        test('2', () => {
            expect(
                pathname()
            ).toEqual('/home');
        });
    });

});
