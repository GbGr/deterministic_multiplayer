import { InputAction, InputActionType } from './InputAction'

export interface CharacterMoveActionData {
    move: number
}

export default class CharacterMoveAction implements InputAction<CharacterMoveActionData> {
    public readonly type: InputActionType = InputActionType.CharacterMove
    public readonly data: CharacterMoveActionData

    constructor(move: number) {
        this.data = { move }
    }
}
