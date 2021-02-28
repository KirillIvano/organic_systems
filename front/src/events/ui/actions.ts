import {createAction, ActionTypes} from '../utils/types';


export const OPEN_NAV = 'OPEN_NAV' as const;
export const CLOSE_NAV = 'CLOSE_NAV' as const;

export const navOpenAction = createAction(
    OPEN_NAV,
);
export const navCloseAction = createAction(
    CLOSE_NAV,
);

export const uiActions = {
    navOpenAction,
    navCloseAction,
};

export type UiActions = ActionTypes<typeof uiActions>
