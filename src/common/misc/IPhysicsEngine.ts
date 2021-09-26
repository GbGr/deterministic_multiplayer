export interface IPhysicsEngine {
    init(): Promise<void>
    getEngine(): any
}
