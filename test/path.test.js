import { paramsFromPath } from '../src/path';

test('1', () => {
    expect(
        paramsFromPath(
            '/order/:orderId',
            '/order/112233abc',
        )
    ).toMatchObject({
        orderId: '112233abc',
    });
});