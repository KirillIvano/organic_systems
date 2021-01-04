const changeExtension = (file, extension) => {
    const splittedFile = file.split('.');

    return [
        ...splittedFile.slice(0, splittedFile.length - 1),
        extension,
    ].join('.');
};

module.exports = {changeExtension};
