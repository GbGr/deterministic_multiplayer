export enum InputActionType {
    CharacterMove,
}

export interface InputAction<T = any> {
    type: InputActionType
    data: T
}
