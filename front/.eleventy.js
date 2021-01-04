module.exports = config => {
    config.addPassthroughCopy({'./src/files': 'files'});

    return {
        dataTemplateEngine: 'njk',
        dir: {
            input: 'src/templates',
            output: '_site'
        }
    }
}