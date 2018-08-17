const path = require('path');
const fse = require('fs-extra');

const pp = (...args) => path.join(__dirname, ...args);
fse.emptyDirSync(pp('./dist/'));

const pkg = fse.readJsonSync(pp('./package.json'));
pkg.main = 'index.js';
delete pkg.scripts;
delete pkg.devDependencies;
delete pkg.jest;
fse.outputJson(pp('./dist/package.json'), pkg, { spaces: 2 });

[
    'index.js',
    'src',
    'LICENSE',
    'README.md',
    'README.cn.md',
].forEach(name =>
    fse.copySync(
        pp('.', name),
        pp('./dist', name)
    )
);
