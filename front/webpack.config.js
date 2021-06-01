const path = require('path');
const {DefinePlugin, ProvidePlugin} = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');
const TEMPLATES_PATH = path.resolve(__dirname, '_site');
const EXAMPLES_PATH = path.resolve(__dirname, './dist/__examples__');
const PAGES_PATH = path.resolve(SRC_PATH, 'pages');


const getScriptPath = filePath => path.join(SRC_PATH, filePath);
const getTemplatePath = filePath => path.join(TEMPLATES_PATH, filePath);
const getOutputTemplatePath = filePath => path.join(DIST_PATH, filePath);
const getExamplePath = filePath => path.join(EXAMPLES_PATH, filePath, 'index.html');

const getEntries = pagesDescriptor =>
    Object.entries(pagesDescriptor.chunks).reduce(
        (acc, [chunkName, {entry}]) => {
            acc[chunkName] = getScriptPath(entry);

            return acc;
        },
        {},
    );

const getHtmlPlugin = pagesDescriptor => {
    if (pagesDescriptor.multiple) {
        const folderPath = getTemplatePath(pagesDescriptor.template);

        let files;
        try {
            files = fs.readdirSync(folderPath);
        } catch (e) {
            throw new Error(`Ошибка при получении страниц в папке "${pagesDescriptor.template}":\n${e.message}`);
        }

        if (!files.length) return [];

        const templatesPlugins = files.map(fileName => new HTMLWebpackPlugin({
            filename: path.join(getOutputTemplatePath(pagesDescriptor.template), fileName),
            template: path.join(folderPath, fileName),
            chunks: pagesDescriptor.chunks,
        }));
        const examplePlugin = new HTMLWebpackPlugin({
            filename: getExamplePath(pagesDescriptor.template),
            template: path.join(folderPath, files[0]),
            chunks: pagesDescriptor.chunks,
        });

        return [...templatesPlugins, examplePlugin];
    }

    return new HTMLWebpackPlugin({
        filename: getOutputTemplatePath(pagesDescriptor.template),
        template: getTemplatePath(pagesDescriptor.template),
        chunks: pagesDescriptor.chunks,
    });
};


const getPlugins = pagesDescriptor =>
    Object.values(pagesDescriptor.pages)
        .map(getHtmlPlugin)
        .reduce((acc, el) => Array.isArray(el) ? [...acc, ...el] : [...acc, el], []);


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
        clean: true,
        path: DIST_PATH,
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js',
    },
    plugins: [
        new DefinePlugin({
            __API_ADDRESS__: '"https://api.organiccolorsystems.ru"',
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
