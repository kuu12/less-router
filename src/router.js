import 'es6-promise';
import React from 'react';
import cache from './cache';
import config from './config';

class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.router = {
            basename: basename =>
                config.basename = basename,

            push: path => (
                history.pushState(
                    {},
                    null,
                    config.basename + path,
                ),
                this.router.__updatePathnameState__()
            ),

            replace: path => (
                history.replaceState(
                    {},
                    null,
                    config.basename + path,
                ),
                this.router.__updatePathnameState__()
            ),

            back: () => history.back(),
            forward: () => history.forward(),
            go: step => history.go(step),

            __updatePathnameState__: () =>
                new Promise(resolve =>
                    this.setState(
                        { __pathname__: config.basename + location.pathname },
                        resolve,
                    )
                ),

            clear: path => (
                cache.delete(path),
                new Promise(resolve =>
                    this.forceUpdate(resolve)
                )
            ),

            notFound: () => Object
                .values(config.paths)
                .some(Boolean),
        };
        window.addEventListener(
            'popstate',
            this.router.__updatePathnameState__,
        );
    }
}

export default Router;
