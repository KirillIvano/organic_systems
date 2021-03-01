import {promises as fs} from 'fs';

import {RebuildConfig, RebuilderContext} from './types';
import {
    resolveAndJoinPaths,
    getRelativeFilesRecursively,
    clearTemplatesDir,
    restoreDirFromBackup,
    generateDirBackup,
} from './utils/files';
import {getWebpackAssetsFromPage, insertAssetsToTemplate} from './utils/parsing';

export class RuntimeRebuilder {
    private _currentDataState = '';
    private _rebuildInterval: NodeJS.Timeout = null;

    constructor(
        private config: RebuildConfig,
        private ctx: RebuilderContext,
    ) {
        this.init();
    }

    stop = (): void => clearInterval(this._rebuildInterval);

    private rebuild = async () => {
        console.log('rebuild');
        await this.config.rebuild(this.ctx);

        // backup dir with templates
        const backupDir = await generateDirBackup(this.config.targetFolderPath);

        const exampleTemplate = (await fs.readFile(this.config.exampleTemplatePath)).toString();
        const assets = getWebpackAssetsFromPage(exampleTemplate);

        const pages = await getRelativeFilesRecursively(this.config.sourceFolderPath);

        // Dangerous changes in this block, must be backuped
        try {
            await clearTemplatesDir(this.config.targetFolderPath);

            await Promise.all(pages.map(async relatPath => {
                const srcPath = resolveAndJoinPaths(this.config.sourceFolderPath, relatPath);

                const template = (await fs.readFile(srcPath)).toString();
                const enhancedTemplate = insertAssetsToTemplate(template, assets);

                const distPath = resolveAndJoinPaths(this.config.targetFolderPath, relatPath);

                await fs.writeFile(distPath, enhancedTemplate, {});
            }));
        } catch(e) {
            console.log(e);
            await restoreDirFromBackup(backupDir, this.config.sourceFolderPath);
        }
    }

    private tick = async () => {
        let newDataState: string;

        try {
            newDataState = await this.config.revalidate(this.ctx);
        } catch (e) {
            this.ctx.logger(`Error occured during "${this.config.pageName}" initialization:\n ${e.message}`);
            return;
        }

        if (newDataState !== this._currentDataState) {
            this._currentDataState = newDataState;

            await this.rebuild();
        }
    }

    private async init() {
        try {
            this._currentDataState = await this.config.revalidate(this.ctx);
        } catch (e) {
            this.ctx.logger(`Error occured during "${this.config.pageName}" initialization:\n ${e.message}`);
            return;
        }

        this.tick();
        this._rebuildInterval = setInterval(this.tick, this.config.revalidateMS);
    }
}
