const path = require('path');
const fs = require('fs');

const {optimizeImage} = require('./optimizeImage');
const {IMAGES_PATH, OUTPUT_PATH} = require('./settings');


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


const optimizeAll = paths =>
    paths.forEach(path => optimizeImage(getInput(path), getOutput(path)));


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
