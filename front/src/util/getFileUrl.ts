import {SERVER_ORIGIN} from '@/settings';

export const getFileUrl = (
    img: string,
): string =>
    `${SERVER_ORIGIN}${img.slice(1)}`;
