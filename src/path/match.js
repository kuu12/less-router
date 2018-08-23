import proxy from '../proxy';
import { join } from './path';
import { regexFromPath, paramsFromPath } from './regex';

export default (parentPath, path, pathname) => {
    const fullPath = join(parentPath, path);
    const regex = regexFromPath(fullPath);
    const match = regex.test(pathname);
    const cached = proxy.router.cache[regex];
    const params = !match
        ? {}
        : paramsFromPath(parentPath, path, pathname);

    return { fullPath, regex, match, cached, params };
};
