import { regexFrom } from './regex';
import { join } from './helper';
import proxy from '../proxy';

export default (...args) => {
    const caseSensitive =
        typeof args[args.length - 1] == 'boolean' &&
        args.pop();

    const path = args.pop();
    const parentPath = args.pop();

    return regexFrom(join(parentPath, path), caseSensitive)
        .test(proxy.router.pathname);
};
