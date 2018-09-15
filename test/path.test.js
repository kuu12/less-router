import { join } from '../src/path/helper';
import { regexFrom, paramsFrom } from '../src/path/regex';

describe('join', () => {
    test('general', () => {
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
    });

    test('special', () => {
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
});

describe('regexFrom', () => {
    test('general', () => {
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
            regexFrom('/order').test('/order1234')
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
        expect(
            regexFrom('/order/').test('/order1234')
        ).toBeFalsy();
    });

    test('special', () => {
        expect(
            regexFrom('/order/:n/:w').test('/order/-my~name/-my~work')
        ).toBeTruthy();
    });

    test('case sensitive', () => {
        expect(
            regexFrom('/order').test('/Order')
        ).toBeTruthy();
        expect(
            regexFrom('/Order', true).test('/Order')
        ).toBeTruthy();
        expect(
            regexFrom('/Order', true).test('/order')
        ).toBeFalsy();
    });
});

describe('paramsFrom', () => {
    test('general', () => {

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

    test('special', () => {
        expect(
            paramsFrom(
                null,
                '/order/:n/:w',
                '/order/-my~name/-my~work',
            )
        ).toMatchObject({
            n: '-my~name',
            w: '-my~work',
        });

        expect(
            paramsFrom(
                null,
                '/order/aaa:id/bbb:no',
                '/order/aaa111/bbb222',
            )
        ).toMatchObject({
            id: '111',
            no: '222',
        });
    });
});

