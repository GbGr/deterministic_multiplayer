import TypedEvent from '../misc/TypedEvent'
import { MOVE_BACKWARD, MOVE_FORWARD, MOVE_LEFT, MOVE_RIGHT } from '../misc/Move'

const InputActionService = new class {
    private tickSinceStart: number

    public readonly moveActionEvent: TypedEvent<MoveAction>

    constructor() {
        this.moveActionEvent = new TypedEvent<MoveAction>()

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
                // TODO: bomb
                // case 'Space':
                //     this.dropBomb()
                //     break
            }
            if (currentMove === newMove) return
            currentMove = newMove
            this.moveActionEvent.emit(this.getMoveAction(newMove))
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
            this.moveActionEvent.emit(this.getMoveAction(newMove))
        })
    }

    public setTickSinceStart(tickSinceStart: number): void {
        this.tickSinceStart = tickSinceStart
    }

    public getMoveAction(move: number): MoveAction {
        return {
            tick: this.tickSinceStart + 1, // TODO: +1,
            type: InputActionType.MOVE,
            data: { move },
        }
    }

}()

export enum InputActionType {
    MOVE,
    DROP_BOMB,
}

export type InputBaseAction<T, D = any> = { tick: number, type: T, data: D } // | ..etc
export type MoveAction = InputBaseAction<InputActionType.MOVE, { move: number }>
export type DropBombAction = InputBaseAction<InputActionType.DROP_BOMB, {}>
export type InputAction<E = void> = (MoveAction & E) | (DropBombAction & E)


export default InputActionService
