module.exports = config => {
    config.addPassthroughCopy({'./src/images': 'files'});

    return {
        dataTemplateEngine: 'njk',
        dir: {
            input: 'src/templates',
            output: '_site'
        }
    }
}