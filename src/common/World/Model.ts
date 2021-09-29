import { Vector3 } from '@babylonjs/core/Maths/math.vector'

export default class Model {
    public state: IModelState

    constructor(state?: IModelState) {
        this.state = state || {
            characters: {},
            bombs: {},
        }
    }

    public copy(): Model {
        return new Model({
            characters: cloneEntities(this.state.characters) as any,
            bombs: cloneEntities(this.state.bombs),
        })
    }

    public setState(state: IModelState): void {
        this.state = state
    }
}

export interface IModelState {
    characters: {[key: string]: { position: Vector3, move?: number }}
    bombs: {[key: string]: { position: Vector3 }}
}

function cloneEntities(map: { [key: string]: { position: Vector3 } }): { [key: string]: { position: Vector3 } } {
    return Object.keys(map).reduce((newMap, entityKey) => {
        newMap[entityKey] = cloneEntity(map[entityKey])
        return newMap
    }, {})
}

function cloneEntity(entity: { position: Vector3 }): { position: Vector3 } {
    return { ...entity, position: entity.position.clone() }
}
