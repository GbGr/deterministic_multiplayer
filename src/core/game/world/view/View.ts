export interface View<T> {
    create(state: T): void
    update(dt: number, state: T): void
    dispose(): void
}
