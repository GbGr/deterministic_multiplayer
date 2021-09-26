import AbstractPlayer from './AbstractPlayer'
import Character from '../Character/Character'
import { MOVE_BACKWARD, MOVE_FORWARD, MOVE_LEFT, MOVE_RIGHT } from '../../misc/Move'

export default class LocalPlayer extends AbstractPlayer {
    constructor(character: Character) {
        super(character)

        let move: number = 0

        window.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    move |= MOVE_FORWARD
                    break
                case 'ArrowRight':
                case 'KeyD':
                    move |= MOVE_RIGHT
                    break
                case 'ArrowDown':
                case 'KeyS':
                    move |= MOVE_BACKWARD
                    break
                case 'ArrowLeft':
                case 'KeyA':
                    move |= MOVE_LEFT
                    break
                case 'Space':
                    this.dropBomb()
                    break
            }

            if (move !== this.move) this.setMove(move)
        })

        window.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    move &= ~MOVE_FORWARD
                    break
                case 'ArrowRight':
                case 'KeyD':
                    move &= ~MOVE_RIGHT
                    break
                case 'ArrowDown':
                case 'KeyS':
                    move &= ~MOVE_BACKWARD
                    break
                case 'ArrowLeft':
                case 'KeyA':
                    move &= ~MOVE_LEFT
                    break
            }

            if (move !== this.move) this.setMove(move)
        })
    }

    public update(dt: number): void {
        super.update(dt)
    }
}
