module.exports = process.env.NODE_ENV === 'production'
    ? require('./dist/less-router.production.min.js')
    : require('./dist/less-router.development.js');
