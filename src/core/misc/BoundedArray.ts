export default class BoundedArray<T> {
    private readonly array: Array<T>

    public get limit(): number {
        return this._limit
    }

    constructor(private readonly _limit: number) {
        this.array = new Array<T>()
    }

    public pop(): T | undefined {
        return this.array.pop()
    }

    public shift(): T | undefined {
        return this.array.shift()
    }

    public push(item: T): number {
        if (this.array.length >= this._limit) this.array.splice(0, 1)
        return this.array.push(item)
    }

    public find<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S): S | undefined {
        return this.array.find(predicate)
    }

    public findIndex(predicate: (value: T, index: number, obj: T[]) => unknown): number {
        return this.array.findIndex(predicate)
    }

    public filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S): S[] {
        return this.array.filter(predicate)
    }

    public forEach(callbackFn: (value: T, index: number, array: T[]) => void): void {
        return this.array.forEach(callbackFn)
    }

    public map<U>(callbackFn: (value: T, index: number, array: T[]) => U): U[] {
        return this.array.map(callbackFn)
    }
}
