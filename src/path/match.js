import proxy from '../proxy';
import { join } from './helper';
import { regexFrom } from './regex';

export default (parentPath, path, pathname) => {
    const fullPath = join(parentPath, path);
    const regex = regexFrom(fullPath);
    const match = regex.test(pathname);
    const cached = proxy.router.cache[regex];

    return { fullPath, regex, match, cached };
};
