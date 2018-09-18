
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
    input: './demo/index.jsx',
    external: ['react', 'react-dom'],
    output: {
        format: 'umd',
        file: './.temp/demo.bundle.js',
        sourcemap: true,
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        }
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
        }),
        uglify({
            mangle: { toplevel: true }
        })
    ],
    watch: {
        include: ['./src/**', './demo/**'],
    }
};

export default config;
