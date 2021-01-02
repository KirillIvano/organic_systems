const path = require('path');
const {DefinePlugin, ProvidePlugin} = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');
const TEMPLATES_PATH = path.resolve(__dirname, '_site');
const PAGES_PATH = path.resolve(SRC_PATH, 'pages');


const getScriptPath = filePath => path.join(SRC_PATH, filePath);
const getTemplatePath = filePath => path.join(TEMPLATES_PATH, filePath);
const getOutputTemplatePath = filePath => path.join(DIST_PATH, filePath);


const getEntries = pagesDescriptor =>
    Object.entries(pagesDescriptor.chunks).reduce(
        (acc, [chunkName, {entry}]) => {
            acc[chunkName] = getScriptPath(entry);

            return acc;
        },
        {},
    );

const getHtmlPlugin = pagesDescriptor =>
    new HTMLWebpackPlugin({
        filename: getOutputTemplatePath(pagesDescriptor.template),
        template: getTemplatePath(pagesDescriptor.template),
        chunks: pagesDescriptor.chunks,
    });

const getPlugins = pagesDescriptor =>
    Object.values(pagesDescriptor.pages)
        .map(getHtmlPlugin);


const getBaseConfig = pagesConfig => ({
    entry: getEntries(pagesConfig),
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '@': SRC_PATH,
            vars: path.resolve(SRC_PATH, 'vars'),
        },
    },
    output: {
        path: DIST_PATH,
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DefinePlugin({
            __API_ADDRESS__: '"http://31.31.199.170:8000"',
        }),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(TEMPLATES_PATH, '/files'),
                    to: path.join(DIST_PATH, '/files'),
                },
            ],
        }),
        ...getPlugins(pagesConfig),
    ],
    module: {
        rules: [
            {
                test: /\.(t|j)s$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
});


module.exports = {
    SRC_PATH,
    DIST_PATH,
    TEMPLATES_PATH,
    PAGES_PATH,
    getBaseConfig,
};
