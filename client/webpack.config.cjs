/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types="webpack/module" />
/**
 * This webpack configuration is used specifically for a blog post found at: https://iws.io/2024/monorepo-part-iii#webpack-bare
 * It currently does not support CSS or other assets, but can be easily extended to do so. See blog post for more details.
 */

const path = require('node:path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

function transformSharedToDefine(shared) {
  const result = {};
  Object.keys(shared).forEach((k) => {
    const v = shared[k];
    result[`process.env.${k}`] = JSON.stringify(v);
  });
  return result;
}

function buildConfig(argv) {
  const mode = argv.mode || 'development';
  const prodMode = mode === 'production';
  const CI = process.env.CI === 'true' || false;

  const sharedEnv = {
    PUBLIC_URL: process.env.PUBLIC_URL || '/',
    VERSION: require('./package.json').version,
    VERSION_HASH: process.env.GITHUB_SHA?.substring(0, 7) // This is just sugar. Meant to be read from env in case CI checkout folder has no git-history.
  };

  let devtool, plugins = [], sourceMapLoader;
  if (!prodMode) {
    devtool = 'source-map';
    sourceMapLoader = {
      test: /\.(m|c){0,1}js$/,
      enforce: 'pre',
      use: ['source-map-loader']
    };
  } else {
    if (!CI) { // no bundle analyzer for a CI build
      plugins = [new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static'
      })];
    }
  }

  const config = {
    entry: {
      app: './src/index'
    },
    mode,
    ...({ devtool }),
    optimization: {
      minimize: prodMode,
      usedExports: true,
      minimizer: [new TerserPlugin()]
    },
    devServer: {
      hot: !prodMode,
      historyApiFallback: true,
      host: '0.0.0.0',
      static: {
        directory: path.join(__dirname, 'public')
      },
      compress: true,
      port: process.env.PORT || 3000
    },
    module: {
      rules: [
        {
          test: /\.(t|mt|ct)sx{0,1}?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json',
              projectReferences: true
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.cjs', '.mjs', '.mts', '.cts'],
      extensionAlias: {
        '.js': ['.js', '.jsx', '.ts', '.tsx'],
        '.cjs': ['.cjs', '.cts'],
        '.mjs': ['.mjs', '.mts']
      }
    },
    plugins: [
      ...plugins,
      // new HtmlWebpackPlugin({
      //   template: path.join(__dirname, './src/index.html'),
      //   templateParameters: sharedEnv,
      //   hash: true
      // }),
      new webpack.DefinePlugin(transformSharedToDefine(sharedEnv))
    ],
    output: {
      // filename: '[name]-[fullhash].bundle.js',
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: sharedEnv.PUBLIC_URL
    }
  };
  if (sourceMapLoader) config.module.rules.push(sourceMapLoader);
  return config;
}

module.exports = (env, argv) => {
  return buildConfig(argv);
};
