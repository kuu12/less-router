import proxy from '../proxy';
import { join } from './path';
import { regexFromPath, paramsFromPath } from './regex';

export default (parentPath, path) => {
    const fullPath = join(parentPath, path);
    const regex = regexFromPath(fullPath);
    const match = regex.test(proxy.router.pathname);
    const cached = proxy.router.cache[regex];
    const params = !match
        ? {}
        : paramsFromPath(
            parentPath, path, proxy.router.pathname,
        );

    return { fullPath, regex, match, cached, params };
};
