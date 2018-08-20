import {
    regexFromPath,
    paramsFromPath,
    joinPath,
    getPathname,
} from '../src/path';
import Basename from '../src/basename';

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
            '/order/:orderId/:itemId',
            '/order/112233abc/222555',
        )
    ).toMatchObject({
        orderId: '112233abc',
        itemId: '222555',
    });

    expect(
        paramsFromPath(
            '/order/:orderId/:orderId',
            '/order/112233abc/222555',
        )
    ).toMatchObject({
        orderId: '222555',
    });
});

test('joinPath', () => {
    expect(
        joinPath('/order', '/:orderId')
    ).toEqual('/order/:orderId');
    expect(
        joinPath('order', ':orderId')
    ).toEqual('/order/:orderId');
    expect(
        joinPath('/order', ':orderId')
    ).toEqual('/order/:orderId');
    expect(
        joinPath('order/', ':orderId')
    ).toEqual('/order/:orderId');
    expect(
        joinPath('/order/', ':orderId')
    ).toEqual('/order/:orderId');
    expect(
        joinPath('/order', ':orderId')
    ).toEqual('/order/:orderId');
    expect(
        joinPath('/order', ':orderId/')
    ).toEqual('/order/:orderId/');
    expect(
        joinPath('/order', '/:orderId/')
    ).toEqual('/order/:orderId/');

    expect(
        joinPath('/', '/order')
    ).toEqual('/order');
    expect(
        joinPath(undefined, '/order')
    ).toEqual('/order');
    expect(
        joinPath('', '/order')
    ).toEqual('/order');
});

describe('getPathname', () => {
    beforeAll(() => {
        Basename.set('/my-project');
    });

    describe('/', () => {
        beforeEach(() => {
            window.history.pushState({}, null, '/my-project');
        });

        test('0', () => {
            expect(
                getPathname()
            ).toEqual('/');
        });
    });

    describe('/order/191919', () => {
        beforeEach(() => {
            window.history.pushState({}, null, '/my-project/order/191919');
        });

        test('1', () => {
            expect(
                getPathname()
            ).toEqual('/order/191919');
        });
    });

    describe('/home', () => {
        beforeEach(() => {
            window.history.replaceState({}, null, '/my-project/home');
        });

        test('2', () => {
            expect(
                getPathname()
            ).toEqual('/home');
        });
    });

});
