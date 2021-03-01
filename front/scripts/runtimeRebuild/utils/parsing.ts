import cheerio from 'cheerio';

const WEBPACK_ASSETS_EXCLUDE = [/^https?:\/\//];

export const getWebpackAssetsFromPage = (pageTemplate: string): {scripts: string[]; styles: string[]} => {
    const doc = cheerio.load(pageTemplate);

    const scripts = doc('script')
        .toArray()
        .filter(el => WEBPACK_ASSETS_EXCLUDE.every(t => !t.test(el.attribs.src)))
        .map(el => doc.html(el));

    const styles = doc('link[rel="stylesheet"]')
        .toArray()
        .filter(el => WEBPACK_ASSETS_EXCLUDE.every(t => !t.test(el.attribs.href)))
        .map(el => doc.html(el));

    return {scripts, styles};
};

export const insertAssetsToTemplate = (
    template: string,
    {scripts, styles}: {scripts: string[]; styles: string[]},
): string => {
    const doc = cheerio.load(template);

    // длина честно проверяется, но ts не понимает, поэтому каст
    styles.length && doc('head').append(...(styles as [string]));
    scripts.length && doc('body').append(...(scripts as [string]));

    return doc.html();
};
