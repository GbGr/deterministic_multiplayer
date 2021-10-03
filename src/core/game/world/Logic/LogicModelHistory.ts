import { Lifecycle, scoped } from 'tsyringe'
import BoundedMap from '../../../misc/BoundedMap'
import LogicModel, { LogicModelState } from './LogicModel'

@scoped(Lifecycle.ContainerScoped)
export default class LogicModelHistory {
    private readonly _historyMap: BoundedMap<number, LogicModelState>

    constructor(private readonly _logicModel: LogicModel) {
        this._historyMap = new BoundedMap<number, LogicModelState>(1000)
    }

    public add(logicModelState: LogicModelState): void {
        this._historyMap.set(logicModelState.tick, logicModelState)
    }

    public get(tick: number): LogicModelState {
        return this._historyMap.get(tick)
    }

    public getPreviousFromTick(tick: number): number {
        let min = Number.MAX_SAFE_INTEGER
        let result = -1

        this._historyMap.forEach((state, stateTick) => {
            if (stateTick < tick) {
                let delta = tick - stateTick
                if (delta < min) {
                    min = delta
                    result = stateTick
                }
            }
        })

        return result
    }
}
