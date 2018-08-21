import state from '../state';
import { join, pathname } from './path';
import { regexFromPath, paramsFromPath } from './regex';

export default (parentPath, path) => {
    const fullPath = join(parentPath, path);
    const regex = regexFromPath(fullPath);
    const match = regex.test(pathname());
    const cached = state.cache[regex];
    const params = !match
        ? {}
        : paramsFromPath(
            parentPath,
            path,
            pathname(),
        );

    return {
        fullPath,
        regex,
        match,
        cached,
        params,
    };
};
