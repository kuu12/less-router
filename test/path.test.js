import { join } from '../src/path/path';
import { regexFrom, paramsFrom } from '../src/path/regex';

test('regexFrom', () => {
    expect(
        regexFrom('/order').test('/order')
    ).toBeTruthy();
    expect(
        regexFrom('/order').test('/order/')
    ).toBeTruthy();
    expect(
        regexFrom('/order').test('/order/1')
    ).toBeFalsy();

    expect(
        regexFrom('/order/').test('/order')
    ).toBeTruthy();
    expect(
        regexFrom('/order/').test('/order/')
    ).toBeTruthy();
    expect(
        regexFrom('/order/').test('/order/1')
    ).toBeTruthy();
});

test('paramsFrom', () => {
    expect(
        paramsFrom(
            '/order/',
            '/:orderId/:itemId',
            '/order/112233abc/222555',
        )
    ).toMatchObject({
        orderId: '112233abc',
        itemId: '222555',
    });

    expect(
        paramsFrom(
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
