import '../demo';
import { router } from '../src';

describe('router.push', () => {
    beforeAll(() =>
        document.getElementById('button-tv').click()
    );

    test('pathname and route', () => {
        expect(location.pathname)
            .toEqual('/cinima/tv');
        expect(document.getElementById('tv'))
            .toBeInstanceOf(HTMLElement);
    });
});
