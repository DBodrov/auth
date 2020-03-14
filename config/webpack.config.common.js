const { resolveApp } = require('../scripts/paths');

module.exports = {
    entry: {
        site: ['@babel/polyfill', resolveApp('client/index.tsx')],
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@elements-ui/themes': resolveApp('packages/Themes/src'),
            '@elements-ui/button': resolveApp('packages/Button/src'),
            '@elements-ui/checkbox': resolveApp('packages/Checkbox/src'),
            '@elements-ui/typography': resolveApp('packages/Typography/src'),
            '@elements-ui/input': resolveApp('packages/Input/src'),
            '@elements-ui/maskinput': resolveApp('packages/MaskInput/src'),
            '@elements-ui/react': resolveApp('packages/react/src'),
            '@elements-ui/utils': resolveApp('packages/utils/src'),
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
