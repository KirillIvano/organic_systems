import glob from 'glob-promise';
import {promises as fs, Stats} from 'fs';
import path from 'path';


export const getRelativeFilesRecursively = async (folderPath: string): Promise<string[]> => {
    const paths = await glob(`${folderPath}/**/*`);

    const stats: (Stats | null)[] = await Promise.all(
        paths.map(p => fs.stat(p).catch(() => null)),
    );
    const filePaths = paths.filter((_, i) => {
        const stat = stats[i];

        return stat && stat.isFile();
    });

    const prefixLength = folderPath.length;
    return filePaths.map(p => p.slice(prefixLength));
};

const getDirBackupPath = (dirPath: string): string =>
    `${dirPath.endsWith('/') ? dirPath.slice(-1) : dirPath}__backup__`;

const shallowCopyDir = async (srcPath: string, destPath: string): Promise<void> => {
    const files = await getRelativeFilesRecursively(srcPath);

    await fs.mkdir(destPath).catch(() => void(0));

    await Promise.all(files.map(async fileName => {
        await fs.copyFile(
            path.join(srcPath, fileName),
            path.join(destPath, fileName),
        );
    }));
};

export const generateDirBackup = async (dirPath: string): Promise<string> => {
    const backupPath = getDirBackupPath(dirPath);

    // удаляем если остался бэкап с прошлого обновления
    await removeDirBackup(backupPath).catch(() => void(0));
    await shallowCopyDir(dirPath, backupPath);

    return backupPath;
};

export const restoreDirFromBackup = async (backupPath: string, destPath: string): Promise<void> => {
    await shallowCopyDir(backupPath, destPath);
    await removeDirBackup(backupPath);
};

export const removeDirBackup = async (dirPath: string): Promise<void> => {
    const backupPath = getDirBackupPath(dirPath);

    await fs.rmdir(backupPath, {recursive: true});
};

export const clearTemplatesDir = async (dirPath: string): Promise<void> => {
    const files = await fs.readdir(dirPath);

    await Promise.all(files.map(file => fs.unlink(path.join(dirPath, file))));
};

export const resolveAndJoinPaths = (f: string, s: string): string =>
    path.join(path.resolve(f), s);

