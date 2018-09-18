const child_process = require('child_process');
const path = require('path');
const fse = require('fs-extra');

fse.emptyDirSync(path.join(__dirname, '../.temp'));

let indexHtml = fse.readFileSync(
    path.join(__dirname, '../index.html'),
    'utf8'
);
indexHtml = indexHtml.replace(
    'https://rawgithub.com/kuu12/router-demo/master/demo.bundle.js',
    '/demo.bundle.js'
).replace(
    /(?=<script)/,
    '<script>history.replaceState({}, "", "/less-router/")</script>'
);
fse.outputFileSync(
    path.join(__dirname, '../.temp/index.html'),
    indexHtml
);
let _404Html = fse.readFileSync(
    path.join(__dirname, '../404.html'),
    'utf8'
);
_404Html = _404Html.replace(
    'var segmentCount = 1;',
    'var segmentCount = 0;'
);
fse.outputFileSync(
    path.join(__dirname, '../.temp/404.html'),
    _404Html
);

child_process.exec('hs ./.temp -s -o');
