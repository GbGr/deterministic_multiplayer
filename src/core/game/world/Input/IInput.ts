import { InputAction } from './InputAction'

export interface IInput {
    startListen(): void
    emitInputAction(inputAction: InputAction): void
}
