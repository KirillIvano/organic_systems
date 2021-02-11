import qs from 'query-string';

import {SERVER_ORIGIN} from '@/settings';


export const getApiUrl = (
    path: string,
    query?: Record<string, number | string>,
): string =>
    `${SERVER_ORIGIN}${path}${query ? qs.stringify(query) : ''}`;
