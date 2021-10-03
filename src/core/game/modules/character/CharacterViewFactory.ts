import { Lifecycle, scoped } from 'tsyringe'
import { Scene } from '@babylonjs/core/scene'
import { CharacterView } from './CharacterView'
import { LogicModelCharacterState } from '../../world/Logic/LogicModel'

@scoped(Lifecycle.ContainerScoped)
export default class CharacterViewFactory {
    constructor(private readonly _scene: Scene) {
    }

    public create(state: LogicModelCharacterState): CharacterView {
        return new CharacterView(this._scene, state)
    }
}
