import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const config = {
    input: './src/index.jsx',
    external: ['react'],
    output: {
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
            presets: [
                ['env', {
                    modules: false,
                    targets: {
                        browsers: ['Android >= 4.0', 'ios >= 6']
                    },
                    debug: true,
                    include: [],
                    useBuiltIns: false
                }],
                'stage-2',
                'react'
            ],
            plugins: ['external-helpers']
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
