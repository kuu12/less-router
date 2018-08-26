import '../demo';
import { getCount } from '../demo/data';
import proxy from '../src/proxy';
import { delay, getProps } from './util';

describe('homepage', () => {
    expect(document.getElementById('trending'))
        .toBeInstanceOf(HTMLElement);
});

describe('basic use', () => {
    beforeAll(() =>
        document
            .getElementById('button-movie')
            .click()
    );

    test('location.pathname', () => {
        expect(location.pathname)
            .toBe('/cinima/movie');
    });

    test('route rendering', () => {
        expect(document.getElementById('trending'))
            .toBeFalsy();
        expect(document.getElementById('movie'))
            .toBeInstanceOf(HTMLElement);
        expect(document.getElementById('tv'))
            .toBeFalsy();
    });

    test('router and others in props', () => {
        const props = getProps('movie');
        expect(props.router).toBeTruthy();
        expect(props.foo).toBe(11);
    });
});

describe('dynamic routing', () => {
    beforeAll(() =>
        document
            .getElementById('button-tv')
            .click()
    );

    test('route rendering', () => {
        expect(document.getElementById('movie'))
            .toBeFalsy();
        expect(document.getElementById('tv'))
            .toBeInstanceOf(HTMLElement);
        expect(document.querySelector('#tv #genre'))
            .toBeFalsy();
    });

    test('path and pathname in props', () => {
        const props = getProps('tv');
        expect(props.path).toBe('/tv/');
        expect(props.pathname).toBe('/tv');
    });

    describe('child route', () => {
        beforeAll(() =>
            document
                .getElementById('button-action')
                .click()
        );

        test('location.pathname', () => {
            expect(location.pathname)
                .toBe('/cinima/tv/action');
        });


        test('route rendering', () => {
            expect(document.getElementById('tv'))
                .toBeInstanceOf(HTMLElement);
            expect(document.querySelector('#tv #genre'))
                .toBeInstanceOf(HTMLElement);
        });

        test('props', () => {
            const props = getProps('genre');
            expect(props.genre).toBe('action');
            expect(props.pathname).toBe('/tv/action');
        });
    });
});

describe('history back', () => {
    beforeAll(async () => {
        document
            .getElementById('button-back')
            .click();

        await delay(500);
    });

    test('location.pathname', () => {
        expect(location.pathname)
            .toBe('/cinima/tv');
    });

    test('route rendering', async () => {
        expect(document.getElementById('tv'))
            .toBeInstanceOf(HTMLElement);
        expect(document.querySelector('#tv #genre'))
            .toBeFalsy();
    });
});

describe('exclusive route', () => {
    beforeAll(() => {
        document
            .getElementById('button-purchased')
            .click();
    });

    test('route rendering', () => {
        expect(document.getElementById('purchased'))
            .toBeInstanceOf(HTMLElement);
        expect(document.getElementById('play'))
            .toBeFalsy();
    });
});

describe('caching', () => {
    beforeAll(async () => {
        await delay(1500);
        document
            .querySelector('#purchased li')
            .click();
    });

    test('route rendering', () => {
        expect(document.getElementById('purchased'))
            .toBeInstanceOf(HTMLElement);
        expect(document.getElementById('play'))
            .toBeInstanceOf(HTMLElement);
    });

    test('invisible', () => {
        const dom = document.getElementById('purchased');
        expect(
            dom.parentNode.style.display
        ).toEqual('none');
    });

    describe('back', () => {
        let count;

        beforeAll(async () => {
            count = getCount();
            await proxy.router.back();
            await delay(1500);
        });

        test('visible', () => {
            const dom = document.getElementById('purchased');
            expect(
                dom.parentNode.style.display
            ).not.toEqual('none');
        });

        test('no remouting', () => {
            expect(getCount()).toBe(count);
        });
    });

    describe('clear cache', () => {
        let count;

        beforeAll(async () => {
            proxy.router.push('/');
            await proxy.router.clearCache('/library/purchased');
            count = getCount();
            document.getElementById('button-purchased').click();
        });

        test('remount', () => {
            expect(getCount()).toBeGreaterThan(count);
        });
    });

});
