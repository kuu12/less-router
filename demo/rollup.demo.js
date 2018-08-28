import child_process from 'child_process';
import path from 'path';
import fse from 'fs-extra';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

fse.emptyDirSync(path.join(__dirname, '../dev'));
fse.copySync(
    path.join(__dirname, './index.html'),
    path.join(__dirname, '../dev/index.html')
);
fse.copySync(
    path.join(__dirname, './404.html'),
    path.join(__dirname, '../dev/404.html')
);

child_process.exec('hs ./dev -s -o');

const babelrc = fse.readJsonSync(
    path.join(__dirname, '../.babelrc')
);
babelrc.presets[0][1].modules = false;

const config = {
    input: './demo/index.jsx',
    external: ['react', 'react-dom'],
    output: {
        format: 'umd',
        file: './dev/demo.bundle.js',
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
        include: ['../src/**', './**'],
        exclude: 'rollup.demo.js',
    }
};

export default config;