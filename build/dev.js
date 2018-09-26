const child_process = require('child_process');
const fse = require('fs-extra');
const path = require('path');

const pp = (...args) => path.join(__dirname, ...args);

fse.emptyDirSync(pp('../.temp'));

// fse.copySync(
//     pp('../dist/less-router.min.js'),
//     pp('../.temp/less-router.min.js')
// );

const indexHtml = fse
    .readFileSync(
        pp('../index.html'),
        'utf8'
    )
    // .replace(
    //     'react.production.min.js"></script>',
    //     'react.production.min.js"></script>\n<script src="/less-router.min.js"></script>'
    // )
    .replace(
        'https://rawgithub.com/kuu12/router-demo/master/demo.bundle.js',
        '/demo.bundle.js'
    )
    .replace(
        'https://rawgithub.com/kuu12/router-demo/master/style.css',
        '/style.css'
    )
    .replace(
        /<\/script>/,
        '</script>\n<script>if(!location.pathname.startsWith("/less-router")) history.replaceState({}, "", "/less-router/")</script>'
    );
fse.outputFileSync(
    pp('../.temp/index.html'),
    indexHtml
);

const _404Html = fse
    .readFileSync(
        pp('../404.html'),
        'utf8'
    )
    .replace(
        'var segmentCount = 1;',
        'var segmentCount = 0;'
    );
fse.outputFileSync(
    pp('../.temp/404.html'),
    _404Html
);

fse.copySync(
    pp('../demo/style.css'),
    pp('../.temp/style.css')
);

const timer = setInterval(() => {
    if (!fse.existsSync(pp('../.temp/demo.bundle.js'))) return;
    child_process.exec('hs ./.temp -s -o -c-1 -g');
    clearInterval(timer);
}, 300);
