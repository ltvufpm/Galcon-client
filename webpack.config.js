const path = require('path');

module.exports = {
  name: 'desktop',
  mode: 'development',
  entry: {
    'index': './src/index.ts'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 8080,
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]___[hash:base64:5]'
        }
      }, {
        loader: 'less-loader'
      }]
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@src": __dirname + "/src",
      "styles": "@common/styles"
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common'
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js"
  },
};