const path = require('path');
const MyWebpackPlugin = require('./my-webpack-plugin');
const webpack = require('webpack');
const childProcess = require('child_process');
const htmlWebpack = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [path.resolve("./my-webpack-loader.js")],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  plugins: [
    new MyWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: `
      This is Banner Build Date : ${new Date().toLocaleString()}
      Commit Version : ${childProcess.execSync("git rev-parse --short HEAD")}
      Author: ${childProcess.execSync("git config user.name")}
      `,
    }),
    new webpack.DefinePlugin({
      TWO: "1+1",
      "api.domain": JSON.stringify("http://api.dev.com"),
    }),
    new htmlWebpack({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "development"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
        
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production'
     ? [new MiniCssExtractPlugin({filename: '[name].css'})]
     : []
    )
  ],
};