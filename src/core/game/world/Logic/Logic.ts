import { Lifecycle, scoped } from 'tsyringe'
import LogicModel from './LogicModel'
import RPCQueue from '../Network/RPCQueue'
import { ILogicProcessor } from './ILogicProcessor'
import CharacterLogicProcessor from './processors/CharacterLogicProcessor'
import PhysicsEngine from '../../physics/PhysicsEngine'
import PhysicsObjectLogicProcessor from './processors/PhysicsObjectLogicProcessor'

@scoped(Lifecycle.ContainerScoped)
export default class Logic {
    private readonly processors: Array<ILogicProcessor>

    constructor(
        private readonly _logicModel: LogicModel,
        private readonly _rpcQueue: RPCQueue,
        private readonly _physicsEngine: PhysicsEngine,
        private readonly _characterLogicProcessor: CharacterLogicProcessor,
        private readonly _physicsObjectLogicProcessor: PhysicsObjectLogicProcessor,
    ) {
        this.processors = [
            this._characterLogicProcessor,
            this._physicsObjectLogicProcessor,
        ]
    }

    public update(tick: number, dt: number): void {
        // Copy state to physics world
        // simulate physics
        // copy physics world to state
        // this._physicsEngine.step(dt / 1000)
        this._physicsObjectLogicProcessor.copyPhysicsWorldFromState()

        const networkPackages = this._rpcQueue.get(tick)

        for (const processor of this.processors) processor.process(dt, networkPackages)

        this._physicsEngine.step(dt / 1000)

        this._physicsObjectLogicProcessor.copyStateFromPhysicsWorld()
    }
}
