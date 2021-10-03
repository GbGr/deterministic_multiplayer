export function copyMap<K, V>(map: Map<K, V>): Map<K, V> {
    const newMap: Map<K, V> = new Map<K, V>()

    map.forEach((value, key) => {
        newMap.set(
            key,
            value.constructor === Object ? recursiveDeepCopy(value) : value)
    })

    return newMap
}

export function recursiveDeepCopy<T extends { [key: string | number]: any }>(source: T): T {
    return Object.keys(source).reduce((acc, key) => {
        acc[key] = (source[key].constructor === Object)
            ? recursiveDeepCopy(source[key])
            : source[key].constructor === Map
                ? copyMap(source[key])
                : source[key]
        return acc
    }, {} as any)
}

