import { InputAction, InputActionType } from '../Input/InputAction'
import { LogicModelState } from '../Logic/LogicModel'

export interface SyncStateNetworkPackage {
    tick: number
    ts: number
    state: LogicModelState
}

export default class NetworkPackage<T = any> implements InputAction<T> {
    constructor(
        public readonly tick: number,
        public readonly ts: number,
        public readonly playerId: number,
        public readonly type: InputActionType,
        public readonly data: T
    ) {}
}
