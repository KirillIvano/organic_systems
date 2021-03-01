const path = require('path');


const IMAGES_PATH = path.resolve(__dirname, '..', 'src', 'rawImages');
const OUTPUT_PATH = path.resolve(__dirname, '..', 'src', 'images');
const IGNORED_EXTENSIONS = ['.svg'];


module.exports = {
    IMAGES_PATH,
    OUTPUT_PATH,
    IGNORED_EXTENSIONS,
};
