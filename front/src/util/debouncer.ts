export class Debouncer {
    private _lastTimeoutId: number | null = null;

    constructor(
        private readonly delay: number = 100,
    ) {}

    fire(handler: () => void): void {
        this.clear();
        this.enqueueHandler(handler);
    }

    clear(): void {
        if (this._lastTimeoutId) {
            clearTimeout(this._lastTimeoutId);
        }
    }

    private enqueueHandler(handler: () => void) {
        this._lastTimeoutId = window.setTimeout(handler, this.delay);
    }
}
