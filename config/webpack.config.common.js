const { resolveApp } = require('../scripts/paths');

module.exports = {
    entry: {
        site: ['@babel/polyfill', resolveApp('client/index.tsx')],
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            client: resolveApp('client'),
            utils: resolveApp('client/utils'),
            pages: resolveApp('client/pages'),
            providers: resolveApp('client/providers'),
        },
    },

    module: {
        rules: [
            {
                test: /\.(woff|woff2|ttf|eot|ico)$/,
                loader: require.resolve('file-loader'),
                options: {
                    name: 'media/[name].[hash:8].[ext]',
                },
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpg$/, /\.png$/, /\.svg$/],
                loader: require.resolve('url-loader'),
                options: {
                    name: 'media/[name].[hash:8].[ext]',
                },
            },
        ],
    },
};
