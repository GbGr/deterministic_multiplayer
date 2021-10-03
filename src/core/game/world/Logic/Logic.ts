import { Lifecycle, scoped } from 'tsyringe'
import LogicModel from './LogicModel'
import RPCQueue from '../Network/RPCQueue'
import { LogicProcessor } from './LogicProcessor'
import CharacterLogicProcessor from './processors/CharacterLogicProcessor'

@scoped(Lifecycle.ContainerScoped)
export default class Logic {
    private readonly processors: Array<LogicProcessor>

    constructor(
        private readonly _logicModel: LogicModel,
        private readonly _rpcQueue: RPCQueue,
        private readonly _characterLogicProcessor: CharacterLogicProcessor,
    ) {
        this.processors = [
            this._characterLogicProcessor,
        ]
    }

    public update(tick: number, dt: number): void {
        this._logicModel.state.tick = tick

        const networkPackages = this._rpcQueue.get(tick)

        for (const processor of this.processors) processor.process(dt, networkPackages)
    }
}
