import { IVector3Like, IVector4Like } from '@babylonjs/core/Maths/math.like'

export function copyMap<K, V>(map: Map<K, V>): Map<K, V> {
    const newMap: Map<K, V> = new Map<K, V>()

    map.forEach((value, key) => {
        newMap.set(
            key,
            (value instanceof Object) ? recursiveDeepCopy(value) : value)
    })

    return newMap
}

export function recursiveDeepCopy<T extends { [key: string | number]: any }>(source: T): T {
    return Object.keys(source).reduce((acc, key) => {
        acc[key] = source[key].constructor === Map
            ? copyMap(source[key])
            : source[key] instanceof Object
                ? recursiveDeepCopy(source[key])
                : source[key]
        return acc
    }, {} as any)
}

export const copyFromVector3Like = (from: IVector3Like, to: IVector3Like): IVector3Like => {
    to.x = from.x
    to.y = from.y
    to.z = from.z
    return to
}

export const copyFromVector4Like = (from: IVector4Like, to: IVector4Like): IVector4Like => {
    to.x = from.x
    to.y = from.y
    to.z = from.z
    to.w = from.w
    return to
}

