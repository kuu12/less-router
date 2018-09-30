import path from 'path';
import fse from 'fs-extra';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const pp = (...args) => path.join(__dirname, ...args);

const babelrc = fse.readJsonSync(pp('../.babelrc'));
babelrc.presets[0][1].modules = false;

const config = {
    input: pp('../src/index.jsx'),
    external: ['react'],
    output: {
        // name: 'Routing',
        // format: 'umd'
        format: 'cjs'
    },
    plugins: [
        resolve({
            extensions: ['.js', '.jsx', '.json']
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        babel({
            babelrc: false,
            plugins: ['external-helpers'],
            ...babelrc
        })
    ]
};

switch (process.env.NODE_ENV) {
    case 'development':
        config.output.file = pp('../dist/less-router.js');
        config.output.sourcemap = true;
        break;

    case 'production':
        config.output.file = pp('../dist/less-router.min.js');
        config.plugins.push(
            uglify({
                mangle: { toplevel: true }
            })
        );
        break;
}

export default config;
