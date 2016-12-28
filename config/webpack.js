const webpack = require('webpack');
const babelrc = require('./babel.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mixins = require('../src/style/mixins.js');
const path = require('path');
const ROOT_PATH = process.cwd();

process.env.BABEL_ENV = 'development';

module.exports = {
  target: 'web',
  context: ROOT_PATH + '/src',
  // issue: webpack@2xx cheap-module-source-map can't debug source code
  // TODO: Change when these issues are resolved.
  devtool: 'inline-source-map',
  entry: [
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    // We ship a few polyfills by default:
    require.resolve('react-dev-utils/webpackHotDevClient'),
    require.resolve('./polyfills.js'),
    // Finally, this is your app's code:
    './index',
  ],
  output: {
    path: ROOT_PATH + '/dist',
    filename: '[name].js',
    chunkFilename: '[name].min.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(ROOT_PATH, 'src'),
        loader: 'babel',
        options: babelrc,
      }, {
        test: /\.jsx?$/,
        include: path.join(ROOT_PATH, 'src'),
        enforce: 'pre',
        loader: 'eslint'
      }, {
        test: /\.css$/,
        loaders: ['style', 'css?&importLoaders=1', 'postcss']
      },
    ]
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html'
    }),

    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"development"'},}),

    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    //提取Loader定义到同一地方
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      options: {
        context: '/',
        eslint: {
          configFile: path.join(__dirname, '../.eslintrc'),
          useEslintrc: false
        },
        postcss: function (webpack) {
          return [
            require('postcss-smart-import')({
              addDependencyTo: webpack
            }),
            require('postcss-url')(),
            require('postcss-mixins')({mixins}),
            require('postcss-cssnext')({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9',
              ]
            }),
            require('postcss-nested')(),
          ];
        },
      },
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: [
      '.json', '.js', '.jsx',
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
};
