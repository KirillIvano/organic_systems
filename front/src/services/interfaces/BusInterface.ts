import {BusAction} from '@/events/utils/types';


export interface BusInterface<TAction extends Record<string, BusAction>> {
    subscribe<TName extends keyof TAction>(
        action: TName,
        handler: (payload: TAction[TName]) => void,
    ): void;

    unsubscribe<TName extends keyof TAction>(
        action: TName,
        handler: (payload: TAction[TName]) => void,
    ): void;

    fire<TName extends keyof TAction>(payload: TAction[TName]): void;
}
