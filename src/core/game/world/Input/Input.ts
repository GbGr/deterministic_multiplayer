import { inject, singleton } from 'tsyringe'

import { MOVE_BACKWARD, MOVE_FORWARD, MOVE_LEFT, MOVE_RIGHT } from '../../modules/character/Move'
import { InputAction } from './InputAction'
import CharacterMoveAction from './CharacterMoveAction'
import Network from '../Network/Network'
import { Platform, PLATFORM_ID } from '../../../di/Platform'

@singleton()
export default class Input {
    constructor(
        private readonly _network: Network,
        @inject(PLATFORM_ID) private readonly _platformId: Platform
    ) {
        if (this._platformId === Platform.BROWSER) {
            this.listenForMoveInput()
        }
    }

    public emitInputAction(inputAction: InputAction): void {
        this._network.addRPC(inputAction)
    }

    private listenForMoveInput(): void {
        let currentMove: number = 0

        window.addEventListener('keydown', (e) => {
            let newMove = currentMove
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    newMove |= MOVE_FORWARD
                    break
                case 'ArrowRight':
                case 'KeyD':
                    newMove |= MOVE_RIGHT
                    break
                case 'ArrowDown':
                case 'KeyS':
                    newMove |= MOVE_BACKWARD
                    break
                case 'ArrowLeft':
                case 'KeyA':
                    newMove |= MOVE_LEFT
                    break
            }
            if (currentMove === newMove) return
            currentMove = newMove
            this.emitInputAction(new CharacterMoveAction(newMove))
        })

        window.addEventListener('keyup', (e) => {
            let newMove = currentMove
            switch (e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    newMove &= ~MOVE_FORWARD
                    break
                case 'ArrowRight':
                case 'KeyD':
                    newMove &= ~MOVE_RIGHT
                    break
                case 'ArrowDown':
                case 'KeyS':
                    newMove &= ~MOVE_BACKWARD
                    break
                case 'ArrowLeft':
                case 'KeyA':
                    newMove &= ~MOVE_LEFT
                    break
            }
            if (currentMove === newMove) return
            currentMove = newMove
            this.emitInputAction(new CharacterMoveAction(newMove))
        })
    }
}
