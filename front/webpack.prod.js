const {merge} = require('webpack-merge');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const TerserJs = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');

const {config} = require('./webpack.config');


const prodConfigs = {
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/](flexboxgrid2)/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
        minimizer: [
            new TerserJs(),
            new CssMinimizer(),
        ],
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: 'main.css',
        //     chunkFilename: '[id].[hash].css',
        // }),
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
                    'style-loader',
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
                        loader: 'url-loader',
                        // options: {
                        //     outputPath: 'images/[name]/',
                        //     name: '[name]_[hash].[ext]',
                        // },
                    },
                ],
            },
        ],
    },
};


module.exports = merge(config, prodConfigs);
