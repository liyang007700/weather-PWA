const path = require('path'),
    htmlPlugin = require('html-webpack-plugin'),
    cleanPlugin = require('clean-webpack-plugin'),
    dist = 'dist',
    workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        index: './src/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, dist)
    },
    plugins: [
        new workboxPlugin({
            globDirectory: dist,
            globPatterns: ['**/*.{html,js}'],
            swDest: 'sw.js',
            clientClaim: true,
            skipWaiting: true
        })
    ]
};
