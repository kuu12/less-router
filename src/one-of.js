import proxy from './proxy';
import matching from './path/match';

const OneOf = ({ children, root }) => {
    let found = false;

    return [].concat(children).map(child => {
        const { parentPath, path, autoCache } = child.props;
        const { match, cached } = matching(
            parentPath, path, proxy.router.pathname,
        );
        const first = !found && match;
        const render = cached || first;
        if (!render) return <div />;
        if (first) found = match;
        if (root && autoCache) {
            child.props.noWrap = root;
            child = (
                <div
                    className="route-container"
                    style={match ? {} : { display: 'none' }}
                >
                    {child}
                </div>
            );
        }

        return child;
    });
};

export default OneOf;
