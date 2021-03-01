const {optimizeImage} = require('./../scripts/images/optimizeImage');


const PATH_PATTERN = /^(\.\/|\/)?([a-zA-Z0-9_-]+\/)*([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)?)$/;

const testPath = (path, argName) => {
    if (!path) throw new Error(`Не задан ${argName}`);
    else if (!PATH_PATTERN.test(path)) throw new Error(`Неверный формат ${argName}`);
};

const parseArgs = () => {
    const [input, output] = process.argv.slice(2, 4);

    testPath(input, 'input');

    if (output) {
        testPath(output, 'output');
    }

    return [input, output];
};

const [input, output] = parseArgs();

optimizeImage(input, output ? output : input);
