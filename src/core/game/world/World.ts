import { inject, Lifecycle, scoped } from 'tsyringe'
import Logic from './Logic/Logic'
import LogicModel, { LogicModelState } from './Logic/LogicModel'
import LogicModelHistory from './Logic/LogicModelHistory'
import RPCQueue from './Network/RPCQueue'
import WorldView from './view/WorldView'
import { INetworkTransport } from './Network/transport/INetworkTransport'
import { NETWORK_TRANSPORT } from './Network/transport/NetworkTransportFactory'

export const LOGIC_TICK_RATE = 30
export const LOGIC_DT = 1000 / LOGIC_TICK_RATE
export const CLIENT_SYNC_RATE = 10

@scoped(Lifecycle.ContainerScoped)
export default class World {
    private _timeSinceStart: number = 0
    private _tickSinceStart: number = 0

    get timeSinceStart(): number {
        return this._timeSinceStart
    }

    get tickSinceStart(): number {
        return this._tickSinceStart
    }

    get logicModelState(): LogicModelState {
        return this._logicModel.state
    }

    constructor(
        private readonly _logic: Logic,
        private readonly _logicModel: LogicModel,
        private readonly _logicModelHistory: LogicModelHistory,
        private readonly _rpcQueue: RPCQueue,
        private readonly _worldView: WorldView,
        @inject(NETWORK_TRANSPORT) private readonly _networkTransport: INetworkTransport,
    ) {
        this._networkTransport.initialize().then((syncStateNetworkPackage) => {
            this._tickSinceStart = syncStateNetworkPackage.tick
            this._timeSinceStart = syncStateNetworkPackage.ts
            this._logicModel.setStateFromNetworkPackage(syncStateNetworkPackage)
            console.log(syncStateNetworkPackage)
        })
    }

    public update(dt: number): void {
        if (!this._networkTransport.isInitialized) return
        this._timeSinceStart += dt
        let fromTick = this._tickSinceStart
        const toTick = Math.floor(this._timeSinceStart / LOGIC_DT)
        const lowerTick = this._rpcQueue.getInvalidateLowerTick()

        if (lowerTick >= 0 && lowerTick < fromTick) {
            let previousModelTick = this._logicModelHistory.getPreviousFromTick(lowerTick)
            let previousModel = this._logicModelHistory.get(previousModelTick)
            if (previousModelTick < 0) {
                previousModelTick = 0
                previousModel = this._logicModel.initialState
            }
            fromTick = previousModelTick
            this._logicModel.setState(previousModel)
            console.log('rollback to ', fromTick)
        }

        if (fromTick !== toTick) {
            this.updateLogic(fromTick, toTick)
            this._tickSinceStart = toTick
        }

        this._worldView.update(dt)
    }

    public updateLogic(fromTick: number, toTick: number): void {
        for (let tick = fromTick; tick < toTick; tick++) {
            this._logic.update(tick, LOGIC_DT)
            if (tick !== 0 && tick % CLIENT_SYNC_RATE === 0) {
                this._logicModelHistory.add(this._logicModel.copy())
            }
        }
    }
}
