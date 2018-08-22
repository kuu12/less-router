import { join } from '../src/path/path';
import { regexFromPath, paramsFromPath } from '../src/path/regex';

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
