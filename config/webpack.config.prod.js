const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const utils = require('../scripts/loadersTests');
const { resolveApp } = require('../scripts/paths');
const commonConfig = require('./webpack.config.common');

const ENV = process.env.ENV;
process.env.NODE_ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    mode: 'production',
    bail: true,
    stats: 'errors-only',

    output: {
        path: resolveApp('dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: utils.tsxRegex,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        runtimeChunk: {
            name: 'runtime',
        },
        noEmitOnErrors: true,
        minimize: true,
        minimizer: [new TerserPlugin()],
    },

    performance: {
        hints: false,
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            title: 'Neutrino',
            filename: 'index.html',
            template: resolveApp('client/index.html'),
            favicon: resolveApp('client/favicon.ico'),
            hash: true,
            chunksSortMode: 'none',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),

        new webpack.DefinePlugin({
            'process.env': {
                ENV: JSON.stringify(ENV),
            },
        }),
    ],
});
