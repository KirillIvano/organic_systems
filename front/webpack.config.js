const path = require('path');
const fs = require('fs');
const {DefinePlugin, ProvidePlugin} = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');


const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, '_site', 'static');
const PAGES_PATH = path.resolve(SRC_PATH, 'pages');
const PAGE_INDEX_PATTERN = /index\.(js|ts)/;


const getPageIndexPath = pageFolderName => {
    const pageFilesNames = fs.readdirSync(path.resolve(PAGES_PATH, pageFolderName));

    const indexFileName = pageFilesNames.filter(
        fileName => PAGE_INDEX_PATTERN.test(fileName),
    )[0];

    return path.resolve(PAGES_PATH, pageFolderName, indexFileName);
};

const createPagesConfigs = () => {
    const pagesFolders = fs.readdirSync(PAGES_PATH);

    const entries = {};

    for (const pageFolder of pagesFolders) {
        const pageIndexPath = getPageIndexPath(pageFolder);

        entries[pageFolder] = pageIndexPath;
    }

    return {
        entries,
    };
};

const pagesConfig = createPagesConfigs();


module.exports.consts = {
    SRC_PATH,
    PAGES_PATH,
    DIST_PATH,
};

module.exports.config = {
    entry: pagesConfig.entries,
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '@': SRC_PATH,
            vars: path.resolve(SRC_PATH, 'vars'),
        },
    },
    output: {
        path: path.resolve(DIST_PATH),
        publicPath: '/',
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
