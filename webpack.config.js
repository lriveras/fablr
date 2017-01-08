var path = require('path');
var webpack = require('webpack');

var __builddir = path.join("server", "static", "build");

module.exports = {
    entry: './app/fablr-app.jsx',
    output: {
        path: __builddir,
        filename: 'fablr.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /.js$/,
                loader: "babel-loader",
                exclude: /(node_modules|__builddir)/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules',
                include: /flexboxgrid/,
            }
        ]
    },
    //   eslint: {
    //     configFile: './.eslintrc'
    //   }
}