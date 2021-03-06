const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');

require('dotenv').config();

const aFabric = (key, value) => ({ key, value: path.resolve(__dirname, value) });

const $dist = aFabric('@dist', 'dist');
const $lib = aFabric('@lib', 'src/library');
const $root = aFabric('@root', '');
const $public = aFabric('@public', 'public');
const $src = aFabric('@src', 'src');

const pathAliases = [
  $dist,
  $lib,
  $root,
  $public,
  $src
];

let pathAliasesObject = {};
pathAliases.forEach(item => pathAliasesObject[item.key] = item.value);

const entry = {
  main: './src/index.js',
};

const output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
  filename: '[name].js'
};

const node = {
  // Need this when working with express, otherwise the build fails
  __dirname: false,   // if you don't put this is, __dirname
  __filename: false,  // and __filename return blank or /
};

const target = 'node';
const devtool = 'source-map';

const externals = [nodeExternals()]; // Need this to avoid error when working with Express

const replacePathes = pathAliases.map(item => ({
  search: item.key,
  replace: item.value.replace(/\\/igm, '\\\\'),
  flags: 'igm'
}));

const _module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      // loader: 'babel-loader'
      use: [
        'babel-loader',
        {
          loader: 'string-replace-loader',
          options: {
            multiple: replacePathes
          }
        }
      ]
    },
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: { minimize: true }
      }]
    },
    {
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
      exclude: /node_modules/,
    }
    // {
    //   test: /\.css$/,
    //   use: [ 'style-loader', 'css-loader' ]
    // },
    // {
    //   test: /\.(png|svg|jpg|gif)$/,
    //   use: ['file-loader']
    // }
  ]
};

const plugins = [
  // new HtmlWebPackPlugin({
  //   template: './public/dist/index.html',
  //   filename: './html/index.html',
  //   excludeChunks: [ 'main' ]
  // })
];


const resolve = {
  alias: pathAliasesObject
};

const watch = {
  watch: process.env.NODE_ENV === 'development' ? true : false,
  watchOptions: {
    ignored: /node_modules/
  }
};

module.exports = {
  ...watch,
  entry,
  output,
  target,
  node,
  devtool,
  externals,
  module: _module,
  // plugins,
  resolve
};
