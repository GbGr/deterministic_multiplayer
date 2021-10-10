import { ILogicProcessor } from '../ILogicProcessor'
import { Lifecycle, scoped } from 'tsyringe'
import NetworkPackage from '../../Network/NetworkPackage'
import LogicModel from '../LogicModel'
import { InputActionType } from '../../Input/InputAction'
import { Vector3Struct } from '../../../../misc/structs'
import { CharacterMoveActionData } from '../../Input/CharacterMoveAction'
import { MOVE_BACKWARD, MOVE_FORWARD, MOVE_LEFT, MOVE_RIGHT } from '../../../modules/character/Move'

const CHARACTER_SPEED = 0.005

@scoped(Lifecycle.ContainerScoped)
export default class CharacterLogicProcessor implements ILogicProcessor {
    constructor(private readonly _logicModel: LogicModel) {
    }

    public process(dt: number, networkPackages: Array<NetworkPackage>): void {
        networkPackages.forEach(this.processActions)
        this.processUpdates(dt)
    }

    private processActions = (rpc: NetworkPackage): void => {
        const { characters } = this._logicModel.state

        if (rpc.type === InputActionType.CharacterMove) {
            const rpcData: CharacterMoveActionData = rpc.data
            let character = characters.get(rpc.playerId)
            if (!character) {
                character = { move: 0, position: new Vector3Struct(), playerId: rpc.playerId }
                characters.set(rpc.playerId, character)
            }
            character.move = rpcData.move
        }
    }

    private processUpdates = (dt: number): void => {
        const { characters } = this._logicModel.state

        characters.forEach((character) => {
            const move = character.move
            character.position.z += move & MOVE_FORWARD ? CHARACTER_SPEED * dt : move & MOVE_BACKWARD ? -CHARACTER_SPEED * dt : 0
            character.position.x += move & MOVE_LEFT ? -CHARACTER_SPEED * dt : move & MOVE_RIGHT ? CHARACTER_SPEED * dt : 0
        })
    }
}
