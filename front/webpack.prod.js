const {merge} = require('webpack-merge');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJs = require('terser-webpack-plugin');
const PurgeCss = require('purgecss-webpack-plugin');
const glob = require('glob-all');

const {getBaseConfig, SRC_PATH} = require('./webpack.config');
const pagesConfig = require('./pages.json');

const getProdSpecificConfig = () => ({
    mode: 'production',
    devtool: false,
    optimization: {
        minimizer: [
            new TerserJs(),
            new CssMinimizer(),
            new PurgeCss({
                paths: glob.sync([
                    `${SRC_PATH}/**/*.njk`,
                    `${SRC_PATH}/**/*.ts`,
                ], {nodir: true}),
                css: glob.sync([
                    `${SRC_PATH}/**/*.scss`,
                ], {nodir: true}),
                // TODO: научиться задавать это в pages.json
                only: ['contacts'],
            }),
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

