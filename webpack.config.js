var path = require('path');
var webpack = require('webpack');

var output = "build";
var resources = "static";
var server = "server";

module.exports = {
  entry: './app/fablr-app.jsx',
  output: { path: path.join("server","static","build"),
    filename: 'fablr.js'
  },
  module: {
    loaders: [
      {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015','react']
      }
    },
    {
      test: /.js$/, 
      loaders: [ "babel-loader", "eslint-loader" ], 
      exclude: /(node_modules|build)/
    }
    ]
  },
//   eslint: {
//     configFile: './.eslintrc'
//   }
}