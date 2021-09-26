import Character from '../Character/Character'
import { MOVE_BACKWARD, MOVE_FORWARD, MOVE_LEFT, MOVE_RIGHT } from '../../misc/Move'

const SPEED = 0.005

export default abstract class AbstractPlayer {
    protected readonly character: Character
    protected move: number = 0

    protected constructor(character: Character) {
        this.character = character
    }

    protected dropBomb(): void {
        this.character.dropBomb()
    }

    protected setMove(move: number): void {
        this.move = move
    }

    public update(dt: number): void {
        this.character.mesh.position.z += this.move & MOVE_FORWARD ? SPEED * dt : this.move & MOVE_BACKWARD ? -SPEED * dt : 0
        this.character.mesh.position.x += this.move & MOVE_LEFT ? -SPEED * dt : this.move & MOVE_RIGHT ? SPEED * dt : 0
    }
}
