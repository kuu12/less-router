import {
    regexFromPath,
    paramsFromPath,
    joinPath,
} from '../src/path';

test('path matching', () => {
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

test('params', () => {
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

test('join path', () => {
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

