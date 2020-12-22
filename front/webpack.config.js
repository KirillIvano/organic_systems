const path = require('path');
const {DefinePlugin, ProvidePlugin} = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');
const TEMPLATES_PATH = path.resolve(__dirname, '_site');

const PAGES_PATH = path.resolve(SRC_PATH, 'pages');

const getScriptPath = filePath => path.join(SRC_PATH, filePath);
const getTemplatePath = filePath => path.join(TEMPLATES_PATH, filePath);
const getOutputTemplatePath = filePath => path.join(DIST_PATH, filePath);

const pagesConfig = {
    main: {
        entry: '/pages/main/index.ts',
        template: '/index.html',
    },
    courses: {
        entry: '/pages/courses/index.ts',
        template: '/courses/index.html',
    },
};


const getEntries = pagesDescriptor =>
    Object.keys(pagesDescriptor).reduce(
        (acc, key) => {
            acc[key] = getScriptPath(pagesConfig[key].entry);

            return acc;
        },
        {},
    );

const getPlugins = pagesDescriptor =>
    Object.entries(pagesDescriptor).map(
        ([name, {template}]) => new HTMLWebpackPlugin({
            filename: getOutputTemplatePath(template),
            template: getTemplatePath(template),
            chunks: [name],
        }),
    );

module.exports.consts = {
    SRC_PATH,
    PAGES_PATH,
    DIST_PATH,
};

module.exports.config = {
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
                {from: path.join(TEMPLATES_PATH, '/files'), to: path.join(DIST_PATH, '/files')},
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
};
