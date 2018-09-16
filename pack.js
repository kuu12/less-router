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

let min = fse.readFileSync(pp('./dist/less-router.min.js'), { encoding: 'utf8' });
min = min
    .replace(/\([a-zA-Z],[a-zA-Z]\){if\(!\([a-zA-Z] instanceof [a-zA-Z]\)\)throw new TypeError\([^)]+\)/, '(){')
    .replace(/if\("function"!=typeof [a-zA-Z]&&null!==[a-zA-Z]\)throw new TypeError\([^)]+\);/, '')
    .replace(/\(([a-zA-Z]),[a-zA-Z]\){if\(![a-zA-Z]\)throw new ReferenceError\([^}]+(?=})/, '($1){return $1')
    .replace(/for\(var [a-zA-Z]=arguments.length,([a-zA-Z])=Array\([a-zA-Z]\),[a-zA-Z]=0;[a-zA-Z]<[a-zA-Z];[a-zA-Z]\+\+\)[a-zA-Z]\[[a-zA-Z]\]=arguments\[[a-zA-Z]\];/, 'var $1=[].slice.call(arguments);');
fse.writeFileSync(pp('./dist/less-router.min.js'), min);
