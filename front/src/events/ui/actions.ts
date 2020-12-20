export const TOGGLE_NAV = 'TOGGLE_NAV' as const;

export const actions = {
    TOGGLE_NAV,
};

export type UiActions = {
    TOGGLE_NAV: () => void,
}
