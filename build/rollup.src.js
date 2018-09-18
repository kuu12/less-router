import path from 'path';
import fse from 'fs-extra';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const babelrc = fse.readJsonSync(
    path.join(__dirname, '..', '.babelrc')
);
babelrc.presets[0][1].modules = false;

const config = {
    input: './src/index.jsx',
    external: ['react'],
    output: {
        name: 'Routing',
        format: 'umd'
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
        config.output.file = './dist/less-router.js';
        config.output.sourcemap = true;
        break;

    case 'production':
        config.output.file = './dist/less-router.min.js';
        config.plugins.push(
            uglify({
                mangle: { toplevel: true }
            })
        );
        break;
}

export default config;
