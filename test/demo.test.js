history.replaceState({}, null, '/kuu12');

require('../demo');
const Log = require('../demo/log').default;
const { delay } = require('./util');

const id = id => document.getElementById(id);
const button = name => document.querySelector(`button[name="${name}"]`).click();
describe('basic use', function () {
    beforeAll(function () {
        button('basic');
    });
    test('push', function () {
        expect(id('basic')).toBeInstanceOf(HTMLElement);
    });
    test('props', function () {
        expect(typeof Log.basic.router).toBe('object');
    });
    test('rendering', function () {
        expect(id('login')).toBeFalsy();
    });
    describe('back', function () {
        beforeAll(async function () {
            await Log.basic.router.back();
        });
        test('rendering', function () {
            expect(id('basic')).toBeFalsy();
        });
    });
});
describe('URL parameters', function () {
    beforeAll(function () {
        button('parameter');
    });
    test('rendering', function () {
        expect(id('parameter')).toBeInstanceOf(HTMLElement);
    });
    test('props', function () {
        expect(Log.parameter).toMatchObject({
            name: 'kuu',
            id: '12',
        });
    });
});
describe('cache', function () {
    let mount = Log.cache.mount;
    beforeAll(function () {
        button('cache');
    });
    test('mount', function () {
        expect(id('cache')).toBeInstanceOf(HTMLElement);
        expect(mount + 1).toBe(Log.cache.mount);
    });
    describe('leave', function () {
        beforeAll(async function () {
            await Log.basic.router.push('/');
        });
        test('no unmount', function () {
            expect(id('cache')).toBeInstanceOf(HTMLElement);
            expect(id('cache').parentNode.style.display).toBe('none');
        });
    });
    describe('enter again', function () {
        beforeAll(function () {
            button('cache');
        });
        test('no remount', function () {
            expect(mount + 1).toBe(Log.cache.mount);
        });
    });
    describe('clear cache', function () {
        beforeAll(async function () {
            await Log.basic.router.push('/');
            await Log.basic.router.clearCache('/cache');
            button('cache');
            await delay(500);
        });
        test('remount', function () {
            expect(mount + 1).toBe(Log.cache.mount - 1);
        });
    });
});