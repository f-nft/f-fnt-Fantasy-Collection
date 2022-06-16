const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://66.42.40.33:8000/',
            changeOrigin: true,
        })
    );
};