import proxy from './proxy';
import matching from './path/match';

const OneOf = ({ children }) => {
    let found = false;

    return [].concat(children).map(child => {
        const { parentPath, path } = child.props;
        const { match, cached } = matching(
            parentPath, path, proxy.router.pathname,
        );
        if (found) {
            return !match && cached ? child : <div />;
        } else {
            if (match) found = match;
            return match || cached ? child : <div />;
        }
    });
};

export default OneOf;
