export interface Listener<T> {
    (event: T): any;
}

export interface Disposable {
    dispose();
}

export default class TypedEvent<T> {
    private listeners: Array<Listener<T>> = [];
    private listenersOnce: Array<Listener<T>> = [];

    public on = (listener: Listener<T>): Disposable => {
        this.listeners.push(listener);
        return {
            dispose: () => this.off(listener)
        };
    }

    public once = (listener: Listener<T>): void => {
        this.listenersOnce.push(listener);
    }

    public off = (listener: Listener<T>) => {
        const callbackIndex = this.listeners.indexOf(listener);
        if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
    }

    public emit = (event: T) => {
        /** Update any general listeners */
        this.listeners.forEach((listener) => listener(event));

        /** Clear the `once` queue */
        if (this.listenersOnce.length > 0) {
            const toCall = this.listenersOnce;
            this.listenersOnce = [];
            toCall.forEach((listener) => listener(event));
        }
    }

    public pipe = (te: TypedEvent<T>): Disposable => {
        return this.on((e) => te.emit(e));
    }
}
