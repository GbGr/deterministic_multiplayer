import Character from '../components/Character/Character'
import Model from './Model'
import CharacterPrefab from '../prefabs/CharacterPrefab'

export default class View {
    private readonly model: Model
    private readonly characterPrefab: CharacterPrefab
    private readonly characters: { [key: string]: Character }

    constructor(model: Model, characterPrefab: CharacterPrefab) {
        this.model = model
        this.characters = {}
        this.characterPrefab = characterPrefab
    }

    public update(dt: number): void {
        Object.keys(this.model.state.characters).forEach((pid) => {
            if (!this.characters[pid]) this.characters[pid] = this.characterPrefab.instantiate(this.model.state.characters[pid])
            this.characters[pid].update(this.model.state.characters[pid])
        })
    }
}
