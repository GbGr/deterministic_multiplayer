import { Lifecycle, scoped } from 'tsyringe'
import { IVector3Like, IVector4Like } from '@babylonjs/core/Maths/math.like'
import { recursiveDeepCopy } from '../../../misc/copy'
import { SyncStateNetworkPackage } from '../Network/NetworkPackage'

@scoped(Lifecycle.ContainerScoped)
export default class LogicModel {
    private _state: LogicModelState
    private readonly _initialState: LogicModelState

    get state(): LogicModelState {
        return this._state
    }

    get initialState(): LogicModelState {
        return recursiveDeepCopy(this._initialState)
    }

    constructor() {
        this._state = {
            tick: 0,
            characters: new Map<number, LogicModelCharacterState>(),
            physicsObjects: new Map<number, LogicModelPhysicsObjectState>(),
        }
        this._initialState = recursiveDeepCopy(this._state)
    }

    public setState(state: LogicModelState): void {
        this._state = recursiveDeepCopy(state)
    }

    public copy(): LogicModelState {
        return recursiveDeepCopy(this._state)
    }

    public setStateFromNetworkPackage(syncStateNetworkPackage: SyncStateNetworkPackage): void {
        if (!syncStateNetworkPackage.state) return
        const charactersObj: { [key: string]: LogicModelCharacterState } = syncStateNetworkPackage.state.characters as any
        const characters = new Map<number, LogicModelCharacterState>()
        Object.keys(charactersObj).forEach((playerId) => {
            characters.set(Number(playerId), charactersObj[playerId])
        })
        const physicsObjectsObj: { [key: string]: LogicModelPhysicsObjectState } = syncStateNetworkPackage.state.physicsObjects as any
        const physicsObjects = new Map<number, LogicModelPhysicsObjectState>()
        Object.keys(physicsObjectsObj).forEach((objectId) => {
            physicsObjects.set(Number(objectId), physicsObjectsObj[objectId])
        })

        this._state = {
            tick: syncStateNetworkPackage.tick,
            characters,
            physicsObjects,
        }
    }
}

export interface LogicModelState {
    tick: number
    characters: Map<number, LogicModelCharacterState>
    physicsObjects: Map<number, LogicModelPhysicsObjectState>
}

export interface LogicModelPhysicsObjectState {
    objectId: number
    force: IVector3Like
    linearVelocity: IVector3Like
    angularVelocity: IVector3Like
    position: IVector3Like
    quaternion: IVector4Like
}

export interface LogicModelCharacterState {
    move: number
    playerId: number
    position: IVector3Like
}
