const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const {changeExtension} = require('./utils');
const {IGNORED_EXTENSIONS} = require('./settings');


const optimizeImage = (inputPath, outputPath) => {
    const extension = path.extname(inputPath);

    if (!IGNORED_EXTENSIONS.includes(extension)) {
        const webpPath = changeExtension(outputPath, 'webp');

        sharp(inputPath)
            .webp({quality: 75})
            .toFile(webpPath);
    } else {
        fs.copyFileSync(inputPath, outputPath);
    }
};


module.exports = {optimizeImage};
