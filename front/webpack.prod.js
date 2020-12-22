const {merge} = require('webpack-merge');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCss = require('purgecss-webpack-plugin');
const TerserJs = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');
const glob = require('glob');

const {config, consts} = require('./webpack.config');

console.log(glob.sync(`${consts.SRC_PATH}/**/*`,  {nodir: true}));

const prodConfigs = {
    mode: 'production',
    optimization: {
        // splitChunks: {
        //     cacheGroups: {
        //         commons: {
        //             test: /[\\/]node_modules[\\/](flexboxgrid2)/,
        //             name: 'vendors',
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
        new PurgeCss({
            paths: glob.sync(`${consts.SRC_PATH}/**/*`,  {nodir: true}),
            rejected: true,
        }),
        new MiniCssExtractPlugin(),
        new ImageminPlugin({
            cache: true,
            imageminOptions: {
                plugins: [
                    ['gifsicle', {interlaced: true}],
                    ['jpegtran', {progressive: true}],
                    ['optipng', {optimizationLevel: 5}],
                    [
                        'svgo',
                        {
                            plugins: [
                                {
                                    removeViewBox: false,
                                },
                            ],
                        },
                    ],
                ],
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/files',
                        },
                    },
                    'css-loader',
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
                test: /\.(png|svg|jpg|ico|ttf|woff2|eot|woff)$/,
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
};


module.exports = merge(config, prodConfigs);
