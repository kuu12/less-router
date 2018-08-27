import React from 'react';
import ReactDOM from 'react-dom';
import Routing from '../src';
import proxy from '../src/proxy';
import { delay } from './util';

const log = (...args) => false && console.log(...args);

let count = 0;

class Aaa extends React.Component {
    componentDidMount() {
        count += 1;
    }
    render() {
        return <div id="aaa" />;
    }
}
class Bbb extends React.Component {
    render() {
        return <div id="bbb" />;
    }
}
class AB extends React.Component {
    render() {
        return (
            <Routing>
                <AaaRoute path="/aaa" title="aaa" autoCache />
                <BbbRoute path="/bbb" title="bbb" />
            </Routing>
        );
    }
}

const AaaRoute = Routing(Aaa);
const BbbRoute = Routing(Bbb);
const ABRoute = Routing(AB);

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const Root = <ABRoute />;
// const Root = <Routing>
//     <AaaRoute path="/aaa" title="aaa" />
//     <BbbRoute path="/bbb" title="bbb" />
// </Routing>;

ReactDOM.render(Root, root);

test('init', () => {
    log(proxy.router.pathname);
    log(root.innerHTML);
    log(JSON.stringify(proxy.router.cache));
    log(JSON.stringify(proxy.router.registeredRoutes));
    log('\n');
    expect(document.getElementById('aaa'))
        .toBeFalsy();
    expect(document.getElementById('bbb'))
        .toBeFalsy();
});

describe('exclusive route', () => {
    beforeAll(() => {
        proxy.router.push('/aaa');
    });
    test('route rendering', () => {
        log(proxy.router.pathname);
        log(root.innerHTML);
        log(JSON.stringify(proxy.router.cache));
        log(JSON.stringify(proxy.router.registeredRoutes));
        log('\n');
        expect(document.getElementById('aaa'))
            .toBeInstanceOf(HTMLElement);
        expect(document.getElementById('bbb'))
            .toBeFalsy();
        expect(count).toBe(1);
    });
});
describe('route change', () => {
    beforeAll(async () => {
        await proxy.router.push('/bbb');
        await delay(500);
    });
    test('route rendering', () => {
        log(proxy.router.pathname);
        log(root.innerHTML);
        log(JSON.stringify(proxy.router.cache));
        log(JSON.stringify(proxy.router.registeredRoutes));
        log('\n');
        const parent = document
            .getElementById('aaa')
            .parentNode;
        expect(
            parent.style.display
        ).toBe('none');
        expect(document.getElementById('aaa'))
            .toBeInstanceOf(HTMLElement);
        expect(document.getElementById('bbb'))
            .toBeInstanceOf(HTMLElement);
        expect(count).toBe(1);
    });
});
describe('back', () => {
    beforeAll(async () => {
        await proxy.router.push('/aaa');
        await delay(500);
    });
    test('no remount', () => {
        log(proxy.router.pathname);
        log(root.innerHTML);
        log(JSON.stringify(proxy.router.cache));
        log(JSON.stringify(proxy.router.registeredRoutes));
        log('\n');
        log(proxy.router.props.Component);
        expect(count).toBe(1);
    });
});

describe('clear cache', () => {
    beforeAll(async () => {
        await proxy.router.push('/bbb');
        await proxy.router.clearCache('/aaa');
        await proxy.router.push('/aaa');
        await delay(500);
    });
    test('remount', () => {
        log(proxy.router.pathname);
        log(root.innerHTML);
        log(JSON.stringify(proxy.router.cache));
        log(JSON.stringify(proxy.router.registeredRoutes));
        log('\n');
        expect(count).toBe(2);
    });
});