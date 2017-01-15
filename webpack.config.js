var path = require('path');
var webpack = require('webpack');

var __builddir = path.join("server", "static", "build");

module.exports = {
    entry: {
        bundle: './app/fablr-app.jsx',
        tests: './test/fablr-tests.jsx'
    },
    output: {
        path: __builddir,
        filename: '[name].fablr.js'
    },
    externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true,
        'react/lib/ReactContext': 'window'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'airbnb', 'stage-0']
                }
            },
            {
                test: /.js$/,
                loader: "babel-loader",
                exclude: /(node_modules|__builddir)/,
                query: {
                    presets: ['es2015', 'react', 'airbnb', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules',
                include: /flexboxgrid/,
            }
        ]
    }
}