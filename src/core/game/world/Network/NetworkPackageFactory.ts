import NetworkPackage from './NetworkPackage'
import { InputAction } from '../Input/InputAction'
// import CharacterMovePackage from './Packages/CharacterMovePackage'

// type NetworkPackageSchemaFactory = new (tick: number, ts: number, playerId: number, data: any) => NetworkPackage<any>
//
// const ACTIONS_PACKAGES_MAP: Map<InputActionType, NetworkPackageSchemaFactory> = new Map<InputActionType, NetworkPackageSchemaFactory>([
//     [ InputActionType.CharacterMove, CharacterMovePackage ],
// ])


export default class NetworkPackageFactory {
    public static create<T>(tick: number, playerId: number, inputAction: InputAction): NetworkPackage<T> {
        return new NetworkPackage(tick, performance.now(), playerId, inputAction.type, inputAction.data)
    }
}
