module.exports = process.env.NODE_ENV === 'production'
    ? require('./less-router.production.min.js')
    : require('./less-router.development.js');
