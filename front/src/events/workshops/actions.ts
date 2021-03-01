import {WorkshopPreview} from '@/domain/workshops/types';

import {createAction, ActionTypes} from '../utils/types';


export const LOAD_WORKSHOPS_START = 'LOAD_WORKSHOPS_START' as const;
export const LOAD_WORKSHOPS_SUCCESS = 'LOAD_WORKSHOPS_SUCCESS' as const;

export const workshopsLoadStart = createAction(
    LOAD_WORKSHOPS_START,
);
export const workshopsLoadSuccess = createAction(
    LOAD_WORKSHOPS_SUCCESS,
    (workshops: WorkshopPreview[]) => ({workshops}),
);

export const workshopsActions = {
    workshopsLoadStart,
    workshopsLoadSuccess,
};

export type WorkshopsActions = ActionTypes<typeof workshopsActions>
