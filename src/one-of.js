import matching from './path/match';

const OneOf = ({ children }) => {
    let found = false;

    return [].concat(children).filter(child => {
        const { parentPath, path } = child.props;
        const { match, cached } = matching(parentPath, path);

        if (found) {
            return !match && cached;
        } else {
            if (match) found = match;
            return match || cached;
        }
    });
};

export default OneOf;
