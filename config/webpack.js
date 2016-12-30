const webpack = require('webpack');
const babelrc = require('./babel.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mixins = require('../src/style/mixins.js');
const happyPackPlugin = require('./happypack.js');
const path = require('path');
const ROOT_PATH = process.cwd();

process.env.BABEL_ENV = 'development';

const plugins = [
  new HtmlWebpackPlugin({
    inject: 'body',
    template: 'index.html'
  }),

  new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),

  new webpack.HotModuleReplacementPlugin(),

  // prints more readable module names in the browser console on HMR updates
  new webpack.NamedModulesPlugin(),

  //提取Loader定义到同一地方
  new webpack.LoaderOptionsPlugin({
    minimize: false,
    debug: true,
    options: {
      context: '/',

      // NOTE: https://github.com/amireh/happypack/pull/106
      // resolve happypack can't get this.options.plugins
      plugins: function () {return plugins;},

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

  happyPackPlugin({
      name: 'happypack-javascript',
      loaders: [{
          path: 'babel',
          query: babelrc,
      }]
  }),

  happyPackPlugin({
      name: 'happypack-css',
      loaders: ['style', 'css?&importLoaders=1', 'postcss'],
  }),
];


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

  resolve: {
    modules: ['node_modules'],
    extensions: [
      '.json', '.js', '.jsx',
    ],
  },

  resolveLoader: {
    moduleExtensions: ['-loader']
  },

  performance: {
    hints: false
  },

  plugins,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=happypack-javascript',
        include: path.resolve(ROOT_PATH, 'src'),
      }, {
        test: /\.jsx?$/,
        include: path.resolve(ROOT_PATH, 'src'),
        enforce: 'pre',
        loader: 'eslint'
      }, {
        test: /\.css$/,
        loaders: 'happypack/loader?id=happypack-css',
      },
    ]
  },

  // Ensure that webpack polyfills the following node features for use
  // within any bundles that are targetting node as a runtime. This will be
  // ignored otherwise.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    __dirname: true,
    __filename: true,
  },
};
