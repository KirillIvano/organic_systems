import path from 'path';
import childProcess from 'child_process';
import fetch from 'node-fetch';

import {RebuildConfig, RebuilderContext} from './types';
import {RuntimeRebuilder} from './RuntimeRebuilder';

const run = async (configs: RebuildConfig[]) => {
    // eslint-disable-next-line no-console
    const ctx: RebuilderContext = {logger: console.log};

    configs.forEach(config => new RuntimeRebuilder(config, ctx));
};

const buildEleventy = () =>
    new Promise((res, rej) => {
        const p = childProcess.exec(
            'npm run elev',
            err => err ? rej(err) : res(undefined),
        );

        p.stdout.pipe(process.stdout);
    });


const fetchWorkshopsPreviews = () =>
    fetch('http://31.31.199.170:8000/workshops', {method: 'GET'})
        .then(r => r.json())
        .then(r => r.data.workshops);

const fetchWorkshop = (workshopId) =>
    fetch(`http://31.31.199.170:8000/workshop/${workshopId}`, {method: 'GET'})
        .then(r => r.json())
        .then(r => r.data);


const getWorkshops = async () => {
    const workshopsPreviews = await fetchWorkshopsPreviews();
    const workshops = await Promise.all(workshopsPreviews.map(({id}) => fetchWorkshop(id)));

    return JSON.stringify(workshops);
};

run([
    {
        pageName: 'example',
        revalidateMS: 5000,

        revalidate: getWorkshops,
        rebuild: buildEleventy,

        exampleTemplatePath: path.resolve(__dirname, '/var/www/organic/__examples__/workshops/index.html'),
        sourceFolderPath: path.resolve(__dirname, './../../_site/workshops'),
        targetFolderPath: path.resolve(__dirname, '/var/www/organic/workshops'),
    },
]);
