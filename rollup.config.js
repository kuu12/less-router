import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: './src/index.jsx',
    external: ['react'],
    output: {
        file: './dist/less-router.production.min.js',
        format: 'cjs',
    },
    plugins: [
        resolve({
            extensions: ['.js', '.jsx', '.json'],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(
                process.env.NODE_ENV || 'production'
            ),
        }),
        babel(),
        uglify({
            mangle: {
                toplevel: true,
            },
        }),
    ],
};
