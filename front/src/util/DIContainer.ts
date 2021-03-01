export class Container {
    private dependencies = new Map<symbol, unknown>();

    register<TObject extends unknown>(
        key: symbol,
        value: TObject,
    ): void {
        this.dependencies.set(key, value);
    }

    // takes class and instantinates it with injected params
    inject = (...injected: symbol[]) =>
        <TClass>(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            creator: new (...dependencies: any[]) => TClass,
        ): TClass => {
            const injectedDependencies = injected.map(
                key => this.dependencies.get(key),
            );

            return new creator(...injectedDependencies);
        }
}
