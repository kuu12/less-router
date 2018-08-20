import state from './state';
import {
    joinPath,
    getPathname,
    regexFromPath,
    paramsFromPath,
    removeParam,
} from './path';

export default (parentPath, path) => {
    const fullPath = joinPath(parentPath, path);
    const pathname = getPathname();
    const regex = regexFromPath(fullPath);
    const match = regex.test(pathname);
    const cached = state.cache[regex];
    const params = !match
        ? {}
        : paramsFromPath(
            joinPath(
                removeParam(parentPath),
                path
            ),
            pathname,
        );

    return {
        fullPath,
        pathname,
        regex,
        match,
        cached,
        params,
    };
};
