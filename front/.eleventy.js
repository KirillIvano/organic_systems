module.exports = config => {
    config.addPassthroughCopy({'./src/images': 'images'});

    return {
        dataTemplateEngine: 'njk',
        dir: {
            input: 'src/templates',
            output: '_site'
        }
    }
}