const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const IMAGES_PATH = path.join(__dirname, 'src', 'images');
const OUTPUT_PATH = path.join(__dirname, 'src', 'optimizedImages');

const IGNORED_EXTENSIONS = ['.svg'];

const getInput = relativePath => path.join(IMAGES_PATH, relativePath);
const getOutput = relativePath => path.join(OUTPUT_PATH, relativePath);

const getImagesRecursive = (dir='', res=[]) => {
    const absoluteDir = getInput(dir);
    const isDir = fs.lstatSync(absoluteDir).isDirectory();

    if (isDir) {
        const dirContent = fs.readdirSync(absoluteDir);

        for (const file of dirContent) {
            getImagesRecursive(path.join(dir, file), res);
        }
    } else {
        res.push(dir);
    }

    return res;
};

const getAllImages = getImagesRecursive;


const changeExtension = (file, extension) => {
    const splittedFile = file.split('.');

    return [
        ...splittedFile.slice(0, splittedFile.length - 1),
        extension,
    ].join('.');
};


const optimizeImage = imagePath => {
    const inputPath = getInput(imagePath);
    const extension = path.extname(inputPath);

    if (!IGNORED_EXTENSIONS.includes(extension)) {
        const webpPath = changeExtension(imagePath, 'webp');
        const outputPath = getOutput(webpPath);

        sharp(inputPath)
            .webp({quality: 75})
            .toFile(outputPath);
    } else {
        const outputPath = getOutput(imagePath);

        fs.copyFileSync(inputPath, outputPath);
    }
};

const optimizeAll = paths =>
    paths.forEach(optimizeImage);


const prepareFolders = () => {
    fs.rmdirSync(OUTPUT_PATH, {recursive: true, force: true});

    const files = [''];
    const dirs = [];

    for (const file of files) {
        const absoluteFilePath = getInput(file);

        if (fs.lstatSync(absoluteFilePath).isDirectory()) {
            dirs.push(file);

            files.push(
                ...fs.readdirSync(absoluteFilePath)
                    .map(p => path.join(file, p)),
            );
        }
    }

    for (const dir of dirs) {
        fs.mkdirSync(
            getOutput(dir),
        );
    }
};


const optimizeImages = () => {
    prepareFolders();

    const images = getAllImages();
    optimizeAll(images);
};


optimizeImages();
