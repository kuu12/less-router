const path = require('path');
const fse = require('fs-extra');

const pp = (...args) => path.join(__dirname, ...args);

const pkg = fse.readJsonSync(pp('./package.json'));
pkg.main = 'index.js';
delete pkg.scripts;
delete pkg.devDependencies;
delete pkg.jest;
fse.outputJson(pp('./dist/package.json'), pkg, { spaces: 2 });

[
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

fse.outputFileSync(
    pp('./dist/index.js'),
    [
        'module.exports=\'production\'==process.env.NODE_ENV',
        '?require(\'./less-router.min.js\')',
        ':require(\'./less-router.js\');',
    ].join('\n')
);
