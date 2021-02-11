import {createAction, ActionTypes} from '../utils/types';

export const NEWS_SUBSCRIBE_START = 'NEWS_SUBSCRIBE_START' as const;
export const NEWS_SUBSCRIBE_ERROR = 'NEWS_SUBSCRIBE_ERROR' as const;
export const NEWS_SUBSCRIBE_SUCCESS = 'NEWS_SUBSCRIBE_SUCCESS' as const;


export const newsSubscribeStart = createAction(
    NEWS_SUBSCRIBE_START,
    (email: string) => email,
);
export const newsSubscribeSuccess = createAction(
    NEWS_SUBSCRIBE_SUCCESS,
);
export const newsSubscribeError = createAction(
    NEWS_SUBSCRIBE_ERROR,
    (error: string) => error,
);

export const newsActions = {
    newsSubscribeStart,
    newsSubscribeSuccess,
    newsSubscribeError,
};

export type NewsActions = ActionTypes<typeof newsActions>;
