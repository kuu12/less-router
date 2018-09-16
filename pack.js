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
    .replace(/function [a-zA-Z]\([a-zA-Z]\){return [a-zA-Z]&&"object"==typeof [a-zA-Z]&&"default"in [a-zA-Z]\?[a-zA-Z]\.default:[a-zA-Z]}/, '')
    .replace(/[a-zA-Z]\(require\("react"\)\)/, 'require("react")')
    .replace(/[a-zA-Z]=[a-zA-Z]&&[a-zA-Z]\.hasOwnProperty\("default"\)\?[a-zA-Z]\.default:[a-zA-Z];/, '')
    .replace(/\([a-zA-Z],[a-zA-Z]\){if\(!\([a-zA-Z] instanceof [a-zA-Z]\)\)throw new TypeError\([^)]+\)/, '(){')
    .replace(/if\("function"!=typeof [a-zA-Z]&&null!==[a-zA-Z]\)throw new TypeError\([^)]+\);/, '')
    .replace(/\(([a-zA-Z]),[a-zA-Z]\){if\(![a-zA-Z]\)throw new ReferenceError\([^}]+(?=})/, '($1){return $1')
    .replace(/for\(var [a-zA-Z]=arguments.length,([a-zA-Z])=Array\([a-zA-Z]\),[a-zA-Z]=0;[a-zA-Z]<[a-zA-Z];[a-zA-Z]\+\+\)[a-zA-Z]\[[a-zA-Z]\]=arguments\[[a-zA-Z]\];/g, 'var $1=[].slice.call(arguments);')
    .replace(/Object\.setPrototypeOf\?Object\.setPrototypeOf\(([a-zA-Z]),([a-zA-Z])\):[a-zA-Z]\.__proto__=[a-zA-Z]/, '$1.sup=$2')
    .replace(/n\.enumerable\|\|/, '')
    .replace(/enumerable:!1,/, '')
    .replace(/for\(var [a-zA-Z]=0;[a-zA-Z]<([a-zA-Z])\.length;[a-zA-Z]\+\+\){var ([a-zA-Z])=[a-zA-Z]\[[a-zA-Z]\];([^}]+)}/, '$1.forEach(function($2){$3})')
    .replace(/\(([a-zA-Z])\.__proto__\|\|Object\.getPrototypeOf\([a-zA-Z]\)\)/, '$1.sup')
    .replace(/Object\.prototype\.hasOwnProperty\.call\(r,n\)/g, '!0');

fse.writeFileSync(pp('./dist/less-router.min.js'), min);
