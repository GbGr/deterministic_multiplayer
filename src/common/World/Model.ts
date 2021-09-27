import { Vector3 } from '@babylonjs/core/Maths/math.vector'

export default class Model {
    public readonly state: IModelState

    constructor(state?: IModelState) {
        this.state = state || {
            characters: {},
            bombs: {},
        }
    }

    public copy(): Model {
        return new Model({
            characters: closeEntities(this.state.characters) as any,
            bombs: closeEntities(this.state.bombs),
        })
    }
}

export interface IModelState {
    characters: {[key: string]: { position: Vector3, move?: number }}
    bombs: {[key: string]: { position: Vector3 }}
}

function closeEntities(map: { [key: string]: { position: Vector3 } }): { [key: string]: { position: Vector3 } } {
    return Object.keys(map).reduce((newMap, entityKey) => {
        newMap[entityKey] = cloneEntity(map[entityKey])
        return newMap
    }, {})
}

function cloneEntity(entity: { position: Vector3 }): { position: Vector3 } {
    return { ...entity, position: entity.position.clone() }
}
