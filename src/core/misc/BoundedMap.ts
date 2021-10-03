import BoundedArray from './BoundedArray'

export default class BoundedMap<K, V> {
    private readonly _map: Map<K, V>
    private readonly _keysHistory: BoundedArray<K>

    public get size(): number {
        return this._map.size
    }

    public get limit(): number {
        return this._limit
    }

    constructor(private readonly _limit: number) {
        this._map = new Map<K, V>()
        this._keysHistory = new BoundedArray<K>(this._limit)
    }

    public clear(): void {
        return this._map.clear()
    }

    public delete(key: K): boolean {
        return this._map.delete(key)
    }

    public forEach(callbackFn: (value: V, key: K, map: Map<K, V>) => void): void {
        return this._map.forEach(callbackFn)
    }

    public has(key: K): boolean {
        return this._map.has(key)
    }

    public get(k: K): V {
        return this._map.get(k)
    }

    public set(k: K, v: V) {
        if (this.size >= this._limit && !this.has(k)) {
            this.delete(this._keysHistory.shift())
        }
        this._keysHistory.push(k)
        this._map.set(k, v)

        return this
    }
}
