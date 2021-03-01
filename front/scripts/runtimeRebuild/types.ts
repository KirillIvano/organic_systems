export type LoggerLevel = 'info' | 'warning' | 'error' ;

export type RebuilderContext = {
    logger: (message: unknown, level?: LoggerLevel) => void;
}

export type PageConfig = {
    chunks: string[],
    template: string
}

export type RebuildConfig = {
    // name of page or debugging
    pageName: string;

    // absolute path to example of page to rebuild
    exampleTemplatePath: string;

    // path to take sources from
    sourceFolderPath: string;

    // path to put enhanced templates
    targetFolderPath: string;

    // triggers pages rebuild
    rebuild: (ctx: RebuilderContext) => Promise<unknown> | void;

    // period between checks in milliseconds
    revalidateMS: number;

    // function to get new data from server
    revalidate: (ctx: RebuilderContext) => Promise<string> | string;
}
