export type BusAction<TType extends string = string, TPayload extends unknown = unknown> = {
    type: TType,
    payload: TPayload
};

export type BusActionCreator<
    TType extends string = string,
    TPayload extends unknown = unknown,
    TParams extends unknown[] = []
> = (
    ...payload: TParams
) => BusAction<TType, TPayload>


export type UnionizedCreators<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TActions extends Record<string, (...args: any[]) => unknown>,
> = ({[K in keyof TActions]: ReturnType<TActions[K]>})[keyof TActions]

export type RecordedActions<T extends {type: string, payload: unknown}> = {
    [K in T['type']]: Extract<T, {type: K}>
}

export type ActionTypes<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TActions extends Record<string, (...args: any[]) => BusAction>,
> = RecordedActions<UnionizedCreators<TActions>>


export function createAction<TType extends string>(type: TType): BusActionCreator<TType, undefined, []>;
export function createAction<TType extends string, TPayload extends unknown, TParams extends unknown[]>(
    type: TType,
    handler?: (...args: TParams) => TPayload,
): BusActionCreator<TType, TPayload, TParams>;

export function createAction<
    TAction extends string,
    TPayload extends unknown = undefined,
    TParams extends unknown[] = [],
>(
    action: TAction,
    handler?: (...args: TParams) => TPayload,
): BusActionCreator<TAction, TPayload, TParams> {
    return (...args: TParams) => ({
        type: action,
        payload: handler && handler(...args),
    }) as BusAction<TAction, TPayload>;
}

