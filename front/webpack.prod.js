const {merge} = require('webpack-merge');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJs = require('terser-webpack-plugin');

const {getBaseConfig} = require('./webpack.config');
const pagesConfig = require('./pages.json');


const getProdSpecificConfig = () => ({
    mode: 'production',
    devtool: false,
    optimization: {
        // splitChunks: {
        //     cacheGroups: {
        //         common: {
        //             test: /[\\/]src[\\/]common/,
        //             name: 'common',
        //             chunks: 'all',
        //         },
        //     },
        // },
        minimizer: [
            new TerserJs(),
            new CssMinimizer(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({}),
    ],
    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {url: false},
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'autoprefixer',
                                ],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(ico|ttf|woff2|eot|woff)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: '/files',
                            name: '[name]_[hash].[ext]',
                        },
                    },
                ],
            },
        ],
    },
});


const getProdWebpackConfig = config =>
    merge(
        getBaseConfig(config),
        getProdSpecificConfig(),
    );


module.exports = getProdWebpackConfig(pagesConfig);

