import { Lifecycle, scoped } from 'tsyringe'
import LogicModel from '../Logic/LogicModel'
import { CharacterView } from '../../modules/character/CharacterView'
import CharacterViewFactory from '../../modules/character/CharacterViewFactory'

@scoped(Lifecycle.ContainerScoped)
export default class WorldView {
    private characterViews: Map<number, CharacterView> = new Map<number, CharacterView>()

    constructor(
        private readonly _logicModel: LogicModel,
        private readonly _characterViewFactory: CharacterViewFactory
    ) {

    }

    /**
     * Updates every frame
     * @param dt
     */
    public update(dt: number): void {
        const { characters } = this._logicModel.state
        this.characterViews.forEach((characterView, playerId) => {
            if (characters.has(playerId)) return
            characterView.dispose()
            this.characterViews.delete(playerId)
        })
        characters.forEach((characterState, playerId) => {
            let characterView = this.characterViews.get(playerId)

            if (!characterView) {
                characterView = this._characterViewFactory.create(characterState)
                this.characterViews.set(playerId, characterView)
                characterView.create(characterState)
            } else {
                characterView.update(dt, characterState)
            }
        })
    }
}
