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
    input: pp('../demo/index.jsx'),
    external: [
        'react',
        'react-dom',
        // '../src',
    ],
    output: {
        format: 'umd',
        file: pp('../.temp/demo.bundle.js'),
        sourcemap: true,
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            // '../src': 'Routing',
        }
    },
    plugins: [
        resolve({
            extensions: ['.js', '.jsx', '.json']
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        babel({
            babelrc: false,
            plugins: ['external-helpers'],
            ...babelrc,
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
