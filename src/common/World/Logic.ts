import ActionsQueue, { NetworkAction } from './ActionsQueue'
import Model from './Model'
import { Vector3 } from '@babylonjs/core/Maths/math.vector'
import { InputActionType } from './InputActionService'
import { MOVE_BACKWARD, MOVE_FORWARD, MOVE_LEFT, MOVE_RIGHT } from '../misc/Move'

const CHARACTER_SPEED = 0.005

export default class Logic {
    private readonly actionsQueue: ActionsQueue
    private readonly model: Model

    constructor(actionsQueue: ActionsQueue, model: Model) {
        this.actionsQueue = actionsQueue
        this.model = model
    }

    public update(tick: number, dt: number): void {
        const actions = this.actionsQueue.getTickActions(tick)

        for (const action of actions) {
            this.updateCharacter(action, dt)
        }

        for (const pid of Object.keys(this.model.state.characters)) {
            const character = this.model.state.characters[pid]
            const move = character.move
            character.position.z += move & MOVE_FORWARD ? CHARACTER_SPEED * dt : move & MOVE_BACKWARD ? -CHARACTER_SPEED * dt : 0
            character.position.x += move & MOVE_LEFT ? -CHARACTER_SPEED * dt : move & MOVE_RIGHT ? CHARACTER_SPEED * dt : 0
        }
    }

    private updateCharacter(action: NetworkAction, dt: number): void {
        if (action.type !== InputActionType.MOVE) return

        if (!this.model.state.characters[action.pid])
            this.model.state.characters[action.pid] = { position: new Vector3(0, 0 ,0) }

        const character = this.model.state.characters[action.pid]
        character.move = action.data.move
    }
}
