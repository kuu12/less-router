import { regexFrom, paramsFrom } from './regex';
import { join } from './helper';
import proxy from '../proxy';

const match = (...args) => {
    const caseSensitive =
        typeof args[args.length - 1] == 'boolean' &&
        args.pop();

    const path = args.pop();
    const parentPath = args.pop();

    return regexFrom(join(parentPath, path), caseSensitive)
        .test(proxy.router.pathname);
};

const params = (...args) => {
    const path = args.pop();
    const parentPath = args.pop();

    return paramsFrom(parentPath, path, proxy.router.pathname);
};

export { match, params };
