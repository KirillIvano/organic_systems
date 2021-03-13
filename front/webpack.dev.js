// {
//     "included": [
//         "workshops",
//         "education",
//         "tutors"
//     ],
//     "mask": "product\/.+"
// }


const {merge} = require('webpack-merge');

const {DIST_PATH, getBaseConfig} = require('./webpack.config');
const pagesConfig = require('./pages.json');
const devConfig = require('./devConfig.json');


const getChunksByPages = pages => {
    const res = new Set();

    for (const page of Object.values(pages)) {
        for (const chunk of page.chunks) {
            res.add(chunk);
        }
    }

    return Array.from(res);
};

const findInvalidChunk = (names, chunks) =>
    names.some(name => !chunks[name]);


const digestPagesConfig = pagesConfig => {
    const {pages, chunks} = pagesConfig;

    const maskRegexp = devConfig.mask && new RegExp(devConfig.mask.replace(/\*/g, '[\\s\\S]*'));
    const included = devConfig.included;

    const filteredEntriesArray = Object.entries(pages).filter(
        ([name, {template}]) => (
            !(included || maskRegexp) ||
                (included && included.includes(name)) ||
                (maskRegexp && maskRegexp.test(template))
        ),
    );

    const filteredPages = filteredEntriesArray.reduce(
        (acc, [name, val]) => {
            acc[name] = val;

            return acc;
        },
        {},
    );

    const filteredChunkNames = getChunksByPages(filteredPages);

    const invalidChunk = findInvalidChunk(filteredChunkNames, chunks);
    if (typeof invalidChunk === 'string') {
        throw new Error(`Chunk "${invalidChunk}" doesn't exist`);
    }

    const filteredChunks = filteredChunkNames.reduce(
        (acc, chunkName) => {
            acc[chunkName] = chunks[chunkName];

            return acc;
        },
        {},
    );

    return {
        pages: filteredPages,
        chunks: filteredChunks,
    };
};


const getDevSpecificConfig = () => ({
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        hotOnly: true,
        contentBase: DIST_PATH,
        port: '8080',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization, Cache-Control',
        },
    },
    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {url: false},
                    },
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
});

const getDevConfig = pagesConfig => {
    const digestedConf = digestPagesConfig(pagesConfig);

    return merge(
        getBaseConfig(digestedConf),
        getDevSpecificConfig(),
    );
};

module.exports = getDevConfig(pagesConfig);
