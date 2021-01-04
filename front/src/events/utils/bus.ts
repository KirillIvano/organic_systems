import {BusInterface} from '@/services/interfaces/BusInterface';

import {BusAction} from './types';

export class Bus<TAction extends Record<string, BusAction>> implements BusInterface<TAction> {
    private readonly _handlers: {[K in keyof TAction]?: Array<((payload: TAction[K]) => unknown)>} = {};

    subscribe<TName extends keyof TAction>(
        action: TName,
        handler: (payload: TAction[TName]) => void,
    ): void {
        const actionHandlers = this._handlers[action];

        if (actionHandlers) {
            actionHandlers.push(handler);
        } else {
            this._handlers[action] = [handler];
        }
    }

    unsubscribe<TName extends keyof TAction>(
        action: TName,
        handler: (payload: TAction[TName]) => void,
    ): void {
        const actionHandlers = this._handlers[action];

        if (actionHandlers) {
            this._handlers[action] = actionHandlers.filter(h => h !== handler);
        }
    }

    fire<TName extends keyof TAction>(payload: TAction[TName]): void {
        // eslint-disable-next-line no-console
        console.info(payload);

        this.runHandlers(payload);
    }

    private runHandlers<TName extends keyof TAction>(payload: TAction[TName]) {
        const actionHandlers = this._handlers[payload.type];

        if (actionHandlers) {
            actionHandlers.forEach(handler => handler(payload as TAction[string]));
        }
    }
}
