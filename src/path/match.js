import proxy from '../proxy';
import { join } from './helper';
import { regexFrom } from './regex';

const matching = (
    parentPath,
    path,
    caseSensitive,
    pathname = proxy.router.pathname,
) => {
    const fullPath = join(parentPath, path);
    const regex = regexFrom(fullPath, caseSensitive);
    const match = regex.test(pathname);
    const cached = proxy.router.cache[regex];

    return { fullPath, regex, match, cached };
};

const match = (...args) => {
    const caseSensitive =
        typeof args[args.length - 1] === 'boolean' &&
        args.pop();
    const path = args.pop();
    const parentPath = args.pop();

    return matching(parentPath, path, caseSensitive).match;
};

export {
    matching,
    match,
};
