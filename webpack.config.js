const webpack = require('webpack');
const path = require('path');
const package = require('./package.json');

const isProduction = process.argv.indexOf('-p') >= 0;
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: !isProduction
});

module.exports = {
  context: sourcePath,
  entry: {
    bundle: './index.tsx',
    vendor: [
      'react',
      'react-dom',
    ]
  },
  output: {
    path: outPath,
    filename: '[name].js',
    publicPath: ''
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      containers: path.resolve(__dirname, 'src/containers'),
      models: path.resolve(__dirname, 'src/models'),
      stores: path.resolve(__dirname, 'src/stores'),
      assets: path.resolve(__dirname, 'src/assets'),
      styles: path.resolve(__dirname, 'src/styles'),
      util: path.resolve(__dirname, 'src/util')
    }
  },
  externals: {
    'Configuration': JSON.stringify(isProduction ? require('./config.prod.json') : require('./config.dev.json'))
  },
  module: {
    loaders: [
      // typescript
      {
        test: /\.tsx?$/,
        use: isProduction
          ? 'awesome-typescript-loader?module=es6'
          : [
            'react-hot-loader/webpack',
            'awesome-typescript-loader'
          ]
      },
      // less
      {
        test: /\.less$/,
        use: extractLess.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: !isProduction,
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]'
              }
            }, 
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      // css 
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            }
          ]
        })
      },
      // static assets 
      { 
        test: /\.(woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.(ttf|eot)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]'
          }
        }
      },
      { test: /\.svg$/, 
        use: {
          loader: 'file-loader',
          options: {
            name: 'icons/[hash].[ext]'
          }
        }
      },
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.png$/, use: 'url-loader?limit=10000' },
      { test: /\.jpg$/, use: 'file-loader' },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !isProduction
    }),
    extractLess,
    new HtmlWebpackPlugin({
      template: 'index.html',
      options: {
        chunksSortMode: 'manual',
        chunks: ['vendor', 'bundle']
      }
    }),
    new webpack.NamedModulesPlugin({
      disable: isProduction
    })
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: [
      sourcePath
    ],
    hot: true,
    stats: {
      warnings: false
    }
  }
};
