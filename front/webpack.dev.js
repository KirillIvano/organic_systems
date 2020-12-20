const {merge} = require('webpack-merge');

const {config, consts} = require('./webpack.config');

const dev = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        hotOnly: true,
        contentBase: consts.DIST_PATH,
        port: '8080',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization, Cache-Control',
        },
    },

    watch: true,

    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }, {
                test: /\.(png|svg|jpg|ico|ttf|woff|woff2|eot)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                    },
                },
            },
        ],
    },
};

module.exports = merge(config, dev);
