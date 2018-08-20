import '../demo';
import { router } from '../src';

test('11', () => {
    expect(location.pathname).toEqual('/cinima');
    expect(document.getElementById('app')).toBeTruthy();
});

describe('', () => {
    beforeAll(() => document.getElementById('button-tv').click());

    test('22', () => {
        expect(location.pathname).toEqual('/cinima/tv/');
    });

});