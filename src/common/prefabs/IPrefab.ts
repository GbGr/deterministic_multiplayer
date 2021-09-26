export interface IPrefab<T, P = void> {
    instantiate(params: P): T
}
